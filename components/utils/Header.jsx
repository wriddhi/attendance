import React from 'react'

const Header = ({title}) => {
  return (
    <h1 className="text-3xl mt-10 text-pink font-bold w-full bg-black/20 p-4 text-center">{title}</h1>
  )
}

export default Header