const fs = require('fs')
const path = require('path')
const { exit } = require('process')

const bulbapediaData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/BulbapediaPokemon.json')))
const moveSetData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/MoveSets.json')))
let occurrenceString = fs.readFileSync(path.join(__dirname,'../input_data/Occurrences.json')).toString()
occurrenceString = occurrenceString.replace(/NidoranM/ig, 'Nidoran ♂')
occurrenceString = occurrenceString.replace(/NidoranF/ig, 'Nidoran ♀')
const occurrenceData = JSON.parse(occurrenceString)
const smogonAbilityData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/SmogonAbilities.json')))
const smogonMoveData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/SmogonMoves.json')))
const smogonPokemonData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/SmogonPokemon.json')))
const statData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/Stats.json')))
const kaizoMoveData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/KaizoMoves.json')))

let allPokemon = []
let allRoutes = []
let allAbilities = []
let allMoves = []

bulbapediaData.forEach((element, index, array) => {
    element.Name = element.Name.replace(/♀/g,' ♀')
    element.Name = element.Name.replace(/♂/g,' ♂')
    element.Number = element.Number.replace(/^0+/,'');
    if(element.Name === 'Nidorina' && !element.Evolution) {
        element.Evolution = {
            From: 'Nidoran ♀',
            Level: 16
        }
    }
    if(element.Name === 'Nidorino' && !element.Evolution) {
        element.Evolution = {
            From: 'Nidoran ♂',
            Level: 16
        }
    }
    array[index] = element
});

moveSetData.forEach((element, index, array) => {
    element.Name = element.Name.replace(/\(f\)/g,' ♀')
    element.Name = element.Name.replace(/\(m\)/g,' ♂')
    if (element.Name === 'Farfetch') {element.Name = "Farfetch'd" }
    if (element.Name === 'Ho') {element.Name = 'Ho-Oh' }
    array[index] = element
})

statData.forEach((element, index, array) => {
    if (element.Pokemon === 'Ho-oh') {element.Pokemon = 'Ho-Oh' }
    array[index] = element
})

smogonPokemonData.forEach((element, index, array) => {
    if (element.Name === 'Ho-oh') {element.Name = 'Ho-Oh' }
    array[index] = element
})

occurrenceData.forEach((element, index, array) => {
    element.Location = element.Location.replace(/^[^A-z\s\d]/g,'')
    array[index] = element
})

statData.forEach(statElement =>  {
    const tempPokemon = {}
    tempPokemon.Name = statElement.Pokemon
    tempPokemon.Number = statElement.Number
    tempPokemon.Stats = {
        HP: statElement.HP,
        Attack: statElement.Attack,
        Defense: statElement.Defense,
        SpecialAttack: statElement.SpecialAttack,
        SpecialDefense: statElement.SpecialDefense,
        Speed: statElement.Speed,
    }

    const smogonPokemon = smogonPokemonData.find(sp => sp.Name === tempPokemon.Name)
    if (!smogonPokemon) { console.log(`pokemon ${tempPokemon.Name} not found in smogonPokemon`); exit(1); }
    tempPokemon.Types = smogonPokemon.Types;
    tempPokemon.Abilities = smogonPokemon.Abilities;

    const moveSetPokemon = moveSetData.find(msp => msp.Name === tempPokemon.Name)
    if (!moveSetPokemon) { console.log(`pokemon ${tempPokemon.Name} not found in moveSets`); exit(1); }
    tempPokemon.Moves = moveSetPokemon.Moves

    const bulbPokemon = bulbapediaData.find(bp => bp.Name === tempPokemon.Name)
    if (!bulbPokemon) { console.log(`pokemon ${tempPokemon.Name} not found in bulbapedia`); exit(1); }
    if (bulbPokemon.Evolution) {
        tempPokemon.EvolvesFrom = bulbPokemon.Evolution
    }
    bulbapediaData.forEach(bulbElement => {
        if (bulbElement.Evolution && bulbElement.Evolution.From === tempPokemon.Name) {
            if(!tempPokemon.EvolvesInto) { tempPokemon.EvolvesInto = [] }
            const tempEvo = { Into: bulbElement.Name }
            if(bulbElement.Evolution.Level) { tempEvo.Level = bulbElement.Evolution.Level }
            if(bulbElement.Evolution.Stone) { tempEvo.Stone = bulbElement.Evolution.Stone }
            if(bulbElement.Evolution.Trade) { tempEvo.Trade = bulbElement.Evolution.Trade }
            if(bulbElement.Evolution.UnknownCondition) { tempEvo.UnknownCondition = bulbElement.Evolution.UnknownCondition }
            tempPokemon.EvolvesInto.push(tempEvo)
        }
    });

    tempPokemon.FoundAt = []
    occurrenceData.forEach(location => {
        if(location.Encounters) {
            location.Encounters.forEach(encounter => {
                encounter.Pokemon.forEach(pokemon => {
                    if (pokemon.Pokemon === tempPokemon.Name) {
                        tempPokemon.FoundAt.push({
                            Location: location.Location,
                            Type: encounter.Type,
                            Frequency: `${pokemon.Frequency}%`
                        })
                    }
                })
            })
        }
        if(location.SubLocations) {
            location.SubLocations.forEach(subloc => {
                subloc.Encounters.forEach(encounter => {
                    encounter.Pokemon.forEach(pokemon => {
                        if (pokemon.Pokemon === tempPokemon.Name) {
                            tempPokemon.FoundAt.push({
                                Location: `${location.Location} - ${subloc.Name}`,
                                Type: encounter.Type,
                                Frequency: `${pokemon.Frequency}%`
                            })
                        }
                    })
                })
            })
        }
    })

    allPokemon.push(tempPokemon)
})

