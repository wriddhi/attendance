import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import ViewHeader from '../utils/ViewHeader'
import { useState, useRef } from 'react'

import Papa from 'papaparse'
import XLSX from 'xlsx'

const UploadData = () => {

  const [data, setData] = useState(null)
  const fileRef = useRef()

  const handleUpload = async (e) => {
    e.preventDefault()
  }

  const handleFileConversion = (e) => {

    const file = e.target.files[0]

    console.log('Uploading file', file)

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      const fileType = file.type;

      if (fileType === 'text/csv') {
        const results = Papa.parse(fileData, { header: true });
        setJsonData(results.data)
      } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const workbook = XLSX.read(fileData, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const results = XLSX.utils.sheet_to_json(sheet)
        setJsonData(results)
      } else {
        alert('Unsupported file format. Please upload a CSV or XLSX file.')
      }
    };
    reader.readAsBinaryString(file)
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
        {data && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </section>
    </main>
  )
}

export default UploadData