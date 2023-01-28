import { useState } from 'react'
import ViewHeader from '../utils/ViewHeader'
import { DocumentArrowDownIcon } from '@heroicons/react/24//outline'

const DownloadData = () => {

  const [allTime, setAllTime] = useState(false)

  const handleDownload = (e) => {
    e.preventDefault()
    console.log('Downloading data')
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Download Data" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <form className='w-11/12 mx-auto flex flex-col gap-4 p-4' onSubmit={handleDownload}>
          <div className="form-control w-full flex">
            <label className="cursor-pointer label">
              <span className="label-text text-white">Download data for</span>
              <input onChange={(e) => {setAllTime(!allTime)}} type="checkbox" className="toggle shadow-red-500 toggle-secondary" />
              <span className={`label-text ${allTime ? "text-pink" : "text-slate-400"}`}>All Time</span>
            </label>
          </div>
          {
            !allTime ? (
              <div className="form-control w-full gap-3 text-white">
                <label className='mt-5' htmlFor="start">Start Date : </label>
                <input className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="start" />
                <label className='mt-5' htmlFor="end">End Date : </label>
                <input className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="end" />
              </div>
            ) : 
            null
          }
          <button
            className='bg-accent w-fit mx-auto p-3 rounded-md text-white font-bold shadow-lg shadow-black flex justify-center items-center gap-2'
            type="submit">
            Download
            <DocumentArrowDownIcon className='h-5' />
          </button>
        </form>
      </section>
    </main>
  )
}

export default DownloadData