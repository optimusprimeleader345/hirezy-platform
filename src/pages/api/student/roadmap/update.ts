import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { getRoadmapSuggestions } from "../../../../utils/ai/roadmapEngine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { studentId, completedSteps, currentStage, notes } = req.body;

    if (!studentId) return res.status(400).json({ error: "studentId required" });

    const data: any = {};
    if (Array.isArray(completedSteps)) data.completedSteps = completedSteps;
    if (currentStage) data.currentStage = currentStage;
    if (notes !== undefined) data.notes = notes;

    let roadmap = await prisma.careerRoadmap.upsert({
      where: { studentId },
      update: data,
      create: {
        studentId,
        currentStage: currentStage ?? "Beginner",
        completedSteps: completedSteps ?? [],
        nextSteps: [],
        notes: notes ?? null,
      },
    });

    const suggestions = await getRoadmapSuggestions(roadmap.currentStage, []);
    roadmap = await prisma.careerRoadmap.update({
      where: { studentId },
      data: { nextSteps: suggestions.nextSteps },
    });

    return res.json(roadmap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
}
