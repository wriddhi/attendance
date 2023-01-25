import { useState, useEffect } from 'react'
import Camera from '../Camera'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'
import VideoCam from '../utils/VideoCam'

const Attendance = () => {

  const [departments, setDepartments] = useState([])
  const [stage, setStage] = useState(1)

  useEffect(() => {
    fetch('/api/user?filter=department').then(res => res.json()).then(dept => setDepartments(dept))
  }, [])


  const proceedEntry = (e) => {
    e.preventDefault()
    console.log('Proceeding to click photo')
    setStage(2)
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Attendance" />
      {
        stage === 1 ?
          <section className={`w-11/12 mx-auto flex`}>
            <form className='w-full flex flex-col gap-8 mt-8' onSubmit={proceedEntry} >
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Shift</label>
                <select name="department" id="department" required
                  className='w-full bg-accent rounded-md p-4 ring-2 ring-pink font-bold text-white ring-offset-pink'>
                  <option disabled selected>Select a shift</option>
                  {
                    ['A1', 'A2', 'B1', 'B2', 'G1', 'G2'].map(shift => (
                      <option value={shift} key={shift}>{shift}</option>
                    ))
                  }
                </select>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Department</label>
                <select name="department" id="department" required
                  className='w-full bg-accent rounded-md p-4 ring-2 ring-pink font-bold text-white ring-offset-pink'>
                  <option disabled selected>Select a department</option>
                  {
                    departments.map(dept => (
                      <option value={dept} key={dept}>{dept}</option>
                    ))
                  }
                </select>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Unit</label>
                <select name="department" id="department" required
                  className='w-full bg-accent rounded-md p-4 ring-2 ring-pink font-bold text-white ring-offset-pink'>
                  <option disabled selected>Select a unit</option>
                  {
                    ["Main", "Option", "Option", "Option"].map((unit, index) => (
                      <option value={unit} key={index}>{unit}</option>
                    ))
                  }
                </select>
              </div>
              <div className='w-full flex justify-evenly items-center gap-4'>
                <button type='reset' className='w-full bg-dark border-solid border-2 border-white text-white p-3 rounded-md font-bold'>
                  <Link href='/dashboard'>
                    Cancel
                  </Link>
                </button>
                <button type='submit' className='w-full bg-pink text-white p-3 rounded-md font-bold'>
                  Confirm
                </button>
              </div>
            </form>
          </section>
          : 
          <VideoCam/>
      }
    </main>
  )
}

export default Attendance