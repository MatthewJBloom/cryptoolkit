// Modules to control application life and create native browser window
const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
// Custom Classes
const CoinbaseProFeed = require('./CoinbaseProFeed')
const NotificationManager = require('./NotificationManager')
// NOTE: any requirements for the main process have to be in /public

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

  // Create CoinbaseProFeed
  const coinbaseProFeed = new CoinbaseProFeed()

  // Once the CurrentPrice component has mounted, reply with price events
  // from the CoinbaseProFeed priceEvents EventEmitter
  ipcMain.once('CurrentPriceMounted', (event, arg) => {
    coinbaseProFeed.startFeed()
    coinbaseProFeed.priceEvents.on('price', price => {
      // Catch errors when closing the app and a reply tries to sneak through
      try {
        event.reply('price', price)
      } catch (e) {
        if (e instanceof TypeError && e.message == 'Object has been destroyed') {
          console.log(`TypeError: '${e.message}' mitigated.`)
        } else {
          throw e
        }
      }
    })
  })

  // Create NotificationManager
  const notificationManager = new NotificationManager()
  notificationManager.listen(coinbaseProFeed.priceEvents)

  // Once the NotificationForm component has mounted, listen for
  // new notifications...
  ipcMain.once('NotificationFormMounted', (event, arg) => {
    console.log('Notification Form Mounted')
  })

  ipcMain.on('NewNotification', (event, arg) => {
    notificationManager.newNotification("BTC", arg).then(notification => {
      console.log('created new notification', notification)
    })
  })

}) // app.whenReady().then(() => { ...

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
