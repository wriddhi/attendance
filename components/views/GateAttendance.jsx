import React from 'react'
import VideoCam from '../utils/VideoCam'
import ViewHeader from '../utils/ViewHeader'

const GateAttendance = () => {
  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Gate Attendance" />
      <section className='w-11/12 mx-auto text-white text-center'>
      <VideoCam action={{label: "Exit", perform: (video) => {
        console.log("Click")
      }}}/>
      </section>
    </main>
  )
}

export default GateAttendance