import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Swiper.js Demo',
  description: 'Next.js app with Swiper.js implementation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
