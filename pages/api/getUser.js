import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {

  const { data: user, error } = await supabase.from("employee").select("*").eq("id", req.query.id).single()
  // console.log(user, error)
  res.status(200).json(user)
}