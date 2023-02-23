import React, { useRef, useState } from 'react'
import Camera from '../utils/Camera'
import ViewHeader from '../utils/ViewHeader'
import axios from 'axios'
import Link from 'next/link'

const GateAttendance = () => {

  const confirmRef = useRef(null)
  const [status, setStatus] = useState(false)

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Gate Attendance" />
      <section className='w-full mx-auto text-white text-center'>
        <Camera label="Upload" action={async (imgSrc, loading, setLoading) => {

          const formData = new FormData()
          formData.append('image', imgSrc)
          formData.append('submit', 'submit')

          const url = `${process.env.NEXT_PUBLIC_FLASK_BASE_URI}predict`
          try {
            await axios.post(url, formData, {
              headers: {
                'Cors': 'no-cors'
              },
            }).then(data => {
              return data.data.id
            }).then(async (id) => {
              const response = await axios.post('/api/gate', { id })
              setStatus(response.data.status)
              confirmRef.current.checked = true
            })
          } catch (error) {
            console.log("Error => ", error)
          }

          setLoading(false)
          console.log("Uploaded image")
        }} />
      </section>
      <input ref={confirmRef} type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Gate Attendance!</h3>
          <p className="py-4">{status}</p>
          <div className="modal-action justify-between">
            <label htmlFor="my-modal-6" className="btn bg-black hover:bg-pink">
              <Link href="/dashboard">
                OK
              </Link>
            </label>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GateAttendance