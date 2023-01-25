import { useEffect } from "react"

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream)
  let data = []

  recorder.ondataavailable = (event) => data.push(event.data)
  recorder.start()
  console.log(`${recorder.state} for ${lengthInMS / 1000} seconds…`)

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => {
      if (recorder.state === "recording") {
        recorder.stop()
      }
    },
  )
  return Promise.all([
    stopped,
    recorded
  ]).then(() => data)
}

function stop(stream) {
  stream.getTracks().forEach((track) => track.stop())
}

const VideoCam = () => {

  const recordingTimeMS = 5000

  useEffect(() => {
    const video = document.getElementById('video')
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <video id="recording" width="180" height="180" controls></video>
      <video id="preview" width="180" height="180" autoPlay muted></video>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default VideoCam