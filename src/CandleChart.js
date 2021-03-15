import React, { Component } from 'react'
import { VictoryCandlestick, VictoryChart, VictoryAxis,
        VictoryTheme } from 'victory'
const { ipcRenderer } = window.require('electron')

// TODO: fill in this data via ipcRenderer.on('CoinbaseProFeed:trade',...)
// and move it into a state in the CandleChart constructor.
// const data = [
//   {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
//   {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
//   {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
//   {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
//   {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5}
// ]

class CandleChart extends Component {
  constructor() {
    super()
    this.state = {data: [
      {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
      {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
      {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
      {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
      {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5}
    ]}
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('CandleChart:didMount')
    ipcRenderer.on('CoinbaseProFeed:trade', (event, arg) => {
      this.setState(state => ({
        data: arg
      }))
    })
  }

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        scale={{x:'time'}}
      >
        <VictoryAxis
          // X axis, time
          tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
        />
        <VictoryAxis
          // Y axis, candle
          dependentAxis
          // tickFormat={(x)=>(`$${x/1000}k`)}
        />
        <VictoryCandlestick
          style={{data: {stroke: "white", strokeWidth: 2}}}
          candleColors={{ positive: "green", negative: "red" }}
          data={this.state.data}
        />
      </VictoryChart>
    )
  }
}

export default CandleChart
