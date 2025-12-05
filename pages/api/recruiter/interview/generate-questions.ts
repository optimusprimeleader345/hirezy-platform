import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Mock-first generator. If OPENAI_API_KEY or GEMINI_API_KEY is present,
 * you may add a real call later. For now the endpoint always returns
 * a safe JSON object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { jobDescription, seniority } = req.body;
  if (!jobDescription) return res.status(400).json({ error: "jobDescription required" });

  try {
    // simple deterministic mock — good for offline usage
    const technical = [
      `Explain how you would design a scalable system for ${jobDescription.slice(0, 60)}.`,
      "Describe a difficult bug you fixed in production.",
      "Walk through how you debug performance issues in a web app."
    ];

    const behavioral = [
      "Tell me about a time you handled conflict in a team.",
      "Describe a project where you had to learn a new skill quickly."
    ];

    const situational = [
      "How would you approach scope changes mid-sprint?",
      "If a stakeholder requests an unrealistic deadline, how do you react?"
    ];

    return res.status(200).json({
      success: true,
      questions: {
        technical,
        behavioral,
        situational
      },
      note: "mock-generated — enable AI key to generate dynamic questions"
    });
  } catch (err) {
    console.error("generate questions error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}
