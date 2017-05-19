/**
 * Created by hsuanlee on 16/05/2017.
 */


const exclude = ['the','to','is','and','of','in','for','var','be','you','on','are','can','an','as','or','we','td',
    'if', 'tr','by','vue','react','angular','it','js','css','html','id'];

/**
 * 将docs解析为单词数组
 * @param docs {string}
 * @returns {Array<string>}
 */
export function parseWord(docs){
    if(!docs) return [];

    docs = cleanStr(docs); // 清除无效字符串

    return docs.filter( function(e) {
        return e !== '' && e.length > 2 && exclude.indexOf(e) === -1;
    })
}

/**
 * 统计词频，按词频排序
 * @param wordArr
 * @returns {Array.<*>}
 */
export function wordFrequency(wordArr){
    wordArr = wordArr.sort(); // 先进行排序，方便稍后的算法
    let only = [...new Set(wordArr)]; // 去重

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

        // 排除出现率小于2的单词
        wordItem.value > 2 && result.push(wordItem);
    }

    // 返回按词频排序的结果
    return result.sort( (a,b) =>  b.value - a.value)
}

/**
 * 清除无效字符串
 * @param text {string}
 * @returns {Array<string>}
 */
function cleanStr(text) {

    text = text.replace(/\[.*\]\(.*\)/g,''); // md链接
    text = text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g,''); // 链接
    text = text.replace(/[0-9]/g,''); // 数字
    text = text.replace(/(_|\-)/g,' '); // 减号和下划线分词
    text = text.replace(/(<.*>)/g,' '); // html标签
    let wordArr = text.match(/(\w+)/g);
    wordArr = formatHump(wordArr);
    return wordArr;
}

/**
 * 格式化驼峰命名
 * @param wordArr {Array<string>}
 * @returns {Array<string>}
 */
function formatHump(wordArr) {
    let len = wordArr.length;

    // TODO 这块耗时与收益不合理
    for(let i = 0; i < len; i++){
        let word = wordArr[i].replace(/([A-Z][a-z]*)/g, a => ` ${a.toLowerCase()}`);
        let words = word.split(' ');
        if(words.length > 1 ) {
            len = len-words.length+1;
            wordArr.splice(i,words.length);
            wordArr.push(...words);
            i--
        }
    }

    return wordArr;
}

