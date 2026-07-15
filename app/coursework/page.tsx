import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Coursework' }

export default function Page() {
  return (
    <PageShell title="Coursework">
      {/* Add your courses here */}
      <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
        Placeholder — relevant coursework in math, CS, and beyond.
      </p>
    </PageShell>
  )
}
