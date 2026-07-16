from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from services.matching_service import matching_service
from services.resume_strength import resume_analyzer

app = FastAPI(title="Hirezy AI Matching Engine")

class MatchRequest(BaseModel):
    job_data: Dict[str, Any]
    candidate_data: Dict[str, Any]

class ResumeAnalysisRequest(BaseModel):
    profile: Dict[str, Any]
    job_requirements: Optional[Dict[str, Any]] = None

@app.post("/match")
async def calculate_match(request: MatchRequest):
    try:
        result = matching_service.calculate_match(request.job_data, request.candidate_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-resume")
async def analyze_resume(request: ResumeAnalysisRequest):
    try:
        result = resume_analyzer.analyze(request.profile, request.job_requirements)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "engine": "modular-embedding-scoring"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
Line: 1
