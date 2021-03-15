const WebSocketClient = require('websocket').client
const EventEmitter = require('events')

/**
 * Represents a CoinbasePro Websocket feed
 *
 */
class CoinbaseProFeed {
  constructor() {
    this.client = new WebSocketClient()
    this.events = new EventEmitter()
    this.url = "wss://ws-feed.pro.coinbase.com"
    this.subscription = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [{name: "ticker"}]
    }

    this.client.on('connectFailed', this.handleConnectFailed.bind(this))
    this.client.on('connect', this.handleConnection.bind(this))

    this.start = this.startFeed
  } // constructor()

  startFeed() {
    this.client.connect(this.url)
  } // startFeed()

  // ---- HANDLERS ---- //

  handleConnectFailed(error) {
    console.log('Connect Error:', error.toString())
  } // handleConnectFailed(error)

  handleConnection(connection) {
    console.log('Coinbase Pro Websocket Feed Connected')
    // send subscriptions (must do before 5 seconds or conn closes)
    connection.sendUTF(JSON.stringify(this.subscription))
    // handle connection events
    connection.on('error', this.handleConnectionError.bind(this))
    connection.on('close', this.handleConnectionClose.bind(this))
    connection.on('message', this.handleConnectionMessage.bind(this))
  } // handleConnection(connection)

  handleConnectionError(error) {
    console.log('Connection Error', error.toString())
  } // handleConnectionError(error)

  handleConnectionClose() {
    console.log('Connection Closed | attempting to reconnect...')
    this.startFeed()
  } // handleConnectionClose()

  handleConnectionMessage(message) {
    if (message.type === 'utf8') {
      // console.log('Received:', message.utf8Data)
      let data = JSON.parse(message.utf8Data)
      let type = data.type
      // let timestamp = new Date(data.time)
      // timestamp = timestamp.toLocaleTimeString()
      switch (type) {
        case 'subscriptions':
          // this.printSubscriptions(data)
          break
        case 'ticker':
          // this.printTicker(data)
          this.events.emit('tick', data)
          break
        default:
          console.log('UNIMPLEMENTED TYPE CASE:', type)
      }
    } else {
      console.log('Message received not utf8. Type:', message.type)
    } // if (message.type === 'utf8')
  } // handleConnectionMessage(message)

  // ---- PRINT FORMATTERS ---- //

  printSubscriptions(data) {
    // console.log(data)
    let timestamp = new Date().toLocaleTimeString()
    let product = data.channels[0].product_ids[0]
    let channel = data.channels[0].name
    let message = `${timestamp} | ${product} | ${channel}`
    console.log(message)
  } // printSubscriptions(data)

  printTicker(data) {
    // console.log(data)
    let timestamp = new Date(data.time).toLocaleTimeString()
    let product = data.product_id
    let side = data.side
    let resetColor = "\x1b[0m" // reset
    let color = resetColor
    if (data.side === "buy") {
      color = "\x1b[32m" // green
    } else if (data.side === "sell"){
      color = "\x1b[31m" // red
    }
    let amount = parseFloat(data.last_size).toFixed(8)
    let price = parseFloat(data.price).toFixed(2)
    let message = `${timestamp} | ${product} | ${amount} @ ${color}$${price}${resetColor}`
    console.log(message)
  } // printTicker(data)

} // CoinbaseProFeed

module.exports = CoinbaseProFeed
