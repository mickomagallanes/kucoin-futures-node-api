const axios = require('axios')

const Trade = {}

/* 
  Place a new order
  POST /api/v1/orders
  Details for market order vs. limit order and params see https://docs.kucoin.com/futures/#place-a-new-order
  General params
  params = {
    clientOid: string - Unique order id created by users to identify their orders
    side: string ['buy' || 'sell]
    symbol: string - a valid contract code. e.g. XBTUSDM
    type: string [optional] - Either limit or market
    leverage: string - Leverage of the order
    remark: string [optional] - remark for the order, length cannot exceed 100 utf8 characters
    stop: string [optional] - Either down or up. Requires stopPrice and stopPriceType to be defined
    stopPriceType: string [optional] - Either TP, IP or MP, Need to be defined if stop is specified.
    stopPrice: string [optional] - Need to be defined if stop is specified.
    reduceOnly: boolean [optional, default: false] - A mark to reduce the position size only
    closeOrder: boolean [optional, default: false] - A mark to close the position
    forceHold: boolean [optional, default: false] -  A mark to forcely hold the funds for an order
    
    LIMIT ORDER PARAMETERS
    price: string - Limit price
    size: Integer - Order size
    timeInForce: string [optional, default is GTC] - GTC, IOC. read: https://docs.kucoin.com/futures/#time-in-force
    postOnly: boolean [optional] - Post only flag, invalid when timeInForce is IOC
    hidden: boolean [optional] - Orders not displaying in order book
    iceberg: boolean [optional]
    visibleSize: Integer [optional]

    MARKET ORDER PARAMETERS
    size: Integer [optional] - amount of contract to buy or sell
  }
*/
Trade.placeOrder = async function (params) {
  let endpoint = '/api/v1/orders'
  let url = this.baseURL + endpoint
  let result = await axios.post(url, params, this.sign(endpoint, 'POST', params))
  return result.data
}

/* 
  Cancel an order (including a stop order)
  DELETE /api/v1/orders/<order-id>
  params = {
    id: order-id
  }
*/
Trade.cancelOrder = async function (params) {
  let endpoint = '/api/v1/orders/' + params.id
  let url = this.baseURL + endpoint
  let result = await axios.delete(url, this.sign(endpoint, 'DELETE'))
  return result.data
}

/* 
  Cancel all open orders (excluding stop orders)
  DELETE /api/v1/orders
  params = {
    symbol: string [optional]
  }
*/
Trade.cancelAllOrders = async function (params) {
  let endpoint = '/api/v1/orders'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.delete(url, this.sign(endpoint, 'DELETE', params))
  return result.data
}

/* 
  Cancel all untriggered stop orders
  DELETE /api/v1/stopOrders
  params = {
    symbol: string [optional] - Cancel all untriggered stop orders for a specific contract only
  }
*/
Trade.cancelAllStopOrders = async function (params) {
  let endpoint = '/api/v1/stopOrders'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.delete(url, this.sign(endpoint, 'DELETE', params))
  return result.data
}

