const commander = require('commander');
const {readFile, writeTemp, writeResult} = require('./src/file');
const {parseWord, wordFrequency} = require('./src/parse-word');
const { getTranslation } = require('./src/translation');
const when = require('when');

commander
    .version('0.0.1')
// .option('-l, --list [list]', 'list')
// .parse(process.argv)
main();

function main() {

    let file = process.argv[2];

    let outputPath = process.argv[3];

    if(!file){
        console.log('请指定背翻译路径');
        return;
    }

    if(!outputPath){
        return console.log('请指定输出路径')
    }

    readFile(file, 'utf-8')
        .then(res => {

            // 生成单词数组
            let words = wordFrequency(parseWord(res));

            // 创建缓存文件
            return writeTemp(words, outputPath)
                .then( () => Promise.resolve(words))
        })
        .then(res => {
            let result = res;
            console.log(result)
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


