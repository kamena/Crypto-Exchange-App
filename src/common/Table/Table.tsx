import React, { useEffect, useState } from 'react'
import TableItem from './TableItem'
import TableRow from './TableRow'

import './Table.scss'
import Loader from '../Loader/Loader'
import SortIcon from '../SortIcon'

export type ColumnsType = {
  heading: string
  value: string
  format?: (value: any) => void
  className?: string
  sort?: boolean
  align?: 'left' | 'right' | 'center' | string
  required?: boolean
}

interface TableProps<T> {
  columns: ColumnsType[]
  data: T[]
  loading?: boolean;
  onClick?: (item: T) => void
  rowKey?: string
}

const Table = <T extends {[key: string]: any}>(props: TableProps<T>): JSX.Element => {
  const { columns, data, loading, rowKey = "id", onClick } = props;
  const [sortedData, setSortedData] = useState<T[]>([])
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (!data) setSortedData([])
    setSortedData(data)
  }, [data])

  const tableHeader = columns.map((item) => (
    <TableItem
      key={item.value}
      className={item.className}
      align={item.align}
      onClick={() => handleSortingChange(item)}
    >
      {item.heading}
      {item.sort && <SortIcon order={item.value === sortField ? order : undefined}/>}
    </TableItem>
  ))

  const handleSortingChange = (item: ColumnsType) => {
    if (!item.sort) return
    const sortOrder = item.value === sortField && order === "asc" ? "desc" : "asc";
    setSortField(item.value);
    setOrder(sortOrder);
    handleSorting(item.value, sortOrder);
   };

  const handleSorting = (key: string, order: string) => {
    setSortedData((prevData) => prevData.sort((a, b) => {
      // return a[key].toString().localeCompare(b[key].toString(), "en", {
      //   numeric: true,
      //  }) * (key === "asc" ? 1 : -1)
      return order === 'asc' ? (a[key] < b[key] ? -1 : 1) : (a[key] > b[key] ? -1 : 1)
    }))
  }

  const tableData = sortedData.map((item) => {
    const requiredColumn = columns.find((column) => column.required)
    if (requiredColumn && item[requiredColumn.value as string] === undefined) return null

    return <TableRow<T> key={item[rowKey]} item={item} columns={columns} onClick={onClick} />
  }).filter((el) => el)

  return (
    <div className='table'>
      <header className='table-header'>
        {tableHeader}
      </header>
      <div className='table-body'>
        {tableData.length === 0 && !loading && <p>No data found!</p>}
        {loading ? <Loader /> : tableData}
      </div>
    </div>
  )
}

export default Table
