import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)


export default async function handler(req, res) {

  const payload = req.body

  payload.map(item => {
    for (const [key, value] of Object.entries(item)) {
      if(value == '') {
        delete item[key]
      }
    }
  })


  const { data, error } = await supabase.from('employee').insert(payload)

  res.status(200).json({ status: "Ok  "})
}