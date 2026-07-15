import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Projects' }

export default function Page() {
  return (
    <PageShell title="Projects">
      {/* Add your projects here */}
      <p className="mb-4 text-[15px] leading-[1.5]">
        Placeholder — things I&apos;ve built.
      </p>
    </PageShell>
  )
}
