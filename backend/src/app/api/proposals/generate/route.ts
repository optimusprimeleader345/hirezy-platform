import { NextRequest, NextResponse } from 'next/server'
import { mockGigs } from '@/lib/gigs/mockData'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gigId, additionalNotes, instructions, tone = 'professional', length = 'medium' } = body

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

    // AI-generated proposal based on gig details, tone, and additional user input
    let generatedProposal = ''

    // Different proposal templates based on tone
    if (tone === 'professional') {
      generatedProposal = `Subject: Expertise in ${gig.skills.slice(0, 2).join(' & ')} - Professional Delivery for Your ${gig.title}

Dear Hiring Team,

I am writing to express my strong interest in the ${gig.title} position at ${gig.company}. With ${gig.experience === 'Senior' ? 'over 5 years' : gig.experience === 'Mid-Level' ? '3-4 years' : 'entry-level'} of professional experience in ${gig.category.toLowerCase()}, I believe I am well-positioned to deliver exceptional results for your project.

${additionalNotes ? `Additional Context: ${additionalNotes}\n\n` : ''}My qualifications align directly with your requirements:

• ${gig.requirements[0] || 'Technical proficiency in required technologies'}
• ${gig.requirements[1] || 'Problem-solving and analytical skills'}
• ${gig.requirements[2] || 'Communication and project management'}

Key achievements include:
- ${instructions || 'Successful delivery of similar projects with measurable results'}
- Implementation of best practices and industry standards
- Strong collaboration within cross-functional teams

${gig.type === 'Remote' ? 'As a remote-first professional, I excel in distributed team environments and maintain clear communication through various collaboration tools.' : 'I am ready to relocate and work on-site to ensure optimal collaboration with your team.'}

I suggest a competitive rate of $${gig.salary.includes('$') ? gig.salary.split(' - ')[0].replace('$', '') : '75'}/hour for this ${gig.duration} project, ensuring high-quality deliverables within agreed timelines.

I would welcome the opportunity to discuss your project requirements in detail and demonstrate how my expertise can contribute to your success.

Best regards,
[Your Name]
Professional Freelance Developer
[Your Contact Information]`
    } else if (tone === 'friendly') {
      generatedProposal = `Subject: Let's Build Something Great - Excited About Your ${gig.title}

Hi ${gig.company} Team!

I came across your ${gig.title} gig and I'm really excited about the opportunity! I'm a ${gig.experience.toLowerCase()} developer who loves building ${gig.category.toLowerCase()} solutions, and this sounds like a perfect match for what I do best.

${additionalNotes ? `${additionalNotes}\n\n` : ''}Here's what makes me a great fit:

✨ ${gig.requirements[0] || 'Strong technical skills in your tech stack'}
✨ ${gig.requirements[1] || 'Problem-solver with creative approaches'}
✨ ${gig.requirements[2] || 'Team player who communicates clearly'}

Some highlights from my work:
- ${instructions || 'Built apps that users actually love to use'}
- Always deliver on time with high quality
- Love learning and adapting to new challenges

I'm located ${gig.type === 'Remote' ? 'anywhere in the world (remote-friendly!)' : 'locally and ready to work at your office'} and would charge $${gig.salary.includes('$') ? Math.floor(parseInt(gig.salary.split(' - ')[0].replace('$', '')) * 0.9) : '65'}/hour - fair, competitive pricing that reflects my commitment to doing great work.

I'd love to hop on a quick call to learn more about your vision and how I can help bring it to life!

Best,
[Your Name] 👋`
    } else if (tone === 'technical') {
      generatedProposal = `Subject: Technical Solution for ${gig.title} - System Architecture & Implementation

${gig.company} Development Team,

Analyzing your ${gig.title} requirements, I'm confident I can deliver a robust, scalable solution leveraging my deep expertise in ${gig.skills.slice(0, 2).join(' and ')}.

${additionalNotes ? `Technical Notes: ${additionalNotes}\n\n` : ''}Technical Qualifications:
- ${gig.requirements[0] || 'Advanced proficiency with system architecture and design patterns'}
- ${gig.requirements[1] || 'Experience with performance optimization and scalability'}
- ${gig.requirements[2] || 'Deep understanding of security and best practices'}

Proposed Technical Approach:
1. Architecture Review: Analyze existing systems for integration points
2. ${instructions || 'Implementation Plan: Modular design with comprehensive testing'}
3. Deployment Strategy: CI/CD with rollback capabilities
4. Monitoring & Maintenance: Comprehensive logging and alerting

Technology Stack Recommendation:
Primary: ${gig.skills.slice(0, 3).join(', ')}
Supporting: ${gig.skills.slice(3, 6).join(', ')}
Infrastructure: Cloud-native solutions for scalability

Pricing Structure: $${gig.salary.includes('$') ? Math.floor(parseInt(gig.salary.split(' - ')[0].replace('$', '')) * 1.1) : '85'}/hour, reflecting the architectural complexity and technical expertise required.

I propose a detailed technical specification review call to ensure alignment before project commencement.

Regards,
[Your Name]
Principal Software Architect
GitHub: [your-github]
Technical Blog: [your-blog]`
    }

    if (length === 'short') {
      // Make it shorter by removing some sections
      generatedProposal = generatedProposal.split('\n\n').slice(0, 3).join('\n\n') +
        '\n\nBest regards,\n[Your Name]'
    }

    const response = {
      proposal: generatedProposal,
      recommendedPrice: `$${gig.salary.includes('$') ? gig.salary.split(' - ')[0].replace('$', '') : '75'}/hour`,
      tone: tone.charAt(0).toUpperCase() + tone.slice(1),
      wordCount: generatedProposal.split(/\s+/).length,
      estimatedReadTime: Math.ceil(generatedProposal.split(/\s+/).length / 200) + ' min read',
      keyHighlights: [
        'Personalized tone matching gig requirements',
        'Quantified achievements with specific metrics',
        'Clear technical qualifications listed',
        'Competitive pricing strategy',
        'Professional structure and formatting'
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Proposal Generation API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}
