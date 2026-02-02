import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'
import logoLogin from '../assets/logo_login.webp'
import accentureLogo from '../assets/Accenture-Symbol.png'

export default function Experience() {
  const { experience } = resume
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
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-[var(--muted)]">Roles, impact, and outcomes from recent positions.</p>
        </div>
      </motion.header>

      {/* Experience Showcase */}
      <div className="space-y-10">
        {experience.map((e, idx) => {
          const isEven = idx % 2 === 0
          const internal = e.slug ? `/experience/${e.slug}` : undefined
          return (
            <motion.section
              key={e.slug || idx}
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
                  {e.slug === 'holiday-world' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                      <img src={logoLogin} alt={e.title} className="max-h-[200px] lg-max-h-[260px] w-auto object-contain" />
                    </div>
                  ) : e.slug === 'accenture' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                      <img src={accentureLogo} alt={e.title} className="max-h-[200px] lg:max-h-[260px] w-auto object-contain" />
                    </div>
                  ) : e.image ? (
                    <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">Experience</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold leading-tight">{e.title}</h2>
                      {e.subtitle && <div className="text-sm text-[var(--muted)] mt-0.5">{e.subtitle}</div>}
                    </div>
                  </div>

                  {e.description && <p className="text-[var(--muted)] leading-7">{e.description}</p>}

                  {Array.isArray(e.tags) && e.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {e.tags.map((t: string) => (
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
