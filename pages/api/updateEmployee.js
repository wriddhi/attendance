import { createClient } from "@supabase/supabase-js"

import { decode } from "base64-arraybuffer"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)


export default async function handler(req, res) {

  const { id, image } = req.body

  const { data: img, error: imgerr } = await supabase.storage.from("faces").update(`${id}.jpg`, decode(image), {
    contentType: 'image/jpg',
    upsert: true
  })

  if (imgerr) {
    console.log(imgerr)
    res.status(500).json({ status: "error" })
    return
  }

  res.status(200).json({ status: "ok" })
  return
}