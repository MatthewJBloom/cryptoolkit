import React, { Component } from 'react'
const WebSocket = require('websocket').w3cwebsocket
//const EventEmitter = require('events')

const client = new WebSocket("wss://ws-feed.pro.coinbase.com")
const subscription = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [{name: "ticker"}]
    }
/**
 * Represents a CoinbasePro Websocket feed
 *
 */
class CoinbaseProFeed extends Component {
  constructor() {
    super()
    this.state = {price: 0}
  }
  componentDidMount() {
    client.onopen = () => {
      console.log('client connected')
      client.send(JSON.stringify(subscription))
    }
    client.onmessage = (message) => {
      let data = JSON.parse(message.data)
      this.setState(state => ({
        price: data.price
      }))
      console.log(data.price)
    }
    client.onclose = () => {
      console.log('client closed')
    }
  }


  render() {
    return (
      <div>
        ${this.state.price}
      </div>
    )
  }
}


export default CoinbaseProFeed
