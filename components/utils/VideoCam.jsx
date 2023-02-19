import { CloudArrowUpIcon, VideoCameraIcon } from "@heroicons/react/24/outline"
import { StopCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState, useRef, useCallback } from "react"
import Webcam from "react-webcam"
import LoadingDots from "./LoadingDots"

const VideoCam = ({ action }) => {

  const [capturing, setCapturing] = useState(false)
  const [loading, setLoading] = useState(false)

  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  const [recordedChunks, setRecordedChunks] = useState([])


  // @Start the recording
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    setRecordedChunks([])
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    })
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    )
    mediaRecorderRef.current.start()

    setTimeout(() => {
      handleStopCaptureClick()
    }, 3000)

  }, [webcamRef, setCapturing, mediaRecorderRef])

  // @Store the recording
  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data))
    }
  }, [setRecordedChunks])

  // @Stop the recording
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, webcamRef, setCapturing])

  // @Download the recording ~~> Send to server for processing instead of downloading
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      })
      const url = URL.createObjectURL(blob)
      console.log(blob, "v/s", url)
    }
  }, [recordedChunks])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  }

  return (
    <section className="w-11/12 mx-auto h-60 flex flex-col gap-4 p-2">
      <Webcam className={`outline-dashed outline-pink rounded-md ${recordedChunks.length > 0 ? "hidden" : "flex"} `}
        ref={webcamRef}
        audio={false}
        height={720}
        videoConstraints={videoConstraints}
      />
      {
        recordedChunks.length > 0 && (
          <video loop
            className={`outline-dashed outline-pink rounded-md ${recordedChunks.length ? "visible" : "hidden"}`}
            autoPlay src={URL.createObjectURL(new Blob(recordedChunks))} />
        )
      }
      {capturing ? (
        <button onClick={handleStopCaptureClick} className="bg-pink text-white font-bold w-11/12 p-2 mx-auto rounded-md flex justify-center items-center gap-2" >
          Stop
          <StopCircleIcon className="h-5 w-5" />
        </button>
      ) : (
        <button onClick={handleStartCaptureClick} className="bg-pink text-white font-bold w-11/12 p-2 mx-auto rounded-md flex justify-center items-center gap-2" >
          {recordedChunks.length ? "Retake" : "Start"}
          <VideoCameraIcon className="h-5 w-5" />
        </button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={() => {
          setLoading(true)
          action.perform(new Blob(recordedChunks), loading, setLoading)
        }}
          className="w-11/12 outline-pink outline rounded-md p-2 mx-auto font-bold bg-accent text-pink flex justify-center items-center gap-2" >
          {
            loading ? (
              <LoadingDots color="#fff" />
            ) : (
              <>
                <p>{action.label}</p>
                <CloudArrowUpIcon className="h-5 w-5" />
              </>
            )
          }
        </button>
      )}
    </section>
  )
}

export default VideoCam