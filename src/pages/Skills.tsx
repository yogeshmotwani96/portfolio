import { motion } from 'framer-motion'
import resume from '../data/resume.json'
import SkillCard from '../components/SkillCard'

export default function Skills() {
  const { skills } = resume
  return (
    <main className="container-safe py-10 space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-[var(--muted)]">Technologies and tools I use regularly.</p>
        </div>
      </header>

      <section className="space-y-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {skills.map((s) => (
            <motion.div key={s} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <SkillCard name={s as string} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
