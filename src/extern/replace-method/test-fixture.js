"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nested = require('./bogus');
var inline = require('./bogus');
const fs = require("fs");
inline('here is some content');
inline.nested('should not get inlined');
fs.readFileSync(__filename, 'utf8');
fs.createReadStream(__dirname + '/test.js');
nested.two.keys();
nested.three.names();
nested.one();
//# sourceMappingURL=test-fixture.js.map