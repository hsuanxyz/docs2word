const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log(await getInflections(page, 'extract'))

    await browser.close();
})();


const getInflections = async (page, word) => {
    await page.goto(`https://www.91dict.com/words?w=${word}`);
    const inflections = [];
    const inflectionParts = await page.$$(".listBox:nth-child(2) p");
    for (const inflectionPart of inflectionParts) {
        const content = await inflectionPart.evaluate(n => n.textContent);
        const splits = content.split("：");
        if (splits.length === 2) {
            inflections.push({
                type: splits[0],
                word: splits[1],
            })
        }
    }
    return inflections;
}
