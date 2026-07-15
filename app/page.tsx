import AizawaBackground from 'app/components/aizawa'

export default function Page() {
  return (
    <>
      <AizawaBackground />
      <main className="flex min-h-screen items-center justify-center p-6">
        <section className="glass-card w-full max-w-md rounded-2xl p-7 md:p-8">
          <h1 className="mb-4 text-lg font-medium tracking-tight">
            William Liu
          </h1>

          {/* Replace this placeholder with your real bio text */}
          <p className="mb-3 text-sm leading-relaxed text-neutral-200">
            I&apos;m a student interested in software engineering and
            quantitative finance. This is where a short intro about you goes —
            what you&apos;re working on, where you study, what you care about.
          </p>
          <p className="mb-5 text-sm leading-relaxed text-neutral-200">
            Second paragraph placeholder — interests, projects, or anything
            else worth sharing.
          </p>

          <div className="flex gap-5 text-xs text-neutral-300">
            <a
              className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white"
              href="mailto:realwilliamliu@gmail.com"
            >
              Email
            </a>
            <a
              className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="underline underline-offset-4 decoration-neutral-500 transition-colors hover:text-white"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          <p className="mt-7 text-[11px] text-neutral-500">
            © {new Date().getFullYear()} William Liu
          </p>
        </section>
      </main>
    </>
  )
}
