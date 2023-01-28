import Link from 'next/link'
import React from 'react'
import ViewHeader from '../utils/ViewHeader'

const ShiftCard = ({ shift }) => {

  const randomizer = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" })
  const activeShift = (shift.start < time && shift.end > time)
  return (
    <div className='flex flex-col items-start justify-between w-11/12 p-4 mx-auto bg-accent text-white rounded-lg relative'>
      <h1 className='text-xl font-bold flex gap-4'>
        Shift {shift.id}
        <span className='text-base text-pink'>{activeShift ? "(active)" : null}</span>
      </h1>
      <p className='text-md text-pink flex justify-between items-center w-full'>
        <i>
          {shift.start} - {shift.end}
        </i>
        {
          activeShift ? (
            <i className='text-slate-300'>
              {randomizer(150, 200)} / 200
            </i>
          ) : null
        }
      </p>
      {
        activeShift ?
          <div className='h-3 w-3 animate-pulse bg-pink rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'></div>
          : null
      }
    </div>
  )
}

const LiveReport = () => {

  const shifts = [
    {
      id: "A1",
      start: "07:00",
      end: "11:00",
    },
    {
      id: "A2",
      start: "11:00",
      end: "15:00",
    },
    {
      id: "B1",
      start: "15:00",
      end: "19:00",
    },
    {
      id: "B2",
      start: "19:00",
      end: "23:00",
    },
    {
      id: "G1",
      start: "23:00",
      end: "03:00",
    },
    {
      id: "G2",
      start: "03:00",
      end: "07:00",
    }
  ]

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Live Report" />
      <section className='flex flex-col justify-center items-center gap-3'>
        {
          shifts.map((shift, index) => {
            return (
              <Link className='w-full' href='/dashboard/attendance-list' key={index}>
                <ShiftCard shift={shift} key={index} />
              </Link>
            )
          })
        }
      </section>
    </main>
  )
}

export default LiveReport