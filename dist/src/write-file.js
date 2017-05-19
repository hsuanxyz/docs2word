'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeFile;

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeFile(json) {
  return _fs2.default.writeFile('./output.json', JSON.stringify(json));
} /**
   * Created by hsuanlee on 19/05/2017.
   */
//# sourceMappingURL=write-file.js.map