const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const changes = []    
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/SmogonMoves.json')))

function getCategory(name) {
    return data.find( m => m.Name === name).Category
}

function getPp(name) {
    return data.find( m => m.Name === name).PP
}

async function getChanges() {
    let moveName = null
    let replaces = null
    let type = null
    let power = null
    let acc = null
    let effect = null

    const reader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname,'../input_data/newMoves.txt')),
        crlfDelay: Infinity
    })

    for await (const line of reader) {
        if(moveName === null) { // new location
            if (line.length == 0) {console.log(`Expected new move`); exit(1) }
            moveName = line.trim()
        } else if (replaces === null) {
            if (line.length == 0) {console.log(`Expected replaces`); exit(1) }
            const replacesRegex = /[rR]eplaces:\s(.*)/
            const match = line.match(replacesRegex)
            replaces = match[1].trim();
        } else if (type === null) {
            if (line.length == 0) {console.log(`Expected type`); exit(1) }
            const typeRegex = /[tT]ype:\s(.*)/
            const match = line.match(typeRegex)
            type = match[1].trim();
        } else if (power === null) {
            if (line.length == 0) {console.log(`Expected power`); exit(1) }
            const powerRegex = /BP:\s(\d*)/
            const match = line.match(powerRegex)
            power = match[1].trim();
        } else if (acc === null) {
            if (line.length == 0) {console.log(`Expected acc`); exit(1) }
            const accRegex = /[aA]ccuracy:\s([\d\%]*)/
            const match = line.match(accRegex)
            acc = match[1].trim();
        } else if (effect === null) {
            if (line.length == 0) {console.log(`Expected effect`); exit(1) }
            const effectRegex = /[eE]ffects?:\s(.*)/
            const match = line.match(effectRegex)
            effect = match[1].trim();
        } else {
            changes.push({
                Name: moveName,
                Type: type,
                Category: 'Unknown',
                Power: power,
                Accuracy: acc,
                PP: 'Unknown',
                Description: effect
            })
            moveName = null
            replaces = null
            type = null
            power = null
            acc = null
            effect = null
        }
    }
}

async function applyChanges() {
    changes.forEach(newMove => {
        data.push(newMove)
    })
    fs.writeFileSync(path.join(__dirname,'../input_data/SmogonMoves.json'),JSON.stringify(data))
}

(async () => { 
    await getChanges();
    await applyChanges();
})()