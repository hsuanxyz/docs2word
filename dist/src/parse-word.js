'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseWord;
/**
 * Created by hsuanlee on 16/05/2017.
 */

/**
 * 将docs解析为单词数组
 * @param docs {string}
 * @returns {Array<string>}
 */
function parseWord(docs) {
    if (!docs) return [];

    docs = cleanStr(docs); // 清除无效字符串

    return docs.split(' ').filter(function (e) {
        return e !== '' && e.length > 1;
    });
}

/**
 * 清除无效字符串
 * @param text {string}
 * @returns {string}
 */
function cleanStr(text) {
    text = text.replace(/\[.*\]\(.*\)/g, ''); // md链接链接
    text = text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g, ''); // 链接
    text = text.replace(/[\n|\r]/g, ' '); // 换行
    text = text.replace(/(`)/g, ' '); // 代码块
    text = text.replace(/\//g, ' '); // /
    text = text.replace(/(,|\.|'|"|\?|!|~|”|“|&|@)/g, ' '); // 标点符号
    text = text.replace(/_/g, ' '); // 下划线
    text = text.replace(/(<|>)/g, ' '); // html
    text = text.replace(/({|}|\(|\)|;)/g, ' '); // 代码
    text = text.replace(/[=\[\]#\(\)\*\?\!:\+\-\.]/g, ''); // md格式化字符串
    text = text.replace(/[0-9]/g, ''); // 数字
    return text.trim();
}
//# sourceMappingURL=parse-word.js.map