from typing import List, Dict, Any

class ResumeStrengthAnalyzer:
    def __init__(self):
        self.criteria = {
            "contact_info": 10,
            "skills_section": 20,
            "experience_depth": 30,
            "education_clarity": 15,
            "project_diversity": 25
        }

    def analyze(self, profile: Dict[str, Any], job_requirements: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Analyze resume strength based on heuristics and identify gaps.
        """
        scores = {}
        suggestions = []
        
        # 1. Contact Info (Heuristic)
        has_contact = bool(profile.get('email') or profile.get('phone') or profile.get('linkedin'))
        scores["contact_info"] = 100 if has_contact else 0
        if not has_contact:
            suggestions.append("Add professional contact information (LinkedIn, Portfolio, or Email).")

        # 2. Skills Section
        skills = profile.get('skills', [])
        scores["skills_section"] = min(100, len(skills) * 10)
        if len(skills) < 5:
            suggestions.append("Include more technical and soft skills to improve discoverability.")

        # 3. Experience Depth
        experience = profile.get('experience', [])
        scores["experience_depth"] = min(100, len(experience) * 25)
        if not experience:
            suggestions.append("Add detailed descriptions of your past roles or internships.")

        # 4. Education
        education = profile.get('education', [])
        scores["education_clarity"] = 100 if education else 0
        if not education:
            suggestions.append("Specify your highest degree and university details.")

        # 5. Project Diversity
        projects = profile.get('projects', [])
        scores["project_diversity"] = min(100, len(projects) * 33)
        if len(projects) < 2:
            suggestions.append("Add more personal or academic projects to showcase practical application.")

        # Weighted Total Strength Score
        strength_score = sum(
            (scores[k] * (self.criteria[k] / 100)) for k in self.criteria
        )

        # Keyword Gap Analysis (if job description provided)
        missing_keywords = []
        if job_requirements:
            job_keywords = set(k.lower() for k in job_requirements.get('skills', []))
            cand_keywords = set(k.lower() for k in profile.get('skills', []))
            missing_keywords = list(job_keywords - cand_keywords)
            
            if missing_keywords:
                suggestions.append(f"Consider acquiring or highlighting these missing skills: {', '.join(missing_keywords[:3])}.")

        return {
            "strength_score": round(strength_score),
            "breakdown": scores,
            "missing_keywords": missing_keywords,
            "suggestions": suggestions
        }

# Global instance
resume_analyzer = ResumeStrengthAnalyzer()
