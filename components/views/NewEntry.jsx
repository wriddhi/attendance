import React, { useState } from 'react'
import Link from 'next/link'
import ViewHeader from '../utils/ViewHeader'
import VideoCam from '../utils/VideoCam'

const NewEntry = () => {

  const [stage, setStage] = useState(1)

  function proceedEntry(e) {
    e.preventDefault()
    setStage(2)
    console.log('Proceeding to entry')
  }

  return (
    <main className='bg-dark min-h-screen'>
      <ViewHeader title={'New Entry'} />
      {
        stage == 1 ?
          <section className={`w-11/12 mx-auto ${stage == 1 ? "flex" : "hidden"}`}>
            <form className='w-full flex flex-col gap-8 mt-8' onSubmit={proceedEntry} >
              <div className='w-full flex flex-col gap-2'>
                <label htmlFor='employeeCode' className='text-slate-400'>Employee Code</label>
                <input type="text" name="employeeCode" id="employeeCode" required
                  className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label htmlFor='employeeName' className='text-slate-400'>Employee Name</label>
                <input type="text" name="employeeName" id="employeeName" required
                  className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Department</label>
                <select name="department" id="department" required
                  className='select select-secondary w-full max-w-xs font-bold bg-accent text-white'>
                  <option value="" disabled selected>Choose an option</option>
                  {
                    ['IT', 'HR', 'Finance', 'Sales', 'Marketing'].map(dept => (
                      <option value={dept} key={dept}>{dept}</option>
                    ))
                  }
                </select>
              </div>
              {/* <Select placeholder={"Select a value"}/> */}
              <div className='w-full flex justify-evenly items-center gap-4'>
                <button type='reset' className='w-full bg-dark border-solid border-2 border-white text-white p-3 rounded-md font-bold'>
                  <Link href='/dashboard'>
                    Cancel
                  </Link>
                </button>
                <button type='submit' className='w-full bg-pink text-white p-3 rounded-md font-bold'>
                  Proceed
                </button>
              </div>
            </form>
          </section>
          :
          <section className={`${stage == 2 ? "flex" : "hidden"}`}>
            <VideoCam action={{
              label: "Upload", perform: async (video) => {
                //@TODO :~ Add upload button click function here
                console.log(video)
              }
            }} />
          </section>
      }
    </main>
  )
}

export default NewEntry