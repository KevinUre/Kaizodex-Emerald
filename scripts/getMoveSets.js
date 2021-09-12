const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { exit } = require('process')

const data = []

function NormalizeName(moveName) {
    moveName = moveName.trim()
    if (moveName === 'Ancientpower') { moveName = 'Ancient Power'}
    else if (moveName === 'Dragonbreath') { moveName = 'Dragon Breath'}
    else if (moveName === 'Bubblebeam') { moveName = 'Bubble Beam'}
    else if (moveName === 'Poisonpowder') { moveName = 'Poison Powder'}
    else if (moveName === 'Sand-Attack') { moveName = 'Sand Attack'}
    else if (moveName === 'Faint Attack') { moveName = 'Feint Attack'}
    else if (moveName === 'Thundershock') { moveName = 'Thunder Shock'}
    else if (moveName === 'Thunderpunch') { moveName = 'Thunder Punch'}
    else if (moveName === 'Will-o-Wisp') { moveName = 'Will-O-Wisp'}
    else if (moveName === 'Extremespeed') { moveName = 'Extreme Speed'}
    else if (moveName === 'Dynamicpunch') { moveName = 'Dynamic Punch'}
    else if (moveName === 'Selfdestruct') { moveName = 'Self-Destruct'}
    else if (moveName === 'Sonicboom') { moveName = 'Sonic Boom'}
    else if (moveName === 'Hi Jump Kick') { moveName = 'High Jump Kick'}
    else if (moveName === 'Doubleslap') { moveName = 'Double Slap'}
    else if (moveName === 'Softboiled') { moveName = 'Soft-Boiled'}
    else if (moveName === 'Grasswhistle') { moveName = 'Grass Whistle'}
    else if (moveName === 'Featherdance') { moveName = 'Feather Dance'}
    else if (moveName === 'Smellingsalt') { moveName = 'Smelling Salts'}
    else if (moveName === 'Solarbeam') { moveName = 'Solar Beam'}
    else if (moveName === 'Flame wheel') { moveName = 'Flame Wheel'}
    return moveName
}


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
                    Move: NormalizeName(match[2]),
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