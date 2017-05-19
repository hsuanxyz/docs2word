/**
 * Created by hsuanlee on 16/05/2017.
 */
import readFile from './src/read-file'
import {parseWord, wordFrequency} from './src/parse-word'
import { getTranslation } from './src/translation'

readFile('./md/ng.md', 'utf-8')
    .then(res => {


        let words = wordFrequency(parseWord(res));
        console.log(words.length);
        words.forEach( (e) => {
            console.log(e)
        //     getTranslation(e)
        //         .then( obj => {
        //             console.log(obj)
        //         })
        })
    });

