/**
 * Created by hsuanlee on 16/05/2017.
 */
import request from 'request-promise'

// 有道翻译API
const API = "http://fanyi.youdao.com/openapi.do?keyfrom=node-fanyi&key=xxx&type=data&doctype=json&version=1.1&q=";

/**
 * 翻译单词
 * @param word
 * @returns {Promise<Object>}
 */
export function getTranslation(word) {
    return request.get(`${API}${word}`)
        .then(res => {
            return JSON.parse(res);
        })
}