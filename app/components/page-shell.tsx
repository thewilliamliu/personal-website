import Link from 'next/link'
import AizawaBackground from 'app/components/aizawa'

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
      <div aria-hidden="true" className="h-[400vh]" />
      <main className="fixed inset-0 flex items-center justify-center p-6">
        <section className="glass-card w-full max-w-lg overflow-y-auto max-h-[85vh] rounded-2xl p-7 md:p-8 text-white">
          <h1 className="mb-4 text-base font-medium tracking-tight">{title}</h1>
          {children}
          <Link
            href="/"
            className="mt-5 inline-block text-xs underline decoration-white/50 underline-offset-4 transition-opacity hover:opacity-80"
          >
            ← back home
          </Link>
        </section>
      </main>
    </>
  )
}
