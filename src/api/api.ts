import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

const binanceClient = axios.create({
  baseURL: 'https://api.binance.com',
  headers
})

const bitfinexClient = axios.create({
  baseURL: 'https://api-pub.bitfinex.com/v2/',
  headers
});

const huobiClient = axios.create({
  baseURL: 'https://api.huobi.pro/',
  headers
})

const krakenClient = axios.create({
  baseURL: 'https://api.kraken.com/0/public/',
  headers
})

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   }, 
//   function (error) {
//     let res = error.response;
//     if (res.status == 401) {
//       window.location.href = 'https://example.com/login';
//     }
//     console.error(`Looks like there was a problem. Status Code: ${res.status}`);
//     return Promise.reject(error);
//   }
// );

export {
  binanceClient,
  bitfinexClient,
  huobiClient,
  krakenClient
};
