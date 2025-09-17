import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'
import webPortfolioImg from '../assets/webportfolio.jpg'

export default function Projects() {
  const { projects } = resume
  return (
    <main className="container-safe py-10 space-y-10">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6"
      >
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-[var(--muted)]">Case‑study highlights of selected work and experiments.</p>
        </div>
      </motion.header>

      {/* Projects Showcase */}
      <div className="space-y-10">
        {projects.map((p, idx) => {
          const isEven = idx % 2 === 0
          const internal = p.slug ? `/projects/${p.slug}` : undefined
          return (
            <motion.section
              key={p.slug || idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              <div className={`grid gap-0 lg:grid-cols-2 ${isEven ? '' : 'lg:[&>div:first-child]:order-2'}`}>
                {/* Image */}
                <div className="relative group min-h-[220px] lg:min-h-[320px]">
                  <div className="absolute inset-0 bg-[var(--bg)]/40" />
                  {p.slug === 'web-dev-portfolio' ? (
                    <img src={webPortfolioImg} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : p.image ? (
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">Project</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold leading-tight">{p.title}</h2>
                      {p.subtitle && <div className="text-sm text-[var(--muted)] mt-0.5">{p.subtitle}</div>}
                    </div>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:border-white/20">
                        GitHub
                      </a>
                    )}
                  </div>

                  {p.description && <p className="text-[var(--muted)] leading-7">{p.description}</p>}

                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {p.tags.map((t: string) => (
                        <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    {internal ? (
                      <Link
                        to={internal}
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] text-white px-3 py-1.5 text-sm font-medium hover:opacity-90"
                      >
                        Read more
                      </Link>
                    ) : null}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:border-white/25"
                      >
                        View repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>
    </main>
  )
}
