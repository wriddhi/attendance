import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {

  const { id, shift, occupation } = req.body

  const date = new Date()

  // Check if the user has already marked attendance for the day

  try {
    const { data: attendance, error } = await supabase.from("attendance").select("*").eq("id", id).eq("date", date.toLocaleDateString())
    if (attendance.length > 0) {
      res.status(200).json({ status: "Attendance is already taken" })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(405).json({ status: "There was some issue with the attendance" })
    return
  }

  // If not, mark attendance

  const { data: user, error } = await supabase.from("attendance").insert([{
    id: id,
    shift: shift,
    date: date.toLocaleDateString(),
    occupation: occupation
  }])

  if (!error) {
    res.status(200).json({ status: "Attendance taken successfully" })
    return
  }
  console.log(error)
  res.status(405).json({ status: "There was some issue with the attendance" })
  return
}