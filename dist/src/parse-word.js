'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseWord = parseWord;
exports.wordFrequency = wordFrequency;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function wordFrequency(wordArr) {
    var only = [].concat(_toConsumableArray(new Set(wordArr)));
    var result = [];

    for (var i = 0; i < only.length; i++) {

        var wordItem = { name: only[i], value: 0 };

        for (var y = 0; y < wordArr.length; y++) {
            if (wordItem.name === wordArr[y]) {
                wordItem.value++;
            }
        }

        result.push(wordItem);
    }

    return result;
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