import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import * as mock from 'mock-fs';
let mocha = require('mocha')
let describe = mocha.describe;

import { writeToDisk } from './writeToDisk';
import { generateFunction, generateRequire, generateProgram } from './testHelpers';

describe('mock filesystem container', () => {
    beforeEach(() => {
        mock({
            'dist/': {},
        });
    });

    afterEach(() => {
        mock.restore();
    });

    it('should write files to the filesystem', () => {
        const files = [
            { filePath: 'dist/foo', code: generateProgram({ type: 'Literal', raw: '1', value: 1 }) },
            { filePath: 'dist/bar', code: generateProgram({ type: 'Literal', raw: '2', value: 2 }) },
            { filePath: 'dist/index', code: generateProgram({ type: 'Literal', raw: '3', value: 3 }) },
        ];

        return writeToDisk(files).then(() => {
            files.forEach(file => {
                let contents = fs.readFileSync(`${file.filePath}.js`).toString();
                assert.equal(contents, file.code.body[0].raw);
            });
        });
    });

    it('should write files to the filesystem and make nested directories', () => {
        const files = [
            { filePath: 'dist/foo/bar', code: generateProgram({ type: 'Literal', raw: '1', value: 1 }) },
            { filePath: 'dist/foo/baz', code: generateProgram({ type: 'Literal', raw: '2', value: 2 }) },
            { filePath: 'dist/index', code: generateProgram({ type: 'Literal', raw: '3', value: 3 }) },
        ];

        return writeToDisk(files).then(() => {
            files.forEach(file => {
                // Make sure directory was created
                let pathExists = fs.existsSync(path.dirname(file.filePath));
                assert(pathExists);
                // And make sure the file looks good.
                let contents = fs.readFileSync(`${file.filePath}.js`).toString();
                assert.equal(contents, file.code.body[0].raw);
            });
        });
    });
});
