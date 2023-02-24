import { useRef, useState } from 'react'
import ViewHeader from '../utils/ViewHeader'
import { DocumentArrowDownIcon } from '@heroicons/react/24//outline'

import CsvDownloadButton from 'react-json-to-csv'
import axios from 'axios'

const AttendanceReport = () => {

  const [allTime, setAllTime] = useState(false)
  const [data, setData] = useState([])

  const fromRef = useRef(null)
  const toRef = useRef(null)

  const handleDownload = async (e) => {
    e.preventDefault()

    if (allTime) {
      // Download all data
      try {
        const response = await axios.get('/api/download?type=attendance&all=true').then(data => data)
        console.log(response)
        setData(response.data)

      } catch (error) {
        console.log(error)
      }
    } else {
      // Download data for a specific period
      const start = document.getElementById('start').value
      const end = document.getElementById('end').value

      try {
        const start = fromRef.current.value
        const end = toRef.current.value

        const response = await axios.get(`/api/download?type=attendance&start=${start}&end=${end}`).then(data => data)
        console.log(response)
        setData(response.data)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Download Data" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <form className='w-11/12 mx-auto flex flex-col gap-4 p-4' onSubmit={handleDownload}>
          <div className="form-control w-full flex">
            <label className="cursor-pointer label">
              <span className="label-text text-white">Download data for</span>
              <input onChange={(e) => {
                setAllTime(!allTime)
                setData([])
              }} type="checkbox" className="toggle shadow-red-500 toggle-secondary" />
              <span className={`label-text ${allTime ? "text-pink" : "text-slate-400"}`}>All Time</span>
            </label>
          </div>
          {
            !allTime ? (
              <div className="form-control w-full gap-3 text-white">
                <label className='mt-5' htmlFor="start">Start Date : </label>
                <input required ref={fromRef} className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="start" />
                <label className='mt-5' htmlFor="end">End Date : </label>
                <input required ref={toRef} className='bg-accent w-full p-2 rounded-md outline-pink outline' type="date" id="end" />
              </div>
            ) :
              null
          }
          <button
            className='bg-accent w-fit mx-auto p-3 rounded-md text-white font-bold shadow-lg shadow-black flex justify-center items-center gap-2'
            type="submit">
            Import Data
            <DocumentArrowDownIcon className='h-5' />
          </button>
          {
            data.length > 0 ? (
              <CsvDownloadButton data={data} filename="data.csv" className='bg-pink w-fit mx-auto p-3 rounded-md text-white font-bold shadow-lg shadow-black flex justify-center items-center gap-2' />
            ) : null
          }
        </form>
      </section>
    </main>
  )
}

export default AttendanceReport