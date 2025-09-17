import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import SkillCard from './SkillCard'

export type RowItem = any

export default function Row({ id, title, items, variant }: { id: string; title: string; items: RowItem[]; variant: 'project' | 'experience' | 'pill' | 'education' | 'skill' }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    const amount = el.clientWidth * 0.9
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const viewAllPath = id === 'projects' ? '/projects' : id === 'experience' ? '/experience' : id === 'skills' ? '/skills' : id === 'education' ? '/education' : undefined

  return (
    <section id={id} className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-3">
          {viewAllPath && (
            <Link to={viewAllPath} className="text-sm text-[var(--muted)] hover:text-white">View all</Link>
          )}
          <button className="p-2 rounded bg-white/5 hover:bg-white/10" onClick={() => scroll('left')} aria-label={`Scroll ${title} left`}>
            <ChevronLeft className="size-5" />
          </button>
          <button className="p-2 rounded bg-white/5 hover:bg-white/10" onClick={() => scroll('right')} aria-label={`Scroll ${title} right`}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {variant === 'pill' ? (
        <div ref={ref} className="flex gap-2 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-2 flex-nowrap">
          {items.map((s: string) => (
            <span key={s} className="snap-start shrink-0 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[var(--muted)]">
              {s}
            </span>
          ))}
        </div>
      ) : variant === 'skill' ? (
        <div ref={ref} className="flex gap-3 overflow-x-hidden snap-x snap-mandatory pb-2 flex-nowrap">
          {(items as string[]).map((name) => (
            <div key={name} className="snap-start shrink-0">
              <SkillCard name={name} />
            </div>
          ))}
        </div>
      ) : (
        <div ref={ref} className="flex gap-3 overflow-x-hidden snap-x snap-mandatory pb-2 flex-nowrap">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="snap-start shrink-0">
              <Card item={item} variant={(variant === 'experience' ? 'experience' : variant === 'education' ? 'education' : 'project')} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
