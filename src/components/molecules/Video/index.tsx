import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { VideoContainer } from './Video'

interface VideoProps {
  src: string
  thumbnailUrl: string
}
export const Video: React.FC<VideoProps> = ({ src, thumbnailUrl }) => {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = src
      videoRef.current.load()
      setIsLoading(false)
    }
  }, [src])

  const handleVideoClick = () => {
    setIsLoading(false)
  }

  return (
    <VideoContainer onClick={handleVideoClick}>
      {isLoading ? (
        <Image src={thumbnailUrl} alt="" width="300" height="300" />
      ) : (
        <video ref={videoRef} controls autoPlay>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </VideoContainer>
  )
}
