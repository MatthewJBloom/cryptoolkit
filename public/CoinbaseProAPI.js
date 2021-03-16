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
      let start = new Date()
      start.setDate(start.getDate()-1)
      let end = new Date()
      let options = {
        hostname: hostname,
        // path: `/products/BTC-USD/candles?start=${start.toISOString()}&end=${end.toISOString()}&granularity=60`,
        path: `/products/BTC-USD/candles?granularity=300`,
        method: "GET",
        headers: {
          'User-Agent': userAgent
        }
      }
      // let results = Buffer.alloc(0)

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
