import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Projects' }

export default function Page() {
  return (
    <PageShell title="Projects">
      {/* Add your projects here */}
      <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
        Placeholder — things I&apos;ve built.
      </p>
    </PageShell>
  )
}
