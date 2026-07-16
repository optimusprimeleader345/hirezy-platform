/**
 * Bridge for communicating with the Python-based AI matching engine.
 * This can call a local Python script or a running FastAPI service.
 */

const PYTHON_API_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

export interface PythonMatchResult {
    total_score: number;
    breakdown: {
        embedding_score: number;
        skill_match_score: number;
        experience_score: number;
        education_score: number;
    };
    similarity: number;
    top_matching_skills: string[];
    missing_skills: string[];
    explanation: string;
}

export interface PythonResumeAnalysis {
    strength_score: number;
    breakdown: Record<string, number>;
    missing_keywords: string[];
    suggestions: string[];
}

export async function callPythonMatching(jobData: any, candidateData: any): Promise<PythonMatchResult | null> {
    try {
        const response = await fetch(`${PYTHON_API_URL}/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_data: jobData,
                candidate_data: candidateData,
            }),
        });

        if (!response.ok) {
            console.warn(`Python AI matching service returned status: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to call Python matching service:', error);
        return null;
    }
}

export async function callPythonResumeAnalysis(profile: any, jobRequirements?: any): Promise<PythonResumeAnalysis | null> {
    try {
        const response = await fetch(`${PYTHON_API_URL}/analyze-resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile,
                job_requirements: jobRequirements,
            }),
        });

        if (!response.ok) {
            console.warn(`Python AI resume analyzer returned status: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to call Python resume analysis service:', error);
        return null;
    }
}
