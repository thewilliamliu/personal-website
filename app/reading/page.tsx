import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Reading List' }

export default function Page() {
  return (
    <PageShell title="Reading List">
      {/* Add your books here */}
      <p className="mb-4 text-[14px] leading-[1.35]">
        Placeholder — what I&apos;m reading now, and what I&apos;ve finished.
      </p>
    </PageShell>
  )
}
