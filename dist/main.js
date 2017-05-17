'use strict';

var _readFile = require('./src/read-file');

var _readFile2 = _interopRequireDefault(_readFile);

var _parseWord = require('./src/parse-word');

var _parseWord2 = _interopRequireDefault(_parseWord);

var _translation = require('./src/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by hsuanlee on 16/05/2017.
                                                                                                                                                                                                     */


(0, _readFile2.default)('./md', 'utf-8').then(function (res) {
    var words = [].concat(_toConsumableArray(new Set((0, _parseWord2.default)(res))));
    words.forEach(function (e) {
        // getTranslation(e)
        //     .then( obj => {
        //         console.log(obj)
        //     })
    });
});
//# sourceMappingURL=main.js.map