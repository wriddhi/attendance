import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { id } = req.query
  console.log("id = ", id)

  const response = await supabase.from('attendance').select('time').eq('id', id)

  res.status(200).json({status: "verified"})

  return
}