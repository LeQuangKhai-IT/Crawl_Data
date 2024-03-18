import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const pageHTML = await axios.get("https://vnexpress.net/goc-nhin/giao-duc-tri-thuc");

async function getHTML() {
    const { data: html } = pageHTML;
    return html;
}
getHTML().then((res) => {
    const listArticle = [];
    const $ = cheerio.load(res);
    $('article').each(function () {
        const title = $(this).find('.title-news').text();
        const content = $(this).find('.description a').text().toString().replaceAll('\n', '');
        const author = $(this).find('a.cat.name-author').text();
        listArticle.push({ title, content, author })
    });

    fs.writeFile('articleData.json', JSON.stringify(listArticle), (err) => {
        if (err) throw err;
        console.log("Write file success!")
    })
})