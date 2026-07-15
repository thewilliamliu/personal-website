import Link from 'next/link'
import AizawaBackground from 'app/components/aizawa'
import Controls from 'app/components/controls'

const link = 'lnk'

export default function Page() {
  return (
    <>
      <AizawaBackground />
      <Controls showDial />
      {/* Scroll runway: scrolling rotates the attractor while the card stays put */}
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="glass-card w-full max-w-lg rounded-[28px] p-8 md:p-10">
          <h1 className="mb-4 text-xl font-bold tracking-tight">
            William Liu
          </h1>

          <p className="mb-4 text-[15px] leading-relaxed">
            I&apos;m an undergrad studying mathematics at Princeton. Recently,
            I&apos;ve been interested in knot theory, ML, graphs, and
            market-making.
          </p>

          <p className="mb-4 text-[15px] leading-relaxed">
            Big picture, I&apos;m excited about technological advancement, and
            I aim to be a part of it. You can learn about what I want to do
            with my life{' '}
            <Link href="/inspirations" className={link}>
              here
            </Link>
            .
          </p>

          <p className="mb-4 text-[15px] leading-relaxed">
            In a former life, I was a nationally ranked debater and a
            YoungArts winner in classical violin.
          </p>

          <p className="mb-4 text-[15px] leading-relaxed">
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

          <p className="mb-4 text-[15px] leading-relaxed">
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

          <p className="mb-4 text-[15px] leading-relaxed">
            I am currently based in <strong>New York, NY</strong>.{' '}
            <a href="mailto:williamliu@princeton.edu" className={link}>
              Reach out
            </a>{' '}
            — would love to grab coffee and talk about the future.
          </p>

          <p className="text-[15px] leading-relaxed">
            © {new Date().getFullYear()} William Liu
          </p>
        </section>
      </main>
    </>
  )
}
