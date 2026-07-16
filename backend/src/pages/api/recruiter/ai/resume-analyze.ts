import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini API, already used in project

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "missing_required_fields" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Analyze this resume against the job description.
      Respond with JSON only.
      {
        "skillMatchScore": number (0-100),
        "missingSkills": string[],
        "matchedSkills": string[],
        "candidateSummary": string,
        "riskFactors": string[]
      }

      Resume:
      ${resumeText}

      Job Description:
      ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const json = JSON.parse(text);

    return res.status(200).json({ success: true, analysis: json });
  } catch (error) {
    console.error("AI resume analyze error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
