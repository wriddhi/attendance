import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SiStarship } from 'react-icons/si'

const Homepage = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const login = (e) => {
    e.preventDefault()
    console.log("Login")

    router.push('/dashboard')
  }

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-accent to-dark flex flex-col justify-start items-center p-8 gap-10 text-white">
      <h1 className="text-3xl font-bold flex gap-2">
        <span className="text-pink">Smart</span>
        <span>Attendance</span>
      </h1>
      <form
        onSubmit={login}
       className="w-11/12 flex flex-col justify-center items-center gap-6 my-auto">
        <SiStarship className="scale-[4] mb-10 text-pink"/>
        <h2 className='text-2xl font-bold'>
          Login to continue
        </h2>
        <input type="text" placeholder="Username" 
        className="w-full p-3 mx-auto rounded-md bg-accent text-white outline-none border-none"
        value={username} onChange={(e) => setUsername(e.target.value)}
        required/>
        <input type="password" placeholder="Password" 
        className="w-full p-3 mx-auto rounded-md bg-accent text-white outline-none border-none"
        value={password} onChange={(e) => setPassword(e.target.value)}
        required/>
        <button type="submit"
        className="bg-pink w-full p-3 rounded-md font-semibold">
          <Link href={'/dashboard'}>LOGIN</Link> 
        </button>
      </form>
    </main>
  )
}

export default Homepage