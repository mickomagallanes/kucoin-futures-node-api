# kucoin-futures-node-api

Just a KuCoin Futures API version of https://github.com/escwdev/kucoin-node-api/. 

## Installation

`npm install kucoin-futures-node-api`

Alternatively, you can clone/download the repository and import into your project by file path.

## Getting Started

To begin using the API wrapper, require it, create a config object that contains your API key, Secret key and Passphrase provided by Kucoin. Create an instantiation of the class then run the custom init() function with your config object as a parameter. If you are only using Public endpoints, the config object only requires the environment key/value pair. 

Example code is as follows:

```javascript 
const api = require('./kucoin-futures-node-api')

const config = {
  apiKey: 'xXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxXXX',
  secretKey: 'xxxxxxxxXXXXXXXXXXXXXxxXXXXXXXXXXXXXxxxXXX',
  passphrase: 'xxxxxx',
  environment: 'live'
}

const apiLive = new api()
apiLive.init(config)
```

## Using the API Wrapper

Once the API wrapper object is created, you can call any of the associated functions. They will return a Promise which can be utlized with .then/.catch or async/await. Note that the Promise based approach will return directly whereas the async/await approach requires calling the function.

Simple example:

```javascript
// Promise based approach for getting account information (private & signed)
apiLive.getAccountOverview().then((r) => {
  console.log(r.data)
}).catch((e) => {
  console.log(e))
})

// Async/Await get account info example (private & signed)
async function getAccountOverview() {
  try {
    let r = await apiLive.getAccountOverview()
    console.log(r.data)
  } catch(err) {
    console.log(err)
  } 
}
```

This approach allows for more complex multi-call asynchronous functionality, especially useful for automated trading.

## Market Endpoint (Public)

Public endpoints do not require an API Key, Secret Key or API Passphrase. 

```javascript
/* 
  Get Order Info. of the Contract
  GET /api/v1/contracts
  symbol = string [optional]
*/
apiLive.getContract(symbol)
```

```javascript
/* 
  Get Open Contract List
  GET /api/v1/contracts
  symbol = string [optional]
*/
apiLive.getAllContracts()
```

```javascript
/*  
  Get Ticker
  GET /api/v1/ticker
  symbol = string
*/
apiLive.getTicker(symbol)
```

```javascript
/* 
  Get Full Order Book - Level 2 (aggregated)
  see details at: https://docs.kucoin.com/futures/#get-full-order-book-level-2
  GET /api/v1/level2/snapshot?symbol=<symbol>
  symbol = string
*/
apiLive.getFullOrderBook(symbol)
```

```javascript
/* 
  Get Part Order Book (aggregated) 
  GET /api/v1/level2/depth20?symbol=<symbol>
  GET /api/v1/level2/depth100?symbol=<symbol>
  params = {
    amount: integer (20 || 100) 
    symbol: string
  }
*/
apiLive.getPartOrderBook(params)
```

```javascript
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
apiLive.pullMessagesLvl2(params)
```

```javascript
/* 
  Get Full Order Book (atomic) 
  GET /api/v2/level3/snapshot?symbol=<symbol>
  symbol = string
*/
apiLive.getFullOrderBookAtomic(symbol)
```

```javascript
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
apiLive.pullMessagesLvl3(params)
```

```javascript
/* 
  List the last 100 trades for a symbol
  GET /api/v1/trade/history?symbol=<symbol>
  symbol = string
*/
apiLive.getTradeHistories(symbol)
```

```javascript
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
apiLive.getInterestRate(params)
```

```javascript
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
apiLive.getIndexList(params)
```

```javascript
/* 
  Get Current Mark Price
  GET /api/v1/mark-price/{symbol}/current
  symbol = string
*/
apiLive.getMarkPrice(symbol)
```

```javascript
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
apiLive.getPremiumIndex(params)
```

```javascript
/* 
  Get Current Funding Rate
  GET /api/v1/funding-rate/{symbol}/current
  symbol = string
*/
apiLive.getFundingRate(symbol)
```

```javascript
/* 
  Server Time
  GET /api/v1/timestamp
*/
apiLive.getServerTime() 
```

```javascript
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
apiLive.getKlines(params) 
```

## User Endpoints (Private)
```javascript
/* 
  Get Account Overview
  GET /api/v1/account-overview
  params = {
    currency: string [optional, default: XBT]
  }
*/
apiLive.getAccountOverview(params)
```

```javascript
/* 
  Get Transaction History, see: https://docs.kucoin.com/futures/#get-transaction-history
  GET /api/v1/transaction-history
  params = {
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
    type: string [optional]
    offset: long [optional]
    maxCount: long [optional, default: 50]
    currency: string [optional]
    forward: boolean [optional, default: True]
  }
*/
apiLive.getTransactionHist(params)
```

```javascript
/* 
  Get Deposit Address
  GET /api/v1/deposit-address?currency=<currency>
  params = {
    currency: string
  }
*/
apiLive.getDepositAddress(params)
```

```javascript
/* 
  Get Deposit List
  GET /api/v1/deposit-list
  params = {
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
    status: string [optional]
    currency: string [optional]
  }
*/
apiLive.getDepositList(params)
```

```javascript
/* 
  Get Withdrawal Quotas
  GET /api/v1/withdrawals/quotas
  params = {
    currency: string
  }
*/
apiLive.getWithdrawalQuotas(params)
```

