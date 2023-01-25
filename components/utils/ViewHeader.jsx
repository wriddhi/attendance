import Link from 'next/link'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'

const ViewHeader = ({ title }) => {

  return (
      <h1 className="text-xl text-pink font-bold w-full p-4 pt-16 text-center sticky top-0 bg-dark
      grid grid-cols-[1fr_5fr_1fr] place-items-center">
        <Link href="/dashboard">
          <FaChevronLeft className='h-6 w-6 text-pink' />
        </Link>
        <span className='mx-auto'>{title}</span>
      </h1> 
  )
}

export default ViewHeader