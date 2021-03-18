// Modules to control application life and create native browser window
const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
// Custom Classes
const CoinbaseProFeed = require('./CoinbaseProFeed')
const CoinbaseProAPI = require('./CoinbaseProAPI')
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
  // Create a CoinbaseProAPI instance for public api requests.
  const coinbaseProAPI = new CoinbaseProAPI()

  // Core Application Event Handlers

  // ipcMain emits events sent from front-end components via ipcRenderer.send().
  // Use .on() or .once() to handle and reply to Renderer events.

  // Once the CurrentPrice component has mounted, reply with price events
  // from the CoinbaseProFeed priceEvents EventEmitter.
  ipcMain.once('CurrentPrice:didMount', (event, arg) => {
    // CoinbaseProFeed tick event returns data including price
    coinbaseProFeed.events.on('tick', data => {
      // Catch errors when closing the app and a reply tries to sneak through
      try {
        // Reply with just the price from the tick data
        event.reply('CoinbaseProFeed:price', data.price)
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
      // no-op...
      // TODO: make this synchronous
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

  // When the user removes a notification, execute the removal.
  ipcMain.on('NotificationList:removeNotification', (event, arg) => {
    notificationManager.removeNotification(arg)
  })

  // Once the Candle Chart has mounted, reply with
  ipcMain.once('CandleChart:didMount', (event, arg) => {
    coinbaseProAPI.getCandles().then(candles => {
      // Candles format is:
      // [
      //   [ time, low, high, open, close, volume ],
      //   [ 1615863720, 54559.31, 54646.88, 54622.42, 54559.31, 5.25995905 ],
      //   [ etc... ]
      // Target format is:
      // const data = [
      //   {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
      //   {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
      //   { etc... }
      // ]
      let data = []
      candles.forEach(candle => {
        // If the timestamp is more than 60 minutes ago, skip it
        let timestamp = new Date(candle[0]*1000)
        if (timestamp < new Date(new Date() - 60*60000)) {
          return // aka `continue` in this case, skip the push
        }
        data.push({
          x: timestamp,
          low: candle[1],
          high: candle[2],
          open: candle[3],
          close: candle[4]
        })
      })
      // console.log(candles)
      event.reply('CoinbaseProAPI:candles', data)
    })
    // TODO: after sending the historic trades, start sending new trades
    // to fill up the current candle
  })

}) // app.whenReady().then(() => { ...

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
