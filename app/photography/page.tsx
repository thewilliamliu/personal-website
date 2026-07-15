import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Travel Photography' }

export default function Page() {
  return (
    <PageShell title="Travel Photography">
      {/* Add photos here (put images in /public and use next/image) */}
      <p className="mb-4 text-[15px] leading-[1.5]">
        Placeholder — photos from places I&apos;ve been.
      </p>
    </PageShell>
  )
}
