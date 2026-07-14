import './global.css'
import type { Metadata } from 'next'
// Swap the font here — pick any at https://fontsource.org,
// `npm install @fontsource-variable/<name>`, import it, and
// update --font-serif in global.css.
import '@fontsource-variable/newsreader'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'William Liu',
    template: '%s | William Liu',
  },
  description: 'Personal website of William Liu.',
  openGraph: {
    title: 'William Liu',
    description: 'Personal website of William Liu.',
    url: baseUrl,
    siteName: 'William Liu',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`bg-[#0a0a0a] text-neutral-100 ${GeistMono.variable}`}
    >
      <body className="antialiased font-serif">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
