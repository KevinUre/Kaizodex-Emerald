const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const changes = []

async function getChanges() {
    let fromPokemon = null
    let toPokemon = null
    let oldWay = null
    let newWay = null
    const pokemonRegex = /(\w*?)\s?\-\>\s?(\w*)\:/

    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/evolutionChanges.txt')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        if(fromPokemon === null) { // new location
            if (line.length == 0) {console.log(`Expected new Location`); exit(1) }
            const match = line.match(pokemonRegex)
            fromPokemon = match[1].trim();
            toPokemon = match[2].trim();
        } else if (oldWay === null) {
            if (line.length == 0) {console.log(`Expected Old`); exit(1) }
            oldWay = line;
        } else if (newWay === null) {
            if (line.length == 0) {console.log(`Expected New`); exit(1) }
            newWay = {
                From: fromPokemon
            }
            const levelRegex = /[nN]ew\:\s?[lL]evel (\d\d)/
            if(line.match(levelRegex)) {
                const match = line.match(levelRegex)
                newWay.Level = match[1]
            }
            const stoneRegex = /[nN]ew\:\s?(\w*?\sStone)/
            if(line.match(stoneRegex)) {
                const match = line.match(stoneRegex)
                newWay.Stone = match[1]
            }
        } else {
            changes.push({
                From: fromPokemon,
                To: toPokemon,
                NewWay: newWay
            })
            fromPokemon = null
            toPokemon = null
            oldWay = null
            newWay = null
        }
    }
}

async function applyChanges() {
    const bulbData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/BulbapediaPokemon.json')))
    bulbData.forEach((bulbElement, bulbIndex, bulbArray) => {
        changes.forEach(change => {
            if (bulbElement.Name === change.To) {
                bulbElement.Evolution = {
                    From: change.From,
                    Evolution: change.NewWay
                }
            }
        })
        bulbArray[bulbIndex] = bulbElement
    })
    fs.writeFileSync(path.join(__dirname,'../input_data/BulbapediaPokemon.json'),JSON.stringify(bulbData))
}

(async () => { 
    await getChanges();
    await applyChanges();
})()