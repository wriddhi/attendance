import { useRef, useState } from 'react'
import ViewHeader from '../utils/ViewHeader'
import { DocumentArrowDownIcon } from '@heroicons/react/24//outline'


import json2csv from 'json2csv'
import download from 'downloadjs'

import axios from 'axios'

const DownloadData = () => {

  const [allTime, setAllTime] = useState(false)

  const [start, setStart] = useState(new Date().toISOString().split('T')[0])
  const [end, setEnd] = useState(new Date().toISOString().split('T')[0])

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Download Data" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <form className='w-11/12 mx-auto flex flex-col gap-4 p-4'>
          <div className="form-control w-full flex">
            <label className="cursor-pointer label">
              <span className="label-text text-white">Download data for</span>
              <input onChange={(e) => {
                setAllTime(!allTime)
              }} type="checkbox" className="toggle shadow-red-500 toggle-secondary" />
              <span className={`label-text ${allTime ? "text-pink" : "text-slate-400"}`}>All Time</span>
            </label>
          </div>
          {
            !allTime ? (
              <div className="form-control w-full gap-3 text-white">
                <label className='mt-5' htmlFor="start">Start Date : </label>
                <input value={start} onChange={(e) => {setStart(e.target.value)}} required className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="start" />
                <label className='mt-5' htmlFor="end">End Date : </label>
                <input value={end} onChange={(e) => {setEnd(e.target.value)}} required className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="end" />
              </div>
            ) :
              null
          }
          {
            allTime ? (
              <a download className='bg-pink text-white font-bold p-3 rounded-md text-center' href="/api/download?type=employee&all=true">
                Download
              </a>
            ) : (
              <a download className='bg-pink text-white font-bold p-3 rounded-md text-center' href={`/api/download?type=employee&start=${start}&end=${end}`}>
                Download
              </a>
            )
          }
        </form>
      </section>
    </main>
  )
}

export default DownloadData