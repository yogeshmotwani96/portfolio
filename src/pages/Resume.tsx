import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowLeft } from 'lucide-react'
import resume from '../data/resume.json'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Row from '../components/Row'
import siueImg from '../assets/SIUE.png'
import rgpvImg from '../assets/RGPV.png'

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animationFrame: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const letters = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const fontSize = 16
    let columns = Math.floor(width / fontSize)
    let drops = Array.from({ length: columns }, () => Math.random() * height)

    const draw = () => {
      // Fade background for trailing effect
      ctx.fillStyle = 'rgba(11, 11, 15, 0.15)'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#6ee7b7' // minty green
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      animationFrame = requestAnimationFrame(draw)
    }

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      columns = Math.floor(width / fontSize)
      drops = Array.from({ length: columns }, (_, idx) => drops[idx % drops.length] || 1)
    }

    draw()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function Resume() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('sending')
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const res = await fetch('https://formspree.io/f/xjkeqjvb', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
      if (res.ok) {
        form.reset()
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate h-[60vh] md:h-[68vh] lg:h-[72vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)]" />
        <MatrixCanvas />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent" />
        <div className="relative z-10 h-full container-safe flex flex-col justify-end pb-10">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-4xl">
            {resume.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 text-[var(--muted)] text-lg">
            {resume.title}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 flex items-center gap-3">
            <a href="#resume-content" className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 transition">
              <Play className="w-4 h-4" />
              Resume
            </a>
            <Link to="/" className="inline-flex items-center gap-2 border border-white/30 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition">
              <ArrowLeft className="w-4 h-4" />
              Return
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <main id="resume-content" className="container-safe py-10 space-y-12">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Overview</h2>
            <p className="text-[var(--muted)]">Contact and links</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
            <a className="hover:underline" href={`mailto:${resume.email}`}>{resume.email}</a>
            <span>•</span>
            <a className="hover:underline" href={`tel:${resume.phone.replace(/[^\d+]/g, '')}`}>{resume.phone}</a>
            {resume.links?.github && (
              <>
                <span>•</span>
                <a className="hover:underline" href={resume.links.github} target="_blank" rel="noreferrer">GitHub</a>
              </>
            )}
            {resume.links?.linkedin && (
              <>
                <span>•</span>
                <a className="hover:underline" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </>
            )}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Summary</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Full Stack Developer with 5+ years of experience delivering production-grade platforms in the finance domain and beyond. I specialize in
                building cloud-native, microservices-driven systems with Java 17/Spring Boot (WebFlux, Security, JPA) on AWS and crafting performant,
                accessible front-ends with React 18/TypeScript, Redux Toolkit, and modern UI frameworks. I focus on end‑to‑end quality through TDD,
                comprehensive automation (Jest/Cypress/JUnit/Mockito), and robust security (OAuth2/JWT/Keycloak), while optimizing latency, throughput,
                and user experience with intelligent caching, SSR/SPA tradeoffs, and observability (OpenTelemetry, Prometheus, Grafana). I enjoy translating
                complex business requirements into simple, reliable experiences, mentoring peers, and partnering with cross‑functional teams to ship features
                quickly without compromising stability, performance, or maintainability.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Highlighted Projects</h3>
              <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {resume.projects.slice(0, 3).map((p, i) => (
                  <motion.div key={p.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.05 }}>
                    <Card item={p as any} variant="project" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-[var(--muted)]">{resume.location}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">Education</h3>
              <ul className="mt-3 grid gap-3">
                {resume.education.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="size-12 shrink-0 rounded-md overflow-hidden border border-white/10 bg-white">
                      {e.slug === 'ms-mis-siu' ? (
                        <img src={siueImg} className="w-full h-full object-contain p-1.5" alt={e.title} />
                      ) : e.slug === 'bs-cs-rgpv' ? (
                        <img src={rgpvImg} className="w-full h-full object-contain p-1.5" alt={e.title} />
                      ) : e.image ? (
                        <img src={e.image} className="w-full h-full object-cover" alt={e.title} />
                      ) : null}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{e.title}</div>
                      <div className="text-xs text-[var(--muted)]">{e.subtitle}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <Row id="projects" title="Projects" items={resume.projects as any} variant="project" />
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <Row id="experience" title="Experience" items={resume.experience as any} variant="experience" />
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <Row id="skills" title="Skills" items={resume.skills as any} variant="skill" />
        </section>

        {/* Contact Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-[var(--muted)]">Boise, ID</p>
              <p className="text-sm text-[var(--muted)] mt-1"><a className="hover:underline" href={`tel:${resume.phone.replace(/[^\\d+]/g, '')}`}>{resume.phone}</a></p>
              <p className="text-sm text-[var(--muted)] mt-1"><a className="hover:underline" href={`mailto:${resume.email}`}>{resume.email}</a></p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <form className="grid gap-3" onSubmit={handleSubmit} method="POST" action="https://formspree.io/f/xjkeqjvb">
                {/* Honeypot field */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input name="name" required className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your name" />
                  <input name="email" type="email" required className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your email" />
                </div>
                <textarea name="message" required minLength={10} className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your message" rows={4} />
                <div className="flex items-center gap-3">
                  <button disabled={submitStatus==='sending'} className="bg-[var(--primary)] text-white px-4 py-2 rounded-md w-fit disabled:opacity-60">
                    {submitStatus==='sending' ? 'Sending…' : 'Send'}
                  </button>
                  {submitStatus==='success' && <span className="text-sm text-emerald-400">Message sent!</span>}
                  {submitStatus==='error' && <span className="text-sm text-red-400">Something went wrong. Try again.</span>}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
