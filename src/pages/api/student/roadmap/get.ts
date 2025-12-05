import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { getRoadmapSuggestions } from "../../../../utils/ai/roadmapEngine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { studentId } = req.query;

    if (!studentId || Array.isArray(studentId)) {
      return res.status(400).json({ error: "studentId is required" });
    }

    let roadmap = await prisma.careerRoadmap.findUnique({
      where: { studentId: String(studentId) },
    });

    if (!roadmap) {
      roadmap = await prisma.careerRoadmap.create({
        data: {
          studentId: String(studentId),
          currentStage: "Beginner",
          completedSteps: [],
          nextSteps: [],
        },
      });
    }

    if (!roadmap.nextSteps || roadmap.nextSteps.length === 0) {
      const ai = await getRoadmapSuggestions(roadmap.currentStage, []);
      roadmap = await prisma.careerRoadmap.update({
        where: { studentId: String(studentId) },
        data: { nextSteps: ai.nextSteps },
      });
    }

    return res.json(roadmap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
}
