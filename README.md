# kucoin-futures-node

Just a Kucoin Futures version of https://github.com/escwdev/kucoin-node-api/

## Installation

`npm install kucoin-futures-node`

Alternatively, you can clone/download the repository and import into your project by file path.

## Getting Started

To begin using the API wrapper, require it, create a config object that contains your API key, Secret key and Passphrase provided by Kucoin. Create an instantiation of the class then run the custom init() function with your config object as a parameter. If you are only using Public endpoints, the config object only requires the environment key/value pair. 

Example code is as follows:

```javascript 
const api = require('./kucoin-futures-node')

const config = {
  apiKey: 'xXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxXXX',
  secretKey: 'xxxxxxxxXXXXXXXXXXXXXxxXXXXXXXXXXXXXxxxXXX',
  passphrase: 'xxxxxx',
  environment: 'live'
}

const apiLive = new api()
apiLive.init(config)
```
