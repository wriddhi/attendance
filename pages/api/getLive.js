import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)


export default async function handler(req, res)  {

  const {shift} = req.query

  const date = new Date()
  const today = date.toISOString().split('T')[0]

  const { data, error } = await supabase.from('attendance').select('id').eq('shift', shift).eq('date', today)

  if (error) {
    console.log(error)
    res.status(500).json({error: error.message})
    return
  }

  res.status(200).json({count: data.length})
  return
}
