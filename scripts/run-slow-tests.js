'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const { performance } = require('perf_hooks');

const repositoryRoot = path.resolve(__dirname, '..');
const slowRoots = ['test/bastet/procedures/analyses/data', 'test/bastet/utils/smt', 'test/integration'];
const testTimeoutMs = 120_000;
const suiteTimeoutMs = 240_000;
const maxConcurrency = 4;
const activeChildren = new Set();
let interrupted = false;

function normalizePath(testPath) {
    return testPath.split(path.sep).join('/');
}

function isSlowTest(filename) {
    return filename.endsWith('.node.test.ts');
}

function collectTests(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return collectTests(entryPath);
        return isSlowTest(entry.name) ? [entryPath] : [];
    });
}

function relativeTestPath(testPath) {
    const absolutePath = path.resolve(repositoryRoot, testPath);
    const relativePath = normalizePath(path.relative(repositoryRoot, absolutePath));
    const isInsideRepository = relativePath !== '..' && !relativePath.startsWith('../');
    const isInsideSlowRoot = slowRoots.some((root) => relativePath.startsWith(`${root}/`));

    if (!isInsideRepository || !isInsideSlowRoot || !isSlowTest(relativePath)) {
        throw new Error(`Expected a .node.test.ts file inside a slow-test root: ${testPath}`);
    }
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
        throw new Error(`Test file does not exist: ${testPath}`);
    }
    return relativePath;
}

function parseArguments(argv) {
    const options = { concurrency: 1, probeTimeout: false, tests: [] };
    const args = argv.filter((argument) => argument !== '--');

    while (args.length > 0) {
        const argument = args.shift();
        if (argument === '--concurrency') {
            const value = Number(args.shift());
            if (!Number.isInteger(value) || value < 1 || value > maxConcurrency) {
                throw new Error(`--concurrency must be an integer from 1 to ${maxConcurrency}`);
            }
            options.concurrency = value;
        } else if (argument === '--file') {
            const selected = [];
            while (args.length > 0 && !args[0].startsWith('--')) selected.push(args.shift());
            if (selected.length === 0) throw new Error('--file requires at least one test file');
            options.tests.push(...selected);
        } else if (argument === '--probe-timeout') {
            options.probeTimeout = true;
        } else {
            throw new Error(`Unknown argument: ${argument}`);
        }
    }

    if (options.probeTimeout) return options;
    options.tests = options.tests.map(relativeTestPath);
    return options;
}

function commandForSuite(testPath) {
    return {
        command: process.execPath,
        args: ['--import', 'tsx', '--test', '--test-concurrency=1', `--test-timeout=${testTimeoutMs}`, testPath],
    };
}

function killProcessTree(child, signal) {
    if (!child.pid || child.exitCode !== null) return;
    try {
        if (process.platform === 'win32') {
            spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
        } else {
            process.kill(-child.pid, signal);
        }
    } catch (error) {
        if (error.code !== 'ESRCH') child.kill(signal);
    }
}

function runSuite(testPath, timeoutMs = suiteTimeoutMs, extraEnv = {}) {
    return new Promise((resolve) => {
        const startedAt = performance.now();
        const { command, args } = commandForSuite(testPath);
        const child = spawn(command, args, {
            cwd: repositoryRoot,
            detached: process.platform !== 'win32',
            env: { ...process.env, ...extraEnv, CI: process.env.CI || 'true' },
            stdio: 'inherit',
        });
        activeChildren.add(child);

        let timedOut = false;
        let spawnError = null;
        const timeoutTimer = setTimeout(() => {
            timedOut = true;
            killProcessTree(child, 'SIGKILL');
        }, timeoutMs);

        child.once('error', (error) => {
            spawnError = error;
        });
        child.once('close', (code, signal) => {
            clearTimeout(timeoutTimer);
            activeChildren.delete(child);
            resolve({
                code,
                durationMs: performance.now() - startedAt,
                error: spawnError,
                signal,
                timedOut,
            });
        });
    });
}

