import { Container } from '../../ui/Container'
import './CompanyVideo.css'

export default function CompanyVideo() {
  return (
    <section
      id="presentacion"
      className="company-video-section"
      aria-labelledby="company-video-title"
    >
      <Container>
        <div className="company-video-frame">
          <video
            className="company-video-background"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-trust.jpeg"
            aria-hidden="true"
            disablePictureInPicture
            tabIndex={-1}
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
              transformar el trabajo de gobiernos y empresas.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
