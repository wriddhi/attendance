import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {

  const { id, shift } = req.body

  const { data: user, error } = await supabase.from("attendance").insert([{ id, shift }])

  if(!error) {
    res.status(200).json({status: "Successfully updated attendance"})
  }
  res.status(405).json({status: "There was some issue with the attendance"})

  return
}