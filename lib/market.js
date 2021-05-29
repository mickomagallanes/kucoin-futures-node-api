const axios = require('axios')

const Market = {}

/* 
  Get Order Info. of the Contract
  GET /api/v1/contracts
  symbol = string [optional]
*/
Market.getContract = async function (symbol = "") {
  let endpoint = `/api/v1/contracts/${symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Open Contract List
  GET /api/v1/contracts
  symbol = string [optional]
*/
Market.getAllContracts = async function () {
  let endpoint = "/api/v1/contracts/active"

  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/*  
  Get Ticker
  GET /api/v1/ticker
  symbol = string
*/
Market.getTicker = async function (symbol) {
  let endpoint = `/api/v1/ticker?symbol=${symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Full Order Book - Level 2 (aggregated)
  see details at: https://docs.kucoin.com/futures/#get-full-order-book-level-2
  GET /api/v1/level2/snapshot?symbol=<symbol>
  symbol = string
*/
Market.getFullOrderBook = async function (symbol) {
  let endpoint = `/api/v1/market/orderbook/level2?symbol=${symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Part Order Book (aggregated) 
  GET /api/v1/level2/depth20?symbol=<symbol>
  GET /api/v1/level2/depth100?symbol=<symbol>
  params = {
    amount: integer (20 || 100) 
    symbol: string
  }
*/
Market.getPartOrderBook = async function (params) {
  let endpoint = `/api/v1/level2/depth${params.amount}?symbol=${params.symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Level 2 Pulling Messages
  see details at: https://docs.kucoin.com/futures/#level-2-pulling-messages
  GET /api/v1/level2/message/query
  params = {
    symbol: string
    start: long
    end	: long
  }
*/
Market.pullMessagesLvl2 = async function (params) {
  let endpoint = `/api/v1/level2/message/query`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Full Order Book (atomic) 
  GET /api/v2/level3/snapshot?symbol=<symbol>
  symbol = string
*/
Market.getFullOrderBookAtomic = async function (symbol) {
  let endpoint = `/api/v2/level3/snapshot?symbol=${symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Level 3 Pulling Messages
  see details at: https://docs.kucoin.com/futures/#level-3-pulling-messages
  GET /api/v1/level3/snapshot
  params = {
    symbol: string
    start: long
    end	: long
  }
*/
Market.pullMessagesLvl3 = async function (params) {
  let endpoint = `/api/v1/level3/snapshot`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

/* 
  List the last 100 trades for a symbol
  GET /api/v1/trade/history?symbol=<symbol>
  symbol = string
*/
Market.getTradeHistories = async function (symbol) {
  let endpoint = `/api/v1/trade/history?symbol=${symbol}`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Interest Rate List
  GET /api/v1/interest/query
  params = {
    symbol = string
    startAt = long (unix time) [optional]
    endAt = long (unix time) [optional]
    reverse = boolean [optional, default: true]
    offset = long [optional]
    forward = boolean [optional, default: true]
    maxCount = int [optional, default: 10]
  }

*/
Market.getInterestRate = async function (params) {
  let endpoint = `/api/v1/interest/query`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Index List
  GET /api/v1/index/query
  params = {
    symbol = string
    startAt = long (unix time) [optional]
    endAt = long (unix time) [optional]
    reverse = boolean [optional, default: true]
    offset = long [optional]
    forward = boolean [optional, default: true]
    maxCount = int [optional, default: 10]
  }
*/
Market.getIndexList = async function (params) {
  let endpoint = `/api/v1/index/query`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Current Mark Price
  GET /api/v1/mark-price/{symbol}/current
  symbol = string
*/
Market.getMarkPrice = async function (symbol) {
  let endpoint = `/api/v1/mark-price/${symbol}/current`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Premium Index
  GET /api/v1/index/query
  params = {
    symbol = string
    startAt = long (unix time) [optional]
    endAt = long (unix time) [optional]
    reverse = boolean [optional, default: true]
    offset = long [optional]
    forward = boolean [optional, default: true]
    maxCount = int [optional, default: 10]
  }
*/
Market.getPremiumIndex = async function (params) {
  let endpoint = `/api/v1/index/query`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Current Funding Rate
  GET /api/v1/funding-rate/{symbol}/current
  symbol = string
*/
Market.getFundingRate = async function (symbol) {
  let endpoint = `/api/v1/funding-rate/${symbol}/current`
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Server Time
  GET /api/v1/timestamp
*/
Market.getServerTime = async function () {
  let endpoint = '/api/v1/timestamp'
  let url = this.baseURL + endpoint
  let result = await axios.get(url)
  return result.data
}

/* 
  Get Klines
  GET /api/v1/kline/query
  params = {
    symbol: string [Required]
    granularity: int [Required] - Granularity (minute)
    startAt: long (unix time) [Optional]
    endAt: long (unix time) [Optional]
  }
*/
Market.getKlines = async function (params) {
  let endpoint = '/api/v1/kline/query'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url)
  return result.data
}

module.exports = Market