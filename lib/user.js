const axios = require('axios')

const User = {}

/* 
  Get Account Overview
  GET /api/v1/account-overview
  params = {
    currency: string [optional, default: XBT]
  }
*/
User.getAccountOverview = async function (params = {}) {
  let endpoint = '/api/v1/account-overview'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

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
User.getTransactionHist = async function (params = {}) {
  let endpoint = '/api/v1/transaction-history'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Get Deposit Address
  GET /api/v1/deposit-address?currency=<currency>
  params = {
    currency: string
  }
*/
User.getDepositAddress = async function (params) {
  let endpoint = `/api/v1/deposit-address`
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

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
User.getDepositList = async function (params = {}) {
  let endpoint = '/api/v1/deposit-list'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Get Withdrawal Quotas
  GET /api/v1/withdrawals/quotas
  params = {
    currency: string
  }
*/
User.getWithdrawalQuotas = async function (params) {
  let endpoint = '/api/v1/withdrawals/quotas'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

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
User.applyForWithdrawal = async function (params) {
  let endpoint = '/api/v1/withdrawals'
  let url = this.baseURL + endpoint
  let result = await axios.post(url, params, this.sign(endpoint, 'POST', params))
  return result.data
}

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
User.getWithdrawalsList = async function (params = {}) {
  let endpoint = '/api/v1/withdrawal-list'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Cancel Withdrawal
  DELETE /api/v1/withdrawals/<withdrawalId>
  params = {
    withdrawalId: string
  }
*/
User.cancelWithdrawal = async function (params) {
  let endpoint = '/api/v1/withdrawals/' + params.withdrawalId
  let url = this.baseURL + endpoint
  let result = await axios.delete(url, this.sign(endpoint, 'DELETE'))
  return result.data
}

/* 
  Transfer Funds
  POST /api/v2/transfer-out
  params = {
    bizNo: string
    amount: number
    currency: string
  }
*/
User.transferFunds = async function (params) {
  let endpoint = '/api/v2/transfer-out'
  let url = this.baseURL + endpoint
  let result = await axios.post(url, params, this.sign(endpoint, 'POST', params))
  return result.data
}

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
User.getTransferList = async function (params = {}) {
  let endpoint = '/api/v1/transfer-list'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.get(url, this.sign(endpoint, 'GET', params))
  return result.data
}

/* 
  Cancel Withdrawal
  DELETE /api/v1/cancel/transfer-out
  params = {
    applyId: string
  }
*/
User.cancelWithdrawal = async function (params) {
  let endpoint = '/api/v1/cancel/transfer-out'
  let url = this.baseURL + endpoint + this.formatQuery(params)
  let result = await axios.delete(url, this.sign(endpoint, 'DELETE', params))
  return result.data
}


module.exports = User
