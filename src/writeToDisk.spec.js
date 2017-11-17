"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const mock = require("mock-fs");
let mocha = require('mocha');
let describe = mocha.describe;
const writeToDisk_1 = require("./writeToDisk");
const testHelpers_1 = require("./testHelpers");
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
            { filePath: 'dist/foo', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '1', value: 1 }) },
            { filePath: 'dist/bar', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '2', value: 2 }) },
            { filePath: 'dist/index', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '3', value: 3 }) },
        ];
        return writeToDisk_1.writeToDisk(files).then(() => {
            files.forEach(file => {
                let contents = fs.readFileSync(`${file.filePath}.js`).toString();
                assert.equal(contents, file.code.body[0].raw);
            });
        });
    });
    it('should write files to the filesystem and make nested directories', () => {
        const files = [
            { filePath: 'dist/foo/bar', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '1', value: 1 }) },
            { filePath: 'dist/foo/baz', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '2', value: 2 }) },
            { filePath: 'dist/index', code: testHelpers_1.generateProgram({ type: 'Literal', raw: '3', value: 3 }) },
        ];
        return writeToDisk_1.writeToDisk(files).then(() => {
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
//# sourceMappingURL=writeToDisk.spec.js.map