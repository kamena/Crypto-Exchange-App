import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAvgPrice } from '../api/endpoints'
import Page from '../common/Page/Page'
import SearchInput from '../common/SearchInput/SearchInput'
import useDebounce from '../utils/hooks/useDebounce'
import { updateSymbol } from './PairPrice.slice'
import PairPriceTable from './PairPriceTable'

const Home = () => {
  const [searchedValue, setSearchedValue] = useState<string>()
  const debauncedSearchedValue = useDebounce(searchedValue, 600);
  const [list, setList] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const { symbol } = useParams()
  const dispatch = useDispatch()

  let pollingInttervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => clearInterval(pollingInttervalRef.current as ReturnType<typeof setInterval>)
  }, [])

  useEffect(() => {
    if (!symbol) return
    setSearchedValue(symbol)
  }, [symbol])

  const getSymbolPrices = (symbol = searchedValue) => {
    clearInterval(pollingInttervalRef.current as ReturnType<typeof setInterval>)
    if (!symbol) return
    return getAvgPrice(symbol)
      .then((res: any) => {
        setList(res)
        clearInterval(pollingInttervalRef.current as ReturnType<typeof setInterval>)
        pollingInttervalRef.current = setInterval(getSymbolPrices, 30000)
      })
      .catch((err: any) => {
        console.error('Something went wrong: ', err)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!searchedValue || searchedValue === '') return
    setList([])
    setIsLoading(true)
    dispatch(updateSymbol(searchedValue))
    getSymbolPrices(searchedValue)
  }, [debauncedSearchedValue, dispatch])

  return (
    <Page title="Check current market prices of cryptocurrency pairs">
      <SearchInput handleChange={setSearchedValue} />
      <PairPriceTable data={list} loading={isLoading} />
    </Page>
  )
}

export default Home
