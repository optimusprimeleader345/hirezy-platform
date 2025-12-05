function generateFallbackQuestions(jobTitle: string, level: string, count: number): InterviewResponse['questions'] {
  const baseQuestions: InterviewResponse['questions'] = [
    {
      id: 'tech-1',
      question: `Can you walk us through a technical challenge you've solved as a ${jobTitle}?`,
      type: 'Technical' as const,
      category: 'Problem Solving',
      difficulty: 'Medium' as const,
      expectedAnswerStructure: 'Situation, Task, Action, Result (STAR method)',
      keyPoints: ['Technical approach', 'Problem-solving methodology', 'Results achieved'],
      followUpSuggestions: ['How did you decide on this approach?', 'What alternatives did you consider?']
    },
    {
      id: 'behavioral-1',
      question: `Tell us about a time you had to collaborate with a difficult team member.`,
      type: 'Behavioral' as const,
      category: 'Teamwork',
      difficulty: 'Easy' as const,
      expectedAnswerStructure: 'Describe situation, your actions, and outcome',
      keyPoints: ['Conflict resolution', 'Communication skills', 'Professionalism'],
      followUpSuggestions: ['How did you approach the conversation?', 'What did you learn from this experience?']
    }
  ]

  const questions = [...baseQuestions] as InterviewResponse['questions']

  // Add more questions based on count
  while (questions.length < count) {
    const existing = questions[questions.length - 1]
    questions.push({
      ...existing,
      id: `generated-${questions.length}`,
      question: `Describe a ${level} level project where you demonstrated leadership in ${jobTitle} work.`,
      type: existing.type,
      category: existing.category,
      difficulty: (level === 'Senior' ? 'Hard' as const : 'Medium' as const)
    })
  }

  return questions.slice(0, count)
}
