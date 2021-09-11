const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra');

let browser, page;
const allAbilities = [];
let abilityUrlNames = [];

async function setupBrowser() {
    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
    puppeteer.use(AdblockerPlugin())
    browser = await puppeteer.launch({defaultViewport: {
        width: 4000,
        height: 38000,
    }, headless: true}); // {headless: false}
    page = await browser.newPage();
    
}

async function getAllAbilityNames() {
    await page.goto(`https://www.smogon.com/dex/rs/abilities/`)
    var abilityHandles = await page.$x('/html/body/div[1]/div/main/div/div/div/div[1]/a/span')
    console.log(abilityHandles.length)
    while(abilityHandles.length > 0) {
        let handle = abilityHandles.pop();
        handle = await handle.getProperty('innerText');
        handle = await handle.jsonValue();
        handle = handle.toLowerCase();
        handle = handle.replace(/\s/ig,'-')
        abilityUrlNames.push(handle)
    }
}

async function getAbilityData(abilityUrlName) {
    await page.goto(`https://www.smogon.com/dex/rs/abilities/${abilityUrlName}/`)

    var loaded = await page.$x('/html/body/div[1]/div/main/div/h1');
    if (loaded === null) {
        console.error(`404 for Move ${abilityUrlName}`)
        return
    }
    var name = await page.$x('/html/body/div[1]/div/main/div/h1');
    name = await name.pop();
    name = await name.getProperty('innerText');
    name = await name.jsonValue();

    var description = await page.$x('/html/body/div[1]/div/main/div/p[1]');
    description = await description.pop();
    description = await description.getProperty('innerText');
    description = await description.jsonValue();

    allAbilities.push({
        Name: name,
        Description: description,
    })
}

function teardownBrowser() {
    browser.close();
}

(async () => {
    await setupBrowser()
    await getAllAbilityNames()
    abilityUrlNames = abilityUrlNames.reverse();
    for (const ability of abilityUrlNames) {
        console.log(`working on ${ability}`)
        await getAbilityData(ability)
    }
    console.log(allAbilities.length)
    fs.writeFileSync(path.join(__dirname,'../input_data/SmogonAbilities.json'),JSON.stringify(allAbilities))
    await teardownBrowser()
})();