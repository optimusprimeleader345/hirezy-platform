'use client'

import { useState } from 'react'
import { HelpCircle, Search, MessageCircle, FileText, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How do I find freelance jobs as a student?",
      answer: "Navigate to the Gigs page from your student dashboard. Use filters to find opportunities that match your skills and experience level. Click 'Apply' on any job that interests you, and our AI will help optimize your application."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h1 className="text-4xl font-bold mb-4">Help & Support Center</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get answers to common questions and contact support.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, index) => (
              <div key={index} className="px-6 py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left hover:bg-slate-50 px-2 py-2 rounded"
                >
                  <h3 className="text-slate-900 font-medium">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="mt-4 px-2 pb-2">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center border">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still Need Help?</h2>
          <p className="text-slate-600 mb-8">
            Our support team is here to help. Contact us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              <FileText className="w-4 h-4 inline mr-2" />
              Submit Support Ticket
            </button>
            <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Live Chat (Coming Soon)
            </button>
          </div>
          <div className="mt-6 text-sm text-slate-500">
            <p>📧 support@hirezy.com • 📞 1-800-HIREZY</p>
          </div>
        </div>
      </div>

      <footer className="bg-slate-100 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-sm">
            Can't find what you're looking for?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Return to Home
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
