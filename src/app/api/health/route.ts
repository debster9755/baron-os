export async function GET() {
  return Response.json({
    status: "ok",
    service: "baron-os",
    mode: process.env.GEMINI_API_KEY ? "connected" : "demo",
    timestamp: new Date().toISOString(),
  });
}
