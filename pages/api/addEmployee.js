import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {

    const { id, name, department } = req.query
  
    const { data: user, error } = await supabase.from("employee").insert([
      {
        id: id,
        fullname: name,
        department: department
      }
    ]).single()

    res.status(200).json(error ? {error: error.message} : {status: "success"})
    return
  }