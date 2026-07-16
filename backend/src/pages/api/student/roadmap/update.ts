import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { updateMockRoadmap } from "../../../../lib/student-mock-data";
import { getRoadmapSuggestions } from "../../../../utils/ai/roadmapEngine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { studentId, completedSteps, currentStage, notes } = req.body;

    if (!studentId) return res.status(400).json({ error: "studentId required" });

    const data: Record<string, unknown> = {};
    if (Array.isArray(completedSteps)) data.completedSteps = JSON.stringify(completedSteps);
    if (currentStage) data.currentStage = currentStage;
    if (notes !== undefined) data.notes = notes;

    let roadmap = await prisma.careerRoadmap.upsert({
      where: { studentId },
      update: data,
      create: {
        studentId,
        currentStage: currentStage ?? "Beginner",
        completedSteps: JSON.stringify(completedSteps ?? []),
        nextSteps: "[]",
        notes: notes ?? null,
      },
    });

    const suggestions = await getRoadmapSuggestions(roadmap.currentStage, []);
    roadmap = await prisma.careerRoadmap.update({
      where: { studentId },
      data: { nextSteps: JSON.stringify(suggestions.nextSteps) },
    });

    return res.json({
      ...roadmap,
      completedSteps: JSON.parse(roadmap.completedSteps || "[]"),
      nextSteps: suggestions.nextSteps,
    });
  } catch (err) {
    console.warn("Using mock roadmap update (database unavailable):", err);
    const { studentId, completedSteps, currentStage, notes } = req.body;
    if (!studentId) return res.status(400).json({ error: "studentId required" });
    return res.json(
      updateMockRoadmap(studentId, {
        completedSteps: Array.isArray(completedSteps) ? completedSteps : undefined,
        currentStage,
        notes,
      })
    );
  }
}
