import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ViewHeader from '../utils/ViewHeader'
import Camera from '../utils/Camera'

import axios from 'axios'

const NewEntry = () => {

  const [stage, setStage] = useState(1)
  const [employeeCode, setEmployeeCode] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [department, setDepartment] = useState('')
  const [departments, setDepartments] = useState([])

  const router = useRouter()

  useEffect(() => {
    fetch('/api/user?filter=department').then(res => res.json()).then(dept => setDepartments(dept))
  }, [])

  function proceedEntry(e) {
    e.preventDefault()
    setStage(2)
    console.log('Proceeding to entry')
  }

  return (
    <main className='bg-dark min-h-screen'>
      <ViewHeader title={'New Entry'} />
      {
        stage == 1 ?
          <section className={`w-11/12 mx-auto ${stage == 1 ? "flex" : "hidden"}`}>
            <form className='w-full flex flex-col gap-8 mt-8' onSubmit={proceedEntry} >
              <div className='w-full flex flex-col gap-2'>
                <label htmlFor='employeeCode' className='text-slate-400'>Employee Code</label>
                <input type="text" name="employeeCode" id="employeeCode" required
                  onChange={(e) => { setEmployeeCode(e.target.value) }} value={employeeCode}
                  className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label htmlFor='employeeName' className='text-slate-400'>Employee Name</label>
                <input type="text" name="employeeName" id="employeeName" required
                onChange={(e) => { setEmployeeName(e.target.value) }} value={employeeName}
                className='w-full bg-accent rounded-md p-3 ring-2 ring-pink font-bold text-white ring-offset-pink' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-slate-400'>Department</label>
                <select name="department" id="department" required
                  onChange={(e) => { setDepartment(e.target.value) }} value={department}
                  className='select select-secondary w-full font-bold bg-accent text-white'>
                  <option value="" disabled selected>Choose an option</option>
                  {
                    departments.map(dept => (
                      <option value={dept} key={dept}>{dept}</option>
                    ))
                  }
                </select>
              </div>
              {/* <Select placeholder={"Select a value"}/> */}
              <div className='w-full flex justify-evenly items-center gap-4'>
                <button type='reset' className='w-full bg-dark border-solid border-2 border-white text-white p-3 rounded-md font-bold'>
                  <Link href='/dashboard'>
                    Cancel
                  </Link>
                </button>
                <button type='submit' className='w-full bg-pink text-white p-3 rounded-md font-bold'>
                  Proceed
                </button>
              </div>
            </form>
          </section>
          :
          <section className={`${stage == 2 ? "flex" : "hidden"}`}>
            <Camera label={'Add'} action={async (imgSrc, loading, setLoading) => {
              const formData = new FormData()
              formData.append('image', imgSrc)
              formData.append('id', employeeCode)
              formData.append('submit', 'submit')

              const url = `${process.env.NEXT_PUBLIC_FLASK_BASE_URI}add`
              console.log("Uploading image to ", url)
              try {
                await axios.post(url, formData, {
                  headers: {
                    'Cors': 'no-cors'
                  },
                }).then(data => {
                  console.log("Successfully adding employee image to server")
                })
              } catch (error) {
                console.log("Server Error => ", error)
              }

              try {
                await fetch(`/api/addEmployee?id=${employeeCode}&name=${employeeName}&department=${department}`)
                    .then(data => {
                    console.log("Successfully added employee to db")
                    setLoading(false)
                    router.push('/dashboard')
                })
              } catch (error) {
                console.log("Database Error => ", error)
              }
              console.log("Uploaded image")
            }} />
          </section>
      }
    </main>
  )
}

export default NewEntry