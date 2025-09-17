export default function Hero({ subtitle }: { subtitle: string }) {
  return (
    <section className="relative isolate">
      <div className="h-[56vh] md:h-[62vh] lg:h-[68vh] bg-gradient-to-b from-[var(--bg-soft)] to-[var(--bg)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        <div className="container-safe relative z-10 h-full flex flex-col justify-end pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-tight">
            Building scalable, secure and delightful software experiences
          </h1>
          <p className="mt-4 text-[var(--muted)] max-w-2xl">{subtitle}</p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition">See Projects</a>
            <a href="#contact" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-md font-medium hover:bg-white/5 transition">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}
