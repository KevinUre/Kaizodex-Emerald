// const electron = require('electron');
// const { app, BrowserWindow } = electron;
// const path = require('path');
// const isDev = require('electron-is-dev');

// let mainWindow = null;
// app.on('ready', createWindow);
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// });
// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow()
//   }
// });
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1024,
//     height: 1024,
//     title: "Chat desktop app demo"
//   });
//   mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
//   mainWindow.on('closed', function () {
//     mainWindow = null
//   })
// //   mainWindow.on('page-title-updated', function (e) {
// //     e.preventDefault()
// //   });
// }

const { app, BrowserWindow, screen: electronScreen } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false
    }
  });
  const startURL = 'http://localhost:3000';

 // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '/index.html')}`);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});