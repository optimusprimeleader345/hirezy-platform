// AI Shortlisting Engine - Mock deterministic implementation

import { mockGigs, mockApplicants, type Gig, type Applicant } from './mockData';

export interface MatchResult {
  candidateId: string;
  matchScore: number;
  reasons: string[];
  missingSkills: string[];
}

// Mock market demand factors from market-demand data
const mockMarketDemand: Record<string, number> = {
  'React': 95,
  'JavaScript': 88,
  'TypeScript': 92,
  'Node.js': 90,
  'Next.js': 96,
  'CSS': 85,
  'HTML': 80,
  'MongoDB': 78,
  'GraphQL': 85,
  'AWS': 94,
  'Docker': 89,
  'Redux': 82,
  'Testing': 88,
};

function calculateSkillMatch(applicantSkills: string[], gigSkills: string[]): { score: number; matched: string[]; missing: string[] } {
  let matchedSkills: string[] = [];
  let totalScore = 0;
  let maxScore = 0;

  gigSkills.forEach(gigSkill => {
    maxScore += 100; // Maximum score per skill
    const applicantSkill = applicantSkills.find(s => s.toLowerCase() === gigSkill.toLowerCase());
    if (applicantSkill) {
      const skillScore = 85; // Base match score
      const demandBonus = mockMarketDemand[gigSkill] ? mockMarketDemand[gigSkill] / 10 : 0;
      const finalScore = Math.min(skillScore + demandBonus, 100);
      totalScore += finalScore;
      matchedSkills.push(gigSkill);
    }
  });

  const missingSkills = gigSkills.filter(skill => !matchedSkills.includes(skill));
  const baseScore = (totalScore / maxScore) * 100;

  return {
    score: Math.min(baseScore, 100),
    matched: matchedSkills,
    missing: missingSkills,
  };
}

function generateMatchReasons(applicant: Applicant, gig: Gig, matchedSkills: string[], missingSkills: string[]): string[] {
  const reasons: string[] = [];
  const skillReasons: string[] = [];

  if (matchedSkills.length > gig.skills.length * 0.7) {
    skillReasons.push(`Has ${matchedSkills.length}/${gig.skills.length} required skills`);
  }

  if (applicant.pastExperience && applicant.pastExperience.length >= 2) {
    reasons.push('Strong track record with multiple relevant roles');
  }

  // Experience factor
  if (applicant.experience >= 3) {
    reasons.push(`${applicant.experience}+ years of relevant experience`);
  }

  // Portfolio/Projects factor
  if (applicant.portfolio && applicant.portfolio.length > 0) {
    reasons.push('Active portfolio with multiple projects');
  }

  // Education factor
  if (applicant.education && (applicant.education.includes('MS') || applicant.education.includes('PhD'))) {
    reasons.push('Advanced degree in relevant field');
  }

  // Location factor for remote jobs
  if (gig.type === 'remote' || gig.type === 'hybrid') {
    reasons.push('Profile suitable for ' + gig.type + ' work');
  }

  if (matchedSkills.length > 0) {
    const skillsText = matchedSkills.slice(0, 3).join(', ');
    reasons.unshift(`Matches key skills: ${skillsText}${matchedSkills.length > 3 ? ` +${matchedSkills.length - 3} more` : ''}`);
  }

  return reasons.length > 0 ? reasons : [`Basic match for ${gig.title} position`];
}

export function calculateApplicantMatch(applicant: Applicant, gig: Gig): MatchResult {
  const skillMatch = calculateSkillMatch(
    applicant.skills.map(s => s.name),
    gig.skills
  );

  let baseScore = skillMatch.score;

  // Experience bonus
  if (applicant.experience >= 5) baseScore = Math.min(baseScore + 8, 100);
  else if (applicant.experience >= 3) baseScore = Math.min(baseScore + 5, 100);
  else if (applicant.experience >= 1) baseScore = Math.min(baseScore + 2, 100);

  // Portfolio/Projects bonus
  if (applicant.portfolio && applicant.portfolio.length >= 2) {
    baseScore = Math.min(baseScore + 6, 100);
  }

  // Past performance bonus (mock)
  const performanceBonus = Math.random() * 5;
  baseScore = Math.min(baseScore + performanceBonus, 100);

  // Education bonus
  if (applicant.education && (applicant.education.includes('MS') || applicant.education.includes('PhD'))) {
    baseScore = Math.min(baseScore + 4, 100);
  }

  // Market demand impact (adjust final score based on gig skill demand)
  const avgSkillDemand = gig.skills.reduce((sum, skill) =>
    sum + (mockMarketDemand[skill] || 70), 0) / gig.skills.length;
  const demandFactor = 1 + ((avgSkillDemand - 80) / 100) * 0.1;
  baseScore *= demandFactor;

  const reasons = generateMatchReasons(applicant, gig, skillMatch.matched, skillMatch.missing);

  return {
    candidateId: applicant.id,
    matchScore: Math.round(baseScore),
    reasons,
    missingSkills: skillMatch.missing,
  };
}

export function shortlistApplicantsForGig(gigId: string): MatchResult[] {
  const gig = mockGigs.find(g => g.id === gigId);
  if (!gig) return [];

  const applicantsToScore = gig.applicants || mockApplicants;

  return applicantsToScore
    .map(applicant => calculateApplicantMatch(applicant, gig))
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by highest score first
}

export function getShortlistSummary(gigId: string, topN?: number): MatchResult[] {
  const results = shortlistApplicantsForGig(gigId);

  if (topN && topN > 0) {
    return results.slice(0, topN);
  }

  return results.filter(result => result.matchScore >= 75); // Return all >= 75% by default
}
