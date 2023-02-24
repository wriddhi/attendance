import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  const { type, all, start, end } = req.query

  if(all) {
    const { data : users, error } = await supabase.from(type).select('*')
    res.status(200).json(users)
    return
  } else if(start && end) {
    const startDate = (new Date(start)).toISOString()
    const endDate = (new Date(end)).toISOString()
    const { data : users, error } = await supabase.from(type).select('*').gte('date', startDate).lte('date', endDate)
    res.status(200).json(users)
    return
  }

}