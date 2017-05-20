/**
 * Created by hsuanlee on 16/05/2017.
 */
import {readFile, writeTemp, writeResult} from './src/file'
import {parseWord, wordFrequency} from './src/parse-word'
import { getTranslation } from './src/translation'
import when from 'when'


readFile('./md', 'utf-8')
    .then(res => {

        // 生成单词数组
        let words = wordFrequency(parseWord(res));

        // 创建缓存文件
        return writeTemp(words)
            .then( () => Promise.resolve(words))
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
    })
    .then(res => {
        let result = res;
        result.splice(980,result.length-980);

        when.map(result, (e,i) => {
            return getTranslation(e.name)
                .then( w => {
                    // console.log(JSON.parse(w))
                    result[i].tr = w;
                });
        })
            .then( () => {
                console.log(result)
                writeResult(result)
            })

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

