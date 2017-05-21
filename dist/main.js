'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _file = require('./src/file');

var _parseWord = require('./src/parse-word');

var _translation = require('./src/translation');

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1');
// .option('-l, --list [list]', 'list')
// .parse(process.argv)

/**
 * Created by hsuanlee on 16/05/2017.
 */
if (process.argv[2]) {
    var file = process.argv[2];

    (0, _file.readFile)(file, 'utf-8').then(function (res) {

        // 生成单词数组
        var words = (0, _parseWord.wordFrequency)((0, _parseWord.parseWord)(res));

        // 创建缓存文件
        return (0, _file.writeTemp)(words).then(function () {
            return Promise.resolve(words);
        });
    }).then(function (res) {
        var result = res;
        console.log(result);
        // result.splice(980,result.length-980);
        //
        // when.map(result, (e,i) => {
        //     return getTranslation(e.name)
        //         .then( w => {
        //             // console.log(JSON.parse(w))
        //             result[i].tr = w;
        //         });
        // })
        //     .then( () => {
        //         console.log(result)
        //         writeResult(result)
        //     })
    });
}
//# sourceMappingURL=main.js.map