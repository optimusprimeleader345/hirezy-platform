import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { getMockRoadmap } from "../../../../lib/student-mock-data";
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
          completedSteps: "[]",
          nextSteps: "[]",
        },
      });
    }

    let completedSteps: string[] = [];
    let nextSteps: string[] = [];

    try {
      completedSteps = JSON.parse(roadmap.completedSteps || "[]");
      nextSteps = JSON.parse(roadmap.nextSteps || "[]");
    } catch {
      completedSteps = [];
      nextSteps = [];
    }

    if (nextSteps.length === 0) {
      const ai = await getRoadmapSuggestions(roadmap.currentStage, []);
      nextSteps = ai.nextSteps;
      roadmap = await prisma.careerRoadmap.update({
        where: { studentId: String(studentId) },
        data: { nextSteps: JSON.stringify(nextSteps) },
      });
    }

    return res.json({
      ...roadmap,
      completedSteps,
      nextSteps,
    });
  } catch (err) {
    console.warn("Using mock roadmap (database unavailable):", err);
    const { studentId } = req.query;
    if (!studentId || Array.isArray(studentId)) {
      return res.status(400).json({ error: "studentId is required" });
    }
    return res.json(getMockRoadmap(String(studentId)));
  }
}
