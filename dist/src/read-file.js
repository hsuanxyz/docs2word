'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readFile;

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 读取文件内容
 * @param filePath {string}
 * @returns Promise<string>
 */
function readFile(filePath) {
  return _fs2.default.readFile(filePath, 'utf-8');
} /**
   * Created by hsuanlee on 16/05/2017.
   */
//# sourceMappingURL=read-file.js.map