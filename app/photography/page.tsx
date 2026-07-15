import PageShell from 'app/components/page-shell'

export const metadata = { title: 'Travel Photography' }

export default function Page() {
  return (
    <PageShell title="Travel Photography">
      {/* Add photos here (put images in /public and use next/image) */}
      <p className="mb-4 font-[425] text-[13px] leading-[1.32]">
        Placeholder — photos from places I&apos;ve been.
      </p>
    </PageShell>
  )
}
