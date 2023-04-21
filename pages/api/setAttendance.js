import { createClient } from "@supabase/supabase-js"
import { getShift } from "@/data/shifts"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// res.status(200).json({ status: "Attendance is already taken" })
//       return

export default async function handler(req, res) {

  const { id, shift, allotedShift, overtime } = req.body

  const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }).split(', ')[1]
  const date = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', hour12: false })

  const shifts = {
    "A1": "shift_A",
    "B1": "shift_B",
    "A2": "shift_A",
    "B2": "shift_B",
    "C": "shift_C"
  }

  // Check if the user has already marked attendance for the day  
  const { data: attendance, error } = await supabase.from('attendance').select('*').eq('id', id).eq('date', date)

  if (attendance.length > 0) {

    const markedTime = getShift(attendance[0][shifts[shift]].at(-1))[0]

    console.log("markedTime => ". markedTime)
    
    // Check if the user has already marked attendance for the shift
    if (markedTime.includes(shift)) {
      return res.status(200).json({ status: "Attendance is already taken for this shift" })
    } else {
    // Update the attendance for this new shift
      const updatedTime = [...attendance[0].time, time]
      const { data: newAttendance, error } = await supabase.from('attendance').update({ [shifts[shift]]: [...attendance[0][shifts[shift]], time], overtime: overtime }).eq('id', id).eq('date', date)
      
      if (error) {
        res.status(500).json({ status: "There was an error while marking the attendance" })
        return
      }
      
      return res.status(200).json({ status: `Attendance taken for shift ${shift}` })
    }
      
    } else {
      // Create a new attendance for the day
      const { data: newAttendance, error } = await supabase.from('attendance').insert([{ id, date, [shifts[shift]]: [time], breaks: [], overtime: overtime }])
    if (error) {
      res.status(500).json({ status: error.message })
      return
    }
    return res.status(200).json({ status: `Attendance taken for shift ${shift}` })
  }
}