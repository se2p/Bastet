const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = [
    {
        ignores: ['coverage/**', 'dist/**', 'node_modules/**'],
    },
    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            ecmaVersion: 2018,
            parser: tsParser,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'unused-imports': unusedImportsPlugin,
        },
        rules: {
            '@typescript-eslint/no-use-before-define': 'off',
            'no-use-before-define': 'off',
            'unused-imports/no-unused-imports': 'error',
        },
    },
];
