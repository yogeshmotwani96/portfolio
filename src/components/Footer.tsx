export default function Footer({ name }: { name: string }) {
  return (
    <footer id="contact" className="mt-16 border-t border-white/5">
      <div className="container-safe py-8 text-sm text-[var(--muted)] flex items-center justify-between">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p>Boise, ID • <a className="hover:underline" href="tel:+16189174030">(618) 917-4030</a> • <a className="hover:underline" href="mailto:yogeshmotwani96@gmail.com">yogeshmotwani96@gmail.com</a></p>
      </div>
    </footer>
  )
}
