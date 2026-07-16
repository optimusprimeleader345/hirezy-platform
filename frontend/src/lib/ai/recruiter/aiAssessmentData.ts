// Advanced AI Assessment Data for MNC-Level Features
// AI-powered behavioral analysis, cultural fit, skill gaps, and personality assessments

export interface BehavioralAnalysis {
  candidateId: string;
  resumeTone: 'confident' | 'modest' | 'aggressive' | 'collaborative';
  communicationStyle: 'direct' | 'diplomatic' | 'subtle' | 'tactical';
  achievementOrientation: number; // 0-100 scale
  teamworkIndicators: number; // 0-100 scale
  leadershipPotential: number; // 0-100 scale
  analyticalThinking: number; // 0-100 scale
  adaptabilityScore: number; // 0-100 scale
  motivationLevel: 'high' | 'medium' | 'low';
  keyInsights: string[];
}

export interface CulturalFitAssessment {
  candidateId: string;
  companyValues: {
    value: string;
    candidateAlignment: number; // 0-100
    reasoning: string;
  }[];
  overallFitScore: number; // 0-100
  dominantPersonalityTraits: string[];
  workplacePreferences: {
    leadership: 'directive' | 'consultative' | 'laissez-faire';
    workEnvironment: 'structured' | 'flexible' | 'chaotic';
    teamSize: 'small' | 'large' | 'mixed';
    pace: 'fast' | 'methodical' | 'balanced';
  };
  recommendations: string[];
}

export interface SkillGapAnalysis {
  candidateId: string;
  currentSkillLevel: {
    skill: string;
    current: number; // 1-5 scale
    required: number; // 1-5 scale
    gap: number;
  }[];
  estimatedTimeToCompetency: number; // months
  learningPriority: 'high' | 'medium' | 'low';
  recommendedLearningPath: {
    phase: string;
    skills: string[];
    duration: number; // months
    priority: number;
    resources: string[];
  }[];
  costToUpskill: number; // USD
  projectedSalaryIncrease: number; // USD
}

export interface PersonalityAssessment {
  candidateId: string;
  mbtiType: string;
  dominantTraits: {
    trait: string;
    score: number; // 0-100
    description: string;
  }[];
  workStyle: {
    category: 'analytical' | 'creative' | 'practical' | 'social';
    score: number;
    strengths: string[];
  }[];
  leadershipStyle: string;
  stressResponse: 'calm' | 'reactive' | 'adaptive' | 'resilient';
  communicationPreferences: string[];
  careerMotivations: string[];
}

export interface ComprehensiveAssessment {
  candidateId: string;
  name: string;
  overallScore: number; // 0-100
  breakdown: {
    behavioral: number;
    cultural: number;
    skillGap: number;
    personality: number;
    experience: number;
  };
  aiInsights: {
    strengths: string[];
    concerns: string[];
    recommendations: string[];
    riskFactors: string[];
  };
  interviewQuestions: {
    competency: string[];
    behavioral: string[];
    technical: string[];
  };
}

// Sample company values for cultural fit assessment
export const companyValueDefinitions = [
  { value: 'Innovation', description: 'Embracing new ideas and creative solutions' },
  { value: 'Collaboration', description: 'Working together as a team' },
  { value: 'Customer Focus', description: 'Putting customer needs first' },
  { value: 'Integrity', description: 'Honest and ethical behavior' },
  { value: 'Excellence', description: 'Striving for the highest standards' },
  { value: 'Adaptability', description: 'Flexible and open to change' },
  { value: 'Growth Mindset', description: 'Continuous learning and improvement' },
  { value: 'Work-Life Balance', description: 'Valuing personal and professional life' },
];

