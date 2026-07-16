type Suggestion = {
  nextSteps: string[];
  reason?: string;
};

export async function generateNextStepsMock(
  currentStage: string,
  skills: string[] = []
): Promise<Suggestion> {
  if (currentStage === "Beginner") {
    return {
      nextSteps: [
        "Complete 3 small React/JS projects",
        "Learn TypeScript fundamentals",
        "Publish one GitHub portfolio project"
      ],
      reason: "Beginner roadmap"
    };
  }
  if (currentStage === "Intermediate") {
    return {
      nextSteps: [
        "Build a full-stack app with DB",
        "Contribute to open-source",
        "Learn system design basics"
      ],
      reason: "Intermediate roadmap"
    };
  }
  return {
    nextSteps: [
      "Master advanced system design",
      "Mentor juniors",
      "Lead a cross-functional project"
    ],
    reason: "Advanced roadmap"
  };
}

export async function getRoadmapSuggestions(
  currentStage: string,
  skills: string[] = []
): Promise<Suggestion> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return generateNextStepsMock(currentStage, skills);

  try {
    const prompt = `User stage: ${currentStage}. Skills: ${skills.join(", ")}. Suggest 3 next steps.`;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      }),
    });

    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content ?? "";
    const steps = text
      .split(/\n/)
      .map(s => s.replace(/^\d+[\.\)\-]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return { nextSteps: steps, reason: "AI-generated" };
  } catch {
    return generateNextStepsMock(currentStage, skills);
  }
}
