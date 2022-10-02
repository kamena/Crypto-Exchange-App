import React from 'react'
import { BiError } from 'react-icons/bi';

import './Error.scss'

interface ErrorProps {
  msg: string
}

const ErrorMsg: React.FC<ErrorProps> = ({msg}) => {
  return (
    <div className="error-container">
      <BiError color="red" size='5em' />
      {msg}
    </div>
  )
}

export default ErrorMsg
