export const metadata = {
  title: 'Hirezy - Find Your Next Freelance Gig',
  description: 'Connect students with opportunities through AI-powered matching and intelligent career guidance',
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-landing-navy via-landing-indigo to-landing-purple">
      {children}
    </div>
  )
}