// Behavioral analysis data for candidates
export const behavioralAnalysisData: BehavioralAnalysis[] = [
  {
    candidateId: '1',
    resumeTone: 'confident',
    communicationStyle: 'direct',
    achievementOrientation: 87,
    teamworkIndicators: 92,
    leadershipPotential: 89,
    analyticalThinking: 85,
    adaptabilityScore: 91,
    motivationLevel: 'high',
    keyInsights: [
      'Strong leadership presence with evidence of team mentoring',
      'Consistently exceeds performance expectations',
      'Excellent track record of problem-solving',
      'High engagement in collaborative projects'
    ]
  },
  {
    candidateId: '2',
    resumeTone: 'collaborative',
    communicationStyle: 'diplomatic',
    achievementOrientation: 78,
    teamworkIndicators: 95,
    leadershipPotential: 73,
    analyticalThinking: 88,
    adaptabilityScore: 86,
    motivationLevel: 'high',
    keyInsights: [
      'Exceptional team player with strong interpersonal skills',
      'Effective communicator who builds consensus',
      'Strong analytical skills with methodical approach',
      'Adapts well to team workflows and collaborative environments'
    ]
  },
  {
    candidateId: '3',
    resumeTone: 'modest',
    communicationStyle: 'subtle',
    achievementOrientation: 81,
    teamworkIndicators: 88,
    leadershipPotential: 76,
    analyticalThinking: 92,
    adaptabilityScore: 79,
    motivationLevel: 'medium',
    keyInsights: [
      'Highly analytical with deep technical expertise',
      'Prefers quality over quantity in deliverables',
      'Contributes effectively to team objectives',
      'May benefit from more proactive communication'
    ]
  }
];

// Cultural fit assessments
export const culturalFitData: CulturalFitAssessment[] = [
  {
    candidateId: '1',
    companyValues: [
      { value: 'Innovation', candidateAlignment: 95, reasoning: 'Demonstrates creative problem-solving and innovative approaches' },
      { value: 'Collaboration', candidateAlignment: 93, reasoning: 'Strong record of cross-functional team success' },
      { value: 'Excellence', candidateAlignment: 97, reasoning: 'Consistently exceeds performance standards' },
      { value: 'Growth Mindset', candidateAlignment: 94, reasoning: 'Actively invests in learning and development' },
      { value: 'Integrity', candidateAlignment: 96, reasoning: 'Transparent communication and ethical decision-making' },
      { value: 'Adaptability', candidateAlignment: 91, reasoning: 'Successfully navigates organizational changes' },
      { value: 'Customer Focus', candidateAlignment: 88, reasoning: 'Prioritizes stakeholder needs' },
      { value: 'Work-Life Balance', candidateAlignment: 85, reasoning: 'Maintains productive work output with healthy boundaries' }
    ],
    overallFitScore: 93,
    dominantPersonalityTraits: ['Strategic', 'Collaborative', 'Reliable'],
    workplacePreferences: {
      leadership: 'consultative',
      workEnvironment: 'flexible',
      teamSize: 'large',
      pace: 'balanced'
    },
    recommendations: [
      'Excellent cultural fit - strong alignment with company values',
      'Ideal for leadership or senior individual contributor roles',
      'Will thrive in collaborative, growth-oriented environment'
    ]
  },
  {
    candidateId: '2',
    companyValues: [
      { value: 'Innovation', candidateAlignment: 82, reasoning: 'Shows good problem-solving skills but less risk-taking' },
      { value: 'Collaboration', candidateAlignment: 96, reasoning: 'Exceptional team player and consensus builder' },
      { value: 'Excellence', candidateAlignment: 89, reasoning: 'Maintains high quality standards' },
      { value: 'Growth Mindset', candidateAlignment: 87, reasoning: 'Open to feedback and continuous improvement' },
      { value: 'Integrity', candidateAlignment: 92, reasoning: 'Highly ethical and transparent' },
      { value: 'Adaptability', candidateAlignment: 85, reasoning: 'Adapts well to team needs' },
      { value: 'Customer Focus', candidateAlignment: 90, reasoning: 'Prioritizes team and organizational needs' },
      { value: 'Work-Life Balance', candidateAlignment: 88, reasoning: 'Supports team work-life balance initiatives' }
    ],
    overallFitScore: 89,
    dominantPersonalityTraits: ['Supportive', 'Diplomatic', 'Reliable'],
    workplacePreferences: {
      leadership: 'consultative',
      workEnvironment: 'flexible',
      teamSize: 'large',
      pace: 'methodical'
    },
    recommendations: [
      'Very strong cultural fit - highly collaborative',
      'Perfect for team-based roles requiring strong interpersonal skills',
      'Will contribute to positive team dynamics'
    ]
  }
];

