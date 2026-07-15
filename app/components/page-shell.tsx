import Link from 'next/link'
import Controls from 'app/components/controls'
import ScrollCard from 'app/components/scroll-card'
import SetSpeed from 'app/components/set-speed'

// Shared layout: attractor background + centered card with scroll hint.
export default function PageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <Controls />
      <SetSpeed value={0.1} />
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-start justify-center p-3 pt-10 pb-20 md:items-center md:p-6 md:pb-6">
        <section className="w-full max-w-lg">
          <ScrollCard>
            <h1 className="mb-3 text-[17px] font-semibold ">{title}</h1>
            {children}
            <Link href="/" className="lnk mt-5 inline-block text-[13px]">
              ← back home
            </Link>
          </ScrollCard>
        </section>
      </main>
    </>
  )
}
