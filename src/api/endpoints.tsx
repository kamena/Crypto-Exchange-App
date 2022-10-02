import axios from 'axios'

const baseUrls = {
  binance: 'https://api.binance.com/api/v3/',
  kraken: 'https://api.kraken.com/0/public/',
  huobi: 'https://api.huobi.pro/market/',
  bitfinex: 'https://api-pub.bitfinex.com/v2/'
}

enum Platforms {
  Binance = 'Binance',
  Kraken = 'Kraken',
  Huobi = 'Huobi',
  Bitfinex = 'Bitfinex'
}

const getBinanceAvgPrice = (symbol: string) => {
  return axios.get(`${baseUrls.binance}avgPrice`, {
    params: { symbol: symbol.toUpperCase() }
  })
  .then((res) => ({
    platform: Platforms.Binance,
    price: res.data.price,
    symbol
  }))
  .catch(err => ({
    platform: Platforms.Binance,
    error: err,
    symbol
  }))
}

const getBitfinexSymbolPrice = (symbol: string) => {
  return axios.get(`${baseUrls.bitfinex}ticker/t${symbol.toUpperCase()}`)
    .then((res) => ({
      platform: Platforms.Bitfinex,
      price: res.data[9],
      symbol
    }))
    .catch(err => ({
      platform: Platforms.Bitfinex,
      error: err,
      symbol
    }))
}

const getKrakenAvgPrice = (symbol: string) => {
  return axios.get(`${baseUrls.kraken}Ticker`, {
    params: { pair: symbol }
  })
  .then((res) => Object.values(res.data.result).map(data => ({
    platform: Platforms.Kraken,
    price: (data as any).c[0],
    symbol
  })))
  .catch(err => ({
    platform: Platforms.Kraken,
    error: err,
    symbol
  }))
}

const getHuobiSymbolPrice = (symbol: string) => {
  return axios.get(`${baseUrls.huobi}detail/merged`, {
    params: { symbol: symbol.toLowerCase() }
  })
  .then((res) => {
    if (res.data.status === 'error') return { error: res.data['err-msg'] }
    return {
      platform: Platforms.Huobi,
      price: res.data.tick.close,
      symbol
    }
  })
  .catch(err => ({
    platform: Platforms.Huobi,
    error: err,
    symbol
  }))
}

export interface ISymbolPrice {
  symbol: string
  platform?: string
  price?: number | string
  error?: any
}

export const getAvgPrice = (symbol: string) => {
  const formatSymbol = symbol.replace('/','')
  const binance = getBinanceAvgPrice(formatSymbol)
  const kraken = getKrakenAvgPrice(formatSymbol)
  const huobi = getHuobiSymbolPrice(formatSymbol)
  const bitfinex = getBitfinexSymbolPrice(formatSymbol)

  return Promise.all([binance, kraken, huobi, bitfinex]).then(res => res.flat(1))
}

export interface ISymbolHistory {
  id: number,
  platform?: string
  price: string,
  qty: string,
  quoteQty?: string | number
  time?: number
}

const getBinanceSymbolHistory = (symbol: string): Promise<ISymbolHistory[]> => {
  return axios.get(`${baseUrls.binance}trades`, {
    params: {
      symbol: symbol.toUpperCase(),
      limit: 10
    }
  }).then((res) => res.data)
}

const getKrakenSymbolHistory = (symbol: string): Promise<ISymbolHistory[]> => {
  return axios.get(`${baseUrls.kraken}Trades`, {
    params: {
      pair: symbol.toUpperCase()
    },
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  })
  .then((res) => Object.values(res.data.result).map(data => ({
    id: (data as any)[2],
    price: (data as any)[0],
    qty: (data as any)[1],
    quoteQty: (Number((data as any)[0]) * Number((data as any)[1]))
  })))
}

const getBitfinexSymbolHistory = (symbol: string) => {
  return axios.get(`${baseUrls.bitfinex}trades/t${symbol.toUpperCase()}/hist`).then((res) => res.data)
}


interface IHuobiHistoryTrade {
  id: number,
  ts: number,
  'trade-id': number,
  amount: number,
  price: number,
  direction: 'buy' | 'sell'
}

interface IHuobiHistory {
  id: number
  ts: number
  data: IHuobiHistoryTrade[]
}

const getHuobiSymbolHistory = (symbol: string) => {
  return axios.get(`${baseUrls.huobi}history/trade`, {
    params: {
      symbol: symbol.toLowerCase(),
      size: 10
    }
  }).then((res) => {
    return res.data.data.map((trades: IHuobiHistory) => (
      trades.data.map((trade) => ({
        id: trade['trade-id'],
        time: trade.ts,
        qty: trade.amount,
        price: trade.price,
        quoteQty: trade.amount * trade.price
      }))
    )).flat(1)
  })
}

export const getSymbolHistory = (symbol: string, platform?: string): Promise<ISymbolHistory[]> => {
  switch (platform) {
    case Platforms.Binance:
      return getBinanceSymbolHistory(symbol)
    case Platforms.Kraken:
      return getKrakenSymbolHistory(symbol)
    case Platforms.Bitfinex:
      return getBitfinexSymbolHistory(symbol)
    case Platforms.Huobi:
      return getHuobiSymbolHistory(symbol)
    default:
      return getBinanceSymbolHistory(symbol)
  }
  
}
