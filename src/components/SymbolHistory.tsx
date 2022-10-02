import React from 'react'
import { ISymbolHistory } from '../api/endpoints'
import Loader from '../common/Loader/Loader'
import Table from '../common/Table/Table'
import { formatDate, formatMoney } from '../utils/helpers'

interface SymbolHistoryProps {
  data: ISymbolHistory[]
  loading?: boolean
}

const SymbolHistory: React.FC<SymbolHistoryProps> = ({data, loading}) => {
  const columns = [
    {
      heading: 'Price',
      value: 'price',
      format: formatMoney
    }, 
    {
      heading: 'Quantity',
      value: 'qty'
    }, 
    {
      heading: 'Quote Quantity',
      value: 'quoteQty',
      format: formatMoney
    },
    {
      heading: 'Time',
      value: 'time',
      format: formatDate,
      align: 'right'
    }
  ]

  if (loading) return <Loader />

  return <Table<ISymbolHistory> columns={columns} data={data} />
}

export default SymbolHistory
