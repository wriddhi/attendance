import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  const { id } = req.body

  const date = new Date()

  const { data: gate, error } = await supabase.from('attendance').select('break_1_out, break_1_in, break_2_out, break_2_in, break_3_out, break_3_in').eq('id', id).eq('date', date.toLocaleString())

  if(gate.length == 0) {
    res.status(200).json({status: "Attendance for today not found"})
    return
  }

  const setBreak = async(no, turn) => {
    const { data: breakUpdate, error } = await supabase.from('attendance').update({[`break_${no}_${turn}`]: (date.toISOString()).toLocaleString()}).eq('id', id).eq('date', date.toLocaleString())
    res.status(200).json({status: `Recorded ${turn == 'out' ? 'exit' : 'entry'} for break ${no}`})
    return
  }

  for(const breaks in gate[0]) {
    if(gate[0][breaks] == null) {
      const breakNo = breaks.split('_')[1]
      const breakTurn = breaks.split('_')[2]
      setBreak(breakNo, breakTurn).then(() => {
        statusText = `Recorded ${breakTurn == 'out' ? 'exit' : 'entry'} for break ${breakNo}}`
        return
      })
      break
    }
  }
}