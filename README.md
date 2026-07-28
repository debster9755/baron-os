# BaronOS

Red Baron's agentic strategy and campaign execution workspace.

BaronOS turns live market signals, operational brand rules, creator collaboration, and campaign generation into one governed workflow. It is fully usable with no API keys and can optionally connect to Gemini and Tavily.

## What works

- Command Center with ranked opportunities, pipeline, activity, and quick actions
- Market scan with filtering, signal detail, provider disclosure, and campaign promotion
- Brand guardrail creation, activation, deletion, and live content preflight
- Campaign creation, local persistence, and staged approvals
- Creator-native brief generation with explicit freedom and non-negotiables
- Campaign Studio with landing page, email, social, and brief outputs
- Preview/content modes, brand-fit checks, and saved artifact library
- Responsive desktop, tablet, and mobile layouts
- Safe deterministic fallback when providers are missing or unavailable

## Run locally

Requirements: Node.js 22.13+ is recommended by the current lint dependency chain.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required.

## Optional integrations

Add server-side keys to `.env.local`:

```bash
GEMINI_API_KEY=...
TAVILY_API_KEY=...
```

Do not commit `.env.local`.

## Validate

```bash
npm run lint
npm run build
```

Health endpoint:

```text
GET /api/health
```

## Documentation

- [Product requirements](./PRD.md)
- [Engineering specification](./SPEC.md)
- [Original initiative](./baronOS.md)

## Production note

The included build uses browser storage for a zero-config functional prototype. `SPEC.md` defines the Supabase schema, authentication, row-level security, audit, ingestion, and production-hardening path. Do not put confidential client data into demo mode.

## License

Private prototype for Red Baron. Add an explicit repository license only after ownership and distribution terms are confirmed.
