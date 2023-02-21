import React from 'react'
import Camera from '../utils/Camera'
import axios from 'axios'
import ViewHeader from '../utils/ViewHeader'

const VerifyAttendance = () => {
  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Verify Attendance" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <Camera label={"Verify"} action={async (image) => {
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
              const json = await status.json()
              console.log("Got status => ", json)
            })
          } catch (error) {
            console.log("Error => ", error)
          }
        }}
        />
      </section>
    </main>
  )
}

export default VerifyAttendance