"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslation = getTranslation;

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 有道翻译API
var API = "http://fanyi.youdao.com/openapi.do?keyfrom=docs2word&key=832334049&type=data&doctype=json&version=1.1&q=";

/**
 * 翻译单词
 * @param word
 * @returns {Promise<Object>}
 */
/**
 * Created by hsuanlee on 16/05/2017.
 */
function getTranslation(word) {
  return _requestPromise2.default.get("" + API + word).then(function (res) {
    return JSON.parse(res);
  });
}
//# sourceMappingURL=translation.js.map