/* 
  List your current orders
  GET /api/v1/orders
  params = {
    status: string [optional, default: done, alt: active]
    symbol: string [optional]
    side: string [optional, 'buy' || 'sell]
    type: string [optional, limit || market || limit_stop || market_stop]
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
  }
*/
Trade.getOrders = async function (params = {}) {
  let endpoint = '/api/v1/orders'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Get the un-triggered stop orders list.
  GET /api/v1/stopOrders
  params = {
    symbol: string [optional]
    side: string [optional, 'buy' || 'sell]
    type: string [optional, limit || market]
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
  }
*/
Trade.getStopOrders = async function (params = {}) {
  let endpoint = '/api/v1/stopOrders'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Get a list of recent 1000 orders in the last 24 hours.
  GET /api/v1/recentDoneOrders
*/
Trade.getRecentOrders = async function () {
  let endpoint = '/api/v1/recentDoneOrders'
  let url = this.baseURL + endpoint
  let result = await axios.get(url, this.sign(endpoint, 'GET'))
  return result.data
}

/* 
  Get a single order by order id (including a stop order)
  GET /api/v1/orders/<order-id>?clientOid=<client-order-id>
  params = {
    oid: order-id,
    cid: client-order-id [optional] - oid (order-id) must be undefined
  }
*/
Trade.getOrderById = async function (params) {
  let endpoint;
  if (params.oid != undefined) {
    endpoint = '/api/v1/orders/' + params.oid
  } else {
    endpoint = '/api/v1/orders/byClientOid?clientOid=' + params.cid
  }

  let url = this.baseURL + endpoint
  let result = await axios.get(url, this.sign(endpoint, 'GET'))
  return result.data
}

/* 
  List Fills
  GET /api/v1/fills
  params: {
    orderId: string [optional]
    symbol: string [optional]
    side: string [optional, 'buy' || 'sell]
    type: string [optional, limit || market || limit_stop || market_stop]
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
  }
*/
Trade.listFills = async function (params = {}) {
  let endpoint = '/api/v1/fills'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  List Your Recent Fills: max 1000 fills in the last 24 hours, all symbols
  GET /api/v1/recentFills
*/
Trade.recentFills = async function () {
  let endpoint = '/api/v1/recentFills'
  let url = this.baseURL + endpoint
  let result = await axios.get(url, this.sign(endpoint, 'GET'))
  return result.data
}

/* 
  Active Order Value Calculation
  GET /api/v1/openOrderStatistics
  params: {
    symbol: string
  }
*/
Trade.getOpenOrderStatistics = async function (params = {}) {
  let endpoint = '/api/v1/openOrderStatistics'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Get the position details of a specified position.
  GET /api/v1/position
  params: {
    symbol: string
  } 
*/
Trade.getPosition = async function (params) {
  let endpoint = "/api/v1/position"
  let url = this.baseURL + endpoint + this.formatQuery(params);
  let result = await axios.get(url, this.sign(endpoint, 'GET', params));

  return result.data
}

/* 
  Get all the positions
  GET /api/v1/positions
*/
Trade.getAllPositions = async function () {
  let endpoint = "/api/v1/positions"

  let url = this.baseURL + endpoint + this.formatQuery();

  let result = await axios.get(url, this.sign(endpoint, 'GET'));

  return result.data
}

/* 
  Enable/Disable of Auto-Deposit Margin
  POST /api/v1/position/margin/auto-deposit-status
  params = {
    symbol: string - Symbol of the contract
    status: boolean - Status
  }
*/
Trade.changeAutoDeposit = async function (params) {
  let endpoint = '/api/v1/position/margin/auto-deposit-status'
  let url = this.baseURL + endpoint
  let result = await axios.post(url, params, this.sign(endpoint, 'POST', params))
  return result.data
}

/* 
  Add Margin Manually
  POST /api/v1/position/margin/deposit-margin
  params = {
    symbol: string - Ticker symbol of the contract
    margin: number - Margin amount (min. margin amount≥0.00001667XBT）
    bizNo: string - A unique ID generated by the user
  }
*/
Trade.addMargin = async function (params) {
  let endpoint = '/api/v1/position/margin/deposit-margin'
  let url = this.baseURL + endpoint
  let result = await axios.post(url, params, this.sign(endpoint, 'POST', params))
  return result.data
}

/* 
  Get V1 Historical Orders List
  GET /api/v1/funding-history
  params: {
    symbol: string
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
    reverse: boolean [optional, default: true]
    offset: long [optional]
    forward: boolean [optional, default: true]
    maxCount: int [optional, default: 10]
  }
*/
Trade.getFundingHistory = async function (params = {}) {
  let endpoint = '/api/v1/funding-history'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

module.exports = Trade
