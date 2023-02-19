import { useRef, useState, useCallback } from "react"
import { CameraIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"


import LoadingDots from "./LoadingDots"

import Webcam from "react-webcam"

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
}

const dataURLToBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeString });
}

const Camera = ({ label, action }) => {
  const [imgSrc, setImgSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewState, setViewState] = useState("video")
  const webcamRef = useRef(null)


  const capture = useCallback(async (e) => {
    e.preventDefault()
    setImgSrc(webcamRef.current.getScreenshot())
    setViewState("img")
  }, [webcamRef])


  return (
    <main className="bg-dark w-screen h-84 overflow-hidden p-4 flex flex-col justify-center items-center gap-4">
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
          <button onClick={capture} className="bg-pink text-white font-bold w-11/12 p-2 mx-auto rounded-md flex justify-center items-center gap-2" >
            Capture Photo
            <CameraIcon className="h-5 w-5" />
          </button>
          :
          <span className="w-full flex flex-col gap-4">
            <button className="bg-pink text-white font-bold w-11/12 p-2 mx-auto rounded-md flex justify-center items-center gap-2" onClick={() => setViewState("video")}>
              Retake
              <CameraIcon className="h-5 w-5" />
            </button>
            <button onClick={() => {
              setLoading(true)
              action(dataURLToBlob(imgSrc), loading, setLoading)
            }}
              className="w-11/12 outline-pink outline rounded-md p-2 mx-auto font-bold bg-accent text-pink flex justify-center items-center gap-2" >
              {
                loading ? (
                  <LoadingDots color="#fff" />
                ) : (
                  <>
                    <p>{label}</p>
                    <CloudArrowUpIcon className="h-5 w-5" />
                  </>
                )
              }
            </button>
          </span>
      }

    </main>
  )
}

export default Camera