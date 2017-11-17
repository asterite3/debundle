"use strict";
// Functions to generate AST. This would be a function with two require calls inside:
// generateFunction(
//   generateRequire('./foo'),
//   generateRequire('./bar')
// )
//
Object.defineProperty(exports, "__esModule", { value: true });
function generateProgram(...body) {
    return {
        type: 'Program',
        body,
    };
}
exports.generateProgram = generateProgram;
function generateFunction(...body) {
    return {
        type: 'FunctionDeclaration',
        defaults: [],
        id: null,
        params: [
            { type: 'Identifier', name: 'module' },
            { type: 'Identifier', name: 'exports' },
            { type: 'Identifier', name: 'require' },
        ],
        body: {
            type: 'BlockStatement',
            body,
        },
    };
}
exports.generateFunction = generateFunction;
// Generate a function with the parameter names mangled, as if the bundle was minified.
function generateMangledFunction(...body) {
    return {
        type: 'FunctionDeclaration',
        defaults: [],
        id: null,
        params: [
            { type: 'Identifier', name: 'mangledModule' },
            { type: 'Identifier', name: 'mangledExports' },
            { type: 'Identifier', name: 'mangledRequire' },
        ],
        body: {
            type: 'BlockStatement',
            body,
        },
    };
}
exports.generateMangledFunction = generateMangledFunction;
function generateRequire(requireContents) {
    return {
        type: 'CallExpression',
        callee: {
            type: 'Identifier',
            name: 'require',
        },
        arguments: [{
                type: 'Literal',
                raw: requireContents.toString(),
                value: requireContents,
            }],
    };
}
exports.generateRequire = generateRequire;
function generateMangledRequire(requireContents) {
    return {
        type: 'CallExpression',
        callee: {
            type: 'Identifier',
            name: 'mangledRequire',
        },
        arguments: [{
                type: 'Literal',
                raw: requireContents.toString(),
                value: requireContents,
            }],
    };
}
exports.generateMangledRequire = generateMangledRequire;
function generateVariableAssignment(variableName, contentIdentifier, assignmentType = "const") {
    return {
        "type": "VariableDeclaration",
        "declarations": [
            {
                "type": "VariableDeclarator",
                "id": {
                    "type": "Identifier",
                    "name": variableName,
                },
                "init": contentIdentifier,
            },
        ],
        "kind": assignmentType,
    };
}
exports.generateVariableAssignment = generateVariableAssignment;
//module.exports = {
//  generateFunction,
//  generateMangledFunction,
//  generateRequire,
//  generateMangledRequire,
//  generateProgram,
//  generateVariableAssignment,
//};
//# sourceMappingURL=testHelpers.js.map