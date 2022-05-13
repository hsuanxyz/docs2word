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
 *     }>,
 *     inflections?: Array<{
 *         type: string;
 *         word: string;
 *     }>;
 *     dict?: {
 *         word: string;
 *         syllable: string;
 *         categories: Array<{
 *              category: string;
 *              defs: Array<{
 *                def: string;
 *                countable?: string;
 *                pattern?: string;
 *                onSubject?: string;
 *                examples: Array<{
 *                   sentence: string;
 *                   cn: string;
 *                }>
 *              }>
 *         }>;
 *     }
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
<section class="translation">{{cloze:Translation}}</section>
{{/Translation}}
{{/ContextCloze}}`;

const backTemp = `{{#ContextCloze}}
<section class="word">{{cloze:ContextCloze}} {{Audio}}</section>
{{#Sub}}
<section class="sub">{{Sub}}</section>
{{/Sub}}
<section class="cloze-word">{{type:cloze:ContextCloze}}</section>

<hr/>
<section class="example">{{cloze:Example}}</section>

<hr/>

{{#Translation}}
<section class="translation">{{cloze:Translation}}</section>
{{/Translation}}
{{/ContextCloze}}
`;


const apkg = new APKG({
    name: 'Docs to Words(Dict)',
    card: {
        fields: ['Index','Context','ContextCloze', 'Translation', 'Sub', 'Example', 'Audio'],
        template: {
            question: frontTemp,
            answer: backTemp
        },
        styleText: `

.card {
  text-align: left;
  color: #252528;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: SF Pro SC,SF Pro Text,SF Pro Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;
}

.category > span {
  display: table;
  color: #fff;
  font-weight: 600;
  padding-left: 2px;
  padding-right: 2px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-top: 0;
  border-bottom: 0;
  border-color: #c70000;
  background-color: #c70000;
}

.inflections {
  text-align: left;
  border-top: 1px solid #545454;
  padding-top: 8px;
}

.category .defs {
  border-left: 1px dashed #c70000;
  margin: 4px 8px;
  padding-left: 8px;
  color: #57606a;
}

.category .defs .countable {
  font-weight: 600;
  color: #04b92b;
}

.category .defs .for {
  font-style: italic;
  font-weight: 600;
  color: #2b7dca;
}

.category .defs .def {
  display: inner-block;
  padding-left: 8px;
}

.category .defs .pattern {
  display: block;
  font-style: italic;
}

.category .defs .def-wrap > ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  padding-left: 2em;
  color: rgb(36, 41, 47);
  font-weight: 400;
}

.category .defs .def-wrap .cn {
  display: block;
  color: rgb(87, 96, 106);
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

.sub {
  font-size: 16px;
  text-align: center;
  color: #949494;
}

.sub span {
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
        const inflections = (item.inflections && item.inflections.length > 0) ? [...item.inflections.map(i => i.word), item.query] : [item.query];
        let explains;

        if(item.dict) {
            explains = `
            <ul class="dict">
            <span style="display: none">{{c1::${item.query}}}</span>
                ${item.dict.categories.map(category => {
                    return `
                        <li class="category">
                            <span>${category.category}</span>
                            <ul class="defs">${category.defs.map(def => {
                                return `
                                    <li class="def-wrap">
                                       <span class="countable">${def.countable || ""}</span><span class="for">${def.onSubject || ""}</span>
                                       <span class="pattern">${def.pattern || ""}</span>
                                       <span class="def">${def.def}</span>
                                       <ul>
                                        ${def.examples.map(example => {
                                            return `
                                                <li class="example-wrap">
                                                    <span class="example">${example.sentence.replace(new RegExp(`\\b(${inflections.join("|")})\\b`, 'ig'), `<i class="red">{{c1::$1}}</i>`)}</span>
                                                    <span class="cn">${example.cn}</span>
                                                </li>
                                            `
                                        }).join("")}
                                       </ul>
                                    </li>
                                `
                             }).join("")}
                            </ul>
                        </li>
                    `
                }).join("")}
            </ul>
            `
        } else {
            explains = item.basic.explains ? `<ul>${item.basic.explains.map(e => `<li>${e}</li>`).join("")}</ul>` : '';
        }


        const example = item.web && item.web.length ? `<section><ul>${
            item.web.map(e => {
                return `<li><span class="value">${e.value.join(", ")}</span><span class="keys">${e.key.replace(new RegExp(`\\b(${inflections.join("|")})\\b`, 'ig'), `<i class="red">{{c1::$1}}</i>`)}</span></li>`
            }).join("")
        }</ul></section>` : '';

        let sub = `<span>${item.basic.phonetic}</span> <span>UK ${item.basic["uk-phonetic"]}</span> <span>US ${item.basic["us-phonetic"]}</span>`
        if (item.dict && item.dict.syllable) {
            sub += `<span class="syllable">[${item.dict.syllable}]</span>`
        }
        if (item.inflections && item.inflections.length) {
            sub += `<ul class="inflections">${item.inflections.map(e => `<li>${e.type}: ${e.word}</li>`).join("")}</ul>`
        }
        apkg.addCard({
            timestamp: +new Date(), // create time
            content: [i, item.query, frontWord, explains, sub, example, ""] // keep the order same as `fields` defined above
        })
    }

}


apkg.save(__dirname)
