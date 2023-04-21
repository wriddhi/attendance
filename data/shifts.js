export const shifts = {
  A1: ["05:50:00", "06:30:00"],
  B1: ["10:50:00", "11:30:00"],
  A2: ["13:50:00", "14:30:00"],
  B2: ["16:50:00", "17:30:00"],
  C: ["21:50:00", "22:30:00"],
}

export function getShift(time=null) {

  // console.log(time)

  const targetTime = time || new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }).split(', ')[1]

  // console.log(targetTime)

  const shift = Object.keys(shifts).find(key => {
    // console.log(key, shifts[key][0], shifts[key][1], targetTime)
    return targetTime >= shifts[key][0] && targetTime <= shifts[key][1]
  }
  )

  return shift!==undefined ? [shift] : []
}
