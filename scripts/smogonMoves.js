const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra');

let browser, page;
const allMoves = [];
let moveUrlNames = [];

async function setupBrowser() {
    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
    puppeteer.use(AdblockerPlugin())
    browser = await puppeteer.launch({defaultViewport: {
        width: 4000,
        height: 38000,
    }, headless: true}); // {headless: false}
    page = await browser.newPage();
    
}

async function getAllMoveNames() {
    await page.goto(`https://www.smogon.com/dex/rs/moves/`)
    var moveHandles = await page.$x('/html/body/div[1]/div/main/div/div/div/div[1]/a')
    console.log(moveHandles.length)
    while(moveHandles.length > 0) {
        let handle = moveHandles.pop();
        handle = await handle.getProperty('innerText');
        handle = await handle.jsonValue();
        handle = handle.toLowerCase();
        handle = handle.replace(/\s/ig,'-')
        moveUrlNames.push(handle)
    }
}

async function getMoveData(moveUrlName) {
    await page.goto(`https://www.smogon.com/dex/rs/moves/${moveUrlName}/`)

    var loaded = await page.$x('/html/body/div[1]/div/main/div/h1');
    if (loaded === null) {
        console.error(`404 for Move ${moveUrlName}`)
        return
    }
    var name = await page.$x('/html/body/div[1]/div/main/div/h1');
    name = await name.pop();
    name = await name.getProperty('innerText');
    name = await name.jsonValue();

    var type = await page.$x('/html/body/div[1]/div/main/div/div[2]/table/tbody/tr[1]/td/a');
    type = await type.pop();
    type = await type.getProperty('innerText');
    type = await type.jsonValue();

    var category = await page.$x('/html/body/div[1]/div/main/div/div[2]/table/tbody/tr[2]/td/span');
    category = await category.pop();
    category = await category.getProperty('innerText');
    category = await category.jsonValue();

    var power = await page.$x('/html/body/div[1]/div/main/div/div[2]/table/tbody/tr[3]/td');
    power = await power.pop();
    power = await power.getProperty('innerText');
    power = await power.jsonValue();
    power = power.replace(/\sBP/ig,'')

    var accuracy = await page.$x('/html/body/div[1]/div/main/div/div[2]/table/tbody/tr[4]/td');
    accuracy = await accuracy.pop();
    accuracy = await accuracy.getProperty('innerText');
    accuracy = await accuracy.jsonValue();

    var pp = await page.$x('/html/body/div[1]/div/main/div/div[2]/table/tbody/tr[6]/td');
    pp = await pp.pop();
    pp = await pp.getProperty('innerText');
    pp = await pp.jsonValue();

    var description = await page.$x('/html/body/div[1]/div/main/div/p[1]');
    description = await description.pop();
    description = await description.getProperty('innerText');
    description = await description.jsonValue();

    allMoves.push({
        Name: name,
        Type: type,
        Category: category,
        Power: power,
        Accuracy: accuracy,
        PP: pp,
        Description: description,
    })
}

function teardownBrowser() {
    browser.close();
}

(async () => {
    await setupBrowser()
    await getAllMoveNames()
    moveUrlNames = moveUrlNames.reverse();
    for (const move of moveUrlNames) {
        console.log(`working on ${move}`)
        await getMoveData(move)
    }
    console.log(allMoves.length)
    fs.writeFileSync(path.join(__dirname,'../input_data/SmogonMoves.json'),JSON.stringify(allMoves))
    await teardownBrowser()
})();