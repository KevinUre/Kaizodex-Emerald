const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const changes = []

async function getChanges() {
    let pokemon = null
    let old = null
    let abilities = null

    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/abilityChanges.txt')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        if(pokemon === null) { // new location
            if (line.length == 0) {console.log(`Expected new pokemon`); exit(1) }
            const match = line.match(/([\w\s\/]*?)\:/)
            pokemon = match[1].split('/');
            pokemon.forEach((e,i,a) => {a[i] = e.trim()})
        } else if (old === null) {
            if (line.length == 0) {console.log(`Expected Old`); exit(1) }
            old = line;
        } else if (abilities === null) {
            if (line.length == 0) {console.log(`Expected New`); exit(1) }
            const abilityRegex = /[nN]ew\:\s([\w\s\/]*)/
            const match = line.match(abilityRegex)
            abilities = match[1].split('/');
            abilities.forEach((e,i,a) => {a[i] = e.trim()})
        } else {
            pokemon.forEach(pokemon => {
                changes.push({
                    Pokemon: pokemon,
                    Abilities: abilities
                })
            })
            pokemon = null
            old = null
            abilities = null
        }
    }
}

async function applyChanges() {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/SmogonPokemon.json')))
    data.forEach((element, index, array) => {
        changes.forEach(change => {
            if (element.Name === change.Pokemon) {
                element.Abilities = change.Abilities
            }
        })
        array[index] = element
    })
    fs.writeFileSync(path.join(__dirname,'../input_data/SmogonPokemon.json'),JSON.stringify(data))
}

(async () => { 
    await getChanges();
    await applyChanges();
})()