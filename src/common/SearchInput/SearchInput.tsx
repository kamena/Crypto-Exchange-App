import React from 'react'
import { FaSearchDollar } from 'react-icons/fa';
import classNames from 'classnames';

import './SearchInput.scss'

interface SearchInputProps {
  placeholder?: string
  label?: string;
  className?: string;
  handleChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ className, label, placeholder = 'Search', handleChange }) => {
  const onChange = (e: any) => {
    handleChange(e.target.value)
  }

  const inputCalss = classNames('search-input-container', {
    [className as string]: className
  })

  return (
    <div className={inputCalss}>
      {label && <label htmlFor='search-input'>{label}</label>}
      <div className='search-input'>
        <FaSearchDollar className='input-icon' />
        <input 
          id="search-input"
          type="search" 
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
    
  )
}

export default SearchInput
