import Link from 'next/link'
import AizawaBackground from 'app/components/aizawa'
import SpeedDial from 'app/components/speed-dial'

const link =
  'underline decoration-white/50 underline-offset-4 transition-opacity hover:opacity-80'

export default function Page() {
  return (
    <>
      <AizawaBackground />
      <SpeedDial />
      {/* Scroll runway: scrolling rotates the attractor while the card stays put */}
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="glass-card w-full max-w-2xl rounded-2xl p-7 md:p-8 text-white">
          <h1 className="mb-4 text-base font-medium tracking-tight">
            William Liu
          </h1>

          <p className="mb-3 text-[13px] leading-relaxed">
            I&apos;m an undergrad studying mathematics at Princeton. Recently,
            I&apos;ve been learning a lot about knot theory, ML, graphs, and
            market-making.
          </p>

          <p className="mb-3 text-[13px] leading-relaxed">
            Big picture, I&apos;m excited about technological advancement, and
            I aim to be a part of it. My hope is that this site can be a place
            where the resume steps back and my more overarching ideas come
            forward.{' '}
            <Link href="/inspirations" className={link}>
              Here
            </Link>{' '}
            are a list of things that inspire me.
          </p>

          <p className="mb-3 text-[13px] leading-relaxed">
            Previously, I was a nationally ranked debater and a YoungArts
            winner in classical violin. Don&apos;t know whether it was the
            chicken or the egg that came first, but I became pretty interested
            in global affairs, philosophy, and music during this time.
          </p>

          <p className="mb-3 text-[13px] leading-relaxed">
            In my spare hours, I chip away at my{' '}
            <Link href="/reading" className={link}>
              reading list
            </Link>
            . I also enjoy pickup basketball and{' '}
            <Link href="/photography" className={link}>
              travel photography
            </Link>
            .
          </p>

          <p className="mb-3 text-[13px] leading-relaxed">
            You can{' '}
            <a
              href="https://thewilliamliu.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              read my writing
            </a>{' '}
            on Substack. For my technical skills, see my{' '}
            <Link href="/coursework" className={link}>
              coursework
            </Link>{' '}
            and{' '}
            <Link href="/projects" className={link}>
              projects
            </Link>
            .
          </p>

          <p className="mb-5 text-[13px] leading-relaxed">
            I am currently based in <strong>New York, NY</strong>.{' '}
            <a href="mailto:williamliu@princeton.edu" className={link}>
              Reach out
            </a>{' '}
            — would love to grab coffee and talk about the future.
          </p>

          <p className="mt-7 text-[11px] text-white/70">
            © {new Date().getFullYear()} William Liu
          </p>
        </section>
      </main>
    </>
  )
}
