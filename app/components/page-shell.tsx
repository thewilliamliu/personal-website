import Link from 'next/link'
import AizawaBackground from 'app/components/aizawa'
import Controls from 'app/components/controls'

// Shared layout: attractor background + centered glass card.
export default function PageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <AizawaBackground />
      <Controls />
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="w-full max-w-lg overflow-y-auto max-h-[85vh] p-8 md:p-10">
          <h1 className="mb-3 text-[17px] font-semibold ">{title}</h1>
          {children}
          <Link
            href="/"
            className="lnk mt-5 inline-block text-xs"
          >
            ← back home
          </Link>
        </section>
      </main>
    </>
  )
}
