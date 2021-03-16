const https = require('https')

/**
 * Represents a CoinbasePro API Request
 *
 */
const data = JSON.stringify({
  some: 'data'
})


const options = {
  hostname: 'api.pro.coinbase.com',
  path: '/products/BTC-USD/candles',
  method: 'GET',
  headers: {
    'User-Agent': 'nodejs'
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', e => {
  console.error(e)
})

req.end()
