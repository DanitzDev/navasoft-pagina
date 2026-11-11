import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Cloud,
  Cpu,
  Factory,
  Network,
  Radio,
  ScanLine,
  Check,
  Plus,
  Minus,
} from 'lucide-react'
import { Container } from '../../ui/Container'
import { ButtonLink } from '../../ui/Button'
import {
  innovationCapabilities,
  innovationSteps,
} from '../../../data/innovation'
import './InnovationPage.css'

const capabilityIcons = {
  iot: Radio,
  cloud: Cloud,
  ai: Cpu,
} as const
type CapabilityId = keyof typeof capabilityIcons

export default function InnovationPage() {
  const [selected, setSelected] = useState<CapabilityId>('iot')
  return (
    <div className="innovation-page">
      <Container
        as="section"
        className="innovation-hero"
        aria-labelledby="innovation-title"
      >
        <div className="innovation-hero-copy">
          <p className="innovation-label">InnovationLab · Navasoft</p>
          <h1 id="innovation-title">Del desafío real a la próxima solución.</h1>
          <p className="innovation-lead">
            Probamos cómo la inteligencia artificial, los dispositivos
            conectados y la nube pueden mejorar su operación.
          </p>
          <div className="innovation-actions">
            <ButtonLink to="/contacto" search={{ motivo: 'reunion' }} size="lg">
              Conversemos sobre su idea
            </ButtonLink>
            <a href="#capacidades">Explorar capacidades</a>
          </div>
        </div>
        <figure className="innovation-hero-visual">
          <img
            src="/images/hero-innovation.jpeg"
            alt="Ilustración de un laboratorio con sensores, dispositivos y prototipos electrónicos."
            width="1792"
            height="1008"
            fetchPriority="high"
          />
          <figcaption>
            <span>Innovación aplicada</span>
            <p>
              Un problema concreto.
              <br />
              Una prueba con propósito.
            </p>
          </figcaption>
        </figure>
      </Container>

      <div className="innovation-intro-band">
        <Container className="innovation-intro">
          <h2>La tecnología empieza por una pregunta.</h2>
          <p>
            ¿Qué necesita medir, conectar o resolver? Nuestro laboratorio
            explora lo que todavía no es un producto o un sistema, con un
            objetivo claro: comprobar si puede convertirse en una solución útil.
          </p>
        </Container>
      </div>

      <Container
        as="section"
        id="capacidades"
        className="innovation-capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="innovation-section-heading">
          <h2 id="capabilities-title">
            Tres capacidades.
            <br />
            Un mismo punto de partida: su operación.
          </h2>
          <p>
            Explore cómo abordamos cada tecnología y dónde puede aportar valor.
          </p>
        </div>
        <div className="innovation-explorer">
          <div className="innovation-capability-options">
            {innovationCapabilities.map((capability) => {
              const Icon = capabilityIcons[capability.id]
              const active = selected === capability.id
              return (
                <button
                  key={capability.id}
                  type="button"
                  id={`capability-${capability.id}`}
                  aria-expanded={active}
                  aria-controls={`capability-panel-${capability.id}`}
                  onClick={() => setSelected(capability.id)}
                  className="innovation-capability-option"
                >
                  <Icon size={24} aria-hidden="true" />
                  <span>
                    <strong>{capability.title}</strong>
                    <span>{capability.summary}</span>
                  </span>
                  {active ? (
                    <Minus size={18} aria-hidden="true" />
                  ) : (
                    <Plus size={18} aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>
          <div className="innovation-capability-panels">
            {innovationCapabilities.map((capability) => (
              <div
                key={capability.id}
                id={`capability-panel-${capability.id}`}
                role="region"
                aria-labelledby={`capability-${capability.id}`}
                hidden={selected !== capability.id}
                className="innovation-capability-panel"
              >
                <img
                  src={capability.image}
                  alt={capability.alt}
                  width="1792"
                  height="1008"
                  loading="lazy"
                />
                <div className="innovation-capability-body">
                  <h3>{capability.headline}</h3>
                  <p>{capability.description}</p>
                  <ul aria-label="Posibles aplicaciones">
                    {capability.examples.map((example) => (
                      <li key={example}>
                        <Check size={17} aria-hidden="true" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section
        className="innovation-process"
        aria-labelledby="innovation-process-title"
      >
        <Container>
          <div className="innovation-section-heading">
            <h2 id="innovation-process-title">Del prototipo al sistema.</h2>
            <p>Avanzar por etapas permite aprender antes de escalar.</p>
          </div>
          <ol className="innovation-steps">
            {innovationSteps.map((step, index) => (
              <li key={step.title}>
                <span className="innovation-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        className="innovation-contexts"
        aria-labelledby="innovation-contexts-title"
      >
        <div className="innovation-section-heading">
          <h2 id="innovation-contexts-title">
            En el entorno donde sucede el trabajo.
          </h2>
          <p>
            Los desafíos cambian. La necesidad de conectar información y
            operación permanece.
          </p>
        </div>
        <div className="innovation-context-list">
          <article>
            <Factory size={28} aria-hidden="true" />
            <h3>Industria</h3>
            <p>
              Sensores, captura de datos y seguimiento de procesos en planta.
            </p>
          </article>
          <article>
            <Network size={28} aria-hidden="true" />
            <h3>Operadores de red</h3>
            <p>
              Dispositivos conectados a la infraestructura y telemetría para
              conocer su estado.
            </p>
          </article>
          <article>
            <ScanLine size={28} aria-hidden="true" />
            <h3>Instituciones</h3>
            <p>
              Automatización y lectura de documentos o eventos que requieren
              atención.
            </p>
          </article>
        </div>
        <div className="innovation-related">
          <p>Conozca también nuestras soluciones</p>
          <Link to="/areas/$slug" params={{ slug: 'soluciones' }}>
            Público y empresarial
          </Link>
          <Link to="/productos">Ecosistema SaaS</Link>
        </div>
      </Container>

      <Container
        as="section"
        className="innovation-contact"
        aria-labelledby="innovation-contact-title"
      >
        <div>
          <h2 id="innovation-contact-title">¿Qué le gustaría resolver?</h2>
          <p>
            Conversemos sobre el proceso, los datos y las posibilidades de una
            primera prueba.
          </p>
        </div>
        <ButtonLink to="/contacto" search={{ motivo: 'reunion' }} size="lg">
          Solicitar una reunión
        </ButtonLink>
      </Container>
    </div>
  )
}
