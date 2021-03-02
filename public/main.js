// Modules to control application life and create native browser window
const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
// Custom Classes
const CoinbaseProFeed = require('../src/CoinbaseProFeed')
// const NotificationManager = require('./src/NotificationManager')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Hide the menu bar
  mainWindow.removeMenu()

  // Load either 'http://localhost:3000' or `file://${path.join(__dirname, '../build/index.html')}`
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const coinbaseProFeed = new CoinbaseProFeed()
  const priceEvents = coinbaseProFeed.priceEvents
  ipcMain.once('CurrentPriceMounted', (event, arg) => {
    priceEvents.on('price', price => {
      event.reply('price', price)
    })
  })

}) // app.whenReady().then(() => { ...

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
