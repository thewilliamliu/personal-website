import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Inspirations' }

export default function Page() {
  return (
    <PageShell title="Things That Inspire Me">
      {/* Add your list here */}
      <p className="mb-4 text-[15px] leading-[1.5]">
        Placeholder — a list of people, ideas, essays, and works that inspire
        me.
      </p>
    </PageShell>
  )
}
