import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import ViewHeader from '../utils/ViewHeader'


const ExportAttendance = () => {

  const handleUpload = (e) => {
    e.preventDefault()
    console.log('Uploading file')
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Export Attendance" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <form className='w-11/12 mx-auto flex flex-col gap-4 p-4' onSubmit={handleUpload}>
          <input type="file" required
          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          className="file-input file-input-bordered file-input-secondary w-full" />
          <button 
          className='bg-accent w-fit mx-auto p-3 rounded-md text-white font-bold shadow-lg shadow-black flex justify-center items-center gap-2' 
          type="submit">
            Upload
            <DocumentArrowUpIcon className='h-5'/>
          </button>
        </form>
      </section>
    </main>
  )
}

export default ExportAttendance