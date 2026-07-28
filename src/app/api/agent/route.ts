import { createStudioArtifact } from "@/lib/generate";

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

export async function POST(request: Request) {
  const body = (await request.json()) as { prompt?: string; guardrails?: string[] };
  const prompt = body.prompt?.trim();

  if (!prompt) {
    return Response.json({ error: "A prompt is required." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ ...createStudioArtifact(prompt), mode: "demo" });
  }

  const systemPrompt = [
    "You are BaronOS, Red Baron's governed campaign strategist.",
    "Be decisive, specific, concise, and commercially useful.",
    "Never use generic transformation clichés.",
    "Return plain text with clear section labels.",
    ...(body.guardrails ?? []).map((rule) => `HARD CONSTRAINT: ${rule}`),
    `USER REQUEST: ${prompt}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { temperature: 0.65, maxOutputTokens: 1400 },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini returned ${response.status}`);
    }

    const data = (await response.json()) as GeminiResponse;
    const content = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n");

    if (!content) {
      throw new Error("Gemini returned no content");
    }

    return Response.json({
      type: createStudioArtifact(prompt).type,
      title: prompt.split(" ").slice(0, 8).join(" "),
      content,
      mode: "connected",
    });
  } catch (error) {
    return Response.json({
      ...createStudioArtifact(prompt),
      mode: "fallback",
      warning: error instanceof Error ? error.message : "Provider unavailable",
    });
  }
}
