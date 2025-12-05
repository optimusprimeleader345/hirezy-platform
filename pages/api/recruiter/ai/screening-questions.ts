import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { jobDescription, seniority } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Generate 10 screening questions for a candidate.
      Seniority: ${seniority || "junior"}.

      Questions format:
      {
        "technical": string[],
        "behavioral": string[],
        "situational": string[]
      }

      Job Description:
      ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text);

    return res.status(200).json({ success: true, questions: json });
  } catch (error) {
    console.error("AI questions error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
