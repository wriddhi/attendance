import React, { useRef, useState, useEffect } from "react";

export default function Camera() {
  const [mediaStream, setMediaStream] = useState();
  const videoRef = useRef(null);

  useEffect(() => {
    // Moved to inside of useEffect because this function is depended on `mediaStream`
    async function setupWebcamVideo() {
      if (!mediaStream) {
        await setupMediaStream();
      } else {
        const videoCurr = videoRef.current;
        if (!videoCurr) return;
        const video = videoCurr;
        if (!video.srcObject) {
          video.srcObject = mediaStream;
        }
      }
    }
    setupWebcamVideo();
  }, [mediaStream]);


  async function setupMediaStream() {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
      setMediaStream(ms);
    } catch (e) {
      alert("Camera is disabled");
      throw e;
    }
  }
  return (
    <div className="w-full h-full relative z-0">
      {
        mediaStream ? 
        <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted /> :
        null
      }

      <input type="checkbox" onChange={() => {
        setMediaStream(null)
      }} />
    </div>
  )
}