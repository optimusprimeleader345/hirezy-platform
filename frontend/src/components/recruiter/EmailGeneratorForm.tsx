'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  Send,
  Copy,
  Zap,
  User,
  Briefcase,
  Star,
  Save,
  Download
} from 'lucide-react'

interface EmailGeneratorFormProps {
  initialCandidateName?: string
  initialGigTitle?: string
  initialType?: string
}

export default function EmailGeneratorForm({
  initialCandidateName = '',
  initialGigTitle = '',
  initialType = 'followup'
}: EmailGeneratorFormProps) {
  const [candidateName, setCandidateName] = useState(initialCandidateName)
  const [gigTitle, setGigTitle] = useState(initialGigTitle)
  const [emailType, setEmailType] = useState(initialType)
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // Email templates by category
  const emailCategories = {
    followup: {
      title: '📧 Follow-up Emails',
      templates: [
        'Check Application Status',
        'Request Additional Info',
        'Portfolio Review Update',
        'Technical Skills Assessment'
      ]
    },
    interview: {
      title: '🎯 Interview Invites',
      templates: [
        'Initial Screening Invite',
        'Technical Interview Invitation',
        'Final Round Interview',
        'Feedback Interview Request'
      ]
    },
    offer: {
      title: '💼 Offer Communications',
      templates: [
        'Offer Letter Introduction',
        'Offer Acceptance Request',
        'Offer Follow-up',
        'Offer Counter Proposal'
      ]
    },
    rejection: {
      title: '📋 Rejection Emails',
      templates: [
        'Gentle Application Rejection',
        'Suggest Future Opportunities',
        'Encourage Reapplication',
        'Position Filled Notification'
      ]
    },
    welcome: {
      title: '👋 Welcome & Onboarding',
      templates: [
        'Job Offer Acceptance Welcome',
        'Team Introduction',
        'Start Date Confirmation',
        'Onboarding Document Request'
      ]
    }
  }

  const generateEmail = async () => {
    setIsGenerating(true)
    setGeneratedEmail('')

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate different email templates based on type
    const templates = emailCategories[emailType as keyof typeof emailCategories]

    let emailContent = ''

    switch (emailType) {
      case 'interview':
        emailContent = `Subject: Thank You & Next Steps - ${gigTitle}\n\nDear ${candidateName},\n\nThank you for taking the time to speak with us today about the ${gigTitle} position. It was a pleasure learning more about your background and experience.\n\nAfter careful consideration, we'd like to invite you to a technical interview to further discuss your potential role on our team. This interview will include:\n\n- Code walkthrough and technical challenge\n- Team collaboration scenarios\n- Leadership and career growth discussions\n\nOur Engineering Manager, Sarah Chen, will be joining us for this session.\n\nPreferred time slots:\n• Tuesday, Jan 23rd at 2:00 PM EST\n• Wednesday, Jan 24th at 10:00 AM EST\n• Thursday, Jan 25th at 3:00 PM EST\n\nPlease reply to this email with your preferred time or let us know if none of these work for you.\n\nWe're excited about the possibility of having you join our team!\n\nBest regards,\n[Your Name]\n[Your Position]\n[Company Name]\n[Contact Information]`
        break

      case 'offer':
        emailContent = `Subject: ${gigTitle} - Formal Job Offer from ${initialGigTitle}\n\nDear ${candidateName},\n\nI am thrilled to extend a formal offer for the ${gigTitle} position at our company!\n\nAfter thorough discussions with our leadership team and a careful review of all candidates, we unanimously agreed that you are the ideal person to join our company. Your unique combination of technical expertise, problem-solving abilities, and collaborative mindset makes you a perfect fit for our team.\n\nOffer Details:\n\n✨ Salary: $95,000 base\n🩺 Health Insurance: Full coverage including dental and vision\n🕰️ PTO: 25 days annually\n💻 Equipment: Latest MacBook Pro and dual monitors\n🏠 Remote Work: Flexible hybrid schedule\n\ud83d\udcc8 Equity: 0.08% startup equity package\n\nAt our company, you'll work with cutting-edge technologies and have the opportunity to grow your career significantly. We're building something truly special here.\n\nPlease review this offer and let me know your thoughts. I'd be happy to discuss any aspects of this offer in more detail.\n\nLooking forward to your response!\n\nBest regards,\n[Your Name]\n[Your Position]\n[Company Name]\n[Phone Number]`
        break

      case 'rejection':
        emailContent = `Subject: ${gigTitle} Application Update\n\nDear ${candidateName},\n\nThank you for your interest in the ${gigTitle} position at our company and for taking the time to apply and interview with us. We truly appreciated getting to know you and learning about your background and experience.\n\nAfter careful consideration, we've decided to move forward with another candidate whose skills and experience more closely match our current needs for this particular role. This was an extremely difficult decision given the high quality of all our candidates.\n\nWe were impressed by your [specific strength from interview - e.g., technical expertise/problem costing approach/team fit] and believe you have a lot to offer in the right environment.\n\nWe'd love to keep your information on file for future opportunities. Specifically, we believe you might be interested in our [related position or general openings].\n\nThank you again for your interest and the investment of your time. We wish you all the best in your job search!\n\nBest regards,\n[Your Name]\n[Your Position]\n[Company Name]`
        break

      default: // followup
        emailContent = `Subject: ${gigTitle} - Update on Your Application\n\nDear ${candidateName},\n\nI hope this email finds you well. Thank you again for your interest in the ${gigTitle} position and for the time you invested in our interview process.\n\nWe're currently reviewing all candidates and hope to complete our decision in the next 3-5 business days. We appreciate your patience during this process.\n\nYour background and experience in [relevant skills] were particularly impressive and sparked great discussion among our team members. We truly enjoyed learning about your work on [specific project or achievement].\n\nOnce we complete our final round of interviews and discussions, we'll be in touch either way. In the meantime, please don't hesitate to reach out if you have any questions about the process or our company.\n\nThank you once again for your interest in joining our team. We're excited about the possibility of working together!\n\nBest regards,\n[Your Name]\n[Your Position]\n[Company Name]\n[Contact Information]`
    }

    setGeneratedEmail(emailContent)
    setIsGenerating(false)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (initialCandidateName) setCandidateName(initialCandidateName)
    if (initialGigTitle) setGigTitle(initialGigTitle)
    if (initialType) setEmailType(initialType)
  }, [initialCandidateName, initialGigTitle, initialType])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center justify-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-[#3EFFA8]" />
          AI Email Generator
        </h1>
        <p className="text-[#C9CFD6] text-lg">
          Generate personalized emails for different stages of the recruitment process
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-[#FFD700]" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">Email Configuration</h2>
            </div>

            <div className="space-y-4">
              {/* Email Type */}
              <div>
                <label className="block text-sm font-medium text-[#C9CFD6] mb-2">
                  Email Purpose
                </label>
                <Select value={emailType} onValueChange={setEmailType}>
                  <SelectTrigger className="bg-[#111315] border-[#23262B] text-[#E2E8F0]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1D21] border-[#23262B]">
                    {Object.entries(emailCategories).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Category Templates */}
              <div>
                <label className="block text-sm font-medium text-[#C9CFD6] mb-2">
                  Available Templates
                </label>
                <div className="space-y-2">
                  {emailCategories[emailType as keyof typeof emailCategories]?.templates.map((template, i) => (
                    <Badge key={i} variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] cursor-pointer hover:bg-[#3EFFA8] hover:text-black">
                      {template}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Candidate Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Candidate Name
                  </label>
                  <Input
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g., John Smith"
                    className="bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Position Title
                  </label>
                  <Input
                    value={gigTitle}
                    onChange={(e) => setGigTitle(e.target.value)}
                    placeholder="e.g., Senior React Developer"
                    className="bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Generate Button */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <Button
              onClick={generateEmail}
              disabled={isGenerating || !candidateName || !gigTitle}
              className="w-full bg-[#3EFFA8] hover:bg-[#00ff88] text-black font-bold py-4"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                  Generating Email...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3" />
                  Generate Personalized Email
                </>
              )}
            </Button>

            {!candidateName || !gigTitle ? (
              <p className="text-[#8A8F98] text-sm mt-2 text-center">
                Please fill in candidate name and position to generate
              </p>
            ) : (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-4 h-4 text-[#FFD700]" />
                <p className="text-[#FFD700] text-sm">
                  AI will create personalized content based on context
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Generated Email */}
        <div className="space-y-6">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#FFFFFF] flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Generated Email
              </h2>
              {generatedEmail && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Send
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-[#111315] border border-[#23262B] rounded-lg">
              {generatedEmail ? (
                <Textarea
                  value={generatedEmail}
                  onChange={(e) => setGeneratedEmail(e.target.value)}
                  className="min-h-[400px] bg-transparent border-0 text-[#E2E8F0] resize-none"
                  placeholder="*Generated email will appear here*"
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Mail className="w-12 h-12 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                    <p className="text-[#C9CFD6tiary]">Configure your email above and click Generate</p>
                    <p className="text-[#8A8F98] text-sm mt-2">
                      AI will create personalized content based on the candidate and role
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {generatedEmail && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-[#23262B]">
                <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                  <Save className="w-4 h-4 mr-1" />
                  Save Template
                </Button>
                <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                  <Download className="w-4 h-4 mr-1" />
                  Export PDF
                </Button>
              </div>
            )}
          </Card>

          {/* Template Categories */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">Popular Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(emailCategories).slice(0, 6).map(([key, category], i) => (
                <Button
                  key={key}
                  size="sm"
                  variant="outline"
                  onClick={() => setEmailType(key)}
                  className={`justify-start text-xs ${
                    emailType === key
                      ? 'border-[#3EFFA8] text-[#3EFFA8] bg-[#3EFFA8]/10'
                      : 'border-[#23262B] text-[#C9CFD6] hover:border-[#FFD700] hover:text-[#FFD700]'
                  }`}
                >
                  {category.title.split(' ')[1]} • {category.templates.length} templates
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
