import React from 'react'
import './Page.scss'

interface PageProps {
  title: string,
  children: React.ReactNode
};

const Page: React.FC<PageProps> = ({
  title,
  children
}) => (
  <div className="page">
    <div className="page-title">
      <h2>{title}</h2>
    </div>
    <div className='page-body'>
      {children}
    </div>
  </div>
);

export default Page