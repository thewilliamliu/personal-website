import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Reading List' }

export default function Page() {
  return (
    <PageShell title="Reading List">
      {/* Add your books here */}
      <p className="mb-3 text-sm leading-relaxed">
        Placeholder — what I&apos;m reading now, and what I&apos;ve finished.
      </p>
    </PageShell>
  )
}
