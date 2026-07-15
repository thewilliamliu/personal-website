import './global.css'
import type { Metadata } from 'next'
// Both fonts are self-hosted; the font toggle switches between them.
import '@fontsource-variable/inter'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/lora'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import AizawaBackground from 'app/components/aizawa'

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
  icons: {
    icon: "/app/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Apply saved theme/font before first paint to avoid a flash
const initScript = `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;var f=localStorage.getItem('font');if(f)document.documentElement.dataset.font=f;}catch(e){}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning: theme/font attrs are set pre-paint from localStorage
    <html lang="en" data-font="serif" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="antialiased">
        {/* Mounted in the layout so it persists across page navigation */}
        <AizawaBackground />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
