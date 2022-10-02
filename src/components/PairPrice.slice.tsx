import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ISymbolPrice {
  symbol: string
  platform: string
  price: number | string
  error?: any
}

interface IInitialState {
  data: ISymbolPrice[],
  symbol?: string
}

const initialState: IInitialState = {
  data: [],
  symbol: undefined
}

export const pairPriceSlice = createSlice({
  name: 'pairPrices',
  initialState,
  reducers: {
    updatePairPrices: (state, action) => void(state.data = action.payload),
    updateSymbol: (state, action) => void(state.symbol = action.payload)
  },
})

// Action creators are generated for each case reducer function
export const { updatePairPrices, updateSymbol } = pairPriceSlice.actions

export const pairPricesStore = (state: RootState) => state.pairPrices
export const pairSymbol = (state: RootState) => state.pairPrices.symbol

export default pairPriceSlice.reducer