// Skill gap analysis data
export const skillGapAnalysisData: SkillGapAnalysis[] = [
  {
    candidateId: '1',
    currentSkillLevel: [
      { skill: 'React', current: 5, required: 4, gap: 1 },
      { skill: 'TypeScript', current: 4, required: 5, gap: -1 },
      { skill: 'Node.js', current: 4, required: 4, gap: 0 },
      { skill: 'AWS', current: 3, required: 5, gap: -2 },
      { skill: 'Docker', current: 3, required: 4, gap: -1 },
      { skill: 'GraphQL', current: 2, required: 4, gap: -2 },
    ],
    estimatedTimeToCompetency: 4.5,
    learningPriority: 'medium',
    recommendedLearningPath: [
      {
        phase: 'Immediate (1-2 months)',
        skills: ['AWS Essentials', 'Docker Fundamentals'],
        duration: 2,
        priority: 1,
        resources: ['AWS Certified Cloud Practitioner', 'Docker Getting Started Course']
      },
      {
        phase: 'Short-term (3-4 months)',
        skills: ['GraphQL', 'TypeScript Advanced'],
        duration: 2,
        priority: 2,
        resources: ['GraphQL Academy', 'TypeScript Deep Dive Course']
      },
      {
        phase: 'Long-term (6+ months)',
        skills: ['Kubernetes', 'Microservices Architecture'],
        duration: 4,
        priority: 3,
        resources: ['Certified Kubernetes Administrator', 'Microservices Design Patterns']
      }
    ],
    costToUpskill: 3200,
    projectedSalaryIncrease: 25000
  },
  {
    candidateId: '2',
    currentSkillLevel: [
      { skill: 'Python', current: 5, required: 4, gap: 1 },
      { skill: 'Data Science', current: 5, required: 5, gap: 0 },
      { skill: 'Machine Learning', current: 4, required: 5, gap: -1 },
      { skill: 'SQL', current: 5, required: 4, gap: 1 },
      { skill: 'Cloud Computing', current: 3, required: 5, gap: -2 },
      { skill: 'MLOps', current: 2, required: 4, gap: -2 },
    ],
    estimatedTimeToCompetency: 6,
    learningPriority: 'high',
    recommendedLearningPath: [
      {
        phase: 'Immediate (1-2 months)',
        skills: ['AWS/GCP Cloud Fundamentals', 'MLOps Basics'],
        duration: 2,
        priority: 1,
        resources: ['AWS Machine Learning Certification', 'MLOps Zoomcamp']
      },
      {
        phase: 'Medium-term (3-5 months)',
        skills: ['Advanced ML Algorithms', 'Distributed Computing'],
        duration: 3,
        priority: 2,
        resources: ['Stanford ML Course', 'Distributed Systems Specialization']
      }
    ],
    costToUpskill: 4800,
    projectedSalaryIncrease: 35000
  }
];

// Personality assessment data
export const personalityAssessmentData: PersonalityAssessment[] = [
  {
    candidateId: '1',
    mbtiType: 'ENTJ',
    dominantTraits: [
      { trait: 'Extraversion', score: 78, description: 'Energetic and outgoing' },
      { trait: 'Intuition', score: 85, description: 'Future-focused and strategic' },
      { trait: 'Thinking', score: 92, description: 'Logical and objective decision-making' },
      { trait: 'Judging', score: 88, description: 'Organized and planned approach' }
    ],
    workStyle: [
      {
        category: 'analytical',
        score: 88,
        strengths: ['Data-driven decisions', 'Strategic planning', 'Problem analysis']
      },
      {
        category: 'practical',
        score: 76,
        strengths: ['Project execution', 'Goal achievement', 'Quality standards']
      }
    ],
    leadershipStyle: 'Transformational with tactical execution',
    stressResponse: 'resilient',
    communicationPreferences: ['Direct but professional', 'Data-driven discussions', 'Action-oriented'],
    careerMotivations: ['Strategic impact', 'Team leadership', 'Innovation opportunities']
  },
  {
    candidateId: '2',
    mbtiType: 'INFJ',
    dominantTraits: [
      { trait: 'Introversion', score: 82, description: 'Reflective and thoughtful' },
      { trait: 'Intuition', score: 89, description: 'Visionary and conceptual thinking' },
      { trait: 'Feeling', score: 87, description: 'Empathic and relationship-focused' },
      { trait: 'Judging', score: 91, description: 'Structured and organized' }
    ],
    workStyle: [
      {
        category: 'analytical',
        score: 83,
        strengths: ['Complex problem solving', 'Pattern recognition', 'Strategic insights']
      },
      {
        category: 'social',
        score: 92,
        strengths: ['Team collaboration', 'Mentorship', 'Relationship building']
      }
    ],
    leadershipStyle: 'Servant leadership with strategic vision',
    stressResponse: 'calm',
    communicationPreferences: ['Context-rich discussions', 'Collaborative dialogue', 'Supportive feedback'],
    careerMotivations: ['Meaningful work', 'Team development', 'Positive organizational impact']
  }
];

