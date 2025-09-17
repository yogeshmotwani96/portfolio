import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoLogin from '../assets/logo_login.webp'
import capitalOneLogo from '../assets/Capital_One_logo.svg.png'
import accentureLogo from '../assets/Accenture-Symbol.png'
import webPortfolioImg from '../assets/webportfolio.jpg'

type CardItem = {
  title: string
  subtitle?: string
  description?: string
  link?: string
  tags?: string[]
  slug?: string
  image?: string
}

function getInternalPath(variant: 'project' | 'experience' | 'education', slug?: string) {
  if (!slug) return undefined
  if (variant === 'project') return `/projects/${slug}`
  if (variant === 'experience') return `/experience/${slug}`
  return undefined
}

export default function Card({ item, variant }: { item: CardItem; variant: 'project' | 'experience' | 'education' }) {
  const internalPath = getInternalPath(variant, item.slug)

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (internalPath) return (
      <Link to={internalPath} className="group block w-64 shrink-0 rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-white/5 hover:border-white/10 shadow-card">
        {children}
      </Link>
    )
    return (
      <a
        href={item.link || '#'}
        target={item.link ? '_blank' : undefined}
        rel={item.link ? 'noreferrer' : undefined}
        className="group block w-64 shrink-0 rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-white/5 hover:border-white/10 shadow-card"
      >
        {children}
      </a>
    )
  }

  return (
    <motion.div whileHover={{ y: -6 }}>
      <Wrapper>
        <div className="aspect-video bg-[var(--bg)]/60 overflow-hidden">
          {variant === 'experience' && item.slug === 'holiday-world' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-6">
              <img src={logoLogin} alt={item.title} className="max-h-[120px] w-auto object-contain" />
            </div>
          ) : variant === 'experience' && item.slug === 'capitalone' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-6">
              <img src={capitalOneLogo} alt={item.title} className="max-h-[120px] w-auto object-contain" />
            </div>
          ) : variant === 'experience' && item.slug === 'accenture' ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-6">
              <img src={accentureLogo} alt={item.title} className="max-h-[120px] w-auto object-contain" />
            </div>
          ) : variant === 'project' && item.slug === 'web-dev-portfolio' ? (
            <img src={webPortfolioImg} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
          ) : item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
          ) : (
            <div className="w-full h-full grid place-items-center text-sm text-[var(--muted)]">
              {variant === 'project' ? 'Project' : variant === 'experience' ? 'Experience' : 'Education'}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="font-semibold line-clamp-1">{item.title}</div>
          {item.subtitle && <div className="text-xs text-[var(--muted)] line-clamp-1">{item.subtitle}</div>}
          {item.description && <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{item.description}</p>}
          {item.tags && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 4).map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  )
}
