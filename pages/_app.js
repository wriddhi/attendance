import '@/styles/globals.css'
import Head from 'next/head'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
