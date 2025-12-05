export async function fetchRoadmap(studentId: string) {
  const res = await fetch(`/api/student/roadmap/get?studentId=${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch roadmap");
  return res.json();
}

export async function updateRoadmap(payload: any) {
  const res = await fetch(`/api/student/roadmap/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update roadmap");
  return res.json();
}
