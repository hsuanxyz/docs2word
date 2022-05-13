const puppeteer = require('puppeteer');
const fs = require("fs-extra");
const {resolve} = require("path");

const debug = () => null;

/**
 * 提取词典内容
 * 词典 https://downloads.freemdict.com/Recommend/牛津高阶英汉双解词典（第9版）- 带高清版图片.zip
 * 本地运行 https://github.com/ninja33/mdx-server
 */

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const translations = fs.readJsonSync(resolve(__dirname, "../translations.json"));

    for (let j = 0; j < translations.length; j++) {
        const tran = translations[j];
        if (tran.dict) {
            tran.dict = await getDictInfo(page, tran.query);
            console.log(j, tran.query)
        }
    }
    fs.writeJSONSync(resolve(__dirname, "../translations.json"), translations)

    // await getDictInfo(page, "non")

    await browser.close();

})();

const getDictInfo = async (page, word) => {
    await page.goto(`http://localhost:8000/${word}`);

    const categoryParts = await page.$$(".cixing_part");
    const multiCategory = categoryParts.length > 0;
    const d = await page.$("top-g h");
    if (!d) {
        return null;
    }
    let syllable = (await (d).evaluate(n => n.textContent));
    syllable = syllable.replace(/[0-9]/g,'');
    const simple = syllable.replace(/·/g,'');
    const categories = [];
    debug(`单词: ${simple}`)
    debug(`音节: ${syllable}`)
    debug(` - 词性`)
    if (multiCategory) {
        for (const categoryPart of categoryParts) {
            const pos = await categoryPart.$("subentry-g top-g pos");
            if (pos) {
                const category = await (pos).evaluate(n => n.textContent);
                debug(`     * ${category}`)
                const defs = await extractDef(categoryPart);
                categories.push({
                    category,
                    defs
                })
            }
        }
    } else {
        const pos = await page.$("top-g pos");
        if (pos) {
            const category = await (await page.$("top-g pos")).evaluate(n => n.textContent);
            debug(`     * ${category}`)
            const defs = await extractDef(page);
            categories.push({
                category,
                defs
            })
        }
    }

    return {
        word: simple,
        syllable,
        categories
    }
}

/**
 *
 * @param part ElementHandle
 */
const extractDef = async (part) => {
    const defParts = await part.$$("sn-gs sn-blk")
    const defs = [];
    for (const defPart of defParts) {
        const defEle = await defPart.$("sn-g def");
        const def = defEle ? (await defEle.evaluate(n => n.textContent)) : null;
        let countable;
        let onSubject;
        let pattern;
        let examples = [];
        if (def) {
            debug(`         - 定义：${def}`)
            let countableEle = await defPart.$("sn-g gram-g");
            let subjectEle = await defPart.$("sn-g cf-blk");
            countable = countableEle ? (await countableEle.evaluate(n => n.textContent)) : null;
            onSubject = subjectEle ? (await subjectEle.evaluate(n => n.textContent)) : null;
            debug(`             * 可数性：${countable || "N/A"}`)
            debug(`             * 及物：${onSubject || "N/A"}`)

            const [dim] = await defEle.$x('../../../../top-g/idm-blk/idm');
            if (dim) {
                pattern = await dim.evaluate(n => n.textContent);
                debug(`             * 句式：${pattern || "N/A"}`)
            }
        }
        const sentencesElements = await defPart.$$("sn-g x-gs x-g-blk");
        if (sentencesElements.length) {
            debug(`             * 例句`)
            for (const sentencesElement of sentencesElements) {
                let sentence;
                let cn;
                sentence = sentencesElement ? (await sentencesElement.evaluate(n => n.textContent)) : null;
                if (sentence) {
                    const cnEle = await sentencesElement.$("chn");
                    cn = cnEle ?  (await cnEle.evaluate(n => n.textContent)) : null;
                    sentence = sentence.replace(cn, '');
                }
                sentence = sentence ? sentence.replace(/[◆🔊]/gm, "") : null;
                debug(`                 - ${sentence}`);
                debug(`                     * ${cn}`);
                examples.push({
                    sentence,
                    cn
                })
            }
        }
        defs.push({
            def,
            countable,
            onSubject,
            pattern,
            examples
        })
    }
    return defs;
}
