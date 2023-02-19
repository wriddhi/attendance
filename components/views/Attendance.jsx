import { useState, useEffect, useRef } from 'react'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'
import VideoCam from '../utils/VideoCam'
import Spinner from '../utils/Spinner'
import axios from 'axios'

const Confirm = ({ id }) => {

  if (!id) {
    return <div>No user found</div>
  }

  const [user, setUser] = useState(null)
  const preview = user ? 'https://xsgames.co/randomusers/avatar.php?g=male' : null
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    fetch(`/api/getUser?id=${id}`).then(res => res.json()).then(data => {
      setUser(data)
    })

  }, [])

  return (
    <section className='w-11/12 m-auto flex flex-col justify-center items-center gap-4 py-10'>
      {user ? (
        <>
          <div className='text-white w-11/12 mx-auto mb-4'>
            <img className='rounded-full h-32 mx-auto' src={preview} alt="Img" />
          </div>
          <div className='flex flex-col gap-1 w-11/12'>
            <span className='text-pink font-bold text-lg'>Employee ID</span>
            <span className='text-white bg-accent p-2 rounded-lg'>{user.id}</span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Employee Name</span>
            <span className='text-white bg-accent p-2 rounded-lg'>{user.fullname}</span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Date of Birth</span>
            <span className='text-white bg-accent p-2 rounded-lg'>
              {user.dob.split('-')[2]} &nbsp;
              {months[parseInt(user.dob.split('-')[1]) - 1]}, &nbsp;
              {user.dob.split('-')[0]}
            </span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Gender</span>
            <span className='text-white bg-accent p-2 rounded-lg'>
              {user.gender}
            </span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Department</span>
            <span className='text-white bg-accent p-2 rounded-lg'>
              {user.dept_no}
            </span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Phone</span>
            <span className='text-white bg-accent p-2 rounded-lg'>
              {user.phone}
            </span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Date of Joining</span>
            <span className='text-white bg-accent p-2 rounded-lg'>
              {user.doj.split('-')[2]} &nbsp;
              {months[parseInt(user.doj.split('-')[1]) - 1]}, &nbsp;
              {user.doj.split('-')[0]}
            </span>
          </div>
          <div className='flex flex-col gap-2 w-11/12'>
            <span className='text-pink font-bold text-lg'>Occupation</span>
            <select name="occupation" id="occupation" required
              className='select select-secondary w-full font-bold bg-accent text-white'>
              <option value="" disabled selected>Select occupation</option>
              {
                ['Operator', 'Helper', 'Others'].map(occupation => (
                  <option value={occupation} key={occupation}>{occupation}</option>
                ))
              }
            </select>
          </div>
          <div className='flex gap-4 items-center w-11/12 mt-8 font-bold'>
              <button className='text-white outline outline-1 outline-white rounded-md p-2 w-4/6'>Cancel</button>
              <button className='text-white bg-pink rounded-md p-2 w-4/6'>Confirm</button>
          </div>
        </>
      ) : (
        <Spinner size={100} />
      )}
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
                className='select select-secondary w-full font-bold bg-accent text-white'>
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
                className='select select-secondary w-full font-bold bg-accent text-white'>
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
                className='select select-secondary w-full font-bold bg-accent text-white'>
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
          label: "Upload", perform: async (video, loading, setLoading) => {
            const formData = new FormData()
            formData.append('video', video)
            formData.append('submit', 'submit')

            const url = `${process.env.NEXT_PUBLIC_FLASK_BASE_URI}predict`
            console.log("Uploading video to ", url)
            try {
              alert(url)
              // Fetching
              await axios.post(url, formData, {
                headers: {
                  'Cors': 'no-cors',
                }
              }).then(data => {
                console.log("Got data => ", data)
                setLoading(false)
                setId(data.data.id)
                setStage(3)
              })
              // await fetch(url, {
              //   method: 'POST',
              //   headers: {
              //     'Cors': 'no-cors',
              //   },
              //   body: formData
              // }).then(data => data.json()).then(data => {
              //   console.log("Got data => ", data)
              //   setLoading(false)
              //   setId(data.id)
              //   setStage(3)
              // })
            } catch (error) {
              console.log("Error => ", error)
              alert("Failed to connect to server")
              setLoading(false)
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