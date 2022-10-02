import React from 'react'
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

interface SortIconProps {
  order?: string
}

const SortIcon: React.FC<SortIconProps> = ({order}) => {
  switch (order) {
    case 'asc':
      return <TiArrowSortedDown />
    case 'desc':
      return <TiArrowSortedUp />
    default:
      return <TiArrowUnsorted />

  }
}

export default SortIcon