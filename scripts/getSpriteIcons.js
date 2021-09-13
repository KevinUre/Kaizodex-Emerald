const fs = require('fs')
const path = require('path');
const request = require('request');

const baseUrl = 'http://www.psypokes.com/dex/picdex/minis/'

function PadNumber(number) {
  while (number.length < 3) {
    number = "0" + number
  }
  return number
}

function getFileName(numberAsNumber) {
  var number = numberAsNumber.toString()
  return `${PadNumber(number)}.png`
}

function getUrl(numberAsNumber) {
  var number = numberAsNumber.toString()
  number = PadNumber(number)
  return `${baseUrl}${number}.png`
}

async function download(url, filename) {
  console.log(url)
    const file = fs.createWriteStream(filename);
    await new Promise((resolve, reject) => {
        request({
            uri: url,
            gzip:true,
        }).pipe(file)
        .on('finish', () => {resolve()})
        .on('error', (error) => {reject(error)})
    }).catch((error) => {
        console.log(`problem with ${url}: ${error}`)
    })
}

(async () => {
    for(let i = 1; i <= 386; i++ ) {
      var fileName = getFileName(i);
      const filePath = path.join(__dirname, '../sprites', fileName)
      const url = getUrl(i)
      await download(url, filePath)
    }
})();