import { motion } from 'framer-motion'
import resume from '../data/resume.json'
import siueImg from '../assets/SIUE.png'
import rgpvImg from '../assets/RGPV.png'

export default function Education() {
  const { education } = resume
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
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-[var(--muted)]">Degrees and institutions.</p>
        </div>
      </motion.header>

      {/* Education Showcase */}
      <div className="space-y-10">
        {education.map((e, idx) => {
          const isEven = idx % 2 === 0
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
                  {e.slug === 'ms-mis-siu' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                      <img src={siueImg} alt={e.title} className="max-h-[220px] lg:max-h-[280px] w-auto object-contain" />
                    </div>
                  ) : e.slug === 'bs-cs-rgpv' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                      <img src={rgpvImg} alt={e.title} className="max-h-[220px] lg:max-h-[280px] w-auto object-contain" />
                    </div>
                  ) : e.image ? (
                    <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">Education</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold leading-tight">{e.title}</h2>
                  {e.subtitle && <div className="text-sm text-[var(--muted)]">{e.subtitle}</div>}
                  {e.gpa && (
                    <div className="mt-1 inline-flex items-center gap-2 text-sm">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">GPA: {e.gpa}</span>
                    </div>
                  )}
                  {/* Optional future fields: period, location, summary, coursework */}
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>
    </main>
  )
}