function formatDuration(durationMs) {
    return `${(durationMs / 1000).toFixed(3)}s`;
}

async function runTests(tests, concurrency) {
    const startedAt = performance.now();
    let nextIndex = 0;
    let failed = false;
    let completed = 0;

    async function worker() {
        while (!failed && !interrupted && nextIndex < tests.length) {
            const testPath = tests[nextIndex++];
            console.log(`\n[slow] ${testPath}`);
            const result = await runSuite(testPath);
            completed += 1;

            if (result.timedOut) {
                console.error(`[slow] TIMEOUT ${testPath} after ${suiteTimeoutMs / 1000}s`);
                failed = true;
            } else if (result.error) {
                console.error(`[slow] ERROR ${testPath}: ${result.error.message}`);
                failed = true;
            } else if (result.code !== 0) {
                console.error(
                    `[slow] FAIL ${testPath} (${formatDuration(result.durationMs)}, exit ${result.code ?? result.signal})`
                );
                failed = true;
            } else {
                console.log(`[slow] PASS ${testPath} (${formatDuration(result.durationMs)})`);
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, tests.length) }, worker));
    const totalDuration = performance.now() - startedAt;
    console.log(`\n[slow] ${completed}/${tests.length} suite(s) completed in ${formatDuration(totalDuration)}`);
    return !failed && !interrupted && completed === tests.length;
}

function isProcessAlive(pid) {
    try {
        process.kill(pid, 0);
        return true;
    } catch (error) {
        return error.code !== 'ESRCH';
    }
}

async function waitForProcessExit(pid, timeoutMs) {
    const deadline = performance.now() + timeoutMs;
    while (performance.now() < deadline) {
        if (!isProcessAlive(pid)) return true;
        await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return !isProcessAlive(pid);
}

async function probeTimeoutCleanup() {
    if (process.platform === 'win32') {
        console.log('[slow:probe] Descendant cleanup uses taskkill on Windows; POSIX process-group probe skipped.');
        return true;
    }

    const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'bastet-slow-runner-'));
    const pidPath = path.join(temporaryDirectory, 'descendant.pid');
    try {
        const result = await runSuite('test/fixtures/stuck-slow-suite.node.js', 1_000, {
            BASTET_DESCENDANT_PID_PATH: pidPath,
        });
        if (!result.timedOut || !fs.existsSync(pidPath)) {
            console.error('[slow:probe] The stuck suite did not reach the expected outer timeout.');
            return false;
        }

        const descendantPid = Number(fs.readFileSync(pidPath, 'utf8'));
        if (!Number.isInteger(descendantPid) || !(await waitForProcessExit(descendantPid, 2_000))) {
            console.error(`[slow:probe] Descendant process ${descendantPid} survived suite termination.`);
            return false;
        }
        console.log('[slow:probe] Outer timeout terminated the suite process and its descendant.');
        return true;
    } finally {
        fs.rmSync(temporaryDirectory, { force: true, recursive: true });
    }
}

function terminateActiveChildren(signal) {
    interrupted = true;
    for (const child of activeChildren) killProcessTree(child, signal);
}

process.once('SIGINT', () => terminateActiveChildren('SIGTERM'));
process.once('SIGTERM', () => terminateActiveChildren('SIGTERM'));

async function main() {
    let options;
    try {
        options = parseArguments(process.argv.slice(2));
    } catch (error) {
        console.error(error.message);
        return 2;
    }

    if (options.probeTimeout) return (await probeTimeoutCleanup()) ? 0 : 1;

    const tests =
        options.tests.length > 0
            ? options.tests
            : slowRoots
                  .flatMap((root) => collectTests(path.join(repositoryRoot, root)))
                  .sort()
                  .map((testPath) => normalizePath(path.relative(repositoryRoot, testPath)));

    return (await runTests(tests, options.concurrency)) ? 0 : 1;
}

main()
    .then((status) => {
        process.exitCode = status;
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
