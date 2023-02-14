import { useState, useEffect, useRef } from 'react'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'
import VideoCam from '../utils/VideoCam'
import axios from 'axios'

const Attendance = () => {

  const [departments, setDepartments] = useState([])
  const [stage, setStage] = useState(1)

  const [shift, setShift] = useState(null)
  const [department, setDepartment] = useState(null)
  const [unit, setUnit] = useState(null)

  useEffect(() => {
    fetch('/api/user?filter=department').then(res => res.json()).then(dept => setDepartments(dept))
  }, [])


  const proceedEntry = (e) => {
    e.preventDefault()
    console.log('Proceeding to click photo')
    console.log("Unit", unit)
    console.log("Shift", shift)
    console.log("Department", department)
    setStage(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://4e9d-2405-201-8014-99d0-2898-ac7b-66d1-cbed.in.ngrok.io/att/";
  };

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Attendance" />
      {
        stage === 1 ?
          <section className={`w-11/12 mx-auto flex`}>
            <form className='w-full flex flex-col gap-8 mt-8' onSubmit={proceedEntry} >
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Shift</label>
                <select onChange={(e) => {setShift(e.target.value)}} name="shift" id="shift" required
                  className='select select-secondary w-full max-w-xs font-bold bg-accent text-white'>
                  <option value="" disabled selected>Select a shift</option>
                  {
                    ['A1', 'A2', 'B1', 'B2', 'G1', 'G2', 'C1', 'C2'].map(shift => (
                      <option value={shift} key={shift}>{shift}</option>
                    ))
                  }
                </select>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Department</label>
                <select onChange={(e) => {setDepartment(e.target.value)}}  name="department" id="department" required
                  className='select select-secondary w-full max-w-xs font-bold bg-accent text-white'>
                  <option value="" disabled selected>Select a department</option>
                  {
                    departments.map(dept => (
                      <option value={dept} key={dept}>{dept}</option>
                    ))
                  }
                </select>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Unit</label>
                <select onChange={(e) => {setUnit(e.target.value)}}  name="unit " id="unit" required
                  className='select select-secondary w-full max-w-xs font-bold bg-accent text-white'>
                  <option value="" disabled selected>Select a unit</option>
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
                <button type='submit' className='w-full bg-pink text-white p-3 rounded-md font-bold' >
                  Confirm
                </button>
              </div>
            </form>
          </section>
          :
          <VideoCam action={{
            label: "Upload", perform: async (video) => {
              const formData = new FormData()
              formData.append('video', video)
              formData.append('shift', shift)
              formData.append('department', department)
              formData.append('unit', unit)
              formData.append('submit', 'submit')

              try {
                await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URI}/predict`, {
                  method: 'POST',
                  body: formData
                })
              } catch (error) {
                console.log("Error => ", error)
              }

              console.log("Uploaded video")
            }
          }} />
      }
    </main>
  )
}

export default Attendance