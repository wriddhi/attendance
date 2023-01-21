import React, { useRef, useState, useEffect, useCallback } from "react"
import { CloudArrowDownIcon } from "@heroicons/react/24/outline"

import Webcam from "react-webcam"

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
}

const Camera = () => {
  const [imgSrc, setImgSrc] = useState(null)
  const [viewState, setViewState] = useState("video")
  const webcamRef = useRef(null)


  const capture = useCallback(async () => {
    setImgSrc(webcamRef.current.getScreenshot())

    setViewState("img")
  }, [webcamRef])


  return (
    <main className="bg-dark w-screen h-screen p-4 flex flex-col justify-center items-center gap-4">

      <section className="outline-2 outline-dashed outline-pink rounded-md mx-auto overflow-hidden aspect-square">
        {
          viewState === "video" ?
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            /> :
            <img src={imgSrc} />
        }

      </section>

      {
        viewState === "video" ?
          <button className="bg-pink text-xl text-white p-2 rounded-md w-full" onClick={capture}>Capture Photo</button>
          :
          <span className="w-full flex flex-col gap-8">
            <button className="bg-pink text-xl text-white p-2 rounded-md w-full" onClick={() => setViewState("video")}>Retake</button>
            <a download={'image.jpeg'} href={imgSrc} className='flex justify-center'>
              <CloudArrowDownIcon className="h-6 w-6 text-amber-400" />
            </a>
          </span>
      }

    </main>
  )
}

export default Camera