import AizawaBackground from 'app/components/aizawa'

export default function Page() {
  return (
    <>
      <AizawaBackground />
      {/* Scroll runway: scrolling rotates the attractor while the card stays put */}
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="glass-card w-full max-w-md rounded-2xl p-7 md:p-8 text-white">
          <h1 className="mb-4 text-lg font-medium tracking-tight">
            William Liu
          </h1>

          {/* Replace this placeholder with your real bio text */}
          <p className="mb-3 text-sm leading-relaxed">
            I&apos;m a student interested in software engineering and
            quantitative finance. This is where a short intro about you goes —
            what you&apos;re working on, where you study, what you care about.
          </p>
          <p className="mb-5 text-sm leading-relaxed">
            Second paragraph placeholder — interests, projects, or anything
            else worth sharing.
          </p>

          <div className="flex gap-5 text-xs">
            <a
              className="underline underline-offset-4 text-white decoration-white/50 transition-opacity hover:opacity-80"
              href="mailto:realwilliamliu@gmail.com"
            >
              Email
            </a>
            <a
              className="underline underline-offset-4 text-white decoration-white/50 transition-opacity hover:opacity-80"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="underline underline-offset-4 text-white decoration-white/50 transition-opacity hover:opacity-80"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          <p className="mt-7 text-[11px] text-white/70">
            © {new Date().getFullYear()} William Liu
          </p>
        </section>
      </main>
    </>
  )
}
