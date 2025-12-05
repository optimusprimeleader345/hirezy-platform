import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hirezy - Freelance Platform',
  description: 'Connect freelancers with opportunities through AI-powered matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-landing-navy via-landing-indigo to-landing-purple font-['Inter'] animate-gradient-flow" style={{
        backgroundSize: '400% 400%'
      }}>
        {children}
      </body>
    </html>
  )
}
