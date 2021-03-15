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
        price: arg
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