```javascript
/* 
  Withdraw Funds
  POST /api/v1/withdrawals
  params = {
    currency: string
    address: string
    amount: number
    isInner: boolean [optional]
    remark: string [optional]
    chain: string [optional, default: ERC20]
    memo: string [optional]
  }
*/
apiLive.applyForWithdrawal(params)
```

```javascript
/*  
  Get Withdrawals List
  GET /api/v1/withdrawal-list
  params = {
    status: string [optional]
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
    currency: string [optional]
  }
*/
apiLive.getWithdrawalsList(params)
```

```javascript
/* 
  Cancel Withdrawal
  DELETE /api/v1/withdrawals/<withdrawalId>
  params = {
    withdrawalId: string
  }
*/
apiLive.cancelWithdrawal(params)
```

```javascript
/* 
  Transfer Funds
  POST /api/v2/transfer-out
  params = {
    bizNo: string
    amount: number
    currency: string
  }
*/
apiLive.transferFunds(params)
```

```javascript
/*  
  Get Transfer List
  GET /api/v1/transfer-list
  params = {
    startAt: long (unix time) [optional]
    endAt: long (unix time) [optional]
    status: string [optional]
    currency: string
  }
*/
apiLive.getTransferList(params)
```

```javascript
/* 
  Cancel Withdrawal
  DELETE /api/v1/cancel/transfer-out
  params = {
    applyId: string
  }
*/
apiLive.cancelWithdrawal(params)
```

## Trade Endpoints (Private)

```javascript
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
apiLive.placeOrder(params)
```

```javascript
/* 
  Cancel an order (including a stop order)
  DELETE /api/v1/orders/<order-id>
  params = {
    id: order-id
  }
*/
apiLive.cancelOrder(params)
```

```javascript
/* 
  Cancel all open orders (excluding stop orders)
  DELETE /api/v1/orders
  params = {
    symbol: string [optional]
  }
*/
apiLive.cancelAllOrders(params)
```

```javascript
/* 
  Cancel all untriggered stop orders
  DELETE /api/v1/stopOrders
  params = {
    symbol: string [optional] - Cancel all untriggered stop orders for a specific contract only
  }
*/
apiLive.cancelAllStopOrders(params)
```

```javascript
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
apiLive.getOrders(params) 
```

```javascript
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
apiLive.getStopOrders(params)
```

```javascript
/* 
  Get a list of recent 1000 orders in the last 24 hours.
  GET /api/v1/recentDoneOrders
*/
apiLive.getRecentOrders()
```

```javascript
/* 
  Get a single order by order id (including a stop order)
  GET /api/v1/orders/<order-id>?clientOid=<client-order-id>
  params = {
    oid: order-id,
    cid: client-order-id [optional] - oid (order-id) must be undefined
  }
*/
apiLive.getOrderById(params)
```

```javascript
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
apiLive.listFills(params)
```

```javascript
/* 
  List Your Recent Fills: max 1000 fills in the last 24 hours, all symbols
  GET /api/v1/recentFills
*/
apiLive.recentFills()
```

```javascript
/* 
  Active Order Value Calculation
  GET /api/v1/openOrderStatistics
  params: {
    symbol: string
  }
*/
apiLive.getOpenOrderStatistics(params)
```

```javascript
/* 
  Get the position details of a specified position.
  GET /api/v1/position
  params: {
    symbol: string
  } 
*/
apiLive.getPosition(params)
```

```javascript
/* 
  Get all the positions
  GET /api/v1/positions
*/
apiLive.getAllPositions()
```

```javascript
/* 
  Enable/Disable of Auto-Deposit Margin
  POST /api/v1/position/margin/auto-deposit-status
  params = {
    symbol: string - Symbol of the contract
    status: boolean - Status
  }
*/
apiLive.changeAutoDeposit(params)
```

```javascript
/* 
  Add Margin Manually
  POST /api/v1/position/margin/deposit-margin
  params = {
    symbol: string - Ticker symbol of the contract
    margin: number - Margin amount (min. margin amount≥0.00001667XBT）
    bizNo: string - A unique ID generated by the user
  }
*/
apiLive.addMargin(params)
```

```javascript
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
apiLive.getFundingHistory(params)
```

## Websockets

The websocket component of the API wrapper is utilized by initializing websockets based on topics that match Kucoin endpoints. These include:

- 'ticker'
- 'tickerv2'
- 'orderbook'
- 'execution'
- 'fullMatch'
- 'depth5'
- 'depth50' 
- 'market'
- 'announcement'
- 'snapshot'
- 'ordersMarket' (private)
- 'orders' (private)
- 'advancedOrders' (private)
- 'balances' (private)
- 'position' (private)


To initialize a websocket, provide the paramaters and an event handler. A simple example is as follows:

```javascript
// Parameters 
params = {
  topic: enum (see above)
  symbols: array (ignored if not required by the endpoint, single array element if single, multiple if desired)
}

// Public streaming websocket for the orderbook of the provide symbol(s)
apiLive.initSocket({topic: "orderbook", symbols: ['KCS-BTC']}, (msg) => {
  let data = JSON.parse(msg)
  console.log(data)
})

// Private streaming websocket for account balances
apiLive.initSocket({topic: "balances"}, (msg) => {
  let data = JSON.parse(msg)
  console.log(data)
})
```

The event handler can be programmed to manipulate/store the returned websocket stream data as desired.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) ![Language: Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Framework: Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)