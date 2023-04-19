import { useState, useEffect, useRef } from 'react'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import VideoCam from '../utils/VideoCam'
import Spinner from '../utils/Spinner'
import axios from 'axios'
import Camera from '../utils/Camera'

import { shifts } from '@/data/shifts'
import { departments } from '@/data/departments'

function getShift() {

  const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false }).split(' ')[1].split(':')[0]

  let activeShift = null

  for (const key in shifts) {
    const start = shifts[key].start.split(':')[0]
    const end = shifts[key].end.split(':')[0]

    console.log(start, end, time)

    if (time[1] >= start && time[1] < end) {
      activeShift = key
      break
    }
  }

  return activeShift

}

const Confirm = ({ id, shift, stage, setStage }) => {

  if (!id) {
    return <div className='w-full text-center my-10 mx-auto text-white'>User not found</div>
  }

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [preview, setPreview] = useState(null)
  const [occupation, setOccupation] = useState('')
  const confirmRef = useRef(null)
  const [status, setStatus] = useState('')

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    fetch(`/api/getUser?id=${id}`).then(res => res.json()).then(data => {
      setUser(data)
    })
    fetch(`/api/getImage?id=${id}`).then(res => res.json()).then(data => {
      setPreview(data.publicUrl)
    })

  }, [])

  return (
    <section className='w-11/12 m-auto flex flex-col justify-center items-center gap-4 py-10'>
      {user ? (
        <>
          <form onSubmit={async (e) => {
            e.preventDefault()
            await fetch('/api/setAttendance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: user.id,
                shift: shift,
                occupation: occupation
              })
            }).then(res => res.json()).then(data => {
              setStatus(data.status)
              confirmRef.current.checked = true
            })
          }} className="w-full flex flex-col justify-center items-center gap-6">
            <div className='text-white w-11/12 mx-auto mb-4'>
              <img className='rounded-full h-32 w-32 mx-auto' src={preview} alt="Img" />
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
                {
                  user.dob ? (
                    user.dob.split('-')[2] + " " + months[parseInt(user.dob.split('-')[1]) - 1] + " " + user.dob.split('-')[0]
                  ) : "N/A"
                }
              </span>
            </div>
            <div className='flex flex-col gap-2 w-11/12'>
              <span className='text-pink font-bold text-lg'>Gender</span>
              <span className='text-white bg-accent p-2 rounded-lg'>
                {user.gender ? user.gender : "N/A"}
              </span>
            </div>
            <div className='flex flex-col gap-2 w-11/12'>
              <span className='text-pink font-bold text-lg'>Department</span>
              <span className='text-white bg-accent p-2 rounded-lg'>
                {user.department}
              </span>
            </div>
            <div className='flex flex-col gap-2 w-11/12'>
              <span className='text-pink font-bold text-lg'>Phone</span>
              <span className='text-white bg-accent p-2 rounded-lg'>
                {user.phone ? user.phone : "N/A"}
              </span>
            </div>
            <div className='flex flex-col gap-2 w-11/12'>
              <span className='text-pink font-bold text-lg'>Date of Joining</span>
              <span className='text-white bg-accent p-2 rounded-lg'>
                {
                  user.dob ? (
                    user.doj.split('-')[2] + " " + months[parseInt(user.doj.split('-')[1]) - 1] + " " + user.doj.split('-')[0]
                  ) : "N/A"
                }
              </span>
            </div>
            <div className='flex flex-col gap-2 w-11/12'>
              <span className='text-pink font-bold text-lg'>Occupation</span>
              <select name="occupation" id="occupation" required value={occupation} onChange={e => setOccupation(e.target.value)}
                className='select select-secondary w-full font-bold bg-accent text-white'>
                <option value="" disabled selected>Select occupation</option>
                {
                  ['Manager', 'Workmen', 'Supervisor', 'Driver', 'Security'].map(occupation => (
                    <option value={occupation} key={occupation}>{occupation}</option>
                  ))
                }
              </select>
            </div>
            <div className='flex gap-4 items-center w-11/12 mt-8 font-bold'>
              <button type="reset" className='text-white outline outline-1 outline-white rounded-md p-2 w-4/6'>
                <Link href='/dashboard/'> Cancel </Link>
              </button>
              <button type='submit' className='text-white bg-pink rounded-md p-2 w-4/6'>Confirm</button>
            </div>
          </form>

          <input ref={confirmRef} type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{status}!</h3>
              <p className="py-4">Would you like to continue taking more attendance?</p>
              <div className="modal-action justify-between">
                <label onClick={() => { router.push('/dashboard/') }} htmlFor="my-modal-6" className="btn bg-accent hover:bg-black">No</label>
                <label onClick={() => { setStage(1) }} htmlFor="my-modal-6" className="btn bg-black hover:bg-pink">Yes</label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner size={100} />
      )}
    </section>
  )
}


const Attendance = () => {

  const [stage, setStage] = useState(1)

  const [id, setId] = useState(null)
  const [department, setDepartment] = useState(null)
  const [shift, setShift] = useState(null)
  // const shift = getShift()
  // console.log(shift)

  const proceedEntry = (e) => {
    e.preventDefault()
    console.log('Proceeding to click photo')
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
              <label className='text-slate-400'>Shift</label>
              <select onChange={(e) => { setShift(e.target.value) }} name="shift " id="shift" required
                className='select select-secondary w-full font-bold bg-accent text-white'>
                <option value="" disabled selected>Select a shift</option>
                {
                  Object.keys(shifts).map((shift, index) => (
                    <option value={shift} key={index}>
                      {shift}
                    </option>
                  ))
                }
              </select>
            </div>
            {/* <div className='w-full flex flex-col gap-2'>
              <label className='text-slate-400'>Shift</label>
              <input disabled value={shift} type="text" className='input input-secondary w-full font-bold disabled:bg-accent disabled:text-slate-400' />
            </div> */}
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

        <Camera label="Upload" action={async (imgSrc) => {

          const formData = new FormData()
          formData.append('image', imgSrc)
          formData.append('submit', 'submit')

          const url = `${process.env.NEXT_PUBLIC_FLASK_BASE_URI}predict`
          console.log("Uploading image to ", url)
          try {
            await axios.post(url, formData, {
              headers: {
                'Cors': 'no-cors'
              },
            }).then(data => {
              console.log("Got data => ", data)
              setId(data.data.id)
              setStage(3)
            })
          } catch (error) {
            console.log("Error => ", error)
          }
          console.log("Uploaded image")
        }} />
      }
      {
        stage === 3 &&
        <Confirm id={id} shift={shift} stage={stage} setStage={setStage} />
      }
    </main>
  )
}

export default Attendance