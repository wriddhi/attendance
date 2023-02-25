import { useState, useEffect } from 'react'
import ViewHeader from '../utils/ViewHeader'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const AttendanceCard = ({ employee }) => {

  const date = new Date()
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return (
    <div className='w-full flex gap-4 p-4 bg-accent text-white rounded-md'>
      <UserCircleIcon className='h-12' />
      <section className='font-bold w-full flex flex-col'>
        <div className='flex justify-start items-center'>
          <span> {employee.employeeName} </span>
          <span className='text-slate-300 ml-auto font-base'> {date.toLocaleDateString()} </span>
        </div>
        <div className='flex justify-start items-center'>
          <span className='text-pink text-xs'> {employee.department} </span>
          <span className='text-pink text-xs ml-auto font-base'>{time}</span>
        </div>
      </section>
      <div>
      </div>
    </div>
  )
}

const AttendanceList = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState("all")

  const departments = data?.map(emp => emp.department)

  useEffect(() => {
    setLoading(true)
    fetch('/api/getAttendance')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className='bg-dark min-h-screen'>
      <ViewHeader title={"Attendance List"} />
      <section className='w-full flex flex-col gap-4'>
        {isLoading ? <p>Loading...</p> : null}
        {!isLoading && !data ? <p>No data</p> : null}
        {data ?
          <div className='w-full flex flex-col gap-4 p-4'>
            {data.map((employee) => (<AttendanceCard employee={employee} key={employee.employeeCode} />))}
          </div>
          : null}
      </section>
    </main>
  )
}

export default AttendanceList