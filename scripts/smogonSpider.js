const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra');

let browser, page;

const statData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/Stats.json')))
const allPokemon = statData.map(stats => stats.Pokemon)
const outPokemon = [];

async function setupBrowser() {
    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
    puppeteer.use(AdblockerPlugin())
    browser = await puppeteer.launch({headless: false}); // {headless: false}
    page = await browser.newPage();
    
}

function getPokemonName(pokemon) {
    let safeName = pokemon.toLowerCase();
    safeName = safeName.replace(/\s\(n\)/ig,'') // Deoxys hack
    safeName = safeName.replace(/[\(\)\.]/ig,'') // nidoran m/f and mime
    safeName = safeName.replace(/\s/ig,'-') // nidoran m/f and mime
    safeName = safeName.replace(/♀/ig,'f') // nidoran f
    safeName = safeName.replace(/♂/ig,'m') // nidoran m
    return safeName
}

async function nextPokemon(pokemon) {
    const smogonPokemon = {
        Name: pokemon,
        Types:[],
        Abilities: [],
    }
    // https://www.smogon.com/dex/rs/pokemon/mr-mime/
    // https://www.smogon.com/dex/rs/pokemon/nidoran-m/
    await page.goto(`https://www.smogon.com/dex/rs/pokemon/${getPokemonName(pokemon)}/`)

    var loaded = await page.$x('/html/body/div[1]/div/main/div/h1');
    if (loaded === null) {
        console.error(`404 for Pokemon ${pokemon}`)
        return
    }
    var abilityHandles = await page.$x('/html/body/div[1]/div/main/div/section/section[1]/div/div[2]/table/tbody/tr[2]/td/ul/li/a/span')
    if(abilityHandles !== null) {
        while (abilityHandles.length > 0) {
            let handle = abilityHandles.pop();
            handle = await handle.getProperty('innerText');
            handle = await handle.jsonValue();
            smogonPokemon.Abilities.push(handle);
        }
    } else {
        console.error(`No Abilities for ${pokemon}`)
        return
    }

    var typeHandles = await page.$x('/html/body/div[1]/div/main/div/section/section[1]/div/div[2]/table/tbody/tr[1]/td/div[1]/ul/li/a')
    if(typeHandles !== null) {
        while (typeHandles.length > 0) {
            let handle = typeHandles.pop();
            handle = await handle.getProperty('innerText');
            handle = await handle.jsonValue();
            smogonPokemon.Types.push(handle);
        }
    } else {
        console.error(`No Types for ${pokemon}`)
        return
    }
    outPokemon.push(smogonPokemon);
}

function teardownBrowser() {
    browser.close();
}

(async () => {
    await setupBrowser()
    for (const pokemon of allPokemon) {
        console.log(`working on ${pokemon}`)
        await nextPokemon(pokemon)
    }
    console.log(outPokemon.length)
    fs.writeFileSync(path.join(__dirname,'../input_data/SmogonPokemon.json'),JSON.stringify(outPokemon))
    await teardownBrowser()
})();