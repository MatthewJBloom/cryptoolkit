const https = require('https')

const hostname = "api.pro.coinbase.com"
const userAgent = `nodejs/${process.version}`

/**
 * Represents a CoinbasePro API Request Handler
 *
 */
class CoinbaseProAPI {
  constructor() {
    // Uhhhhh
  }

  /**
   * Gets a list of lists of candles
   * @param {string} length - the length of the candle in simplified time
   * e.g. 1m, 5m, 15m, 1h, 6h, 1d
   */
  getCandles(length='5m') {
    return new Promise(resolve => {
      let granularity = {
        '1m': 60,
        '5m': 300,
        '15m': 900,
        '1h': 3600,
        '6h': 21600,
        '1d': 86400
      }
      let options = {
        hostname: hostname,
        path: `/products/BTC-USD/candles?granularity=${granularity[length]}`,
        method: "GET",
        headers: {
          'User-Agent': userAgent
        }
      }

      let req = https.request(options, res => {
        let results = ""
        console.log(`${options.method} ${options.path} statusCode: ${res.statusCode}`)
        res.on('data', d => {
          results += d.toString()
        })
        res.on('end', () => {
          // Parse the results and sort them.
          // Sorts chronologically 
          resolve(JSON.parse(results).sort())
        })
      })

      req.on('error', e => {
        console.error(e)
        resolve(e)
      })

      req.end()
    })
  }
} // CoinbaseProAPI

module.exports = CoinbaseProAPI
