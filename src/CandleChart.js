import React, { Component } from 'react'
import { VictoryCandlestick, VictoryChart, VictoryAxis,
        VictoryTheme } from 'victory'
const { ipcRenderer } = window.require('electron')



class CandleChart extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('CandleChart:didMount')
    ipcRenderer.on('CoinbaseProAPI:candles', (event, arg) => {
      // console.log(arg)
      this.setState(state => ({
        data: arg.slice(-50)
      }))
    })
  }

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={1}
        scale={{x:'time'}}
        padding={{top: 20, bottom: 40, left: 20, right: 80}}
      >
        <VictoryAxis
          // X axis, time
          tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}`}
        />
        <VictoryAxis
          // Y axis, candle
          style={{ axis: {stroke: "none"}}}
          width={420}
          offsetX={80}
          orientation="right"
          dependentAxis
          tickFormat={(x)=>(`$${x/1000}k`)}
        />
        <VictoryCandlestick
          style={{data: {stroke: "black", strokeWidth: .5}}}
          candleColors={{ positive: "green", negative: "red" }}
          data={this.state.data}
        />
      </VictoryChart>
    )
  }
}

export default CandleChart
