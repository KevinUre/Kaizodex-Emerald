const fs = require('fs')
const path = require('path');
const request = require('request');

const bulbData = JSON.parse(fs.readFileSync(path.join(__dirname,'../input_data/BulbapediaPokemon.json')))
const allUrls = bulbData.map(stats => stats.ImageUrl)

async function download(url, filename) {
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
    for (const url of allUrls) {
        var fileName = path.basename(url)
        const fileNameRegex = /250px-(\d{3})(.*?)\.png/
        const match = fileName.match(fileNameRegex);
        fileName = `${match[1]}.png`
        filePath = path.join(__dirname, '../images', fileName)
        console.log(`working on ${url}`)
        await download(url, filePath)
    }
})();