/**
 * Created by hsuanlee on 19/05/2017.
 */
import fs from 'mz/fs'

export default function writeFile(json) {
    return fs.writeFile('./output.json',JSON.stringify(json));
}