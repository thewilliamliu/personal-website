import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Coursework' }

export default function Page() {
  return (
    <PageShell title="Coursework">
      {/* Add your courses here */}
      <p className="mb-4 text-[15px] leading-relaxed">
        Placeholder — relevant coursework in math, CS, and beyond.
      </p>
    </PageShell>
  )
}
