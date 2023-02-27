import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ViewHeader from '@/components/utils/ViewHeader'

import Camera from './utils/Camera'
import LoadingDots from './utils/LoadingDots'
import axios from 'axios'

import { encode } from 'base64-arraybuffer'


const DetailsInput = ({ label, value }) => {

  const word = label.replace(/([A-Z])/g, " $1");
  const labelText = word.charAt(0).toUpperCase() + word.slice(1)

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-slate-300">{labelText}</span>
      </label>
      <input disabled name={label} value={value}
        type="text" className="input disabled:input-secondary input-bordered disabled:w-full disabled:bg-accent disabled:text-white" />
    </div>
  )
}

export default function ProfileView({ details }) {

  const [employee, setEmployee] = useState({ ...details })
  const [preview, setPreview] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [changed, setChanged] = useState(false)
  const [cam, setCam] = useState(false)

  const [success, setSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const confirmRef = useRef(null)

  const [stage, setStage] = useState(0)

  useEffect(() => {
    fetch('/api/getImage?id=' + details.id).then(res => res.json()).then(data => {
      setPreview(data.publicUrl)
    })
  }, [])

  const saveChanges = async () => {
    setLoading(true)

    const formData = new FormData()

    formData.append('id', employee.id)
    formData.append('image', imageSrc)
    formData.append('submit', 'submit')

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BASE_URI}edit`, formData, {
        headers: {
          'Cors': 'no-cors',
        }
      })

      if (res.status == 200) {
        // console.log("Image uploaded to server successfully")
        setSuccess(true)
      }

    } catch (error) {
      // console.log("Flask error => ", error)
    }


    try {
      const res = await axios.post('/api/updateEmployee', {
        id: employee.id,
        image: encode(await imageSrc.arrayBuffer())
      })

      if (res.status == 200) {
        // console.log("Image uploaded to storage successfully")
        setSuccess(true)
      }

    } catch (error) {
      console.log("Supabase Error => ", error)
    }
    setLoading(false)
    confirmRef.current.checked = true
  }

  return (
    <main className='w-screen min-h-screen bg-dark'>
      <ViewHeader title="Profile" />
      {
        cam ?
          <Camera label={"Update"} action={(imgSrc) => {
            setImageSrc(imgSrc)
            const url = URL.createObjectURL(imgSrc)
            setPreview(url)
            setChanged(true)
            setCam(false)
          }} />
          :
          <>
            <div className='text-white w-11/12 mx-auto my-4'>
              <img onClick={() => { setCam(true) }} className='rounded-full h-40 mx-auto' src={preview} alt="Img" />
            </div>

            <section className='flex flex-col justify-center items-center gap-3 w-10/12 mx-auto py-3'>
              {
                Object.keys(employee).map((key, index) => {
                  return (
                    employee[key] &&
                    <DetailsInput key={index} label={key} value={employee[key]} />
                  )
                })
              }
              {
                changed && (
                  <button onClick={saveChanges} className='bg-pink text-white font-bold w-full text-center rounded-md p-2 my-4'>{isLoading ? <LoadingDots /> : "Update"}</button>
                )
              }
            </section>
          </>
      }
      <input ref={confirmRef} type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{success ? "Successfully updated" : "Could not update"}!</h3>
          <p className="py-4">{success ? `The image for ${employee.fullname} has been updated successfully` : "There was some issue updating the image, try again later"}</p>
          <div className="modal-action flex justify-between items-center">
            <label htmlFor="my-modal-6" className="btn bg-black hover:bg-pink">
              <Link href="/dashboard/">
                Ok
              </Link>
            </label>
          </div>
        </div>
      </div>
    </main>
  )
}
