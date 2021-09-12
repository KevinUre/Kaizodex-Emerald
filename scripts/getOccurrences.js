const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')



const data = []

async function process() {
    var tempLocation = null
    var tempSubLocation = null

    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/Encounters.txt')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        if(tempLocation === null) { // new location
            if (line.length == 0) {console.log(`Expected new Location`); exit(1) }
            tempLocation = {
                Location: line
            }
        }
        else if(line.includes(':')) { // new encounter
            const parts = line.split(':',2)
            const pokemon = parts[1].split(',')
            const encounter = {
                Type: parts[0],
                Pokemon: []
            }
            for (const poke of pokemon) {
                const regexpPokemon = /([\w\.\s\(\)]*?)\s+(\d*?)\%/;
                if(poke.trim().length == 0) {continue; }
                const match = poke.match(regexpPokemon);
                encounter.Pokemon.push({
                    Pokemon: match[1].trim(),
                    Frequency: match[2]
                })
            }
            if (tempSubLocation === null) {
                if (!tempLocation.Encounters) { tempLocation.Encounters = [] } //first encounter
                tempLocation.Encounters.push(encounter)
            } else {
                tempSubLocation.Encounters.push(encounter)
            }
        }
        else if (line.length > 0 ) { // Sub-location
            if (!tempLocation.SubLocations) { tempLocation.SubLocations = [] } //first sub-location
            if(tempSubLocation !== null) { // already working on a sub-loc
                tempLocation.SubLocations.push(tempSubLocation)
                tempSubLocation = null
            }
            tempSubLocation = {
                Name: line,
                Encounters: []
            }
        } else if(line.length == 0) {
            if(tempSubLocation !== null) { // close open sub-location
                tempLocation.SubLocations.push(tempSubLocation)
                tempSubLocation = null
            }
            data.push(tempLocation)
            tempLocation = null
        }
        else { console.log(`Unexpected Line: ${line}`); exit(1) }
    }

    fs.writeFileSync(path.join(__dirname,'../input_data/Occurrences.json'),JSON.stringify(data))
}

process()