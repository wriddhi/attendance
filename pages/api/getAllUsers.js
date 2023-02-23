import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


export default async function handler(req, res) {
  const { data : users, error } = await supabase.from('employee').select('*')
  res.status(200).json(users)
  return
}
