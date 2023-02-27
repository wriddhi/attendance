import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

function time(isoDateString) {
  const date = new Date(isoDateString)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()


  return (`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)

}

export default async function handler(req, res) {

  const { date, shift } = req.query
  const ISOdate = (new Date(date)).toISOString()

  const ids = new Set()

  const allAttendances = []

  if (shift == 'all') {
    const { data: attendance, error } = await supabase.from('attendance').select('id, shift, date, time, occupation').eq('date', ISOdate)
    if (error) {
      res.status(500).json({ error })
      return
    }

    allAttendances.push(...attendance)
  } else {
    const { data: attendance, error } = await supabase.from('attendance').select('id, shift, date, time, occupation').eq('date', ISOdate).eq('shift', shift)
    if (error) {
      res.status(500).json({ error })
      return
    }

    allAttendances.push(...attendance)
  }

  console.log("allAttendances => ", allAttendances)

  allAttendances.forEach(attendance => {
    ids.add(attendance.id)
  })


  const employees = new Map()

  await Promise.all([...ids].map(async (id) => {
    const { data: employee, error } = await supabase.from('employee').select('fullname, department').eq('id', id).single()
    employees.set(id, employee)
  }))

  allAttendances.map(attendance => {
    attendance.fullname = employees.get(attendance.id).fullname
    attendance.department = employees.get(attendance.id).department
    attendance.time = time(attendance.time)
  })

  res.status(200).json(allAttendances)
  return
}