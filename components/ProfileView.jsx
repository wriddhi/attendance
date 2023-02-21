import { useState, useRef, useEffect } from 'react'
import ViewHeader from '@/components/utils/ViewHeader'

const DetailsInput = ({ label, value, onChange }) => {

  const word = label.replace(/([A-Z])/g, " $1");
  const labelText = word.charAt(0).toUpperCase() + word.slice(1)

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-slate-300">{labelText}</span>
      </label>
      <input name={label} value={value}
        onChange={onChange}
        type="text" className="input input-secondary input-bordered w-full max-w-xs bg-accent text-white" />
    </div>
  )
}

export default function ProfileView({ details }) {

  const [employee, setEmployee] = useState({ ...details })
  const [pfp, setPfp] = useState(null)
  const [preview, setPreview] =  useState('https://xsgames.co/randomusers/avatar.php?g=male')
  const pfpRef = useRef(null)


  // Handle change in information details
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee({ ...employee, [name]: value })
  }

  // Handle change in profile picture
  const changePfp = () => {
    pfpRef.current.checked = true
    console.log("Change")
  }

  useEffect(() => {

    if (!pfp) return

    const objectUrl = URL.createObjectURL(pfp[0])
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [pfp])

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Profile" />
      <div className='text-white w-11/12 mx-auto my-4 mb-8'>
        <img onClick={changePfp} className='rounded-full h-40 mx-auto' src={preview} alt="Img" />
      </div>
      <input ref={pfpRef} type="checkbox" id="pfp-upload" className="modal-toggle" />
      <form className="modal">
        <div className="modal-box bg-accent text-white flex flex-col gap-3">
          <h3 className="font-bold text-lg">Upload a new image</h3>
          <input onChange={(e) => {setPfp(e.target.files)}} accept='image/*' type="file" className="file-input file-input-xs file-input-bordered file-input-secondary bg-dark w-full max-w-xs" />
          <div className="flex justify-between items-center my-2">
            <label htmlFor="pfp-upload" className="btn btn-sm bg-dark capitalize">
              Cancel
            </label>
            {
              pfp && <label onClick={() => { setPfp(pfp[0]) }} htmlFor="pfp-upload" className="btn btn-sm bg-pink capitalize">Upload</label>
            }
          </div>
        </div>
      </form>
      <section className='flex flex-col justify-center items-center gap-3 w-10/12 mx-auto py-6'>
        {
          Object.keys(employee).map((key, index) => {
            return (
              employee[key] &&
              <DetailsInput key={index} label={key} value={employee[key]} onChange={handleInputChange} />
            )
          })
        }

      </section>
    </main>
  )
}
