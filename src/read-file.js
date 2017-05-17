/**
 * Created by hsuanlee on 16/05/2017.
 */
import fs from 'mz/fs'
import path from 'path'
import when from 'when'
import nodefn from 'when/node/function'

/**
 * 读取文件内容
 * @param filePath {string}
 * @returns Promise<string>
 */

let list = [];

export default function readFile(filePath) {
    return fs.stat(filePath)
        .then(stat => {
            // 判断是否为目录
            if(stat.isDirectory()){
                walk(filePath)
                    .then(e => {
                        console.log(e.filter( e => /\.md/.test(e)))
                    })

            }else {
                // 如果是文件直接返回文件内容
                return fs.readFile(filePath,'utf-8')
            }
        });
}

function walk (directory, includeDir) {
    let results = [];
    return when.map(nodefn.call(fs.readdir, directory), function(file) {
        file = path.join(directory, file);
        return nodefn.call(fs.stat, file).then(function(stat) {
            if (stat.isFile() ) { return results.push(file); }
            if (includeDir) { results.push(file + path.sep); }
            return walk(file, includeDir).then(function(filesInDir) {
                results = results.concat(filesInDir);
            });
        });
    }).then(function() {
        return results
    });
}