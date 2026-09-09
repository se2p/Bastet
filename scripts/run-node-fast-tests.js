'use strict';

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const repositoryRoot = path.resolve(__dirname, '..');
const testRoot = path.join(repositoryRoot, 'test');
const nativeTestSuffix = '.node.test.ts';
const slowRootPrefixes = ['test/bastet/procedures/analyses/data/', 'test/bastet/utils/smt/', 'test/integration/'];

function isSlowTest(relativePath) {
    const normalizedPath = relativePath.split(path.sep).join('/');
    return slowRootPrefixes.some((prefix) => normalizedPath.startsWith(prefix));
}

function collectNativeTests(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return collectNativeTests(entryPath);
        return entry.name.endsWith(nativeTestSuffix) ? [entryPath] : [];
    });
}

function relativeTestPath(testPath) {
    const absolutePath = path.resolve(repositoryRoot, testPath);
    const relativePath = path.relative(repositoryRoot, absolutePath);
    if (relativePath.startsWith('..') || !absolutePath.endsWith(nativeTestSuffix)) {
        throw new Error(`Expected a ${nativeTestSuffix} file inside the repository: ${testPath}`);
    }
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Test file does not exist: ${testPath}`);
    }
    if (isSlowTest(relativePath)) {
        throw new Error(`Expected a fast test file outside the slow-tier roots: ${testPath}`);
    }
    return relativePath;
}

function parseArguments(argv) {
    const options = {
        coverage: false,
        testNamePattern: null,
        tests: [],
        watch: false,
    };
    const args = argv.filter((argument) => argument !== '--');
    while (args.length > 0) {
        const argument = args.shift();
        if (argument === '--coverage') {
            options.coverage = true;
        } else if (argument === '--watch') {
            options.watch = true;
        } else if (argument === '--file') {
            if (args.length === 0) throw new Error('--file requires at least one test file');
            options.tests.push(...args.splice(0).map(relativeTestPath));
        } else if (argument === '--test-name-pattern') {
            if (args.length === 0) throw new Error('--test-name-pattern requires a pattern');
            options.testNamePattern = args.shift();
            options.tests.push(...args.splice(0).map(relativeTestPath));
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }
    if (options.watch && options.coverage) {
        throw new Error('Coverage and watch mode cannot be combined');
    }
    return options;
}

function coverageArguments() {
    return [
        '--experimental-test-coverage',
        '--test-coverage-include=src/bastet/**/*.ts',
        '--test-coverage-exclude=src/bastet/syntax/parser/grammar/**',
        '--test-coverage-exclude=src/bastet/utils/smt/z3/libz3.ts',
        '--test-coverage-exclude=src/bastet/utils/smt/z3/ctypes.ts',
        '--test-coverage-lines=78',
        '--test-coverage-branches=89',
        '--test-coverage-functions=57',
    ];
}

let options;
try {
    options = parseArguments(process.argv.slice(2));
} catch (error) {
    console.error(error.message);
    process.exit(2);
}

const tests =
    options.tests.length > 0
        ? options.tests
        : collectNativeTests(testRoot)
              .sort()
              .map((testPath) => path.relative(repositoryRoot, testPath))
              .filter((testPath) => !isSlowTest(testPath));

const nodeArguments = [
    '--import',
    'tsx',
    '--test',
    '--test-concurrency=1',
    ...(options.testNamePattern ? [`--test-name-pattern=${options.testNamePattern}`] : []),
    ...(options.coverage ? coverageArguments() : []),
    ...tests,
];

function watchTests() {
    let child = null;
    let restartRequested = false;
    let restartTimer = null;

    function run() {
        restartRequested = false;
        child = spawn(process.execPath, nodeArguments, {
            cwd: repositoryRoot,
            env: { ...process.env, CI: process.env.CI || 'true' },
            stdio: 'inherit',
        });
        child.once('error', (error) => console.error(error.message));
        child.once('close', () => {
            child = null;
            if (restartRequested) run();
            else console.log('[fast:watch] Waiting for test-file changes...');
        });
    }

    function requestRestart(testPath) {
        clearTimeout(restartTimer);
        restartTimer = setTimeout(() => {
            console.log(`\n[fast:watch] Change detected: ${testPath}`);
            restartRequested = true;
            if (child) child.kill('SIGTERM');
            else run();
        }, 50);
    }

    const watchers = tests.map((testPath) =>
        fs.watch(path.resolve(repositoryRoot, testPath), () => requestRestart(testPath))
    );
    function stop() {
        clearTimeout(restartTimer);
        for (const watcher of watchers) watcher.close();
        if (child) child.kill('SIGTERM');
    }
    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    console.log(`[fast:watch] Watching ${tests.length} test file(s).`);
    run();
}

if (options.watch) {
    watchTests();
    return;
}

const result = spawnSync(process.execPath, nodeArguments, {
    cwd: repositoryRoot,
    env: { ...process.env, CI: process.env.CI || 'true' },
    stdio: 'inherit',
});

if (result.error) {
    console.error(result.error.message);
    process.exit(1);
}
process.exit(result.status || 0);
