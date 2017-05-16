/**
 * Created by hsuanlee on 16/05/2017.
 */
import fs from 'mz/fs'

/**
 * 读取文件内容
 * @param filePath {string}
 * @returns Promise<string>
 */
export default function readFile(filePath) {
    return fs.readFile(filePath,'utf-8')
}