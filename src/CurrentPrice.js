import React, { Component } from 'react'

class CurrentPrice extends Component {
  constructor(props) {
    super()
    this.state = {price: 0}
    this.priceEvents = props.events.priceEvents
  }

  componentDidMount() {
    this.priceEvents.on('price', price => {
      this.setState(state => ({
        price: price
      }))
    })
  }

  render() {
    return (
      <div>
        ${this.state.price}
      </div>
    )
  }
}

export default CurrentPrice
