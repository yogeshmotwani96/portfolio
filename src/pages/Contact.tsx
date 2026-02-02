import { useState } from 'react'
import resume from '../data/resume.json'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
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
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="container-safe py-10 space-y-10" id="contact">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-[var(--muted)]">Open to opportunities and collaborations.</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Reach me</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex items-center gap-2 text-[var(--muted)]">
              <Phone className="size-4" />
              <a className="hover:underline" href="tel:+16189174030">(618) 917-4030</a>
            </li>
            <li className="flex items-center gap-2 text-[var(--muted)]">
              <Mail className="size-4" />
              <a className="hover:underline" href="mailto:yogeshmotwani96@gmail.com">yogeshmotwani96@gmail.com</a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {resume.links?.github && (
              <a
                href={resume.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
              >
                <Github className="size-4" /> GitHub
              </a>
            )}
            {resume.links?.linkedin && (
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-2 rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Quick message</h2>
          <form className="mt-4 grid gap-3" onSubmit={handleSubmit} method="POST" action="https://formspree.io/f/xjkeqjvb">
            {/* Honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" required className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your name" />
              <input name="email" type="email" required className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your email" />
            </div>
            <textarea name="message" required minLength={10} className="bg-transparent border border-white/10 rounded px-3 py-2" placeholder="Your message" rows={5} />
            <div className="flex items-center gap-3">
              <button disabled={status==='sending'} className="bg-[var(--primary)] text-white px-4 py-2 rounded-md w-fit disabled:opacity-60">{status==='sending' ? 'Sending…' : 'Send'}</button>
              {status==='success' && <span className="text-sm text-emerald-400">Message sent!</span>}
              {status==='error' && <span className="text-sm text-red-400">Something went wrong. Try again.</span>}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
