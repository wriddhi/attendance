import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {

  const { data: users, error } = await supabase.from("employee").select("*").eq("id", req.query.id).single()
  console.log(users, error)
  res.status(200).json(users)
}