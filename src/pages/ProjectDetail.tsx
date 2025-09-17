import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import resume from '../data/resume.json'
import webPortfolioImg from '../assets/webportfolio.jpg'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = resume.projects.find((p) => p.slug === slug) as any

  if (!project) {
    return (
      <main className="container-safe py-10">
        <p className="text-[var(--muted)]">Project not found.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded border border-white/10 hover:bg-white/5">
          <ChevronLeft className="size-4" /> Back to Projects
        </Link>
      </main>
    )
  }

  const tech = project.tech || {}

  return (
    <main className="container-safe py-8 space-y-8">
      <Link to="/projects" className="inline-flex items-center gap-2 px-3 py-2 rounded border border-white/10 hover:bg-white/5 w-fit">
        <ChevronLeft className="size-4" /> Back to Projects
      </Link>

      {/* Overview */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 items-start"
      >
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-white/5 min-h-[240px]">
          {project.slug === 'web-dev-portfolio' ? (
            <img src={webPortfolioImg} alt={project.title} className="w-full h-full object-cover" />
          ) : project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="aspect-video" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          {project.subtitle && <p className="text-[var(--muted)] mt-1">{project.subtitle}</p>}
          {project.summary ? (
            <p className="mt-4 text-[var(--muted)] leading-7">{project.summary}</p>
          ) : project.description ? (
            <p className="mt-4 text-[var(--muted)] leading-7">{project.description}</p>
          ) : null}

          {Array.isArray(project.tags) && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t: string) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">{t}</span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-3">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:border-white/25">
                View repo
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-[var(--primary)] text-white px-3 py-1.5 text-sm font-medium hover:opacity-90">
                Live demo
              </a>
            )}
          </div>
        </div>
      </motion.section>

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
                    {tech[k].map((t: string) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </motion.section>
      )}

      {/* Highlights / Responsibilities */}
      {Array.isArray(project.highlights) && project.highlights.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Highlights</h2>
          <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--muted)]">
            {project.highlights.map((h: string, i: number) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Features */}
      {Array.isArray(project.features) && project.features.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="mt-3 grid gap-2 list-disc pl-5 text-[var(--muted)]">
            {project.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Challenges & Solutions */}
      {Array.isArray(project.challenges) && project.challenges.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Challenges & Solutions</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {project.challenges.map((c: any, i: number) => (
              <div key={i} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">{c.problem}</div>
                <div className="text-sm text-[var(--muted)] mt-1">{c.solution}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Metrics */}
      {Array.isArray(project.metrics) && project.metrics.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Outcomes</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((m: any, i: number) => (
              <div key={i} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold">{m.value}</div>
                <div className="text-sm text-[var(--muted)]">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Gallery */}
      {Array.isArray(project.gallery) && project.gallery.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src: string, i: number) => (
              <div key={i} className="relative rounded-md overflow-hidden border border-white/10 bg-white/5 group">
                <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-40 object-cover group-hover:scale-[1.03] transition" />
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  )
}
