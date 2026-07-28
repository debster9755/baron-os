import { signals } from "@/lib/demo-data";

type TavilyResult = {
  title?: string;
  content?: string;
  url?: string;
  published_date?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as { query?: string };
  const query = body.query?.trim() || "enterprise AI marketing creator economy";
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    return Response.json({ signals, mode: "demo", query });
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        topic: "news",
        search_depth: "basic",
        max_results: 6,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily returned ${response.status}`);
    }

    const data = (await response.json()) as { results?: TavilyResult[] };
    const liveSignals = (data.results ?? []).map((result, index) => ({
      id: `live-${index}`,
      source: result.url ? new URL(result.url).hostname.replace("www.", "") : "Live source",
      title: result.title || "Untitled market signal",
      summary: result.content || "No summary available.",
      category: "Culture" as const,
      relevance: Math.max(72, 94 - index * 4),
      momentum: Math.max(61, 86 - index * 3),
      publishedAt: result.published_date || "Recently",
      tags: query.split(" ").slice(0, 3),
      opportunity:
        "Translate this signal into a differentiated point of view, then validate it against the active brand guardrails.",
    }));

    return Response.json({ signals: liveSignals.length ? liveSignals : signals, mode: "connected", query });
  } catch (error) {
    return Response.json({
      signals,
      mode: "fallback",
      query,
      warning: error instanceof Error ? error.message : "Search provider unavailable",
    });
  }
}
