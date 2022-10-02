import axios from 'axios';

const binanceClient = axios.create({
  baseURL: 'https://api.binance.com/api/v3/'
})

const bitfinexClient = axios.create({
  baseURL: 'https://api-pub.bitfinex.com/v2/'
});

const huobiClient = axios.create({
  baseURL: 'https://api.huobi.pro/market/'
})

const krakenClient = axios.create({
  baseURL: 'https://api.kraken.com/0/public/'
})

export {
  binanceClient,
  bitfinexClient,
  huobiClient,
  krakenClient
};
