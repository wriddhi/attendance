import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

import json2csv from "json2csv"

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  const { type, all, start, end } = req.query

  console.log(type, all, start, end)

  if (all || type === "attendance") {
    const { data: users, error } = await supabase.from(type).select('*')
    
    const csvFile = json2csv.parse(users)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=${type.charAt(0).toUpperCase() + type.slice(1)}.csv`)
    res.status(200).send(csvFile)
    return
  } else if (start && end) {
    const startDate = (new Date(start)).toISOString()
    const endDate = (new Date(end)).toISOString()
    const { data: users, error } = await supabase.from(type).select('*').gte('date', startDate).lte('date', endDate)
    
    const csvFile = json2csv.parse(users)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=${type.charAt(0).toUpperCase() + type.slice(1)}.csv`)
    res.status(200).send(csvFile)
    return
  }
}