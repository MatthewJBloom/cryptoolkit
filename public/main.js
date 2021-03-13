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

  // Load either 'http://localhost:3000'
  // or `file://${path.join(__dirname, '../build/index.html')}`
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(startUrl)

  // Open the DevTools if running as dev
  if (process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools()
  }
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

  // Core Application Lifecycle:

  // Create a websocket connection with coinbase pro and listen for trades.
  // Create a notification manager to create notifications and listen to trades
  // and trigger the notifications if their conditions are met.

  // Create CoinbaseProFeed to open a WebSocketClient with CoinbasePro
  const coinbaseProFeed = new CoinbaseProFeed()
  // Start the coinbaseProFeed
  coinbaseProFeed.startFeed()
  // Create NotificationManager
  const notificationManager = new NotificationManager()
  // Listen for coinbaseProFeed events to check notifications statuses
  notificationManager.listen(coinbaseProFeed.events)

  // Core Application Event Handlers

  // ipcMain emits events sent from front-end components via ipcRenderer.send().
  // Use .on() or .once() to handle and reply to Renderer events.

  // Once the CurrentPrice component has mounted, reply with price events
  // from the CoinbaseProFeed priceEvents EventEmitter.
  ipcMain.once('CurrentPrice:didMount', (event, arg) => {
    // TODO: consider having coinbaseProFeed emit data and then replying with
    // only data.price here instead.
    coinbaseProFeed.events.on('tick', price => {
      // Catch errors when closing the app and a reply tries to sneak through
      try {
        event.reply('CoinbaseProFeed:price', price)
      } catch (e) {
        if (e instanceof TypeError && e.message == 'Object has been destroyed') {
          console.log(`TypeError: '${e.message}' mitigated.`)
        } else {
          throw e
        }
      }
    })
  })

  // On a new notification from the NotificationForm, send it to the
  // notification manager.
  // Defaults to BTC TODO: move BTC to global setting.
  ipcMain.on('NotificationForm:submit', (event, arg) => {
    // Send the new notification to the Notification Manager (resolves with notification)
    notificationManager.newNotification("BTC", arg).then(notification => {
      console.log('created notification:', notification.id)
    })
  })

  // Once the notification list component has mounted, start replying to it
  // every time the notification manager emits a change to notifications
  ipcMain.once('NotificationList:didMount', (event, arg) => {
    // On a change to notifications, reply with current list of notifications
    notificationManager.events.on('change', notification_ids => {
      try {
        event.reply('NotificationManager:change', notification_ids)
      } catch (e) {
        if (e instanceof TypeError && e.message == 'Object has been destroyed') {
          console.log(`TypeError: '${e.message}' mitigated.`)
        } else {
          throw e
        }
      }
    })
  })

}) // app.whenReady().then(() => { ...

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
