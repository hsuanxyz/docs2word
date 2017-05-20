'use strict';

var _file = require('./src/file');

var _parseWord = require('./src/parse-word');

var _translation = require('./src/translation');

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hsuanlee on 16/05/2017.
 */
(0, _file.readFile)('./md', 'utf-8').then(function (res) {

    // 生成单词数组
    var words = (0, _parseWord.wordFrequency)((0, _parseWord.parseWord)(res));

    // 创建缓存文件
    return (0, _file.writeTemp)(words).then(function () {
        return Promise.resolve(words);
    });
    // for(let i = 0; i < 50; i++){
    //     console.log(words[i])
    // }
    // words.forEach( (e) => {
    //     console.log(e)
    //     getTranslation(e)
    //         .then( obj => {
    //             console.log(obj)
    //         })
    // })
}).then(function (res) {
    var result = res;
    result.splice(980, result.length - 980);

    _when2.default.map(result, function (e, i) {
        return (0, _translation.getTranslation)(e.name).then(function (w) {
            // console.log(JSON.parse(w))
            result[i].tr = w;
        });
    }).then(function () {
        console.log(result);
        (0, _file.writeResult)(result);
    });

    // for(let i = 0; i < 10; i++){
    //     getTranslation(result[i].name)
    //         .then( w => {
    //             result[i].tr = w;
    //         })
    // }
    // console.log(result[0])
    // console.log(result[1])
    // console.log(result[2])
});
//# sourceMappingURL=main.js.map