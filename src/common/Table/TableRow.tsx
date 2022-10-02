import React from 'react'
import { ColumnsType } from './Table'
import TableItem from './TableItem'

interface TableRowProps<T> {
  item: T,
  columns: ColumnsType[]
  onClick?: (item: T) => void
}

const TableRow = <T extends {[value: string]: any}>(props: TableRowProps<T>) => {
  const { item, columns, onClick } = props

  return (
    <div className='row' onClick={() => onClick && onClick(item)}>
      {columns.map((column) => {
        const itemData = item[column.value] || '-'
        return (
          <TableItem key={`${column.value}-${itemData}`} align={column.align}>
            {column.format ? column.format(itemData) : itemData}
          </TableItem>
        )
      })}
    </div>
  )
}

export default TableRow
