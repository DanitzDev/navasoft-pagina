import { useRef, useState } from 'react'
import { Container } from '../../ui/Container'
import Button from '../../ui/Button'
import './CompanyVideo.css'

export default function CompanyVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  async function togglePlayback() {
    const player = video.current
    if (!player) return
    if (!player.paused) {
      player.pause()
      return
    }
    try {
      await player.play()
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setUnavailable(true)
    }
  }

  return (
    <section
      id="presentacion"
      className="company-video-section"
      aria-labelledby="company-video-title"
    >
      <Container>
        <div className="company-video-frame">
          <video
            ref={video}
            className="company-video-background"
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-trust.jpeg"
            aria-hidden="true"
            disablePictureInPicture
            tabIndex={-1}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src="/video/navasoft-corporativo.mp4" type="video/mp4" />
          </video>
          <div className="company-video-heading">
            <span className="company-video-eyebrow">Tecnología que innova</span>
            <h2 id="company-video-title">
              Detrás de cada solución, una operación que avanza.
            </h2>
            <p>
              Conozca cómo conectamos tecnología, personas y procesos para
              transformar el trabajo de organizaciones públicas y empresariales.
            </p>
            <Button
              className="company-video-control"
              variant="outline"
              onClick={togglePlayback}
              disabled={unavailable}
            >
              {playing ? 'Pausar video' : 'Reproducir video'}
            </Button>
            {unavailable && <p role="status">El video no está disponible.</p>}
          </div>
        </div>
      </Container>
    </section>
  )
}
