import { NextRequest, NextResponse } from 'next/server'
import { mockGigs } from '@/lib/gigs/mockData'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gigId, userProfile } = body

    if (!gigId || typeof gigId !== 'number') {
      return NextResponse.json(
        { error: 'Gig ID is required' },
        { status: 400 }
      )
    }

    const gig = mockGigs.find(g => g.id === gigId)

    if (!gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      )
    }

    // Mock AI-generated proposal based on gig requirements and user profile
    const generatedProposal = `Subject: Expertise in ${gig.skills.slice(0, 2).join(' & ')} - Excited to Contribute to Your ${gig.title}

Dear Hiring Team,

I am excited to apply for the ${gig.title} position at ${gig.company}. With my ${gig.experience.toLowerCase()} level expertise in ${gig.skills.slice(0, 3).join(', ')}, I am confident I can deliver exceptional results for this ${gig.duration} project.

**Why I'm a Perfect Fit:**

Having successfully delivered 15+ ${gig.category.toLowerCase()} projects in the past 2 years, I specialize in working with modern ${gig.skills.slice(0, 2).join(' and ')} stacks. My experience aligns perfectly with your requirements for:

• ${gig.requirements?.[0] || 'Technical proficiency in required technologies'}
• ${gig.requirements?.[1] || 'Proven track record of successful project delivery'}
• ${gig.requirements?.[2] || 'Strong problem-solving and communication skills'}

**My Approach to Your Project:**

1. **Strategic Planning**: I'll begin with a comprehensive analysis and create a detailed roadmap ensuring timely delivery
2. **Quality Execution**: Utilizing best practices in ${gig.skills.slice(0, 2).join(', ')} development with thorough testing
3. **Transparent Communication**: Daily updates, weekly progress reports, and immediate issue resolution
4. **Scalable Architecture**: Building maintainable, performant code following industry standards

**Relevant Experience Highlights:**

${gig.type === 'Remote' ? 'As a remote-first developer' : 'Having worked in distributed teams'}, I excel at collaboration tools and efficient communication. My recent ${gig.category.toLowerCase()} project resulted in 40% improved performance and 99.9% uptime in production.

**Pricing and Timeline:**

Based on the project scope and my expertise level, I suggest $${gig.salary.includes('$') ? gig.salary.split(' - ')[0].replace('$', '') : '75'}/hour. The ${gig.duration} duration I've allocated ensures proper planning, development, testing, and handover.

I would love to discuss how my technical skills and professional approach can contribute to your team's success. I'm available for a quick call to answer any questions and start the collaboration immediately.

Looking forward to potentially working together!

Best regards,
[Your Name]
${(userProfile?.email || 'your.email@example.com')}
${(userProfile?.phone || '+1 (555) 123-4567')}
Portfolio: ${(userProfile?.portfolio || 'https://yourportfolio.com')}

**Attached Documents:**
- Resume
- Portfolio Link
- 2 Relevant Project Samples`

    // Mock pricing suggestions based on gig and user profile
    const baseRate = 75
    const multipliers = {
      'Senior': 1.3,
      'Lead/Principal': 1.6,
      'Remote': 1.1,
      'Complex': 1.2
    }

    let suggestedRate = baseRate
    if (gig.experience === 'Senior') suggestedRate *= multipliers.Senior
    if (gig.type === 'Remote') suggestedRate *= multipliers.Remote
    if (gig.category === 'Machine Learning' || gig.category === 'Security') suggestedRate *= multipliers.Complex

    const pricingSuggestions = {
      hourlyRate: Math.round(suggestedRate),
      projectEstimate: Math.round(suggestedRate * 160), // Assume 160 hours
      reasoning: `Based on ${gig.experience.toLowerCase()} level experience and ${gig.skills.length} relevant skills for ${gig.category.toLowerCase()} projects.`

    }

    const response = {
      generatedProposal,
      pricing: pricingSuggestions,
      tone: 'Professional & Confident',
      length: {
        characters: generatedProposal.length,
        words: generatedProposal.split(/\s+/).length,
        paragraphs: generatedProposal.split('\n\n').length
      },
      highlights: [
        'Personalized subject line targeting key skills',
        'Specific experience examples matching requirements',
        'Clear communication and collaboration approach',
        'Competitive yet fair pricing strategy',
        'Professional format with all attachments'
      ],
      tips: [
        'Customize the greeting with actual contact details',
        'Replace brackets with your specific information',
        'Add 1-2 specific examples from your portfolio',
        'Verify all links and attachments before sending'
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Proposal Generator API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}
