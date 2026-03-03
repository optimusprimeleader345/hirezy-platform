from typing import List, Dict, Any
from .embedding_service import embedding_service

class MatchingService:
    def __init__(self):
        # Weights for the scoring formula
        self.weights = {
            "embedding": 0.60,
            "skills": 0.20,
            "experience": 0.10,
            "education": 0.10
        }

    def calculate_match(self, job_data: Dict[str, Any], candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculate total match score based on multiple components.
        """
        # 1. Embedding Similarity (60%)
        job_text = f"{job_data.get('title', '')} {job_data.get('description', '')}"
        candidate_text = f"{candidate_data.get('summary', '')} {' '.join(candidate_data.get('skills', []))} {' '.join(candidate_data.get('experience', []))}"
        
        job_emb = embedding_service.get_embedding(job_text)
        cand_emb = embedding_service.get_embedding(candidate_text)
        
        similarity = embedding_service.compute_similarity(job_emb, cand_emb)
        embedding_score = similarity * 100

        # 2. Skill Overlap (20%)
        job_skills = set(s.lower() for s in job_data.get('skills', []))
        cand_skills = set(s.lower() for s in candidate_data.get('skills', []))
        
        if not job_skills:
            skill_score = 100
            top_matching_skills = []
            missing_skills = []
        else:
            matching_skills = job_skills.intersection(cand_skills)
            skill_score = (len(matching_skills) / len(job_skills)) * 100
            top_matching_skills = list(matching_skills)
            missing_skills = list(job_skills - cand_skills)

        # 3. Experience Relevance (10%) - Simplified heuristic
        # In a real system, this would use NER or specialized classifiers
        exp_score = self._calculate_relevance_score(
            job_data.get('experience_requirements', []),
            candidate_data.get('experience', [])
        )

        # 4. Education Relevance (10%) - Simplified heuristic
        edu_score = self._calculate_relevance_score(
            job_data.get('education_requirements', []),
            candidate_data.get('education', [])
        )

        # Final Weighted Score
        total_score = (
            embedding_score * self.weights["embedding"] +
            skill_score * self.weights["skills"] +
            exp_score * self.weights["experience"] +
            edu_score * self.weights["education"]
        )

        # Generate Explanation
        explanation = self._generate_explanation(
            total_score, 
            skill_score, 
            matching_skills if 'matching_skills' in locals() else [],
            exp_score
        )

        return {
            "total_score": round(total_score),
            "breakdown": {
                "embedding_score": round(embedding_score),
                "skill_match_score": round(skill_score),
                "experience_score": round(exp_score),
                "education_score": round(edu_score)
            },
            "similarity": round(similarity, 4),
            "top_matching_skills": top_matching_skills,
            "missing_skills": missing_skills,
            "explanation": explanation
        }

    def _calculate_relevance_score(self, requirements: List[str], profile_items: List[str]) -> float:
        """
        Simplified heuristic for experience/education relevance.
        In production, this would be more sophisticated.
        """
        if not requirements:
            return 80.0  # Default if no specific requirements defined
        
        matches = 0
        for req in requirements:
            for item in profile_items:
                if req.lower() in item.lower() or item.lower() in req.lower():
                    matches += 1
                    break
        
        return min(100.0, (matches / len(requirements)) * 100) if requirements else 0.0

    def _generate_explanation(self, total_score: float, skill_score: float, matching_skills: List[str], exp_score: float) -> str:
        """
        Generate a human-readable explanation for the score.
        """
        if total_score >= 85:
            level = "excellent"
        elif total_score >= 70:
            level = "strong"
        elif total_score >= 50:
            level = "moderate"
        else:
            level = "low"

        skill_text = f"matches {round(skill_score)}% of required skills"
        if matching_skills:
            skill_text += f" (including {', '.join(matching_skills[:3])})"
            
        exp_text = "relevant experience" if exp_score > 60 else "some related background"
        
        return f"Candidate has a {level} match profile. They {skill_text} and demonstrate {exp_text} for this role."

# Global instance
matching_service = MatchingService()
