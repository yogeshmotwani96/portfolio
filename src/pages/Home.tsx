import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'
import avatar from '../assets/yogi.jpeg'
import { FileText, Briefcase, Cog, FolderCode, Mail } from 'lucide-react'

const cards = [
  {
    title: 'Resume',
    subtitle: 'Overview of profile, summary, and education',
    to: '/resume',
    color: 'from-[#d90416] to-[#8b000c]',
    icon: FileText
  },
  {
    title: 'Experience',
    subtitle: 'Roles, impact, and outcomes',
    to: '/experience',
    color: 'from-[#27272a] to-[#111114]',
    icon: Briefcase
  },
  {
    title: 'Skills',
    subtitle: 'Technologies and tools',
    to: '/skills',
    color: 'from-[#1f2937] to-[#0b0b0f]',
    icon: Cog
  },
  {
    title: 'Projects',
    subtitle: 'Selected work and experiments',
    to: '/projects',
    color: 'from-[#0ea5e9] to-[#0369a1]',
    icon: FolderCode
  },
  {
    title: 'Contact',
    subtitle: 'Say hello',
    to: '/contact',
    color: 'from-[#9333ea] to-[#6d28d9]',
    icon: Mail
  },
]

export default function Home() {
  return (
    <main className="min-h-[80vh] grid place-items-center">
      <section className="container-safe">
        <motion.div
          className="mx-auto mb-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile photo */}
          <img src={avatar} alt="Yogesh avatar" className="size-24 sm:size-28 rounded-full object-cover shadow-[0_0_40px_rgba(229,9,20,0.35)]" />
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold">{resume.name}</h1>
          <p className="mt-1 text-[var(--muted)]">{resume.title}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-wide">Choose a profile</h2>
        </motion.div>

        <motion.div
          className="mx-auto grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 place-items-center max-w-[1200px]"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {cards.map((c) => (
            <motion.div key={c.title} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="text-center">
              <Link to={c.to} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60">
                <div className={`w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px] bg-gradient-to-br ${c.color} rounded-2xl`} />
                {/* Centered icon inside the block */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/95">
                  {(() => {
                    const Icon = (c as any).icon
                    return <Icon className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow transition-transform duration-200 group-hover:scale-110" />
                  })()}
                </div>
                {/* Removed ring overlay to avoid hairline artifacts */}
              </Link>
              {/* Label under the block (single word) */}
              <div className="mt-2 text-sm sm:text-base font-medium text-white/90">{c.title}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
