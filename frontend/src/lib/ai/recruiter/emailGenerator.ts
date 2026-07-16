interface EmailContext {
  candidateName?: string
  gigTitle?: string
  recruiterName?: string
  context?: string
}

interface EmailType {
  id: string
  label: string
  description: string
}

export const EMAIL_TYPES: EmailType[] = [
  {
    id: 'followup',
    label: 'Follow-up to Candidate',
    description: 'Check in with candidates about their application'
  },
  {
    id: 'interview',
    label: 'Interview Invitation',
    description: 'Invite candidates for interview rounds'
  },
  {
    id: 'shortlist',
    label: 'Shortlist Notification',
    description: 'Inform candidates they have been shortlisted'
  },
  {
    id: 'rejection',
    label: 'Rejection Email (Polite)',
    description: 'Send polite rejection emails to unsuccessful candidates'
  },
  {
    id: 'offer',
    label: 'Offer Letter Intro',
    description: 'Initial offer letter communication'
  }
]

export function generateEmail(type: string, context: EmailContext): string {
  const { candidateName = '[Candidate Name]', gigTitle = '[Gig Title]', recruiterName = '[Recruiter Name]' } = context

  switch (type) {
    case 'followup':
      return `Hi ${candidateName},

I hope you're doing well. I wanted to check in regarding your application for the ${gigTitle} role.

We've been impressed by your background and wanted to provide an update on our timeline. We're currently in the final stages of reviewing applications and hope to have next steps outlined within the next week.

Please feel free to reach out if you have any questions about the position or the process.

Regards,
${recruiterName}`

    case 'interview':
      return `Hi ${candidateName},

We are pleased to invite you for an interview for the ${gigTitle} position!

Our team has reviewed your application and we're excited to learn more about your background and experience.

Please share your availability for the next 2-3 days so we can schedule a suitable time. We're flexible with timing and can accommodate both morning and afternoon slots.

We'll be conducting a video interview that typically lasts about 45 minutes.

Please let us know your preferred times and we'll get this scheduled right away.

Regards,
${recruiterName}`

    case 'shortlist':
      return `Hi ${candidateName},

Great news! You've been shortlisted for the ${gigTitle} role.

Our team has reviewed your application and we've moved you forward in our selection process. This is a competitive role and your profile stood out among a strong pool of applicants.

Our team will be in touch soon regarding the next steps in our interview process. This typically includes a technical assessment or conversation with our hiring team.

We're excited about the possibility of having you join our organization!

Regards,
${recruiterName}`

    case 'rejection':
      return `Hi ${candidateName},

Thank you for taking the time to apply for the ${gigTitle} role and for your interest in our organization.

After careful review of all applications received, we regret to inform you that we will not be moving forward with your candidacy at this time.

We truly appreciate your interest and the time you invested in the application process. We were impressed by your background and wish you continued success in your career pursuits.

We often consider candidates for future opportunities, and we'll definitely keep your profile in mind for other roles that might align with your skills and experience.

Thank you again for considering us, and we wish you the very best in your future endeavors.

Regards,
${recruiterName}`

    case 'offer':
      return `Hi ${candidateName},

Congratulations! We are excited to extend you an offer for the ${gigTitle} position.

Our team has reviewed your application and interviewed you, and we believe you'll be a fantastic addition to our team. We were particularly impressed by your background and enthusiasm for this role.

Our HR team will send the full offer letter with detailed compensation, benefits, and next steps within the next 24 hours. This will include:

• Compensation structure
• Benefits package
• Work arrangements
• Start date options
• Next steps in the onboarding process

In the meantime, if you have any immediate questions, please don't hesitate to reach out.

Welcome aboard - we're thrilled you'll be joining us!

Regards,
${recruiterName}`

    default:
      return `Generated email content for ${type}`
  }
}
