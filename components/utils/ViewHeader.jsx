import React from 'react'

const ViewHeader = ({title}) => {
  return (
    <h1 className="text-3xl text-pink font-bold w-full
     p-4 pt-16 text-center sticky top-0 bg-dark">
      <span className='mx-auto'>{title}</span>
    </h1>
  )
}

export default ViewHeader