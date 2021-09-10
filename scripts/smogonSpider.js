const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer');

let browser, page;

const statData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/Stats.json')))
const allPokemon = statData.map(stats => stats.Pokemon)

async function setupBrowser() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
}

async function nextPokemon(pokemon) {
    // https://www.smogon.com/dex/rs/pokemon/mr-mime/
    // https://www.smogon.com/dex/rs/pokemon/nidoran-m/
    await page.goto(`https://www.smogon.com/dex/rs/pokemon/${pokemon}/`);
    let imageHref = await page.evaluate(() => {
        return 'https://www.smogon.com'+ document.querySelector('#container > div > main > div > section > section:nth-child(2) > div > div.PokemonAltInfo-sprite > img').getAttribute(src)
    })
    var srcFile = await page.goto(imageHref)
    fs.writeFileSync(path.join(__dirname + '../images/' + `${pokemon}.png`), await srcFile.buffer())
}

function teardownBrowser() {
    browser.close();
}

(async () => {
    await setupBrowser()
    for (const pokemon of allPokemon) {
        await nextPokemon(pokemon)
    }
    await teardownBrowser()
})();