/**
 * Created by hsuanlee on 16/05/2017.
 */

/**
 * 将docs解析为单词数组
 * @param docs {string}
 * @returns {Array<string>}
 */
export function parseWord(docs){
    if(!docs) return [];

    docs = cleanStr(docs); // 清除无效字符串

    return docs.split(' ').filter( function(e) {
        return e !== '' && e.length > 1;
    })
}

/**
 * 统计词频，按词频排序
 * @param wordArr
 * @returns {Array.<*>}
 */
export function wordFrequency(wordArr){
    wordArr = wordArr.sort();
    let only = [...new Set(wordArr)];
    let result = [];

    for(let i = 0; i < only.length; i++){

        let wordItem = {name:only[i], value:0};

        for(let y = 0; y <  wordArr.length; y++){
            if(wordItem.name === wordArr[y]){
                wordItem.value++
            }else {
                wordArr.splice(0,y+1);
                break;
            }
        }
        result.push(wordItem);
    }

    return result.sort( (a,b) =>  b.value - a.value)
}

/**
 * 清除无效字符串
 * @param text {string}
 * @returns {string}
 */
function cleanStr(text) {
    text = text.replace(/\[.*\]\(.*\)/g,''); // md链接链接
    text = text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g,''); // 链接
    text = text.replace(/[\n|\r]/g,' '); // 换行
    text = text.replace(/(`)/g,' '); // 代码块
    text = text.replace(/\//g,' '); // /
    text = text.replace(/(,|\.|'|"|\?|!|~|”|“|&|@)/g,' '); // 标点符号
    text = text.replace(/_/g,' '); // 下划线
    text = text.replace(/(<|>)/g,' '); // html
    text = text.replace(/({|}|\(|\)|;)/g,' '); // 代码
    text = text.replace(/[=\[\]#\(\)\*\?\!:\+\-\.]/g,''); // md格式化字符串
    text = text.replace(/[0-9]/g,''); // 数字
    return text.trim();
}

