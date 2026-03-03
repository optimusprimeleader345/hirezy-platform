"""
Unit tests for python_ai services.
Run with: pytest python_ai/tests/test_services.py -v
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from services.embedding_service import EmbeddingService
from services.matching_service import MatchingService
from services.resume_strength import ResumeStrengthAnalyzer


# ─────────────────────────────────────────────
# EmbeddingService Tests
# ─────────────────────────────────────────────
class TestEmbeddingService:
    """Tests for the embedding generation service."""

    def setup_method(self):
        self.service = EmbeddingService()

    def test_get_embedding_returns_list(self):
        """Embedding should be a list of floats."""
        embedding = self.service.get_embedding("React TypeScript developer")
        assert isinstance(embedding, list)
        assert len(embedding) > 0
        assert all(isinstance(v, float) for v in embedding)

    def test_embedding_same_text_consistent(self):
        """Same text should always return the same embedding vector."""
        text = "Senior Python Backend Engineer"
        emb1 = self.service.get_embedding(text)
        emb2 = self.service.get_embedding(text)
        assert emb1 == emb2

    def test_similarity_identical_texts(self):
        """Identical texts should have high cosine similarity."""
        emb = self.service.get_embedding("React developer with TypeScript")
        similarity = self.service.compute_similarity(emb, emb)
        assert similarity >= 0.99

    def test_similarity_unrelated_texts(self):
        """Very different texts should have lower similarity."""
        emb1 = self.service.get_embedding("Senior Python machine learning engineer with PyTorch")
        emb2 = self.service.get_embedding("Junior graphic designer with Adobe Illustrator")
        similarity = self.service.compute_similarity(emb1, emb2)
        assert similarity < 0.95  # Not identical

    def test_batch_embeddings(self):
        """Batch mode should return correct number of embeddings."""
        texts = ["React developer", "Node.js backend engineer", "Python data scientist"]
        embeddings = self.service.get_batch_embeddings(texts)
        assert len(embeddings) == 3


# ─────────────────────────────────────────────
# MatchingService Tests
# ─────────────────────────────────────────────
class TestMatchingService:
    """Tests for the weighted AI matching service."""

    def setup_method(self):
        self.service = MatchingService()
        self.job_data = {
            "title": "Senior React Developer",
            "description": "We need an experienced React developer with TypeScript and Next.js expertise.",
            "skills": ["React", "TypeScript", "Next.js", "Node.js"],
            "experience_requirements": ["3+ years of frontend development"],
            "education_requirements": ["Computer Science or related field"]
        }

    def test_calculate_match_returns_required_keys(self):
        """Match result should contain all required output keys."""
        candidate = {
            "name": "Test Candidate",
            "skills": ["React", "TypeScript", "Next.js"],
            "experience": ["3 years full-stack development"],
            "education": ["BS Computer Science"],
            "summary": "Experienced frontend developer"
        }
        result = self.service.calculate_match(self.job_data, candidate)
        assert "total_score" in result
        assert "breakdown" in result
        assert "top_matching_skills" in result
        assert "missing_skills" in result
        assert "explanation" in result
        assert "similarity" in result

    def test_score_range_is_0_to_100(self):
        """Match score must always be between 0 and 100."""
        candidate = {
            "name": "Test",
            "skills": ["React"],
            "experience": [],
            "education": [],
            "summary": ""
        }
        result = self.service.calculate_match(self.job_data, candidate)
        assert 0 <= result["total_score"] <= 100

    def test_high_skill_overlap_boosts_score(self):
        """A candidate with all required skills should score higher than one with none."""
        good_candidate = {
            "name": "Good",
            "skills": ["React", "TypeScript", "Next.js", "Node.js"],
            "experience": ["5 years of frontend development"],
            "education": ["BS Computer Science"],
            "summary": "Senior React developer with 5 years of experience."
        }
        weak_candidate = {
            "name": "Weak",
            "skills": ["Photoshop", "Illustrator"],
            "experience": [],
            "education": [],
            "summary": "Graphic designer with no web dev experience."
        }
        good_result = self.service.calculate_match(self.job_data, good_candidate)
        weak_result = self.service.calculate_match(self.job_data, weak_candidate)
        assert good_result["total_score"] > weak_result["total_score"]

    def test_missing_skills_detected(self):
        """Missing skills should be identified when candidate lacks required ones."""
        candidate = {
            "name": "Partial",
            "skills": ["React"],
            "experience": [],
            "education": [],
            "summary": "Junior developer"
        }
        result = self.service.calculate_match(self.job_data, candidate)
        assert isinstance(result["missing_skills"], list)

    def test_explanation_is_non_empty_string(self):
        """Explanation should always be a non-empty string."""
        candidate = {
            "name": "Test",
            "skills": ["React"],
            "experience": [],
            "education": [],
            "summary": ""
        }
        result = self.service.calculate_match(self.job_data, candidate)
        assert isinstance(result["explanation"], str)
        assert len(result["explanation"]) > 0


# ─────────────────────────────────────────────
# ResumeStrengthAnalyzer Tests
# ─────────────────────────────────────────────
class TestResumeStrengthAnalyzer:
    """Tests for the resume strength heuristic analyzer."""

    def setup_method(self):
        self.analyzer = ResumeStrengthAnalyzer()

    def test_full_profile_scores_high(self):
        """A well-rounded profile should score above 70."""
        profile = {
            "email": "test@example.com",
            "skills": ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
            "experience": [{"role": "Dev", "company": "Corp", "years": 3}],
            "education": [{"degree": "BS CS", "university": "MIT"}],
            "projects": [{"name": "App1"}, {"name": "App2"}, {"name": "App3"}]
        }
        result = self.analyzer.analyze(profile)
        assert result["strength_score"] > 70

    def test_empty_profile_scores_low(self):
        """An empty profile should produce a low strength score."""
        result = self.analyzer.analyze({})
        assert result["strength_score"] < 30

    def test_missing_keywords_detected(self):
        """Analyzer should identify keywords the candidate is missing from the job."""
        profile = {"skills": ["React"], "email": "a@b.com"}
        job = {"skills": ["React", "TypeScript", "Docker", "Kubernetes"]}
        result = self.analyzer.analyze(profile, job)
        assert "TypeScript" in result["missing_keywords"] or "typescript" in [k.lower() for k in result["missing_keywords"]]

    def test_suggestions_are_provided(self):
        """Suggestions list should be non-empty for incomplete profiles."""
        result = self.analyzer.analyze({"skills": ["React"]})
        assert isinstance(result["suggestions"], list)
        assert len(result["suggestions"]) > 0

    def test_strength_score_is_0_to_100(self):
        """Strength score should always be 0-100."""
        profiles = [
            {},
            {"skills": ["React", "TypeScript"], "email": "test@x.com"},
            {"skills": ["a"] * 20, "experience": [{}] * 10, "education": [{}], "projects": [{}] * 5, "email": "x@y.com"}
        ]
        for profile in profiles:
            result = self.analyzer.analyze(profile)
            assert 0 <= result["strength_score"] <= 100


if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-v"])
