import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class CurrentPrice extends Component {
  constructor() {
    super()
    this.state = {price: 0}
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('CurrentPrice:didMount')
    ipcRenderer.on('CoinbaseProFeed:price', (event, arg) => {
      this.setState(state => ({
        // Parse price as float, then save at 2 decimal points
        price: parseFloat(arg).toFixed(2)
      }))
    })
  }

  // When the component unmounts from the DOM
  // componentWillUnmount() {
  //
  // }

  render() {
    return (
      <span>{this.state.price}</span>
    )
  }
}

export default CurrentPrice
