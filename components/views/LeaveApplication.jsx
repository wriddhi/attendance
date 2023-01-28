import Link from 'next/link'
import React from 'react'
import ViewHeader from '../utils/ViewHeader'

const LeaveApplication = () => {

  const applyForLeave = (e) => {
    e.preventDefault()
    console.log('Leave application submitted')
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Leave Application" />
      <section className='w-11/12 mx-auto flex flex-col justify-center items-center gap-3'>
        <form className='w-full flex flex-col gap-8 mt-8' onSubmit={applyForLeave} >
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='employeeCode' className='text-slate-400'>Employee Code</label>
            <input type="text" name="employeeCode" id="employeeCode"
              className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='employeeName' className='text-slate-400'>Employee Name</label>
            <input type="text" name="employeeName" id="employeeName"
              className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='text-slate-400'>Department</label>
            <select name="department" id="department" required
              className='w-full bg-accent rounded-md p-4 ring-2 ring-pink font-bold text-white ring-offset-pink'>
              <option disabled selected>Select a department</option>
              {/* {
                departments.map(dept => (
                  <option value={dept} key={dept}>{dept}</option>
                ))
              } */}
            </select>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='text-slate-400'>Type of Leave</label>
            <select name="department" id="department" required
              className='w-full bg-accent rounded-md p-4 ring-2 ring-pink font-bold text-white ring-offset-pink'>
              <option disabled selected>Select a type</option>
              {
                ["Paid", "Unpaid", "Authorized", "Unauthorized", "Sick", "Emergency", "Suspended", "Others"].map(dept => (
                  <option value={dept} key={dept}>{dept}</option>
                ))
              }
            </select>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='text-slate-400'>Remarks</label>
            <input type="text" name="remarks" id="remarks"
              className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
          </div>
          <div className='w-full flex justify-evenly items-center gap-4'>
            <button type='reset' className='w-full bg-dark border-solid border-2 border-white text-white p-3 rounded-md font-bold'>
              <Link href='/dashboard'>
                Cancel
              </Link>
            </button>
            <button type='submit' className='w-full bg-pink text-white p-3 rounded-md font-bold'>
              Apply
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default LeaveApplication