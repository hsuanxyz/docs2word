/**
 * Created by hsuanlee on 16/05/2017.
 */
import readFile from './src/read-file'
import {parseWord, wordFrequency} from './src/parse-word'
import { getTranslation } from './src/translation'

readFile('./md', 'utf-8')
    .then(res => {


        console.time('parse');
        // let words = parseWord(res);
        let words = wordFrequency(parseWord(res));
        console.timeEnd('parse');
        console.log(words.length);
        for(let i = 0; i < 50; i++){
            console.log(words[i])
        }
        // words.forEach( (e) => {
        //     console.log(e)
        //     getTranslation(e)
        //         .then( obj => {
        //             console.log(obj)
        //         })
        // })
    });