occurrenceData.forEach((element) => {
    allRoutes.push(element);
})

smogonAbilityData.forEach((element) => {
    allAbilities.push(element);
})

kaizoMoveData.forEach((element) => {
    const smogonMove = smogonMoveData.find(m => m.Name === element.Name)
    if(!smogonMove) {
        console.log(`[WARN] Move ${element.Name} not found in Smogon move dump`)
    } else {
        if (element.Description === '') {
            element.Description = smogonMove.Description
        }
    }
    allMoves.push(element);
})

allPokemon.forEach((pokemon) => {
    pokemon.Abilities.forEach((pokemonAbility) => {
        const abilityHandle = allAbilities.find(a => a.Name === pokemonAbility)
        if(!abilityHandle) { console.log(`[ERROR] ${pokemon.Name} has ability ${pokemonAbility} not found in abilities DB`) }
    })
    pokemon.Moves.forEach((pokemonMove) => {
        const moveHandle = allMoves.find(m => m.Name === pokemonMove.Move)
        if(!moveHandle) { console.log(`[ERROR] ${pokemon.Name} has move ${pokemonMove.Move} not found in moves DB`) }
    })
    if(pokemon.EvolvesFrom) {
        const evolutionHandle = allPokemon.find(p => p.Name === pokemon.EvolvesFrom.From)
        if(!evolutionHandle) { console.log(`[ERROR] ${pokemon.Name} has evolution from ${pokemon.EvolvesFrom.From} not found in pokemon DB`) }
    }
    if(pokemon.EvolvesInto) {
        pokemon.EvolvesInto.forEach((evolution) => {
            const evolutionHandle = allPokemon.find(p => p.Name === evolution.Into)
            if(!evolutionHandle) { console.log(`[ERROR] ${pokemon.Name} has evolution to ${evolution.Into} not found in pokemon DB`) }
        })
    }
})

allRoutes.forEach((location) => {
    if(location.Encounters) {
        location.Encounters.forEach((encounterType) => {
            encounterType.Pokemon.forEach((pokemonEncounter) => {
                const pokemonHandle = allPokemon.find(p => p.Name === pokemonEncounter.Pokemon)
                if(!pokemonHandle) { console.log(`[ERROR] ${location.Location} has Pokemon ${pokemonEncounter.Pokemon} not found in pokemon DB`) }
            })
        })
    }
    if(location.SubLocations) {
        location.SubLocations.forEach((subLocation) => {
            subLocation.Encounters.forEach((encounterType) => {
                encounterType.Pokemon.forEach((pokemonEncounter) => {
                    const pokemonHandle = allPokemon.find(p => p.Name === pokemonEncounter.Pokemon)
                    if(!pokemonHandle) { console.log(`[ERROR] "${location.Location} - ${subLocation.Name}" has Pokemon ${pokemonEncounter.Pokemon} not found in pokemon DB`) }
                })
            })
        })
    }
})

fs.writeFileSync(path.join(__dirname,'../data/Pokemon.json'),JSON.stringify(allPokemon,null,'\t'))
fs.writeFileSync(path.join(__dirname,'../data/Locations.json'),JSON.stringify(allRoutes,null,'\t'))
fs.writeFileSync(path.join(__dirname,'../data/Moves.json'),JSON.stringify(allMoves,null,'\t'))
fs.writeFileSync(path.join(__dirname,'../data/Abilities.json'),JSON.stringify(allAbilities,null,'\t'))
