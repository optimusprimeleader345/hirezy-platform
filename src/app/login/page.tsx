'use client'

'use client'

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, LogIn, Users, Briefcase, Shield, ArrowRight, ArrowLeft, CheckCircle, Check, AlertTriangle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth, getRedirectPath } from '@/lib/auth'

interface DemoAccount {
  email: string
  password: string
  role: string
  name: string
  color: string
  icon: React.ComponentType<any>
}

const demoAccounts: DemoAccount[] = [
  {
    email: 'admin@hirezy.com',
    password: 'admin123',
    role: 'Admin',
    name: 'Hirezy Admin',
    color: 'from-blue-600 to-purple-600',
    icon: Shield
  },
  {
    email: 'recruiter@techcorp.com',
    password: 'recruiter123',
    role: 'Recruiter',
    name: 'Sarah Johnson',
    color: 'from-green-600 to-teal-600',
    icon: Briefcase
  },
  {
    email: 'student@example.com',
    password: 'student123',
    role: 'Student',
    name: 'Alex Developer',
    color: 'from-orange-600 to-red-600',
    icon: Users
  }
]

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const [selectedDemo, setSelectedDemo] = useState<DemoAccount | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Advanced login features
  const [rememberMe, setRememberMe] = useState(false)
  const [capsLockWarning, setCapsLockWarning] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetError, setResetError] = useState('')

  // Handle URL parameters to auto-select demo account
  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam) {
      const roleMap: { [key: string]: string } = {
        'admin': 'Admin',
        'recruiter': 'Recruiter',
        'student': 'Student'
      }

      const accountRole = roleMap[roleParam.toLowerCase()]
      const account = demoAccounts.find(acc =>
        acc.role.toLowerCase() === accountRole?.toLowerCase()
      )

      if (account) {
        handleDemoLogin(account)
      }
    }
  }, [searchParams])

  // Handle automatic redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      const redirectPath = getRedirectPath(user.role)
      router.push(redirectPath)
    }
  }, [user, router])

  // Load remembered email on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('hirezy_remembered_email')
      const rememberSettings = localStorage.getItem('hirezy_remember_me')
      if (rememberedEmail && rememberSettings === 'true') {
        setEmail(rememberedEmail)
        setRememberMe(true)
      }
    }
  }, [])

  // Calculate password strength
  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++
    return Math.min(strength, 4)
  }

  // Handle password change with strength calculation
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPassword(password)
    setPasswordStrength(calculatePasswordStrength(password))

    // Caps lock detection - using keydown event instead
    // We check caps lock on keydown events primarily
  }

  // Handle caps lock key events
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockWarning(true)
    } else {
      setCapsLockWarning(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginSuccess(false)

    const result = await login(email, password)

    if (result.success) {
      // Save remember me settings if checked
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          localStorage.setItem('hirezy_remembered_email', email)
          localStorage.setItem('hirezy_remember_me', 'true')
        } else {
          localStorage.removeItem('hirezy_remembered_email')
          localStorage.removeItem('hirezy_remember_me')
        }
      }

      // Show success message briefly
      setLoginSuccess(true)
      setTimeout(() => {
        if (user) {
          const redirectPath = getRedirectPath(user.role)
          router.push(redirectPath)
        }
      }, 1500)
    }
  }

  const handleDemoLogin = (account: DemoAccount) => {
    setSelectedDemo(account)
    setEmail(account.email)
    setPassword(account.password)
  }

  const handleClearForm = () => {
    setEmail('')
    setPassword('')
    setSelectedDemo(null)
    setLoginSuccess(false)
  }

  // Forgot Password Handler - Safe, client-side only
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)
    setResetError('')
    setResetSuccess(false)

    // Simulate API call delay (in real app, this would call backend)
    setTimeout(() => {
      try {
        // Basic email validation
        if (!resetEmail || !resetEmail.includes('@')) {
          setResetError('Please enter a valid email address')
          setResetLoading(false)
          return
        }

        // Check if email exists in demo accounts (simulating backend check)
        const emailExists = demoAccounts.some(account =>
          account.email.toLowerCase() === resetEmail.toLowerCase()
        )

        if (!emailExists) {
          // In real app, don't reveal if email exists for security
          // For demo purposes, show success even for unknown emails
        }

        // Show success message (real app would send email)
        setResetSuccess(true)
        setResetError('')

      } catch (error) {
        setResetError('An error occurred. Please try again.')
      }

      setResetLoading(false)
    }, 1500) // Simulate API call delay
  }

  // Close forgot password modal and reset state
  const closeForgotPassword = () => {
    setShowForgotPassword(false)
    setResetEmail('')
    setResetError('')
    setResetSuccess(false)
    setResetLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Back to Home Link - Positioned absolutely in top-left */}
        <div className="absolute top-8 left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Hirezy</h1>
            <p className="text-slate-300">The future of AI-powered recruitment</p>
          </div>

          {/* Login Form */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={handlePasswordKeyDown}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Password Strength</span>
                      <span className={`text-xs ${
                        passwordStrength === 0 ? 'text-red-400' :
                        passwordStrength === 1 ? 'text-orange-400' :
                        passwordStrength === 2 ? 'text-yellow-400' :
                        passwordStrength === 3 ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {passwordStrength === 0 ? 'Very Weak' :
                         passwordStrength === 1 ? 'Weak' :
                         passwordStrength === 2 ? 'Fair' :
                         passwordStrength === 3 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength === 0 ? 'bg-red-400 w-1/4' :
                          passwordStrength === 1 ? 'bg-orange-400 w-1/2' :
                          passwordStrength === 2 ? 'bg-yellow-400 w-3/4' :
                          passwordStrength === 3 ? 'bg-blue-400 w-full' : 'bg-green-400 w-full'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Caps Lock Warning */}
                {capsLockWarning && (
                  <div className="mt-2 flex items-center gap-2 text-orange-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Caps Lock is on
                  </div>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300">Remember me</span>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              {loginSuccess && (
                <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Login successful! Redirecting...
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || loginSuccess}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Success!
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="text-slate-300 text-sm font-medium mb-3 text-center">Demo Accounts</h4>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleDemoLogin(account)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                      selectedDemo?.email === account.email
                        ? 'bg-gradient-to-r border-blue-500 bg-blue-900/50'
                        : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${account.color} rounded-full flex items-center justify-center`}>
                          <account.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-white font-medium text-sm">{account.name}</div>
                          <div className="text-slate-400 text-xs">{account.role}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <Button
                  onClick={handleClearForm}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-600 hover:bg-slate-700"
                >
                  Clear
                </Button>
                <Button
                  onClick={() => { /* Handle signup */ }}
                  size="sm"
                  className="flex-1 bg-slate-700 hover:bg-slate-600"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6 text-slate-400">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-sm hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
            >
              Forgot Password?
            </button>
            <span className="mx-2">•</span>
            <a href="#" className="text-sm hover:text-blue-400 transition-colors">Help Center</a>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="flex-1 hidden lg:flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            AI-Powered Recruitment Platform
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Join thousands of professionals using Hirezy to find their dream job or recruit top talent with AI-powered insights.
          </p>

          <div className="grid grid-cols-1 gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Smart Matching</h3>
                <p className="text-slate-400 text-sm">AI analyzes skills, experience, and preferences for perfect job-candidate alignment</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Talent Discovery</h3>
                <p className="text-slate-400 text-sm">Advanced sourcing tools identify hidden talent and emerging skills</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Verified Platform</h3>
                <p className="text-slate-400 text-sm">Enterprise-grade security with fraud detection and data protection</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <p className="text-slate-300 text-sm">
              "Hirezy revolutionized our hiring process with AI-powered candidate matching and automated workflows."
            </p>
            <div className="text-slate-400 text-xs mt-2">- TechCorp CTO</div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={closeForgotPassword}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
              <p className="text-slate-300 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Success State */}
            {resetSuccess ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Check Your Email</h3>
                <p className="text-slate-300 text-sm mb-6">
                  We've sent a password reset link to <strong>{resetEmail}</strong>
                </p>
                <Button
                  onClick={closeForgotPassword}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {resetError && (
                  <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                    {resetError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                  {resetLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                Remember your password?{' '}
                <button
                  onClick={closeForgotPassword}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
