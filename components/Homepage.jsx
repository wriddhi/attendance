import React, { useRef } from 'react'
import { SiStarship } from 'react-icons/si'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'

const Homepage = ({ admin }) => {

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const errorRef = useRef(null)

  const router = useRouter()

  const login = async (e) => {
    e.preventDefault()

    try {

      const result = await signIn('credentials', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        redirect: false,
        // callbackUrl: '/dashboard'
      })

      if (result.error) {
        errorRef.current.checked = true
      } else {
        router.push('/dashboard')
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-accent to-dark flex flex-col justify-start items-center p-8 gap-10 text-white">
      <h1 className="text-3xl font-bold flex gap-2 mt-10">
        <span className="text-pink">Face</span>
        <span>In</span>
      </h1>
      <form
        onSubmit={login}
        className="w-11/12 flex flex-col justify-center items-center gap-6 my-auto">
        <SiStarship className="scale-[4] mb-10 text-pink" />
        <h2 className='text-2xl font-bold'>
          Login to continue
        </h2>
        {/* Error popup */}
        <input ref={errorRef} type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-dark relative">
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle bg-pink absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Invalid details!</h3>
            <p className="py-4">Please make sure that the login details are correct!</p>
          </div>
        </div>
        <input name='username' type="text" placeholder="Username" ref={usernameRef}
          className="w-full p-3 mx-auto rounded-md bg-accent text-white outline-none border-none"
          required />
        <input name='password' type="password" placeholder="Password" ref={passwordRef}
          className="w-full p-3 mx-auto rounded-md bg-accent text-white outline-none border-none"
          required />
        <button type="submit"
          className="bg-pink w-full p-3 rounded-md font-semibold">
          {/* <Link href={'/dashboard'}>LOGIN</Link> */}
          LOGIN
        </button>
      </form>
    </main>
  )
}

export default Homepage