const fs = require('fs')
const path = require('path')
const { exit } = require('process')

const locations = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/Locations.json')))
var allFiles = fs.readdirSync(path.join(__dirname,'../maps'))

function GetSafeName(name) {
  name = name.toLowerCase();
  name = name.replace(/'/g,'');
  name = name.replace(/\./g,'');
  name = name.replace(/\s/g,'-');
  name = name.replace(/_/g,'-');
  name = name.replace(/-\(postgame\)/g,'');
  return name;
}

locations.forEach((location)=> {
  const safeLocationName = GetSafeName(location.Location)
  const currentFileName = allFiles.find(f => GetSafeName(f).includes(safeLocationName))
  if(!currentFileName) { console.log(`[ERROR] no map found for ${location.Location}`); exit(1); }
  const oldPath = path.join(__dirname,'../maps', currentFileName)
  const newPath = path.join(__dirname,'../maps', `${safeLocationName}.png`)
  fs.renameSync(oldPath,newPath)
})