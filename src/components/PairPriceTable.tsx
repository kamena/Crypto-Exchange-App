import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getSymbolHistory, ISymbolHistory } from '../api/endpoints'
import ErrorMsg from '../common/ErrorMsg/Error'
import Modal from '../common/Modal/Modal'
import Table from '../common/Table/Table'
import { formatMoney } from '../utils/helpers'
import { pairSymbol } from './PairPrice.slice'
import SymbolHistory from './SymbolHistory'

interface PairPriceType {
  platform?: string
  symbol: string
  price?: number
}

interface PairPriceTableProps {
  data: PairPriceType[]
  loading?: boolean
}

const PairPriceTable: React.FC<PairPriceTableProps> = ({data, loading}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openedItemData, setOpenedItem] = useState<ISymbolHistory[]>([])
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false)
  const [errorHistory, setErrorHistory] = useState<boolean>(false)

  const searchedSymbol = useSelector(pairSymbol)
  const { symbol } = useParams()
  const location = useLocation()

  const handleRowClick = useCallback(async (item: PairPriceType) => {
    setIsOpen(true)
    setLoadingHistory(true)
    errorHistory && setErrorHistory(false)
    await getSymbolHistory(item.symbol, item.platform)
      .then((res) => setOpenedItem(res))
      .catch(() => setErrorHistory(true))
      .finally(() => setLoadingHistory(false))
  }, [errorHistory])

  useEffect(() => {
    if (location.pathname.includes('/details') && symbol) {
      handleRowClick({symbol})
    }
  }, [location.pathname, symbol, handleRowClick])
  
  const columns = [
    {
      heading: 'Platform',
      value: 'platform'
    },
    {
      heading: 'Symbol',
      value: 'symbol',
      align: 'center'
    },
    {
      heading: 'Price',
      value: 'price',
      format: formatMoney,
      align: 'right',
      sort: true,
      required: true
    }
  ]

  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Table<PairPriceType> rowKey='platform' onClick={handleRowClick} loading={loading} columns={columns} data={data} />
      <Modal title={`History Trades ${searchedSymbol ? `for ${searchedSymbol}` : ''}`} open={isOpen} onClose={handleModalClose}>
        {errorHistory && <ErrorMsg msg='Issue fetching history data!' />}
        {openedItemData && !errorHistory && <SymbolHistory data={openedItemData} loading={loadingHistory} />}
      </Modal>
    </>
  )
}

export default PairPriceTable
