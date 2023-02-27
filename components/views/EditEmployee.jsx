import { FunnelIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ViewHeader from '../utils/ViewHeader'
import Spinner from '../utils/Spinner'

const EmployeeCard = ({ employee }) => {
  return (
    <Link href={`/employee/${employee.id}`}>
      <div className='w-full flex gap-4 p-4 bg-accent text-white rounded-md'>
        <UserCircleIcon className='h-12' />
        <section className='font-bold w-full flex flex-col'>
          <div className='flex justify-start items-center'>
            <span> {employee.fullname} </span>
            <span className='text-slate-300 ml-auto font-light'> {employee.id} </span>
          </div>
          <div>
            <span className='text-pink text-xs'> {employee.department} </span>
          </div>
        </section>
        <div>
        </div>
      </div>
    </Link>
  )
}

const SearchBar = ({ setSearch, setFilter, departments }) => {

  const [filterMenu, setFilterMenu] = useState(false)
  const applyFilter = (e) => {
    setFilter(e.target.id)
    setFilterMenu(false)
  }

  return (
    <section className=' my-10'>
      <div className='w-full bg-accent flex justify-between items-center rounded-md ring-2 ring-white font-bold text-white ring-offset-pink overflow-hidden'>
        <input type="text" name="search" id="search" placeholder='Search . . .'
          className='w-full bg-accent p-3 outline-none border-none ring-0'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={`h-full p-2 ${filterMenu ? "bg-pink" : "bg-white"}`}
          onClick={() => { setFilterMenu(!filterMenu) }}>
          <FunnelIcon className='h-8 w-8 text-dark' />
        </button>
      </div>
      {
        filterMenu ?
          <ul className='bg-white w-full ring-white ring-2 rounded-b-md'>
            <li className='w-full text-center text-lg p-2'> Filter By Department  </li>
            <li id="all" onClick={applyFilter} className='text-dark p-2 font-semibold hover:bg-slate-200' > All </li>
            {departments.map((dept) => {
              return (
                <li id={dept} onClick={applyFilter} className='text-dark p-2 font-semibold hover:bg-slate-200' key={dept}>{dept}</li>
              )
            }
            )}
          </ul>
          : null
      }
    </section>
  )
}

const EditEmployee = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState("all")

  const departments = data?.map(emp => emp.department)

  useEffect(() => {
    setLoading(true)
    fetch('/api/getAllUsers')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className='bg-dark min-h-screen'>
      <ViewHeader title={"Edit Employee"} />
      <section className='w-full flex flex-col gap-4'>
        {isLoading &&
          <section className='w-full flex justify-center items-center'>
            <Spinner size={100} />
          </section>
        }
        {!isLoading && !data ? <p>No data</p> : null}
        {data ?
          <div className='w-full flex flex-col gap-4 p-4'>
            <SearchBar setSearch={setSearch} departments={departments} setFilter={setFilter} />

            {(!search && filter === "all") && data.map((employee) => (<EmployeeCard employee={employee} key={employee.id} />))}

            {search && filter == "all" && data.map((employee) => {
              return (employee.fullname.toLowerCase().indexOf(search.toLowerCase()) == 0 ?
                <EmployeeCard employee={employee} key={employee.id} />
                : null)
            })}

            {
              filter !== "all" && data.map((employee) => {
                if (employee.department === filter) {
                  console.log(employee.employeeName)
                }
                return (employee.department === filter ?
                  <EmployeeCard employee={employee} key={employee.id} />
                  : null)
              })
            }
          </div>

          : null}
      </section>
    </main>
  )
}

export default EditEmployee