export function GetSafeName(name: string):string {
  name = name.toLowerCase();
  name = name.replace(/'/g,'');
  name = name.replace(/\./g,'');
  name = name.replace(/\s/g,'-');
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