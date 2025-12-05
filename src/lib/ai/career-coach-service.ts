import { textModel } from './google-ai-service'

export interface CareerCoachMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'advice' | 'question' | 'insight' | 'suggestion'
}

export interface CareerProfile {
  currentRole: string
  experience: string[]
  skills: string[]
  interests: string[]
  goals: string[]
  education: string[]
  challenges: string[]
  achievements: string[]
}

export interface CareerInsight {
  category: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  actionable: boolean
}

export interface CareerPlan {
  shortTerm: string[]
  mediumTerm: string[]
  longTerm: string[]
  milestones: Array<{ title: string; timeframe: string; description: string }>
}

class CareerCoach {
  private conversationHistory: CareerCoachMessage[] = []
  private userProfile: CareerProfile | null = null

  async setUserProfile(profile: CareerProfile) {
    this.userProfile = profile
    await this.analyzeProfile()
  }

  async sendMessage(message: string): Promise<CareerCoachMessage> {
    const userMessage: CareerCoachMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: 'question'
    }

    this.conversationHistory.push(userMessage)

    const response = await this.generateResponse(message)

    const assistantMessage: CareerCoachMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      type: response.type
    }

    this.conversationHistory.push(assistantMessage)

    return assistantMessage
  }

  private async generateResponse(userMessage: string): Promise<{ content: string; type: CareerCoachMessage['type'] }> {
    const systemPrompt = `You are an experienced career coach with 15+ years in career development and human resources.
You provide personalized, actionable career advice. You are supportive, honest, and focused on realistic career progression.

CONVERSATION STYLE:
- Be conversational but professional
- Ask clarifying questions when needed
- Provide specific, actionable advice
- Reference user's experience and skills where relevant
- Keep responses concise but comprehensive
- End with relevant follow-up questions or next steps

CURRENT USER PROFILE:
${this.userProfile ? JSON.stringify(this.userProfile, null, 2) : 'No profile provided yet'}

RECENT CONVERSATION HISTORY:
${this.conversationHistory.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Respond naturally to the user's message while providing career guidance.`

    try {
      const completion = await textModel.generateContent(`
${systemPrompt}

USER'S MESSAGE: "${userMessage}"

Provide a helpful, personalized response. Focus on:
- Specific career advice
- Skill development suggestions
- Network building tips
- Realistic timeline expectations
- Industry insights
- Job market observations

If the message asks a specific question, answer it directly.
If it's general career guidance, provide targeted advice based on their profile.`)
      
      const response = completion.response.text()
      return {
        content: response,
        type: this.determineResponseType(response, userMessage)
      }
    } catch (error) {
      console.error('Error generating career coach response:', error)
      return {
        content: "I apologize, but I'm having trouble processing your request right now. Could you please rephrase your question or try again in a moment?",
        type: 'advice'
      }
    }
  }

  private determineResponseType(response: string, userMessage: string): CareerCoachMessage['type'] {
    const lowerResponse = response.toLowerCase()
    const lowerUserMessage = userMessage.toLowerCase()

    if (lowerResponse.includes('what are your') || lowerResponse.includes('what do you') || lowerResponse.includes('what is your')) {
      return 'question'
    }
    if (lowerResponse.includes('insight') || lowerResponse.includes('analysis') || lowerResponse.includes('opportunity')) {
      return 'insight'
    }
    if (lowerResponse.includes('consider') || lowerResponse.includes('you might') || lowerResponse.includes('suggest')) {
      return 'suggestion'
    }
    return 'advice'
  }

  private async analyzeProfile(): Promise<void> {
    if (!this.userProfile) return

    // Generate initial insights when profile is set
    const welcomeMessage = await this.generateResponse(
      `The user has just shared their career profile. Provide a brief, personalized welcome message and one key insight about their career situation.`
    )

    const message: CareerCoachMessage = {
      id: (Date.now() - 1).toString(),
      role: 'assistant',
      content: welcomeMessage.content,
      timestamp: new Date(),
      type: welcomeMessage.type
    }

    this.conversationHistory.unshift(message)
  }

  async generateCareerInsights(): Promise<CareerInsight[]> {
    if (!this.userProfile) {
      return [{
        category: 'Setup',
        title: 'Complete Your Profile',
        description: 'Share your current role, skills, and career goals to get personalized advice.',
        priority: 'high',
        actionable: true
      }]
    }

    try {
      const prompt = `
Based on this career profile, identify 3-5 key insights and areas for development:

PROFILE:
${JSON.stringify(this.userProfile, null, 2)}

Generate insights in this JSON format:
[
  {
    "category": "Skills | Networking | Goals | Experience | Education",
    "title": "Brief title for insight",
    "description": "Detailed explanation (2-3 sentences)",
    "priority": "high | medium | low",
    "actionable": true or false
  }
]

Focus on:
- Skill gaps compared to goals
- Career progression opportunities
- Industry trends alignment
- Network building needs
- Market competitiveness

Make insights specific and actionable.`

      const completion = await textModel.generateContent(prompt)
      const insights = JSON.parse(completion.response.text())

      return insights || []
    } catch (error) {
      console.error('Error generating career insights:', error)
      return []
    }
  }

  async generateCareerPlan(): Promise<CareerPlan> {
    if (!this.userProfile) {
      throw new Error('User profile required for career planning')
    }

    try {
      const prompt = `
Create a structured career development plan for this professional:

PROFILE:
${JSON.stringify(this.userProfile, null, 2)}

Develop a 12-18 month career plan in JSON format:
{
  "shortTerm": ["Immediate next steps (next 3-6 months)"],
  "mediumTerm": ["Goals for 6-12 months"],
  "longTerm": ["Vision for 12-18+ months"],
  "milestones": [
    {
      "title": "Milestone name",
      "timeframe": "12024",
      "description": "What needs to be accomplished"
    }
  ]
}

Focus on realistic, achievable goals based on their current situation and stated career goals.
Include concrete actions, skill development, networking, and career advancement steps.`

      const completion = await textModel.generateContent(prompt)
      const plan = JSON.parse(completion.response.text())

      return plan || { shortTerm: [], mediumTerm: [], longTerm: [], milestones: [] }
    } catch (error) {
      console.error('Error generating career plan:', error)
      throw new Error('Failed to generate career plan. Please try again.')
    }
  }

  getConversationHistory(): CareerCoachMessage[] {
    return [...this.conversationHistory]
  }

  clearHistory(): void {
    this.conversationHistory = []
  }
}

// Singleton instance
export const careerCoach = new CareerCoach()

// Convenience functions
export async function sendCareerMessage(message: string): Promise<CareerCoachMessage> {
  return careerCoach.sendMessage(message)
}

export async function updateUserProfile(profile: CareerProfile): Promise<void> {
  return careerCoach.setUserProfile(profile)
}

export async function getCareerInsights(): Promise<CareerInsight[]> {
  return careerCoach.generateCareerInsights()
}

export async function getCareerPlan(): Promise<CareerPlan> {
  return careerCoach.generateCareerPlan()
}

export function getConversationHistory(): CareerCoachMessage[] {
  return careerCoach.getConversationHistory()
}
