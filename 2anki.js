const fs = require("fs-extra");
const { resolve } = require("path");

/**
 * better-sqlite3 装不上，现直接用源码
 */
const { APKG } = require('../anki-apkg');


/**
 * @return {Array<{
 *     query: string;
 *     translation: string[];
 *     basic: {
 *         "us-phonetic": string;
 *         "uk-phonetic": string;
 *         "phonetic": string;
 *         explains: string[];
 *     },
 *     web: Array<{
 *         value: string[];
 *         key: string;
 *     }>
 * }>}
 */
const readTranslations = () => {
    try {
        const translations = fs.readJsonSync(resolve(__dirname, "translations.json"));
        if (Array.isArray(translations)) {
            return translations
        }
    } catch (e) {
        console.warn(e);
        return []
    }
}

const frontTemp = `{{#ContextCloze}}
<section class="word">{{cloze:ContextCloze}}</section>
<section class="cloze-word">{{type:cloze:ContextCloze}}</section>
<hr/>
<section class="example">{{cloze:Example}}</section>
<hr/>
{{#Translation}}
<section class="translation">{{Translation}}</section>
{{/Translation}}
{{/ContextCloze}}`;

const backTemp = `{{#ContextCloze}}
<section class="word">{{cloze:ContextCloze}} {{Audio}}</section>
{{#Phonetic}}
<section class="phonetic">{{Phonetic}}</section>
{{/Phonetic}}
<section class="cloze-word">{{type:cloze:ContextCloze}}</section>

<hr/>
<section class="example">{{cloze:Example}}</section>

<hr/>

{{#Translation}}
<section class="translation">{{Translation}}</section>
{{/Translation}}
{{/ContextCloze}}
`;


const apkg = new APKG({
    name: 'Docs to Words',
    card: {
        fields: ['Index','Context','ContextCloze', 'Translation', 'Phonetic', 'Example', 'Audio'],
        template: {
            question: frontTemp,
            answer: backTemp
        },
        styleText: `
.card {
  color: #252528;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: SF Pro SC,SF Pro Text,SF Pro Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;
}

i {
  font-style: normal;
}
i.red {
  color: coral;
}

ul {
  padding: 0;
  list-style: none;
}

.section {
  display: flex;
}

.word {
  text-align: center;
  font-size: 32px
}

.phonetic {
  font-size: 16px;
  text-align: center;
  color: #949494;
}

.phonetic span {
  margin: 0 4px;
}

.example ul li {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
}

.example ul li .value {
  font-size: 12px;
  color: #949494;
  font-style: oblique;
  font-weight: 400;
}

.replay-button {
  height: 28px;
}

.replay-button svg.playImage{
    width: 20px;
    height: 20px;
}
`
    }
})

const trans = readTranslations();

for (let i = 0; i < trans.length; i++) {
    const item = trans[i];

    if (item.basic && item.translation) {
        const frontWord = `<strong>${item.translation.join(", ")} <i class="red">{{c1::${item.query}}}</i>`;

        const explains = item.basic.explains ? `<ul>${item.basic.explains.map(e => `<li>${e}</li>`).join("")}</ul>` : '';

        const example = item.web && item.web.length ? `<section><ul>${
            item.web.map(e => {
                return `<li><span class="value">${e.value.join(", ")}</span><span class="keys">${e.key.replace(new RegExp(`\\b(${item.query})\\b`, 'ig'), `<i class="red">{{c1::$1}}</i>`)}</span></li>`
            }).join("")
        }</ul></section>` : '';

        const phonetic = `<span>${item.basic.phonetic}</span> <span>UK ${item.basic["uk-phonetic"]}</span> <span>US ${item.basic["us-phonetic"]}</span>`


        apkg.addCard({
            timestamp: +new Date(), // create time
            content: [i, item.query, frontWord, explains, phonetic, example, ""] // keep the order same as `fields` defined above
        })
    }

}


apkg.save(__dirname)
