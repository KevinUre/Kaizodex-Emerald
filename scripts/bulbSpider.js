const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra');

let browser, page;
const outPokemon = [];

const statData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/Stats.json')))
const pokemonNames = statData.map(stats => stats.Pokemon)

async function setupBrowser() {
    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
    puppeteer.use(AdblockerPlugin())
    browser = await puppeteer.launch({headless: true}); // {headless: false}
    page = await browser.newPage();
    
}

async function getData() {
    await page.goto(`https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)`)

    while (true){
        var name = await page.$x('/html/body/div[2]/div[1]/div[2]/div[6]/div[4]/div/table[2]/tbody/tr[1]/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/big/big/b')
        name = name.pop()
        name = await name.getProperty('innerText');
        name = await name.jsonValue();
    
        var number = await page.$x('/html/body/div[2]/div[1]/div[2]/div[6]/div[4]/div/table[2]/tbody/tr[1]/td/table/tbody/tr[1]/th/big/big/a/span')
        number = number.pop()
        number = await number.getProperty('innerText');
        number = await number.jsonValue();
        number = number.replace(/\#/ig,'')
    
        var evolveText = await page.$x('/html/body/div[2]/div[1]/div[2]/div[6]/div[4]/div/p[2]')
        evolveText = evolveText.pop()
        evolveText = await evolveText.getProperty('innerText');
        evolveText = await evolveText.jsonValue();
    
        var imageUrl = await page.$x('/html/body/div[2]/div[1]/div[2]/div[6]/div[4]/div/table[2]/tbody/tr[1]/td/table/tbody/tr[2]/td/table/tbody/tr[1]/td/a/img')
        imageUrl = imageUrl.pop()
        imageUrl = await imageUrl.getProperty('src');
        imageUrl = await imageUrl.jsonValue();
    
        //It evolves from Ivysaur starting at level 32
        var evolvesFromLevelRegex = /It evolves from (\w*?) starting at level (\d*)/
        var evolvesFromStoneRegex = /It evolves from (\w*?) when exposed to a ([\w\s]*)\./
        var evolvesFromTradeRegex = /It evolves from (\w*?) when traded/
        var evolvesFromFriendshipRegex = /It evolves from (\w*?) when leveled up with high friendship/
        var evolvesFromBeautyRegex = /It evolves from (\w*?) when leveled up with its Beautiful condition high enough/
        var evolvesFromMiscRegex = /It evolves from (\w*?) when/
    
        var evolution = null;
    
        if(evolveText.match(evolvesFromLevelRegex)) {
            const match = evolveText.match(evolvesFromLevelRegex)
            evolution = {
                From: match[1],
                Level: match[2]
            }
        } else if(evolveText.match(evolvesFromStoneRegex)) {
            const match = evolveText.match(evolvesFromStoneRegex)
            evolution = {
                From: match[1],
                Stone: match[2]
            }
        } else if(evolveText.match(evolvesFromTradeRegex)) {
            const match = evolveText.match(evolvesFromTradeRegex)
            evolution = {
                From: match[1],
                Trade: true
            }
        } else if(evolveText.match(evolvesFromFriendshipRegex)) {
            const match = evolveText.match(evolvesFromFriendshipRegex)
            evolution = {
                From: match[1],
                Friendship: 'High'
            }
        } else if(evolveText.match(evolvesFromBeautyRegex)) {
            const match = evolveText.match(evolvesFromBeautyRegex)
            evolution = {
                From: match[1],
                Beauty: 'High'
            }
        } else if(evolveText.match(evolvesFromMiscRegex)) {
            const match = evolveText.match(evolvesFromMiscRegex)
            evolution = {
                From: match[1],
                UnknownCondition: evolveText
            }
        }

        if(evolution && !pokemonNames.find(a => a === evolution.From)) {
            evolution = null
        }
    
        const tempEntry = {
            Name: name,
            Number: number,
            ImageUrl: imageUrl,
        }
    
        if(evolution) {
            tempEntry.Evolution = evolution
        }
    
        outPokemon.push(tempEntry)
        
        console.log(`got ${name}`)

        if(number !== '386') {
            var nextButton = await page.$x('/html/body/div[2]/div[1]/div[2]/div[6]/div[4]/div/table[1]/tbody/tr[2]/td[3]/table/tbody/tr/td[3]/a')
            nextButton = nextButton.pop()
            await Promise.all([
                nextButton.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]) 
            
        } else {
            break;
        }
    }
}

function teardownBrowser() {
    browser.close();
}

(async () => {
    await setupBrowser()
    await getData()
    console.log(outPokemon.length)
    fs.writeFileSync(path.join(__dirname,'../input_data/BulbapediaPokemon.json'),JSON.stringify(outPokemon))
    await teardownBrowser()
})();