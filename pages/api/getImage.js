import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {

  const { data: url, error } = supabase.storage.from('faces').getPublicUrl(req.query.id+'.jpg')
  res.status(200).json(url)
}

