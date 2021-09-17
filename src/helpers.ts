import Data from "./DataContext";

export function GetSafeName(name: string):string {
  name = name.toLowerCase();
  name = name.replace(/'/g,'');
  name = name.replace(/\./g,'');
  name = name.replace(/\s/g,'-');
  name = name.replace(/-\(postgame\)/g,'');
  return name;
}

export function PadNumber(number:string): string {
  while (number.length < 3) {
    number = "0" + number
  }
  return number
}

export function GetLevelUpString(evolution:any):string {
  if (evolution.Level) {return `Level ${evolution.Level}`}
  if (evolution.Stone) {return `${evolution.Stone}`}
  if (evolution.Trade) {return `Trade`}
  if (evolution.Friendship) {return `High Friendship`}
  if (evolution.Beauty) {return `High Beauty`}
  return 'Unknown'
}

interface Pokemon {
  Number: string,
  Name: string,
  Types: string[],
}

export function GetPokemonSafe(name:string): Pokemon {
  const safeName = GetSafeName(name);
  var ret = Data.Pokemon.find(p => GetSafeName(p.Name) === safeName)
  if(!ret) {ret = Data.Pokemon[0]}
  return ret
}

export function GetNextPokemonSafe(name:string): Pokemon {
  const safeName = GetSafeName(name);
  var self = Data.Pokemon.find(p => GetSafeName(p.Name) === safeName)
  if(!self) {self = Data.Pokemon[0]}
  var number = parseInt(self.Number)
  number += 1
  if(number === Data.Pokemon.length+1) { number = 1 }
  var next = Data.Pokemon.find(p => p.Number === number.toString())
  if(!next) {next = Data.Pokemon[0]}
  return next
}

export function GetPreviousPokemonSafe(name:string): Pokemon {
  const safeName = GetSafeName(name);
  var self = Data.Pokemon.find(p => GetSafeName(p.Name) === safeName)
  if(!self) {self = Data.Pokemon[0]}
  var number = parseInt(self.Number)
  number -= 1
  if(number === 0) { number = Data.Pokemon.length }
  var next = Data.Pokemon.find(p => p.Number === number.toString())
  if(!next) {next = Data.Pokemon[0]}
  return next
}

export function GetParentLocationSafe(fullLocationUnsafe:string): string {
  const fullLocationSafe = GetSafeName(fullLocationUnsafe);
  var parentLocation = Data.Locations.find(l => fullLocationSafe.includes(GetSafeName(l.Location)));
  if (!parentLocation) { parentLocation = Data.Locations[0]; }
  return GetSafeName(parentLocation.Location);
}

export function GetStatsTotal(Pokemon:any): number {
  var sum = 0;
  sum += parseInt(Pokemon.Stats.HP);
  sum += parseInt(Pokemon.Stats.Attack);
  sum += parseInt(Pokemon.Stats.SpecialAttack);
  sum += parseInt(Pokemon.Stats.Defense);
  sum += parseInt(Pokemon.Stats.SpecialDefense);
  sum += parseInt(Pokemon.Stats.Speed);
  return sum;
}