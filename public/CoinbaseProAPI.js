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

  getCandles() {
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
        path: `/products/BTC-USD/candles?granularity=${granularity['5m']}`,
        method: "GET",
        headers: {
          'User-Agent': userAgent
        }
      }

      let req = https.request(options, res => {
        let results = ""
        console.log(`${options.method} ${options.path} statusCode: ${res.statusCode}`)
        res.on('data', d => {
          // results.write(d)
          results += d.toString()
        })
        res.on('end', () => {
          resolve(JSON.parse(results))
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


// const data = JSON.stringify({
//   some: 'data'
// })
//
//
// const options = {
//   hostname: 'api.pro.coinbase.com',
//   path: '/products/BTC-USD/candles',
//   method: 'GET',
//   headers: {
//     'User-Agent': `nodejs/${process.version}`
//   }
// }
//
// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)
//
//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })
//
// req.on('error', e => {
//   console.error(e)
// })
//
// req.end()

// const coinbaseProAPI = new CoinbaseProAPI
// coinbaseProAPI.getProducts().then(data => {
//   console.log(data)
// }).catch(error => {
//   console.error(error)
// })

module.exports = CoinbaseProAPI
