import Link from 'next/link'
import React from 'react'

const Card = ({ title, icon }) => {

  const route = (title.toLowerCase()).split(" ").join("-")
  
  return (
    <Link href={`/dashboard/${route}`}>
      <div className='bg-accent aspect-square rounded-md flex flex-col items-center justify-center gap-4 p-2 group'>
        <span>{icon}</span>
        <span className='text-xl font-bold text-center transition-all group-hover:text-pink'>{title}</span>
      </div>
    </Link>
  )
}

export default Card