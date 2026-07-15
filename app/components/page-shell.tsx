import Link from 'next/link'
import Controls from 'app/components/controls'
import ScrollCard from 'app/components/scroll-card'

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
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
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
