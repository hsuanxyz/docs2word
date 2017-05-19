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

var exclude = ['the', 'to', 'is', 'and', 'of', 'in', 'for', 'var', 'be', 'you', 'on', 'are', 'can', 'an', 'as', 'or', 'we', 'td', 'if', 'tr', 'by', 'vue', 'react', 'angular', 'it', 'js', 'css', 'html', 'id'];

/**
 * 将docs解析为单词数组
 * @param docs {string}
 * @returns {Array<string>}
 */
function parseWord(docs) {
    if (!docs) return [];

    docs = cleanStr(docs); // 清除无效字符串

    return docs.filter(function (e) {
        return e !== '' && e.length > 2 && exclude.indexOf(e) === -1;
    });
}

/**
 * 统计词频，按词频排序
 * @param wordArr
 * @returns {Array.<*>}
 */
function wordFrequency(wordArr) {
    wordArr = wordArr.sort(); // 先进行排序，方便稍后的算法
    var only = [].concat(_toConsumableArray(new Set(wordArr))); // 去重

    var result = [];

    for (var i = 0; i < only.length; i++) {

        var wordItem = { name: only[i], value: 0 };

        for (var y = 0; y < wordArr.length; y++) {
            if (wordItem.name === wordArr[y]) {
                wordItem.value++;
            } else {
                wordArr.splice(0, y + 1);
                break;
            }
        }

        // 排除出现率小于2的单词
        wordItem.value > 2 && result.push(wordItem);
    }

    // 返回按词频排序的结果
    return result.sort(function (a, b) {
        return b.value - a.value;
    });
}

/**
 * 清除无效字符串
 * @param text {string}
 * @returns {Array<string>}
 */
function cleanStr(text) {

    text = text.replace(/\[.*\]\(.*\)/g, ''); // md链接
    text = text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g, ''); // 链接
    text = text.replace(/[0-9]/g, ''); // 数字
    text = text.replace(/(_|\-)/g, ' '); // 减号和下划线分词
    text = text.replace(/(<.*>)/g, ' '); // html标签
    var wordArr = text.match(/(\w+)/g);
    wordArr = formatHump(wordArr);
    return wordArr;
}

/**
 * 格式化驼峰命名
 * @param wordArr {Array<string>}
 * @returns {Array<string>}
 */
function formatHump(wordArr) {
    var len = wordArr.length;

    // TODO 这块耗时与收益不合理
    for (var i = 0; i < len; i++) {
        var word = wordArr[i].replace(/([A-Z][a-z]*)/g, function (a) {
            return ' ' + a.toLowerCase();
        });
        var words = word.split(' ');
        if (words.length > 1) {
            len = len - words.length + 1;
            wordArr.splice(i, words.length);
            wordArr.push.apply(wordArr, _toConsumableArray(words));
            i--;
        }
    }

    return wordArr;
}
//# sourceMappingURL=parse-word.js.map