import React, { useRef, useState } from 'react'
import Camera from '../utils/Camera'
import axios from 'axios'
import ViewHeader from '../utils/ViewHeader'
import Link from 'next/link'

const VerifyAttendance = () => {


  const confirmRef = useRef(null)
  const [verified, setVerified] = useState(false)

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Verify Attendance" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <Camera label={"Verify"} action={async (image, loading, setLoading) => {
          const formData = new FormData()
          formData.append('image', image)
          formData.append('submit', 'submit')

          const url = `${process.env.NEXT_PUBLIC_FLASK_BASE_URI}predict`

          console.log("Uploading image to ", url)
          try {
            await axios.post(url, formData, {
              headers: {
                'Cors': 'no-cors'
              },
            }).then(async (data) => {
              console.log("Got data => ", data)
              const status = await fetch(`/api/verify?id=${data.data.id}`)
              const verification = await status.json()
              
              setVerified(verification.verified)
              setLoading(false)
              confirmRef.current.checked = true

            })
          } catch (error) {
            console.log("Error => ", error)
          }
        }}
        />
        <input ref={confirmRef} type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{verified ? "Verified" : "Unverified"}!</h3>
            <p className="py-4">{verified ? "The attendance for this employee has been taken today" : "The attendance for this employee has not been taken today"}</p>
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn bg-black hover:bg-pink">
                <Link href="/dashboard">
                  Ok
                </Link>
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default VerifyAttendance