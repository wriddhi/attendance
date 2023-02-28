import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import ViewHeader from '../utils/ViewHeader'
import { useState, useRef } from 'react'
import csvtojson from 'csvtojson'
import xlsx from 'xlsx'

const UploadData = () => {

  const [data, setData] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()

    const upload = await fetch('/api/uploadData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const handleFileConversion = async (e) => {

    const file = e.target.files[0]

    console.log('Uploading file', file)

    if (file.type === 'text/csv') {
      const csvData = await file.text()
      const json = await csvtojson().fromString(csvData)
      setData(json)
      console.log(json)
    }
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Upload Data" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <form className='w-11/12 mx-auto flex flex-col gap-4 p-4' onSubmit={handleUpload}>
          <input type="file" onChange={handleFileConversion} required
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            className="file-input file-input-bordered file-input-secondary w-full" />
          <button
            className='bg-accent w-fit mx-auto p-3 rounded-md text-white font-bold shadow-lg shadow-black flex justify-center items-center gap-2'
            type="submit">
            Upload
            <DocumentArrowUpIcon className='h-5' />
          </button>
        </form>
        
      </section>
    </main>
  )
}

export default UploadData