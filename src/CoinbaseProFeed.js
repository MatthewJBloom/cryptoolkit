const WebSocket = require('websocket').w3cwebsocket
const EventEmitter = require('events')


// Set subscription details
const subscription = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [{name: "ticker"}]
    }

/**
 * Represents a CoinbasePro Websocket feed
 *
 */
class CoinbaseProFeed {
  constructor() {
    // Create websocket client
    this.client = new WebSocket("wss://ws-feed.pro.coinbase.com")
    // Create price event emitter for outputting price updates
    this.priceEventEmitter = new EventEmitter()

    // Handle client events
    this.client.onopen = () => {
      console.log('CoinbaseProFeed WebSocket client connected')
      // Send subscription (required within 60s of connection)
      this.client.send(JSON.stringify(subscription))
    }
    this.client.onmessage = (message) => {
      // console.log(message)
      let data = JSON.parse(message.data)
      let type = data.type
      switch (type) {
        case 'subscriptions':
          // this.printSubscriptions(data)
          break
        case 'ticker':
          // this.printTicker(data)
          // Emit price event to priceEventEmitter
          this.priceEventEmitter.emit('price', data.price)
          break
        default:
          console.warn('UNIMPLEMENTED TYPE CASE:', type)
      }
    }
    this.client.onclose = () => {
      console.error('CoinbaseProFeed WebSocket client closed')
    }
  } // constructor()

  get priceEvents() {
    return this.priceEventEmitter
  } // priceEvents getter

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
    // let side = data.side
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
}


module.exports = CoinbaseProFeed
