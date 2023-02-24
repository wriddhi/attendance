import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {

  const { id, name, department, occupation, image } = req.body



  const { data: user, error } = await supabase.from("employee").insert([
    {
      id: id,
      fullname: name,
      department: department
    }
  ]).single()


  const { data: img, err } = await supabase.storage("faces").upload(`faces/${id}.jpg`, image, {
    contentType: "image/jpeg",
    upsert: true
  })

  res.status(200).json(error ? { error: error.message } : { status: "success" })
  return
}