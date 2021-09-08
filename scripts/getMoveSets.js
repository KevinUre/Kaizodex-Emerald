const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const data = []


async function process() {
    var tempPokemon = null
    var generation = null

    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/Movepool.txt')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        if(/Generation\s\d/.test(line)) {
            const match = line.match(/Generation\s(\d)/);
            generation = match[1];
        } else if (line.length > 0 ) {
            if (/^\d*?\.\s[\w\.\s\(\)]*?/.test(line)) {
                const match = line.match(/(\d*?)\.\s([\w\.\s\(\)]*)/);
                tempPokemon = {
                    Name: match[2].trim(),
                    Number: match[1],
                    Generation: generation,
                    Moves: []
                }
            } else if (/^Lv\.\s*?\d+[\s\t]*[\w\s\-]*/.test(line)) {
                const match = line.match(/Lv\.\s*?(\d+)[\s\t]*([\w\s\-]*)/)
                tempPokemon.Moves.push({
                    Move: match[2],
                    Level: match[1]
                })
            } else {
                //console.log(`Unknown Line: ${line}`);
                //exit(1);
            }
        } else {
            if (tempPokemon !== null) {
                data.push(tempPokemon)
                tempPokemon = null;
            }
        }
    }
    console.log(data.length)

    fs.writeFileSync(path.join(__dirname,'../input_data/MoveSets.json'),JSON.stringify(data))
}

process()