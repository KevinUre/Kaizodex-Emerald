const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const data = []

async function process() {
    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/Stats.csv')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        const cells = line.split(',');
        if(/\d+/.test(cells[1])) { // if not a header
            data.push({
                Pokemon: cells[2],
                Number: cells[1],
                HP: cells[10],
                Attack: cells[11],
                Defense: cells[12],
                SpecialAttack: cells[13],
                SpecialDefense: cells[14],
                Speed: cells[15],
            })
        }
    }
    console.log(data.length)

    fs.writeFileSync(path.join(__dirname,'../input_data/Stats.json'),JSON.stringify(data))
}

process()