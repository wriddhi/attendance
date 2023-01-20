import Head from 'next/head'
import Image from 'next/image'
import Camera from '@/components/Camera'

export default function CameraPage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Camera/>
    </>
  )
}
