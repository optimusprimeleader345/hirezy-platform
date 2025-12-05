import Link from 'next/link'
import { Hero } from '@/components/site/Hero'
import { FeatureCard } from '@/components/site/FeatureCard'
import {
  Brain,
  FileText,
  Briefcase,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: 'AI-Powered Match',
      description: 'Our advanced AI analyzes your skills, experience, and preferences to connect you with the perfect freelance opportunities.'
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: 'Resume AI Enhancement',
      description: 'Get personalized resume suggestions powered by AI to make your profile stand out to potential employers.'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-white" />,
      title: 'Portfolio Showcase',
      description: 'Display your best work in professional portfolios that capture the attention of hiring managers.'
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: 'Secure Payments',
      description: 'Trusted payment processing with escrow protection ensures safe transactions for students and recruiters.'
    }
  ]

  const benefits = [
    '100% Free for Students',
    'Verified Opportunities',
    '24/7 Support',
    'Global Network',
    'AI-Enhanced Matching',
    'Career Guidance'
  ]

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Hirezy</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-choose" className="text-white/80 hover:text-white transition-colors cursor-pointer">
              Why Choose
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors cursor-pointer">
              Features
            </a>
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <div className="h-4 w-px bg-white/30"></div>
            <Link
              href="/student/dashboard"
              className="text-white/80 hover:text-white transition-colors"
            >
              Student Login
            </Link>
            <Link
              href="/recruiter/dashboard"
              className="text-white/80 hover:text-white transition-colors"
            >
              Recruiter Login
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Trust Signals & Why Choose Section */}
      <section id="why-choose" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Company Logos/Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <span className="text-white/80 font-semibold">Trusted by 1,200+ Recruiters</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <span className="text-white/80 font-semibold">15,420+ Students</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <span className="text-white/80 font-semibold">4.9 ★ Rating</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <span className="text-white/80 font-semibold">99.9% Uptime</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']"
                style={{ fontFamily: 'Space Grotesk, monospace' }}>
              Why Choose <span className="text-gradient animate-glow-pulse">Hirezy?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Join thousands of students and recruiters who trust our platform for career growth and talent acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-['Space_Grotesk']"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}>15,420+</h3>
              <p className="text-gray-300 font-medium">Active Students</p>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-['Space_Grotesk']"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}>1,267+</h3>
              <p className="text-gray-300 font-medium">Posted Jobs</p>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-['Space_Grotesk']"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}>94.2%</h3>
              <p className="text-gray-300 font-medium">Success Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center py-4 px-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Space_Grotesk']"
                style={{ fontFamily: 'Space Grotesk, monospace' }}>
              What Our Users Say
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-white/80 ml-2 text-sm font-medium">4.9 out of 5 stars</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Hirezy's AI matching saved me hours of job searching. I landed my dream gig within a week!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Alex Chen</p>
                  <p className="text-gray-400 text-sm">Frontend Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "As a recruiter, the platform's AI insights helped me find perfect candidates 3x faster."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">SR</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Sarah Rodriguez</p>
                  <p className="text-gray-400 text-sm">Talent Acquisition Lead</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The career guidance features are incredible. I went from confused to confident in just 2 weeks."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">MJ</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Marcus Johnson</p>
                  <p className="text-gray-400 text-sm">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']"
                style={{ fontFamily: 'Space Grotesk, monospace' }}>
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Everything you need to succeed in the freelance marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join our community today and unlock limitless opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/student/dashboard">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start as Student <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>

            <Link href="/recruiter/dashboard">
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center">
                Hire Talent <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Hirezy</h3>
              <p className="text-gray-400 text-sm">
                Connecting students with opportunities through AI-powered matching.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/student/dashboard" className="text-gray-400 hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link href="/student/dashboard" className="text-gray-400 hover:text-white transition-colors">Build Profile</Link></li>
                <li><Link href="/student/dashboard" className="text-gray-400 hover:text-white transition-colors">Get AI Help</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Recruiters</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/recruiter/dashboard" className="text-gray-400 hover:text-white transition-colors">Post Jobs</Link></li>
                <li><Link href="/recruiter/dashboard" className="text-gray-400 hover:text-white transition-colors">Find Talent</Link></li>
                <li><Link href="/recruiter/dashboard" className="text-gray-400 hover:text-white transition-colors">Manage Hires</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Login</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#why-choose" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Login</a></li>
                <li><Link href="/student/dashboard" className="text-purple-400 hover:text-white transition-colors">▶ Demo Student</Link></li>
                <li><Link href="/recruiter/dashboard" className="text-purple-400 hover:text-white transition-colors">▶ Demo Recruiter</Link></li>
                <li><Link href="/admin/dashboard" className="text-purple-400 hover:text-white transition-colors">▶ Demo Admin</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 Hirezy. All rights reserved. AI-Powered Freelance Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
