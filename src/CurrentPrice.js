import React, { Component } from 'react'

class CurrentPrice extends Component {
  constructor(props) {
    super()
    this.state = {price: 0}
    this.priceEvents = props.events
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    this.priceEvents.on('price', price => {
      this.setState(state => ({
        price: price
      }))
    })
  }

  // When the component unmounts from the DOM
  // componentWillUnmount() {
  //
  // }

  render() {
    return (
      <div>
        ${this.state.price}
      </div>
    )
  }
}

export default CurrentPrice
