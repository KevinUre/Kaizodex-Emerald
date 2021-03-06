const fs = require('fs')
const path = require('path')

const natures = [
  // Attack Up
  {
    Name: 'Hardy',
    Increased: 'Attack',
    Decreased: 'Attack',
  },
  {
    Name: 'Lonely',
    Increased: 'Attack',
    Decreased: 'Defense',
  },
  {
    Name: 'Adamant',
    Increased: 'Attack',
    Decreased: 'Sp Atk',
  },
  {
    Name: 'Naughty',
    Increased: 'Attack',
    Decreased: 'Sp Def',
  },
  {
    Name: 'Brave',
    Increased: 'Attack',
    Decreased: 'Speed',
  },
  // Defense Up
  {
    Name: 'Bold',
    Increased: 'Defense',
    Decreased: 'Attack',
  },
  {
    Name: 'Docile',
    Increased: 'Defense',
    Decreased: 'Defense',
  },
  {
    Name: 'Impish',
    Increased: 'Defense',
    Decreased: 'Sp Atk',
  },
  {
    Name: 'Lax',
    Increased: 'Defense',
    Decreased: 'Sp Def',
  },
  {
    Name: 'Relaxed',
    Increased: 'Defense',
    Decreased: 'Speed',
  },
  // Sp Atk
  {
    Name: 'Modest',
    Increased: 'Sp Atk',
    Decreased: 'Attack',
  },
  {
    Name: 'Mild',
    Increased: 'Sp Atk',
    Decreased: 'Defense',
  },
  {
    Name: 'Bashful',
    Increased: 'Sp Atk',
    Decreased: 'Sp Atk',
  },
  {
    Name: 'Rash',
    Increased: 'Sp Atk',
    Decreased: 'Sp Def',
  },
  {
    Name: 'Quiet',
    Increased: 'Sp Atk',
    Decreased: 'Speed',
  },
  // Sp Def
  {
    Name: 'Calm',
    Increased: 'Sp Def',
    Decreased: 'Attack',
  },
  {
    Name: 'Gentle',
    Increased: 'Sp Def',
    Decreased: 'Defense',
  },
  {
    Name: 'Careful',
    Increased: 'Sp Def',
    Decreased: 'Sp Atk',
  },
  {
    Name: 'Quirky',
    Increased: 'Sp Def',
    Decreased: 'Sp Def',
  },
  {
    Name: 'Sassy',
    Increased: 'Sp Def',
    Decreased: 'Speed',
  },
  // Speed
  {
    Name: 'Timid',
    Increased: 'Speed',
    Decreased: 'Attack',
  },
  {
    Name: 'Hasty',
    Increased: 'Speed',
    Decreased: 'Defense',
  },
  {
    Name: 'Jolly',
    Increased: 'Speed',
    Decreased: 'Sp Atk',
  },
  {
    Name: 'Naive',
    Increased: 'Speed',
    Decreased: 'Sp Def',
  },
  {
    Name: 'Serious',
    Increased: 'Speed',
    Decreased: 'Speed',
  },
]

fs.writeFileSync(path.join(__dirname,'../data/Natures.json'),JSON.stringify(natures,null,'\t'))
