const departments = [
  "Batching and Preparing",
  "Beaming",
  "Boiler",
  "Factory Mech",
  "Finishing",
  "General",
  "Generator",
  "Mill-Mech",
  "Spinning",
  "Warp Winding",
  "Weaving-Hessian",
  "Weaving-Sacking",
  "Weaving-Timerate",
  "Weft Winding",
  "Work Shop",
]

const names = [
  "Abhay Kumar",
  "Abhijit Kumar",
  "Abhinav Kumar",
  "Abhishek Kumar",
  "Adarsh Kumar",
  "Adesh Kumar",
  "Adi Kumar",
  "Devang Kumar",
  "Devendra Kumar",
  "Devesh Kumar",
  "Dharanidhar Kumar",
  "Dileesh Kumar",
  "Harish Kumar",
  "Harjit Kumar",
  "Harmeet Kumar",
]

export default function handler(req, res) {

  if(req.method === 'GET' && req.query.filter == 'department') {
    res.status(200).json(departments)
    return
  }

  const allWorkers = [
    ...departments.map((department, index) => {
      return (
        {
          employeeCode: index + 1,
          employeeName: names[index],
          department: department,
        }
      )
    })
  ]

  res.status(200).json(allWorkers)
}
