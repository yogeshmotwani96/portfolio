import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import resume from '../data/resume.json'
import logoLogin from '../assets/logo_login.webp'
import capitalOneLogo from '../assets/Capital_One_logo.svg.png'
import accentureLogo from '../assets/Accenture-Symbol.png'

export default function ExperienceDetail() {
  const { slug } = useParams()
  const item = resume.experience.find((e) => e.slug === slug) as any

  if (!item) {
    return (
      <main className="container-safe py-10">
        <p className="text-[var(--muted)]">Experience not found.</p>
        <Link to="/experience" className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded border border-white/10 hover:bg-white/5">
          <ChevronLeft className="size-4" /> Back to Experience
        </Link>
      </main>
    )
  }

  const tech = item.tech || {}

  return (
    <main className="container-safe py-8 space-y-8">
      <Link to="/experience" className="inline-flex items-center gap-2 px-3 py-2 rounded border border-white/10 hover:bg-white/5 w-fit">
        <ChevronLeft className="size-4" /> Back to Experience
      </Link>

      {/* Overview */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-6 md:grid-cols-2 items-start">
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-white/5 min-h-[240px]">
          {item.slug === 'holiday-world' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-8">
              <img src={logoLogin} alt={item.title} className="max-h-[240px] md:max-h-[280px] w-auto object-contain" />
            </div>
          ) : item.slug === 'capitalone' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-8">
              <img src={capitalOneLogo} alt={item.title} className="max-h-[240px] md:max-h-[280px] w-auto object-contain" />
            </div>
          ) : item.slug === 'accenture' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-8">
              <img src={accentureLogo} alt={item.title} className="max-h-[240px] md:max-h-[280px] w-auto object-contain" />
            </div>
          ) : item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="aspect-video" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{item.title}</h1>
          {item.subtitle && <p className="text-[var(--muted)] mt-1">{item.subtitle}</p>}
          {item.summary ? (
            <p className="mt-4 text-[var(--muted)] leading-7">{item.summary}</p>
          ) : item.description ? (
            <p className="mt-4 text-[var(--muted)] leading-7">{item.description}</p>
          ) : null}

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t: string) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">{t}</span>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Responsibilities */}
      {Array.isArray(item.responsibilities) && item.responsibilities.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Responsibilities</h2>
          <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--muted)]">
            {item.responsibilities.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Achievements */}
      {Array.isArray(item.achievements) && item.achievements.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Achievements</h2>
          <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--muted)]">
            {item.achievements.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Tech Stack */}
      {(tech.frontend || tech.backend || tech.infra || tech.testing) && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(['frontend','backend','infra','testing'] as const).map((k) => (
              Array.isArray(tech[k]) && tech[k].length ? (
                <div key={k}>
                  <div className="text-sm text-[var(--muted)] mb-2 capitalize">{k}</div>
                  <div className="flex flex-wrap gap-2">
                    {tech[k].map((t: any, idx: number) => {
                      const name = typeof t === 'string' ? t : t.name
                      const level = typeof t === 'string' ? undefined : t.level
                      return (
                        <span key={`${name}-${idx}`} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">
                          <span>{name}</span>
                          {level && <span className="text-[10px] px-1 py-0.5 rounded bg-white/5 border border-white/10">{level}</span>}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects / Deliverables */}
      {Array.isArray(item.projects) && item.projects.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Projects / Deliverables</h2>
          <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--muted)]">
            {item.projects.map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Challenges & Solutions */}
      {Array.isArray(item.challenges) && item.challenges.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Challenges & Solutions</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {item.challenges.map((c: any, i: number) => (
              <div key={i} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">{c.problem}</div>
                <div className="text-sm text-[var(--muted)] mt-1">{c.solution}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Outcomes / Metrics */}
      {Array.isArray(item.metrics) && item.metrics.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Outcomes</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {item.metrics.map((m: any, i: number) => (
              <div key={i} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold">{m.value}</div>
                <div className="text-sm text-[var(--muted)]">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Gallery */}
      {Array.isArray(item.gallery) && item.gallery.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.gallery.map((src: string, i: number) => (
              <div key={i} className="relative rounded-md overflow-hidden border border-white/10 bg-white/5 group">
                <img src={src} alt={`${item.title} ${i + 1}`} className="w-full h-40 object-cover group-hover:scale-[1.03] transition" />
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  )
}
