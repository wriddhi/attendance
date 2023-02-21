import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


export default async function handler(req, res) {
  const { data : users, error } = await supabase.from('employee').select('*')
  
  if (error) {
    res.status(500).json({ error: error.message })
  }

  const modifiedUsers = await Promise.all(
    users.map(async (user) => {
      const {data: department} = await supabase.from('department').select('description').eq('dept_no', user.dept_no)
      const { description } = department[0]
      return { ...user, department: description }
    })
  )

  res.status(200).json(modifiedUsers)
  return
}
