import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { id } = req.query

  const date = new Date()


  const {data: verified, error} = await supabase.from('attendance').select('*').eq('id', id).eq('date', date.toLocaleString())

  if(error) {
    res.status(500).json({error: error.message})
    return
  }

  if(verified.length > 0) {
    console.log('verified')
    res.status(200).json({verified: true})
    return
  }

  console.log('not verified')
  res.status(200).json({verified: false})
  return
}