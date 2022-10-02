import React from 'react'
import classNames from 'classnames';

interface TableItemProps {
  align?: 'left' | 'right' | 'center' | string
  className?: string
  children: React.ReactNode 
  onClick?: () => void
}

const TableItem: React.FC<TableItemProps> = ({align, className, onClick, children}) => {
  const itemCalss = classNames('col', {
    [className as string]: className,
    [align as string]: align
  })

  return (
    <div className={itemCalss} onClick={onClick}>
      {children}
    </div>
  )
}

export default TableItem
