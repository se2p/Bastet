'use strict';

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repositoryRoot = path.resolve(__dirname, '..');
const testRoot = path.join(repositoryRoot, 'test');
const testFilePattern = /\.test\.(?:[cm]?[jt]s|tsx)$/;
const testFunctionNames = new Set(['describe', 'it', 'suite', 'test']);
const prohibitedStandaloneNames = new Set(['only', 'skip']);
const prohibitedLegacyNames = new Set(['fdescribe', 'fit', 'xit', 'xtest']);

function collectTestFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return collectTestFiles(entryPath);
        return testFilePattern.test(entry.name) ? [entryPath] : [];
    });
}

function propertyName(node) {
    if (ts.isPropertyAccessExpression(node)) return node.name.text;
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
        return node.argumentExpression.text;
    }
    return null;
}

function objectPropertyName(node) {
    if (!node.name) return null;
    if (ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name)) return node.name.text;
    return null;
}

function isTrue(node) {
    return node?.kind === ts.SyntaxKind.TrueKeyword;
}

function findPolicyViolations(sourceText, filename = 'test.ts') {
    const sourceFile = ts.createSourceFile(
        filename,
        sourceText,
        ts.ScriptTarget.Latest,
        true,
        filename.endsWith('.js') ? ts.ScriptKind.JS : ts.ScriptKind.TS
    );
    const importedTests = new Set();
    const importedProhibited = new Map();
    const nodeTestNamespaces = new Set();
    const contextNames = new Set();
    const violations = [];

    function report(node, message) {
        const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        violations.push({
            column: position.character + 1,
            line: position.line + 1,
            message,
        });
    }

    for (const statement of sourceFile.statements) {
        if (
            !ts.isImportDeclaration(statement) ||
            statement.moduleSpecifier.text !== 'node:test' ||
            !statement.importClause
        )
            continue;

        if (statement.importClause.name) importedTests.add(statement.importClause.name.text);
        const bindings = statement.importClause.namedBindings;
        if (ts.isNamespaceImport(bindings)) {
            nodeTestNamespaces.add(bindings.name.text);
        } else if (ts.isNamedImports(bindings)) {
            for (const element of bindings.elements) {
                const importedName = (element.propertyName || element.name).text;
                const localName = element.name.text;
                if (testFunctionNames.has(importedName)) importedTests.add(localName);
                if (prohibitedStandaloneNames.has(importedName)) {
                    importedProhibited.set(localName, importedName);
                }
            }
        }
    }

    function isTestFunction(node) {
        if (ts.isIdentifier(node)) {
            return testFunctionNames.has(node.text) || importedTests.has(node.text);
        }
        if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
            const name = propertyName(node);
            if (!testFunctionNames.has(name)) return false;
            const owner = node.expression;
            return ts.isIdentifier(owner) && (nodeTestNamespaces.has(owner.text) || contextNames.has(owner.text));
        }
        return false;
    }

    function registerContext(call) {
        if (!isTestFunction(call.expression)) return [];
        const added = [];
        for (const argument of call.arguments) {
            if (
                (!ts.isArrowFunction(argument) && !ts.isFunctionExpression(argument)) ||
                argument.parameters.length === 0
            )
                continue;
            const parameter = argument.parameters[0].name;
            if (ts.isIdentifier(parameter) && !contextNames.has(parameter.text)) {
                contextNames.add(parameter.text);
                added.push(parameter.text);
            }
        }
        return added;
    }

    function checkOptions(call) {
        if (!isTestFunction(call.expression)) return;
        for (const argument of call.arguments) {
            if (!ts.isObjectLiteralExpression(argument)) continue;
            for (const property of argument.properties) {
                if (!ts.isPropertyAssignment(property)) continue;
                const name = objectPropertyName(property);
                if ((name === 'skip' || name === 'only') && isTrue(property.initializer)) {
                    report(property, `Test option {${name}: true} is prohibited`);
                }
            }
        }
    }

    function checkCall(call) {
        const expression = call.expression;
        if (ts.isIdentifier(expression)) {
            if (prohibitedLegacyNames.has(expression.text)) {
                report(expression, `${expression.text}() is prohibited`);
            } else if (importedProhibited.has(expression.text)) {
                report(expression, `node:test ${importedProhibited.get(expression.text)}() is prohibited`);
            }
        }

        if (!ts.isPropertyAccessExpression(expression) && !ts.isElementAccessExpression(expression)) return;
        const name = propertyName(expression);
        if (
            (name === 'skip' || name === 'only') &&
            ts.isIdentifier(expression.expression) &&
            nodeTestNamespaces.has(expression.expression.text)
        ) {
            report(expression, `node:test ${name}() is prohibited`);
            return;
        }
        if ((name === 'skip' || name === 'only') && isTestFunction(expression.expression)) {
            report(expression, `Test ${name}() is prohibited`);
            return;
        }
        if (!ts.isIdentifier(expression.expression) || !contextNames.has(expression.expression.text)) return;
        if (name === 'skip') report(expression, 'Test-context skip() is prohibited');
        if (name === 'runOnly' && isTrue(call.arguments[0])) {
            report(expression, 'Test-context runOnly(true) is prohibited');
        }
    }

    function visit(node) {
        if (ts.isCallExpression(node)) {
            const addedContexts = registerContext(node);
            checkCall(node);
            checkOptions(node);
            ts.forEachChild(node, visit);
            for (const name of addedContexts) contextNames.delete(name);
            return;
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return violations;
}

function checkFiles(files) {
    return files.flatMap((filename) =>
        findPolicyViolations(fs.readFileSync(filename, 'utf8'), filename).map((violation) => ({
            ...violation,
            filename,
        }))
    );
}

function main() {
    const files = collectTestFiles(testRoot).sort();
    const violations = checkFiles(files);
    for (const violation of violations) {
        const filename = path.relative(repositoryRoot, violation.filename);
        console.error(`${filename}:${violation.line}:${violation.column}: ${violation.message}`);
    }
    if (violations.length > 0) {
        console.error(`Found ${violations.length} prohibited skipped or focused test form(s).`);
        return 1;
    }
    console.log(`Test policy check passed for ${files.length} test file(s).`);
    return 0;
}

if (require.main === module) process.exitCode = main();

module.exports = { checkFiles, collectTestFiles, findPolicyViolations };
