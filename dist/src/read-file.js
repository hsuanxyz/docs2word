'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = readFile;

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _function = require('when/node/function');

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 读取文件内容
 * @param filePath {string}
 * @returns Promise<string>
 */

/**
 * Created by hsuanlee on 16/05/2017.
 */
var list = [];

function readFile(filePath) {
    return _fs2.default.stat(filePath).then(function (stat) {
        // 判断是否为目录
        if (stat.isDirectory()) {
            walk(filePath).then(function (e) {
                console.log(e.filter(function (e) {
                    return (/\.md/.test(e)
                    );
                }));
            });
        } else {
            // 如果是文件直接返回文件内容
            return _fs2.default.readFile(filePath, 'utf-8');
        }
    });
}

function walk(directory, includeDir) {
    var results = [];
    return _when2.default.map(_function2.default.call(_fs2.default.readdir, directory), function (file) {
        file = _path2.default.join(directory, file);
        return _function2.default.call(_fs2.default.stat, file).then(function (stat) {
            if (stat.isFile()) {
                return results.push(file);
            }
            if (includeDir) {
                results.push(file + _path2.default.sep);
            }
            return walk(file, includeDir).then(function (filesInDir) {
                results = results.concat(filesInDir);
            });
        });
    }).then(function () {
        return results;
    });
}
//# sourceMappingURL=read-file.js.map