'use strict';

var _readFile = require('./src/read-file');

var _readFile2 = _interopRequireDefault(_readFile);

var _parseWord = require('./src/parse-word');

var _translation = require('./src/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _readFile2.default)('./md', 'utf-8').then(function (res) {

    console.time('parse');
    // let words = parseWord(res);
    var words = (0, _parseWord.wordFrequency)((0, _parseWord.parseWord)(res));
    console.timeEnd('parse');
    console.log(words.length);
    for (var i = 0; i < 50; i++) {
        console.log(words[i]);
    }
    // words.forEach( (e) => {
    //     console.log(e)
    //     getTranslation(e)
    //         .then( obj => {
    //             console.log(obj)
    //         })
    // })
}); /**
     * Created by hsuanlee on 16/05/2017.
     */
//# sourceMappingURL=main.js.map