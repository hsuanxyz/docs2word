/**
 * Created by hsuanlee on 16/05/2017.
 */
import readFile from './src/read-file'
import parseWord from './src/parse-word'
import { getTranslation } from './src/translation'

readFile('./md/ng.md', 'utf-8')
    .then(res => {
        let words =[...new Set(parseWord(res))];
        words.forEach( (e) => {
            getTranslation(e)
                .then( obj => {
                    console.log(obj)
                })
        })
    });
