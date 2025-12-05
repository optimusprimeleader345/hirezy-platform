export interface CareerRoadmap {
  id: string;
  studentId: string;
  currentStage: string;
  completedSteps: string[];
  nextSteps: string[];
  notes?: string | null;
  updatedAt: string;
}

export interface RoadmapUpdatePayload {
  studentId: string;
  completedSteps?: string[];
  currentStage?: string;
  notes?: string;
}
