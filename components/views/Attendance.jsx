import { useState, useEffect, useRef } from 'react'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'
import VideoCam from '../utils/VideoCam'

const Confirm = ({ id }) => {

  if (!id) {
    return <div>No ID {id}</div>
  }

  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(`/api/getUser?id=${id}`).then(res => res.json()).then(data => {
      setUser(data)
    })

  }, [])

  return (
    <section className='w-11/12 mx-auto flex flex-col text-white'>
      <span>
        Employee Id : {id}
      </span>
      <span>
        Employee Name : {user.fullname}
      </span>
      <span>
        Employee Gender : {user.gender}
      </span>
      <span>
        Employee Dob : {user.dob}
      </span>
      <span>
        Employee Phone : {user.phone}
      </span>

    </section>
  )
}

const Attendance = () => {

  const [departments, setDepartments] = useState([])
  const [stage, setStage] = useState(1)

  const [shift, setShift] = useState(null)
  const [department, setDepartment] = useState(null)
  const [unit, setUnit] = useState(null)

  const [id, setId] = useState(null)

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

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Attendance" />
      {
        stage === 1 &&
        <section className={`w-11/12 mx-auto flex`}>
          <form className='w-full flex flex-col gap-8 mt-8' onSubmit={proceedEntry} >
            <div className='w-full flex flex-col gap-2'>
              <label className='text-slate-400'>Shift</label>
              <select onChange={(e) => { setShift(e.target.value) }} name="shift" id="shift" required
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
              <select onChange={(e) => { setDepartment(e.target.value) }} name="department" id="department" required
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
              <select onChange={(e) => { setUnit(e.target.value) }} name="unit " id="unit" required
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
      }
      {
        stage === 2 &&
        <VideoCam action={{
          label: "Upload", perform: async (video) => {
            const formData = new FormData()
            formData.append('video', video)
            formData.append('submit', 'submit')

            console.log(process.env.NEXT_PUBLIC_FLASK_BASE_URI)
            try {
              await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URI}predict`, {
                method: 'POST',
                headers: {
                  'Cors': 'no-cors'
                },
                body: formData
              }).then(data => data.json()).then(data => {
                setId(data.id)
                console.log(data)
                setStage(3)
              })
            } catch (error) {
              console.log("Error => ", error)
            }
            console.log("Uploaded video")
          }
        }} />
      }
      {
        stage === 3 &&
        <Confirm id={id} />
      }
    </main>
  )
}

export default Attendance