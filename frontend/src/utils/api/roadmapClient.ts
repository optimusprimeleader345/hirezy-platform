import { defaultRoadmap } from '@/lib/studentMockData';

export async function fetchRoadmap(studentId: string) {
  try {
    const res = await fetch(`/api/student/roadmap/get?studentId=${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch roadmap');
    return res.json();
  } catch (error) {
    console.warn('Using local roadmap fallback:', error);
    return { ...defaultRoadmap, studentId };
  }
}

export async function updateRoadmap(payload: {
  studentId: string;
  completedSteps?: string[];
  currentStage?: string;
  notes?: string;
}) {
  try {
    const res = await fetch('/api/student/roadmap/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update roadmap');
    return res.json();
  } catch (error) {
    console.warn('Using local roadmap update fallback:', error);
    const completedSteps = payload.completedSteps ?? defaultRoadmap.completedSteps;
    const remaining = defaultRoadmap.nextSteps.filter((step) => !completedSteps.includes(step));
    return {
      ...defaultRoadmap,
      studentId: payload.studentId,
      completedSteps,
      currentStage: completedSteps.length >= 2 ? 'Intermediate' : 'Beginner',
      nextSteps: remaining.length > 0 ? remaining : ['Build a full-stack app with DB'],
    };
  }
}
