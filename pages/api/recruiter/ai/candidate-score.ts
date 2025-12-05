import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { resumeText, portfolioLinks, experience, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "missing_fields" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Evaluate a candidate based on resume, experience, and job description.
      Respond in JSON only.

      {
        "overallScore": number (0-100),
        "skillScore": number,
        "experienceScore": number,
        "projectRelevanceScore": number,
        "communicationScore": number,
        "finalRecommendation": "hire" | "consider" | "reject"
      }

      Resume:
      ${resumeText}

      Experience:
      ${experience}

      Portfolio:
      ${portfolioLinks}

      Job Description:
      ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text);

    return res.status(200).json({ success: true, scoring: json });
  } catch (error) {
    console.error("AI candidate scoring error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
