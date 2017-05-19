/**
 * Created by hsuanlee on 16/05/2017.
 */
import fs from 'mz/fs'
import path from 'path'
import when from 'when'
import nodefn from 'when/node/function'

const fileType = /\.md/;

/**
 * 读取文件内容
 * @param filePath {string}
 * @returns Promise<string>
 */
export default function readFile(filePath) {
    return fs.stat(filePath)
        .then(stat => {
            // 判断是否为目录
            if(stat.isDirectory()){
                // 如果是目录，返回所有制定文件内容
              return walk(filePath)
                    .then(e => {
                        let fileList =e.filter( e => fileType.test(e));
                       return readFileList(fileList)
                    })

            }else {
                // 如果是文件直接返回文件内容
                return fs.readFile(filePath,'utf-8')
            }
        });
}

/**
 * 获取文件列表内所有文件内容
 * @param list
 * @returns {Promise|Promise<string>}
 */
function readFileList(list) {
    let content = '';
    return when.map(list, file => {
        return fs.readFile(file,'utf-8')
            .then( c => {
                content += c;
            })
    }).then(() => content)
}

/**
 * 递归查找目录文件
 * @param directory
 * @param includeDir
 * @returns {Promise|Promise<Array<string> >}
 */
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

