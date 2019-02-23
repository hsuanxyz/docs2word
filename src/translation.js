const request = require('request-promise');

// 有道翻译API
const API = "http://fanyi.youdao.com/openapi.do?keyfrom=docs2word1&key=32551792&type=data&doctype=json&version=1.1&q=";

module.exports = {
    /**
     * 翻译单词
     * @param word
     * @returns {Promise<Object>}
     */
    getTranslation(word) {
        return request.get(`${API}${word}`)
        .then(res => {
            return JSON.parse(res);
        })
    }
};