// Comprehensive assessments combining all factors
export const comprehensiveAssessments: ComprehensiveAssessment[] = [
  {
    candidateId: '1',
    name: 'Sarah Johnson',
    overallScore: 94,
    breakdown: {
      behavioral: 95,
      cultural: 93,
      skillGap: 88,
      personality: 96,
      experience: 92
    },
    aiInsights: {
      strengths: [
        'Exceptional leadership potential with proven track record',
        'High cultural alignment with company values',
        'Strong analytical and problem-solving skills',
        'Resilient under stress with calm decision-making'
      ],
      concerns: [
        'May benefit from additional AWS cloud training',
        'Communication could be more direct in fast-paced situations',
        'Learning curve for advanced containerization technologies'
      ],
      recommendations: [
        'Strong candidate for senior technical leadership roles',
        'Consider for roles requiring cross-functional coordination',
        'Invest in cloud infrastructure training for long-term growth',
        'Excellent fit for high-impact strategic positions'
      ],
      riskFactors: [
        'Low risk of turnover based on motivation and fit analysis',
        'Ready for immediate contributions with targeted upskilling'
      ]
    },
    interviewQuestions: {
      competency: [
        'Tell me about a time you led a complex technical project from start to finish.',
        'How do you approach mentoring and developing team members?',
        'Describe a situation where you had to adapt quickly to significant changes.'
      ],
      behavioral: [
        'What motivates you most in your professional career?',
        'How do you handle conflict within a team or project?',
        'Describe your ideal work environment and team dynamic.'
      ],
      technical: [
        'Walk me through your approach to architecting scalable cloud solutions.',
        'How would you optimize a slow-performing application?',
        'What are your thoughts on microservices vs monolithic architectures?'
      ]
    }
  },
  {
    candidateId: '2',
    name: 'Mike Chen',
    overallScore: 91,
    breakdown: {
      behavioral: 92,
      cultural: 89,
      skillGap: 85,
      personality: 94,
      experience: 88
    },
    aiInsights: {
      strengths: [
        'Exceptional team player with diplomatic communication style',
        'Very strong cultural fit with collaborative values alignment',
        'Deep technical expertise in data science and machine learning',
        'High adaptability and learning potential'
      ],
      concerns: [
        'May require additional cloud infrastructure training',
        'Learning curve for production ML deployment pipelines',
        'Could benefit from more direct communication in high-pressure scenarios'
      ],
      recommendations: [
        'Excellent fit for technical roles requiring strong collaboration',
        'Consider for data science team leadership positions',
        'Potential to take on mentorship and knowledge-sharing responsibilities',
        'Strong candidate for research and development roles'
      ],
      riskFactors: [
        'Low turnover risk - highly motivated and values-aligned',
        'May need structured onboarding for enterprise cloud environments'
      ]
    },
    interviewQuestions: {
      competency: [
        'Describe your approach to building scalable machine learning pipelines.',
        'How do you communicate complex technical concepts to non-technical stakeholders?',
        'Tell me about a successful data science collaboration you were part of.'
      ],
      behavioral: [
        'How do you prefer to receive feedback and constructive criticism?',
        'Describe a time you had to balance competing priorities in a project.',
        'What aspects of team collaboration do you find most rewarding?'
      ],
      technical: [
        'Walk me through your process for model validation and performance monitoring.',
        'How do you approach feature engineering for machine learning problems?',
        'What are your strategies for handling imbalanced datasets?'
      ]
    }
  }
];

// Helper functions
export const getComprehensiveAssessmentForCandidate = (candidateId: string): ComprehensiveAssessment | null => {
  return comprehensiveAssessments.find(assessment => assessment.candidateId === candidateId) || null;
};

export const getBehavioralAnalysisForCandidate = (candidateId: string): BehavioralAnalysis | null => {
  return behavioralAnalysisData.find(analysis => analysis.candidateId === candidateId) || null;
};

export const getCulturalFitForCandidate = (candidateId: string): CulturalFitAssessment | null => {
  return culturalFitData.find(assessment => assessment.candidateId === candidateId) || null;
};

export const getSkillGapForCandidate = (candidateId: string): SkillGapAnalysis | null => {
  return skillGapAnalysisData.find(analysis => analysis.candidateId === candidateId) || null;
};

export const getPersonalityAssessmentForCandidate = (candidateId: string): PersonalityAssessment | null => {
  return personalityAssessmentData.find(assessment => assessment.candidateId === candidateId) || null;
};
