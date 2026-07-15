import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Coursework' }

export default function Page() {
  return (
    <PageShell title="Coursework">
      {/* Add your courses here */}
      <p className="mb-4 text-[12px] leading-[1.3]">
        Placeholder — relevant coursework in math, CS, and beyond.
      </p>
    </PageShell>
  )
}
