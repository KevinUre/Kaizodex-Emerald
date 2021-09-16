const fs = require('fs')
const path = require('path')

const types = ['normal', 'fire', 'water', 'electric', 'grass',
  'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel'];
const typeData = [];

function getTypeEffect(attackerType, defenderType) {
  switch (attackerType) {
    case 'normal':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'ice':
        case 'fighting':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'psychic':
        case 'bug':
        case 'dragon':
        case 'dark':
          return 1
        case 'rock':
        case 'steel':
          return 0.5
        case 'ghost':
          return 0
      } break;
    case 'fire':
      switch (defenderType) {
        case 'normal':
        case 'electric':
        case 'fighting':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'psychic':
        case 'ghost':
        case 'dark':
          return 1
        case 'fire':
        case 'water':
        case 'rock':
        case 'dragon':
          return 0.5
        case 'grass':
        case 'ice':
        case 'bug':
        case 'steel':
          return 2
      } break;
    case 'water':
      switch (defenderType) {
        case 'normal':
        case 'electric':
        case 'ice':
        case 'fighting':
        case 'poison':
        case 'flying':
        case 'psychic':
        case 'bug':
        case 'ghost':
        case 'dragon':
        case 'dark':
        case 'steel':
          return 1
        case 'fire':
        case 'ground':
        case 'rock':
          return 2
        case 'water':
        case 'grass':
        case 'dragon':
          return 0.5
      } break;
    case 'electric':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'ice':
        case 'fighting':
        case 'poison':
        case 'psychic':
        case 'bug':
        case 'rock':
        case 'ghost':
        case 'dark':
        case 'steel':
          return 1
        case 'water':
        case 'flying':
          return 2
        case 'electric':
        case 'grass':
        case 'dragon':
          return 0.5
        case 'ground':
          return 0
      } break;
    case 'grass':
      switch (defenderType) {
        case 'normal':
        case 'electric':
        case 'ice':
        case 'fighting':
        case 'psychic':
        case 'ghost':
        case 'dark':
          return 1
        case 'fire':
        case 'grass':
        case 'poison':
        case 'flying':
        case 'bug':
        case 'dragon':
        case 'steel':
          return 0.5
        case 'water':
        case 'ground':
        case 'rock':
          return 2
      } break;
    case 'ice':
      switch (defenderType) {
        case 'normal':
        case 'electric':
        case 'fighting':
        case 'poison':
        case 'psychic':
        case 'bug':
        case 'rock':
        case 'ghost':
        case 'dark':
          return 1
        case 'fire':
        case 'water':
        case 'ice':
        case 'steel':
          return 0.5
        case 'grass':
        case 'ground':
        case 'flying':
        case 'dragon':
          return 2
      } break;
    case 'fighting':
      switch (defenderType) {
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'fighting':
        case 'ground':
        case 'dragon':
          return 1
        case 'normal':
        case 'ice':
        case 'rock':
        case 'dark':
        case 'steel':
          return 2
        case 'poison':
        case 'flying':
        case 'psychic':
        case 'bug':
          return 0.5
        case 'ghost':
          return 0
      } break;
    case 'poison':
        switch (defenderType) {
          case 'normal':
          case 'fire':
          case 'water':
          case 'electric':
          case 'ice':
          case 'fighting':
          case 'flying':
          case 'psychic':
          case 'bug':
          case 'dragon':
          case 'dark':
            return 1
          case 'grass':
            return 2
          case 'poison':
          case 'ground':
          case 'rock':
          case 'ghost':
            return 0.5
          case 'steel':
            return 0
        } break;
    case 'ground':
      switch (defenderType) {
        case 'normal':
        case 'water':
        case 'ice':
        case 'fighting':
        case 'ground':
        case 'psychic':
        case 'ghost':
        case 'dragon':
        case 'dark':
          return 1
        case 'fire':
        case 'electric':
        case 'poison':
        case 'rock':
        case 'steel':
          return 2
        case 'grass':
        case 'bug':
          return 0.5
        case 'flying':
          return 0
      } break;
    case 'flying':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'water':
        case 'ice':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'psychic':
        case 'ghost':
        case 'dragon':
        case 'dark':
          return 1
        case 'electric':
        case 'rock':
        case 'steel':
          return 0.5
        case 'grass':
        case 'fighting':
        case 'bug':
          return 2
      } break;
    case 'psychic':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'ice':
        case 'ground':
        case 'flying':
        case 'bug':
        case 'rock':
        case 'ghost':
        case 'dragon':
          return 1
        case 'fighting':
        case 'poison':
          return 2
        case 'psychic':
        case 'steel':
          return 0.5
        case 'dark':
          return 0
      } break;
    case 'bug':
      switch (defenderType) {
        case 'normal':
        case 'water':
        case 'electric':
        case 'ice':
        case 'ground':
        case 'bug':
        case 'rock':
        case 'dragon':
          return 1
        case 'fire':
        case 'fighting':
        case 'poison':
        case 'flying':
        case 'ghost':
        case 'steel':
          return 0.5
        case 'grass':
        case 'psychic':
        case 'dark':
          return 2
      } break;
    case 'rock':
      switch (defenderType) {
        case 'normal':
        case 'water':
        case 'electric':
        case 'grass':
        case 'poison':
        case 'psychic':
        case 'rock':
        case 'ghost':
        case 'dragon':
        case 'dark':
          return 1
        case 'fire':
        case 'ice':
        case 'flying':
        case 'bug':
          return 2
        case 'fighting':
        case 'ground':
        case 'steel':
          return 0.5
      } break;
    case 'ghost':
      switch (defenderType) {
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'ice':
        case 'fighting':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'bug':
        case 'rock':
        case 'dragon':
          return 1
        case 'normal':
          return 0
        case 'psychic':
        case 'ghost':
          return 2
        case 'dark':
        case 'steel':
          return 0.5
      } break;
    case 'dragon':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'ice':
        case 'fighting':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'psychic':
        case 'bug':
        case 'rock':
        case 'ghost':
        case 'dark':
          return 1
        case 'dragon':
          return 2
        case 'steel':
          return 0.5
      } break;
    case 'dark':
      switch (defenderType) {
        case 'normal':
        case 'fire':
        case 'water':
        case 'electric':
        case 'grass':
        case 'ice':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'bug':
        case 'rock':
        case 'dragon':
          return 1
        case 'fighting':
        case 'dark':
        case 'steel':
          return 0.5
        case 'psychic':
        case 'ghost':
          return 2
      } break;
    case 'steel':
      switch (defenderType) {
        case 'normal':
        case 'grass':
        case 'fighting':
        case 'poison':
        case 'ground':
        case 'flying':
        case 'psychic':
        case 'bug':
        case 'ghost':
        case 'dragon':
        case 'dark':
          return 1
        case 'fire':
        case 'water':
        case 'electric':
        case 'steel':
          return 0.5
        case 'ice':
        case 'rock':
          return 2
      } break;
  }
}

for (const attackerType of types) {
  const newType = {
    Type: attackerType,
  }
  for (const defenderType of types) {
    newType[defenderType] = getTypeEffect(attackerType,defenderType)
  }
  typeData.push(newType);
}

fs.writeFileSync(path.join(__dirname,'../data/Types.json'),JSON.stringify(typeData,null,'\t'))


