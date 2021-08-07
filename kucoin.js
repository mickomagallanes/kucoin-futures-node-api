const qs = require('querystring')
const crypto = require('crypto')

class Kucoin {
  constructor() {
  }

  init(config) {
    let url = ''
    if (config.environment === 'live') {
      url = 'https://api-futures.kucoin.com'
    } else {
      url = 'https://api-sandbox-futures.kucoin.com'
    }
    this.environment = config.environment
    this.baseURL = url
    this.secretKey = config.secretKey
    this.apiKey = config.apiKey
    this.passphrase = config.passphrase
    const User = require('./lib/user')
    const Market = require('./lib/market')
    const Trade = require('./lib/trade')
    const Sockets = require('./lib/websockets')
    Object.assign(this, User, Market, Trade, Sockets)
  }

  sign(endpoint, method, params = {}) {
    let header = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let nonce = Date.now() + ''
    let strForSign = ''
    if (method === 'GET' || method === 'DELETE') {
      strForSign = nonce + method + endpoint + this.formatQuery(params)
    } else {
      strForSign = nonce + method + endpoint + JSON.stringify(params)
    }
    let signatureResult = crypto.createHmac('sha256', this.secretKey)
      .update(strForSign)
      .digest('base64')
    let passphraseResult = crypto.createHmac('sha256', this.secretKey)
      .update(this.passphrase)
      .digest('base64')
    header.headers['KC-API-SIGN'] = signatureResult
    header.headers['KC-API-TIMESTAMP'] = nonce
    header.headers['KC-API-KEY'] = this.apiKey
    header.headers['KC-API-PASSPHRASE'] = passphraseResult
    header.headers['KC-API-KEY-VERSION'] = 2
    return header
  }

  formatQuery(queryObj) {
    if (queryObj !== undefined && JSON.stringify(queryObj).length !== 2) {
      return '?' + qs.stringify(queryObj)
    } else {
      return ''
    }
  }
}

module.exports = Kucoin
