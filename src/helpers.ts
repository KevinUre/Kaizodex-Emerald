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

