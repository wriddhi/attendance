import { createClient } from "@supabase/supabase-js"
import formidable from "formidable"

import { decode } from "base64-arraybuffer"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)


export default async function handler(req, res) {

  const { id, name, department, occupation, image } = req.body

  const { data: user, error } = await supabase.from("employee").insert([
    {
      id,
      fullname: name,
      department,
      occupation
    }
  ]).single()
  console.log("Inserted data into db")

  if (error) {
    console.log(error)
    res.status(500).json({ status: "error" })
    return
  }


  const { data: img, error: imgerr } = await supabase.storage.from("faces").upload(`${id}.jpg`, decode(image), {
    contentType: 'image/jpg'
  })

  if (imgerr) {
    console.log(imgerr)
    res.status(500).json({ status: "error" })
    return
  }

  res.status(200).json({ status: "ok" })
  return
}