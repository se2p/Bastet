import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { InvalidInputFormatException } from '../../../../src/bastet/core/exceptions/InvalidInputFormatException';
import { NotSupportedException } from '../../../../src/bastet/core/exceptions/NotSupportedException';
import { ParsingException } from '../../../../src/bastet/core/exceptions/ParsingException';
import { ProgramParserFactory } from '../../../../src/bastet/syntax/parser/ProgramParserFactory';
import { TextualProgramParser } from '../../../../src/bastet/syntax/parser/TextualProgramParser';
import path from 'path';

describe('ProgramParserFactory', () => {
    for (const filename of ['program.sc', 'program.le']) {
        test(`selects the textual parser for ${filename}`, () => {
            assert.ok(ProgramParserFactory.createParserFor(filename) instanceof TextualProgramParser);
        });
    }

    test('rejects unsupported Scratch archives', () => {
        assert.throws(() => ProgramParserFactory.createParserFor('program.sb2'), NotSupportedException);
    });

    test('rejects unknown input formats and reports the filename', () => {
        assert.throws(
            () => ProgramParserFactory.createParserFor('program.txt'),
            new InvalidInputFormatException('The given file does not map to a parser: program.txt')
        );
    });
});

describe('TextualProgramParser', () => {
    const parser = new TextualProgramParser();

    test('parses a minimal program', () => {
        const result = parser.parseSource('minimal.sc', 'program MinimalProgram');

        assert.strictEqual(result.text, 'programMinimalProgram<EOF>');
    });

    test('wraps syntax failures in a ParsingException', () => {
        assert.throws(() => parser.parseSource('invalid.sc', 'actor without a program'), ParsingException);
    });

    test('accepts list declaration and list-literal syntax', () => {
        const fixture = path.join(__dirname, '../../../programs/language-coverage/expr-num-list-length-1_SAFE.sc');

        assert.doesNotThrow(() => parser.parseFile(fixture));
    });
});
