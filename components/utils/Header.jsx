import React from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import { signOut } from 'next-auth/react'

const Header = ({title}) => {
  return (
    <h1 className="text-3xl text-pink font-bold w-full
     p-4 pt-16 text-center sticky top-0 bg-dark
     grid grid-cols-[1fr_8fr_1fr] place-items-center">
      <span></span>
      <span className='mx-auto'>{title}</span>
      <HiOutlineLogout onClick={() => {
        signOut({redirect: true, callbackUrl: '/'})
      }}/>
    </h1>
  )
}

export default Header