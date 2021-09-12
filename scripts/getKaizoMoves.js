const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const allMoves = []

async function process() {
    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/EmeraldKaizoMoves.csv')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        const cells = line.split(',');
        if(/\d+/.test(cells[1])) { // if not a header
            allMoves.push({
                Name: cells[0],
                Type: cells[2],
                Category: cells[9],
                Power: cells[1],
                Accuracy: cells[4],
                PP: cells[3],
                Description: cells[8],
                Targets: cells[7],
            })
        }
    }
    console.log(allMoves.length)

    fs.writeFileSync(path.join(__dirname,'../input_data/KaizoMoves.json'),JSON.stringify(allMoves))
}

process()