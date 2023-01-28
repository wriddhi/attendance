import React from 'react'
import VideoCam from '../utils/VideoCam'
import ViewHeader from '../utils/ViewHeader'

const VerifyAttendance = () => {
  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Verify Attendance" />
      <section className='flex flex-col justify-center items-center gap-3'>
        <VideoCam action={{label: "Verify"}}/>
      </section>
    </main>
  )
}

export default VerifyAttendance