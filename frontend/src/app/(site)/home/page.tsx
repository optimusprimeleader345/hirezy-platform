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
  ChevronDown
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
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-white/80 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#about" className="text-white/80 hover:text-white transition-colors">
              About
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

      {/* Why Choose Section */}
      <section id="why-choose" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient">Hirezy?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of students and recruiters who trust our platform for career growth and talent acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">15,420+</h3>
              <p className="text-gray-300">Active Students</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">1,267+</h3>
              <p className="text-gray-300">Posted Jobs</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">94.2%</h3>
              <p className="text-gray-300">Success Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center py-4 px-2">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
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
