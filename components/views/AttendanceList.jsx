import { useState, useEffect } from 'react'
import ViewHeader from '../utils/ViewHeader'
import { UserCircleIcon } from '@heroicons/react/24/outline'

import Spinner from '../utils/Spinner'

const AttendanceCard = ({ employee }) => {

  const date = new Date()
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return (
    <div className='w-full flex gap-4 p-4 bg-accent text-white rounded-md'>
      <UserCircleIcon className='h-12' />
      <section className='font-bold w-full flex flex-col'>
        <div className='flex justify-start items-center'>
          <span> {employee.fullname} </span>
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

  const [isLoading, setLoading] = useState(true)

  const [dateFilter, setDateFilter] = useState((new Date()).toISOString().split('T')[0])
  const [shiftFilter, setShiftFilter] = useState('all')

  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/getAttendance?date=${dateFilter}&shift=${shiftFilter}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [dateFilter, shiftFilter])

  return (
    <main className='bg-dark min-h-screen'>
      <ViewHeader title={"Attendance List"} />
      <section className='w-full flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-col justify-center items-center w-11/12 mx-auto mt-4 gap-3'>
          <label htmlFor="date" className="text-white w-full font-bold">Select a date</label>
          <input name="date" type="date" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value) }} className='input input-bordered input-secondary bg-accent text-white w-full' />
          <label htmlFor="department" className="text-white w-full font-bold">Select department</label>
          <select onChange={(e) => { setShiftFilter(e.target.value) }} value={shiftFilter}
            className="select select-secondary w-full max-w-xs bg-accent text-white">
            <option value="all" selected>All</option>
            {
              ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"].map((shift) => {
                return <option value={shift} key={shift}>{shift}</option>
              })
            }
          </select>
        </div>
        {isLoading && <Spinner size={100} />}
        {!isLoading && data.length == 0 ? <p className='text-white font-bold my-24 p-4 text-center'>No attendance was taken for {shiftFilter} shift on {dateFilter}</p> : null}
        {data.length > 0 ?
          <div className='w-full flex flex-col gap-4 p-4'>
            {data.map((employee) => (<AttendanceCard employee={employee} key={employee.id} />))}
          </div>
          : null
        }
      </section>
    </main>
  )
}

export default AttendanceList