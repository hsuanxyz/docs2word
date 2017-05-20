'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeTemp;

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeTemp(json) {
  return _fs2.default.writeFile('./.temp_output.json', JSON.stringify(json));
} /**
   * Created by hsuanlee on 19/05/2017.
   */
//# sourceMappingURL=write-file.js.map