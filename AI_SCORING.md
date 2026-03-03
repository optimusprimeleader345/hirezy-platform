# AI Scoring Engine — Technical Reference

## Overview

The Hirezy AI Matching Engine uses a **Multi-Factor Weighted Scoring Formula** that combines semantic understanding (via embeddings) with structured data analysis to produce transparent, explainable match scores between candidates and job descriptions.

---

## Scoring Formula

```
Total Score = (Embedding Score × 0.60)
            + (Skill Match Score × 0.20)
            + (Experience Score × 0.10)
            + (Education Score × 0.10)
```

### Factor Weights

| Factor | Weight | Description |
|---|---|---|
| **Semantic Similarity** | 60% | Cosine similarity between job and candidate embedding vectors |
| **Skill Overlap** | 20% | Direct intersection of required vs. candidate skills |
| **Experience Relevance** | 10% | Keyword match against role level and required experience |
| **Education Relevance** | 10% | Keyword match against academic background |

---

## Factor Details

### 1. Semantic Similarity (60%)
**Model**: `all-MiniLM-L6-v2` (sentence-transformers)

**Process**:
1. Concatenate job title, description, and required skills into a single document
2. Concatenate candidate name, skills, experience, and summary
3. Encode both into 384-dimensional embedding vectors
4. Compute **cosine similarity**: `sim = dot(A, B) / (|A| × |B|)`
5. Scale to 0-100

**Why 60%?** Language models capture *intent and context* beyond simple keyword matching. A candidate who wrote "built scalable web applications with React" will match a job requiring "React developer" even without exact keyword overlap.

---

### 2. Skill Overlap (20%)
**Process**:
1. Normalize all skill names to lowercase
2. Check if each required job skill exists in the candidate skill list (fuzzy substring match)
3. `score = (matched_required_skills / total_required_skills) × 100`

**Example**:
```
Job requires: ["React", "TypeScript", "Node.js", "Docker"]
Candidate has: ["React", "TypeScript", "Express", "JavaScript"]

Matched: React ✓, TypeScript ✓, Node.js ✗ (Express is related but not exact), Docker ✗
Raw Score: 2/4 = 50 → Skill Score: 50/100
```

---

### 3. Experience Relevance (10%)
**Process**: Keyword matching between the job's `experience_requirements` and the candidate's `experience` list.

**Keywords tracked**: `senior`, `lead`, `junior`, `intern`, `years`, `engineer`, `developer`, `manager`, `architect`

**Score**:
```
score = (matching_keywords / total_keywords_in_requirements) × 100
```

---

### 4. Education Relevance (10%)
**Process**: Same keyword matching approach against education entries.

**Keywords tracked**: `computer science`, `software engineering`, `information technology`, `bachelor`, `master`, `phd`, `engineering`, `cs`, `mca`, `btech`

---

## Score Ranges & Labels

| Score Range | Label | Recommendation |
|---|---|---|
| 90–100% | 🟢 Exceptional Match | Immediate interview |
| 80–89% | 🟢 Strong Match | High priority |
| 70–79% | 🟡 Good Match | Worth considering |
| 60–69% | 🟡 Partial Match | Review manually |
| 50–59% | 🔴 Weak Match | Likely unsuitable |
| < 50% | 🔴 Poor Match | Not recommended |

---

## Explainability

Every match result includes a natural language **explanation** generated from the component scores:

```json
{
  "total_score": 87,
  "explanation": "Excellent match — candidate demonstrates strong skill alignment (React, TypeScript matched) and relevant professional experience.",
  "breakdown": {
    "embedding_score": 88,
    "skill_match_score": 85,
    "experience_score": 90,
    "education_score": 82
  },
  "top_matching_skills": ["React", "TypeScript"],
  "missing_skills": ["Docker", "Kubernetes"]
}
```

---

## Resume Strength Analyzer

A separate **heuristic-based** service that evaluates resume completeness, independent of job context:

| Dimension | Weight | Max Score |
|---|---|---|
| Contact Info | 10% | 100 |
| Skills Section | 20% | 100 |
| Experience Depth | 30% | 100 |
| Education Clarity | 15% | 100 |
| Project Diversity | 25% | 100 |

**Formula**: `Strength = Σ(dimension_score × weight)`

Optionally, if a job description is provided, the analyzer identifies **missing keywords** (skills in the job that don't appear on the resume).

---

## API Reference

### `POST /match`
Calculate weighted AI match score between a job and candidate.

**Request Body**:
```json
{
  "job_data": {
    "title": "Senior React Developer",
    "description": "...",
    "skills": ["React", "TypeScript"],
    "experience_requirements": ["3+ years"],
    "education_requirements": ["CS degree preferred"]
  },
  "candidate_data": {
    "name": "Jane Doe",
    "skills": ["React", "JavaScript"],
    "experience": ["4 years at TechCorp"],
    "education": ["BS Computer Science"],
    "summary": "..."
  }
}
```

### `POST /analyze-resume`
Analyze resume strength and identify missing keywords.

**Request Body**:
```json
{
  "profile": {
    "email": "jane@example.com",
    "skills": ["React"],
    "experience": [...],
    "education": [...],
    "projects": [...]
  },
  "job_requirements": { "skills": ["React", "Docker"] }
}
```

### `GET /health`
Health check endpoint. Returns `{ "status": "healthy" }`.

---

*Hirezy AI Scoring Engine v2.0 | Model: all-MiniLM-L6-v2 | Framework: FastAPI + Sentence-Transformers*
