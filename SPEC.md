# BaronOS Engineering Specification

**Product:** BaronOS  
**Version:** 1.0  
**Status:** Implemented prototype / production architecture defined  
**Date:** 2026-07-28  
**Companion document:** `PRD.md`

---

## 1. Purpose

This specification defines the implemented functional prototype and the target production architecture for BaronOS. Requirements are written so an engineering team can reproduce, extend, audit, and deploy the system without relying on undocumented assumptions.

## 2. Architecture decision summary

### 2.1 Selected stack

| Layer | Technology | License / cost posture | Reason |
|---|---|---|---|
| Web application | Next.js 16 App Router + React 19 + TypeScript | MIT / free | One deployable full-stack codebase |
| Styling | Tailwind CSS 4 plus authored CSS | MIT / free | Fast, maintainable responsive UI |
| Icons | Lucide React | ISC / free | Accessible open-source icon set |
| Prototype persistence | Browser `localStorage` | Free | Zero-configuration functional demo |
| Production database | Supabase PostgreSQL | Open source; hosted free tier available | SQL, auth, row-level security, storage |
| Vector search | PostgreSQL `pgvector` through Supabase | Open source | Workspace-scoped artifact retrieval |
| Generation | Google Gemini adapter | Free tier may be available by region/quota | Low-cost structured generation |
| Search | Tavily adapter | Optional free developer tier, subject to current plan | Simple news/search API |
| Fallback agents | Deterministic TypeScript functions | Free | Reliability and demo operation |
| Hosting | Vercel-compatible Next.js or any Node host | Free tiers available with conditions | Native Next.js deployment |
| Source control | GitHub | Free public/private repositories | Collaboration and CI |

### 2.2 Why a single Next.js application

The source proposal suggested Next.js plus a separate FastAPI service. The v1 implementation intentionally uses Next.js Route Handlers for the backend-for-frontend:

- fewer services and no cross-origin setup;
- one free deployment;
- shared TypeScript schemas;
- sufficient for pilot agent orchestration;
- easier secrets management;
- lower operational burden.

A separate Python worker is warranted only when document processing, long-running research, or queue throughput exceeds serverless limits.

### 2.3 Runtime modes

#### Demo mode

- No external keys.
- Seeded intelligence.
- Deterministic content and brief generation.
- Browser persistence.
- Fully interactive core workflow.

#### Connected mode

- `GEMINI_API_KEY` activates live generation.
- `TAVILY_API_KEY` activates live search.
- Each endpoint independently falls back if its provider fails.

#### Production mode

- Connected providers.
- Supabase Auth, PostgreSQL, Storage, and RLS.
- Durable jobs and audit events.
- Role-based approvals.
- Central telemetry and rate limiting.

## 3. Logical architecture

```text
Browser
  |
  |-- React client application
  |     |-- Command Center
  |     |-- Market Intelligence
  |     |-- Brand System
  |     |-- Creator Hub
  |     `-- Campaign Studio
  |
  |-- Browser persistence (prototype)
  |     `-- baronos-workspace
  |
  `-- HTTPS
        |
        `-- Next.js Route Handlers
              |-- /api/health
              |-- /api/intelligence
              `-- /api/agent
                    |
                    |-- deterministic fallback engine
                    |-- Gemini API (optional)
                    `-- Tavily API (optional)

Production extension:
  Route Handlers / worker
      |-- Supabase Auth
      |-- PostgreSQL + pgvector + RLS
      |-- Supabase Storage
      |-- job queue
      `-- telemetry / audit store
```

## 4. Repository structure

```text
baron-os/
├── PRD.md
├── SPEC.md
├── README.md
├── .env.example
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── public/
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── agent/route.ts
    │   │   ├── health/route.ts
    │   │   `-- intelligence/route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   `-- page.tsx
    ├── components/
    │   `-- baron-app.tsx
    `-- lib/
        ├── demo-data.ts
        ├── generate.ts
        `-- types.ts
```

## 5. Component specification

### 5.1 `BaronApp`

The root client component owns:

- active navigation;
- mobile-sidebar state;
- signal queue;
- guardrail list;
- campaign list;
- artifact list;
- modal state;
- notifications;
- persistence hydration.

Prototype state is intentionally colocated for transparency. Production should replace this with server-backed query/mutation boundaries while preserving the domain types.

### 5.2 Persistence contract

**Key:** `baronos-workspace`

```ts
type PrototypeWorkspace = {
  guardrails: Guardrail[];
  campaigns: Campaign[];
  artifacts: Artifact[];
};
```

Rules:

- read only in the browser;
- corrupt JSON is ignored;
- seeded defaults remain available;
- changes write after hydration;
- reset deletes the key and restores seeds;
- no secrets or sensitive client data belong in prototype storage.

### 5.3 Domain types

#### Signal

```ts
type Signal = {
  id: string;
  source: string;
  title: string;
  summary: string;
  category: "Competitor" | "Culture" | "Customer" | "Platform";
  relevance: number;
  momentum: number;
  publishedAt: string;
  tags: string[];
  opportunity: string;
};
```

#### Guardrail

```ts
type Guardrail = {
  id: string;
  category: "Voice" | "Claim" | "Compliance" | "Audience" | "Anti-example";
  rule: string;
  severity: "Required" | "Preferred";
  active: boolean;
};
```

#### Campaign

```ts
type Campaign = {
  id: string;
  name: string;
  objective: string;
  audience: string;
  channels: string[];
  creator: string;
  status: "Draft" | "Brand review" | "Creator review" | "Approved";
  dueDate: string;
  progress: number;
};
```

#### Artifact

```ts
type Artifact = {
  id: string;
  name: string;
  type: "Landing page" | "Email sequence" | "Social concept" | "Campaign brief";
  createdAt: string;
  status: "Draft" | "Ready";
  content: string;
  score: number;
};
```

## 6. Workflow state machines

### 6.1 Campaign approval

```text
Draft
  -> Brand review
      -> Creator review
          -> Approved [terminal in prototype]
```

Production transitions:

```text
Draft
  -> Brand review
      -> Changes requested -> Draft
      -> Creator review
          -> Changes requested -> Brand review
          -> Compliance review [conditional]
              -> Changes requested -> Creator review
              -> Approved
                  -> Ready to publish
                      -> Published
                      -> Archived
```

Transition invariants:

- only an authorized role may advance its gate;
- every rejection requires rationale;
- approved object versions are immutable;
- edits after approval create a new version and invalidate downstream approvals;
- external publish is a separate explicit action.

### 6.2 Artifact state

```text
Generated draft -> Edited draft -> Ready for review -> Approved -> Exported
```

A failed required guardrail prevents `Ready for review`.

## 7. API specification

### 7.1 `GET /api/health`

**Purpose:** Deployment and provider-mode health.

**Response 200**

```json
{
  "status": "ok",
  "service": "baron-os",
  "mode": "demo",
  "timestamp": "2026-07-28T00:00:00.000Z"
}
```

`mode` is `connected` when a Gemini key exists; it does not guarantee downstream provider health.

### 7.2 `POST /api/intelligence`

**Request**

```json
{
  "query": "enterprise AI marketing creator economy"
}
```

**Response**

```json
{
  "signals": [],
  "mode": "demo",
  "query": "enterprise AI marketing creator economy",
  "warning": "optional provider warning"
}
```

Behavior:

1. Normalize an empty query to the default.
2. If `TAVILY_API_KEY` is absent, return seeds.
3. If present, request news search with a bounded result count.
4. Normalize provider results into `Signal`.
5. If the provider fails or returns no useful records, return seeds with `fallback`.

Production changes:

- validate body with a schema;
- apply per-user and per-workspace rate limits;
- restrict query length;
- use approved sources;
- persist raw source metadata separately;
- produce ranking through a dedicated evaluator;
- store citations and retrieval timestamp;
- prevent arbitrary internal URL access.

### 7.3 `POST /api/agent`

**Request**

```json
{
  "prompt": "Create a landing page...",
  "guardrails": [
    "Lead with a decisive point of view."
  ]
}
```

**Response**

```json
{
  "type": "Landing page",
  "title": "Strategy that moves at market speed.",
  "content": "Generated content",
  "mode": "demo",
  "warning": "optional provider warning"
}
```

Behavior:

1. Reject an empty prompt with 400.
2. Attach the active rules as hard constraints.
3. If `GEMINI_API_KEY` is absent, use deterministic generation.
4. If present, call the configured model with bounded output.
5. If provider response is invalid, use deterministic fallback.
6. Never return the provider key or raw provider error body.

Production changes:

- authenticate the user;
- retrieve the immutable active brand version server-side;
- ignore client-supplied rules as authority;
- validate output against a JSON schema;
- run brand and safety evaluators;
- store a trace;
- include request id and artifact version;
- implement timeout, abort signal, and structured errors.

## 8. Agent contracts

Every production agent implements:

```ts
type AgentRequest<TInput> = {
  requestId: string;
  workspaceId: string;
  actorId: string;
  input: TInput;
  contextRefs: Array<{ type: string; id: string; version: number }>;
  allowedTools: string[];
  deadlineMs: number;
};

type AgentResult<TOutput> = {
  requestId: string;
  status: "completed" | "needs_review" | "failed";
  output?: TOutput;
  evidence: Array<{ sourceId: string; claim: string }>;
  checks: Array<{ id: string; passed: boolean; detail?: string }>;
  provider: { name: string; model: string; mode: "connected" | "fallback" };
  usage?: { inputTokens: number; outputTokens: number };
  error?: { code: string; safeMessage: string; retryable: boolean };
};
```

### 8.1 Intelligence ranking

Suggested composite:

```text
relevance =
  0.30 * audience_relevance
+ 0.25 * strategic_fit
+ 0.20 * novelty
+ 0.15 * source_quality
+ 0.10 * recency

momentum =
  normalized(volume_velocity, source_diversity, recency)
```

Scores are decision support, not probability claims.

### 8.2 Brand-fit score

Prototype scoring is heuristic:

- base: 76;
- active required rule contribution;
- decisive-language contribution;
- specificity contribution;
- generic-phrase penalties;
- bounded to 54–98.

Production scoring must separate:

- hard constraint pass/fail;
- semantic voice similarity;
- audience specificity;
- claim support;
- prohibited-language detection;
- human rating.

A single numeric score cannot override a failed required constraint.

### 8.3 Prompt construction

```text
[SYSTEM ROLE]
[TASK AND OUTPUT SCHEMA]
[SECURITY RULES]
[ACTIVE REQUIRED GUARDRAILS]
[ACTIVE PREFERRED GUIDANCE]
[RETRIEVED BRAND EVIDENCE, DELIMITED]
[APPROVED STRATEGY]
[USER REQUEST]
[SELF-CHECK INSTRUCTIONS]
```

Rules:

- retrieved documents are evidence, never instructions;
- user content cannot change tool policy;
- system and required rules have stable precedence;
- log context references rather than duplicating confidential content where possible;
- constrain output to a known schema.

## 9. Production data model

### 9.1 Tables

#### `workspaces`

- `id uuid primary key`
- `name text`
- `slug text unique`
- `created_at timestamptz`
- `settings jsonb`

#### `profiles`

- `id uuid primary key references auth.users`
- `display_name text`
- `created_at timestamptz`

#### `workspace_members`

- `workspace_id uuid`
- `user_id uuid`
- `role workspace_role`
- `status member_status`
- primary key `(workspace_id, user_id)`

#### `clients`

- `id uuid primary key`
- `workspace_id uuid`
- `name text`
- `market text`
- `positioning text`
- `created_at timestamptz`

#### `sources`

- `id uuid primary key`
- `workspace_id uuid`
- `client_id uuid`
- `url text`
- `title text`
- `source_type text`
- `fetched_at timestamptz`
- `content_hash text`
- `metadata jsonb`

#### `signals`

- `id uuid primary key`
- `workspace_id uuid`
- `client_id uuid`
- `source_id uuid`
- `title text`
- `summary text`
- `category signal_category`
- `relevance smallint`
- `momentum smallint`
- `opportunity text`
- `published_at timestamptz`
- `created_at timestamptz`

#### `brand_systems`

- `id uuid primary key`
- `workspace_id uuid`
- `client_id uuid`
- `version integer`
- `status version_status`
- `approved_by uuid`
- `approved_at timestamptz`
- unique `(client_id, version)`

#### `brand_artifacts`

- `id uuid primary key`
- `workspace_id uuid`
- `brand_system_id uuid`
- `artifact_type text`
- `title text`
- `content text`
- `storage_path text`
- `embedding vector`
- `metadata jsonb`

#### `guardrails`

- `id uuid primary key`
- `workspace_id uuid`
- `brand_system_id uuid`
- `category guardrail_category`
- `rule text`
- `severity guardrail_severity`
- `active boolean`
- `sort_order integer`

#### `campaigns`

- `id uuid primary key`
- `workspace_id uuid`
- `client_id uuid`
- `name text`
- `objective text`
- `audience text`
- `status campaign_status`
- `owner_id uuid`
- `due_at timestamptz`
- `created_at timestamptz`

#### `campaign_signals`

- `campaign_id uuid`
- `signal_id uuid`
- primary key `(campaign_id, signal_id)`

#### `creators`

- `id uuid primary key`
- `workspace_id uuid`
- `display_name text`
- `profile jsonb`
- `personal_data jsonb` stored only if required

#### `briefs`

- `id uuid primary key`
- `workspace_id uuid`
- `campaign_id uuid`
- `version integer`
- `internal_context jsonb`
- `creator_view jsonb`
- `status version_status`
- `created_by uuid`
- `created_at timestamptz`

#### `artifacts`

- `id uuid primary key`
- `workspace_id uuid`
- `campaign_id uuid`
- `brief_id uuid`
- `artifact_type text`
- `name text`
- `content jsonb`
- `status artifact_status`
- `brand_score smallint`
- `created_by uuid`
- `created_at timestamptz`

#### `agent_runs`

- `id uuid primary key`
- `workspace_id uuid`
- `agent_type text`
- `actor_id uuid`
- `input_refs jsonb`
- `output_ref jsonb`
- `provider text`
- `model text`
- `mode text`
- `checks jsonb`
- `usage jsonb`
- `started_at timestamptz`
- `completed_at timestamptz`

#### `approvals`

- `id uuid primary key`
- `workspace_id uuid`
- `object_type text`
- `object_id uuid`
- `object_version integer`
- `stage text`
- `reviewer_id uuid`
- `decision approval_decision`
- `rationale text`
- `created_at timestamptz`

#### `audit_events`

- `id uuid primary key`
- `workspace_id uuid`
- `actor_id uuid`
- `action text`
- `object_type text`
- `object_id uuid`
- `metadata jsonb`
- `created_at timestamptz`

### 9.2 Database invariants

- Workspace foreign key on every client-owned record.
- Composite foreign keys or trigger validation prevent cross-workspace references.
- Approved versions are immutable.
- Audit events are append-only.
- Artifact and brief version numbers increase monotonically.
- Hard deletes are restricted to administrators and retention jobs.

## 10. Supabase baseline schema

Illustrative migration:

```sql
create extension if not exists vector;

create type workspace_role as enum (
  'admin', 'strategist', 'account_lead', 'creative',
  'creator_manager', 'creator', 'reviewer', 'client_viewer'
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role workspace_role not null,
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.guardrails (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  brand_system_id uuid not null,
  category text not null,
  rule text not null check (char_length(rule) between 3 and 2000),
  severity text not null check (severity in ('Required', 'Preferred')),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.guardrails enable row level security;

create function public.is_workspace_member(target_workspace uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace
      and wm.user_id = auth.uid()
  );
$$;

create policy "members read workspace"
on public.workspaces for select
using (public.is_workspace_member(id));

create policy "members read guardrails"
on public.guardrails for select
using (public.is_workspace_member(workspace_id));
```

Production migrations must add role-specific write policies and test cross-workspace denial.

## 11. Retrieval and document ingestion

### 11.1 Accepted formats

- PDF;
- Markdown;
- text;
- DOCX after server-side extraction;
- approved URLs.

### 11.2 Pipeline

1. Validate file type and size.
2. Scan for malware.
3. Store original in a workspace-scoped bucket.
4. Extract text.
5. Record page/section boundaries.
6. Chunk semantically with overlap.
7. Add workspace, client, brand version, artifact type, and source metadata.
8. Generate embeddings.
9. Store chunks and vectors.
10. Sample and verify extraction.

### 11.3 Retrieval policy

Filter by workspace and active brand version before similarity search. Prefer:

1. required structured rules;
2. approved examples and anti-examples;
3. relevant audience contexts;
4. product facts and supported claims;
5. lower-priority descriptive material.

Retrieved chunks must retain a source reference.

## 12. Security specification

### 12.1 Authentication

- Production uses Supabase Auth or an enterprise identity provider.
- Sessions use secure, HTTP-only cookies.
- MFA required for admins before external publication is enabled.

### 12.2 Authorization

- Deny by default.
- Server derives workspace membership.
- Client-supplied workspace ids are never sufficient authority.
- RLS enforces isolation even if application checks fail.

### 12.3 Secrets

- Store keys only in deployment environment variables.
- Never prefix server secrets with `NEXT_PUBLIC_`.
- Redact secrets from logs.
- Rotate provider keys on suspected exposure.
- Commit `.env.example`, never `.env*` with real values.

### 12.4 Prompt injection

- Treat web and document text as untrusted data.
- Delimit retrieved content.
- Do not expose system prompts or credentials to the model.
- Restrict each agent to an explicit tool allowlist.
- Validate tool arguments.
- Prohibit model-directed arbitrary fetches.
- Require human confirmation for external effects.

### 12.5 Generated preview security

The prototype renders authored content into fixed React markup; it does not execute generated code. A future live-code preview must:

- run in an isolated origin or sandboxed iframe;
- have no same-origin access;
- receive no application credentials;
- disable unrestricted networking;
- enforce CPU, time, and size limits;
- sanitize HTML;
- require review before deployment.

### 12.6 HTTP controls

Production adds:

- strict Content Security Policy;
- HSTS;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- frame-ancestor restrictions;
- CSRF protection for cookie-authenticated mutations;
- rate limits;
- request-body limits.

## 13. Reliability and error handling

### 13.1 Error schema

```ts
type ApiError = {
  error: {
    code: string;
    message: string;
    retryable: boolean;
    requestId: string;
  };
};
```

### 13.2 Retry policy

- Retry only 429 and selected 5xx/timeouts.
- Maximum two automated retries.
- Exponential backoff with jitter.
- Respect provider retry headers.
- Do not retry validation, authorization, or policy errors.
- Use idempotency keys for mutating jobs.

### 13.3 Circuit breaker

After a configurable provider failure threshold:

- stop new live requests for a short window;
- enter fallback mode;
- expose degraded health;
- alert operations;
- probe recovery asynchronously.

## 14. Performance specification

- Prefer server components for static shells when decomposition is introduced.
- Keep interactive boundaries scoped.
- Paginate signals, campaigns, and artifacts.
- Cache public source retrieval by normalized URL and hash.
- Do not cache client generation across workspaces.
- Stream long generation only after partial-output approval behavior is designed.
- Lazy-load future preview editors.
- Optimize source documents outside the request path.
- Define database indexes on workspace, client, status, due date, and created time.
- Add HNSW or IVFFlat vector index only after dataset size justifies it.

## 15. Accessibility specification

- One `h1` per primary screen.
- Buttons have accessible names.
- Form controls have labels.
- Modal traps focus in production hardening.
- Escape closes modal.
- Screen-reader announcements for generation and state changes.
- Keyboard alternative for drag/drop or sortable actions.
- Status includes text.
- Touch targets target 44×44 CSS pixels for mobile refinement.
- Reduced motion disables nonessential animation.

## 16. Responsive behavior

### Desktop, ≥ 1200 px

- Fixed 248 px sidebar.
- Multi-column dashboards.
- Three-column Creator Hub.

### Tablet, 721–1199 px

- Drawer sidebar below 960 px.
- Two-column intelligence and studio where space permits.
- Creator preview moves below workflow.

### Mobile, 320–720 px

- Drawer navigation.
- Single-column modules.
- Compact top-bar action.
- Stacked forms and previews.
- Toasts span available width.

## 17. Observability

### 17.1 Logs

Structured fields:

- timestamp;
- level;
- environment;
- request id;
- workspace id hash;
- actor id hash;
- route or agent;
- provider;
- model;
- mode;
- latency;
- status;
- safe error code.

Do not log raw prompts by default in production.

### 17.2 Metrics

- request count and error rate by route;
- p50/p95 latency;
- provider fallback rate;
- rate-limit events;
- generation token use;
- intelligence result count;
- guardrail failure frequency;
- approval stage duration;
- artifact save and export rate.

### 17.3 Traces

Each agent run should link:

- inbound request;
- retrieval;
- provider request;
- evaluator;
- persistence;
- approval event.

## 18. Testing strategy

### 18.1 Static checks

- ESLint;
- TypeScript;
- dependency audit;
- secret scan;
- license review.

### 18.2 Unit tests

- brand score bounds and generic phrase penalties;
- campaign brief defaulting and parsing;
- artifact type detection;
- state transition authorization;
- request schema validation;
- provider response normalization.

### 18.3 Component tests

- guardrail add/toggle/delete;
- brand checker updates;
- campaign modal validation;
- campaign advancement;
- brief regeneration;
- artifact save/open;
- provider-mode feedback.

### 18.4 API tests

- empty prompt returns 400;
- no keys return demo mode;
- provider failure returns fallback;
- provider success normalizes output;
- secrets never appear in response;
- rate limits return structured 429 in production.

### 18.5 End-to-end tests

Use Playwright:

1. load demo;
2. create persisted campaign;
3. run intelligence scan;
4. add anti-example and verify score impact;
5. advance campaign;
6. regenerate brief;
7. generate and save artifact;
8. reload and verify persistence;
9. verify mobile navigation;
10. verify keyboard focus path.

### 18.6 Security tests

- workspace A cannot access workspace B;
- unauthorized role cannot approve;
- prompt injection cannot expand tool access;
- URL ingestion rejects private networks;
- HTML sanitation blocks scripts;
- approved versions cannot be mutated;
- audit events cannot be edited by workspace users.

## 19. CI/CD

Recommended GitHub Actions pipeline:

```yaml
name: validate
on:
  pull_request:
  push:
    branches: [main]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

Production additions:

- unit and E2E tests;
- migration validation;
- dependency review;
- secret scanning;
- preview deployment;
- manual approval for production.

## 20. Environment variables

| Variable | Required | Scope | Purpose |
|---|---:|---|---|
| `GEMINI_API_KEY` | No | Server | Connected generation |
| `TAVILY_API_KEY` | No | Server | Connected market search |
| `NEXT_PUBLIC_SUPABASE_URL` | Production adapter | Browser | Supabase client URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production adapter | Browser | RLS-protected public client key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server jobs only | Server | Privileged background operations |
| `APP_URL` | Production | Server | Canonical URL |
| `LOG_LEVEL` | No | Server | Structured logging level |

## 21. Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

No keys are required. Optional keys are read only by Route Handlers.

## 22. Build and deployment

```bash
npm run lint
npm run build
npm run start
```

Vercel-compatible deployment:

1. Import the GitHub repository.
2. Use the detected Next.js preset.
3. Set optional environment variables.
4. Deploy a preview.
5. Run the acceptance test.
6. Promote to production.

The Vercel Hobby tier is intended for personal/non-commercial use under its current terms. A commercial Red Baron deployment must confirm plan eligibility or choose another compliant host.

## 23. Free-tier operating model

The phrase “free stack” means the software can be developed and piloted without mandatory paid dependencies. It does not guarantee unlimited commercial hosting:

- local deterministic mode is always free;
- GitHub repositories have a free plan;
- Supabase and model/search providers have quotas that may change;
- Vercel Hobby has usage and fair-use conditions;
- production volume and commercial terms must be reviewed before client launch.

The architecture prevents provider lock-in through small route-level adapters and deterministic fallbacks.

## 24. Backup, retention, and recovery

Production:

- daily logical database backups according to plan capability;
- storage object versioning where supported;
- quarterly restore test;
- configurable retention by object type;
- 30-day soft-delete window for campaign objects unless contract differs;
- append-only audit retention aligned with legal requirements;
- documented provider outage runbook.

Target RPO/RTO for pilot:

- RPO: 24 hours;
- RTO: 4 hours.

## 25. Implementation status

| Requirement | Status |
|---|---|
| Responsive application shell | Implemented |
| Command Center | Implemented |
| Intelligence query/filter/detail | Implemented |
| Tavily adapter with fallback | Implemented |
| Brand guardrail CRUD | Implemented |
| Brand preflight scoring | Implemented |
| Campaign creation and persistence | Implemented |
| Approval stage progression | Implemented |
| Creator brief generation | Implemented |
| Gemini adapter with fallback | Implemented |
| Preview/content views | Implemented |
| Artifact save/open/persistence | Implemented |
| Settings and reset | Implemented |
| Supabase durable persistence | Specified, not enabled |
| Authentication and RBAC | Specified, not enabled |
| File ingestion and pgvector | Specified, not enabled |
| Immutable audit storage | Specified, not enabled |
| External publication | Intentionally excluded |

## 26. Requirement traceability

| PRD area | Implementation |
|---|---|
| CC-01–09 | `CommandCenter`, root persisted state |
| MI-01–12 | `Intelligence`, `/api/intelligence` |
| BS-01–12 | `BrandSystem`, `scoreContent` |
| CH-01–12 | `CreatorHub`, `createCampaignBrief`, campaign state |
| CS-01–14 | `CampaignStudio`, `/api/agent`, `createStudioArtifact` |
| ST-01–06 | `WorkspaceSettings`, `.env.example` |
| Accessibility | semantic controls, focus styles, reduced motion, responsive CSS |
| Resilience | deterministic provider fallbacks and retained UI state |

## 27. Engineering definition of done

- clean install succeeds;
- lint succeeds;
- production build succeeds;
- no runtime console error in main flows;
- health endpoint returns 200;
- API input validation works;
- no secrets are tracked;
- demo mode completes the PRD acceptance test;
- connected mode is independently testable;
- responsive layout is visually checked at 1440, 1024, 768, 390, and 320 px;
- project documentation matches actual behavior;
- repository contains a reproducible lockfile.

---

## Appendix A — Future service split trigger

Introduce a durable worker when any of the following becomes true:

- document ingestion regularly exceeds request duration;
- scheduled intelligence scans require reliable retries;
- one workflow fans out to more than ten provider calls;
- provider jobs require pause/resume;
- daily agent runs exceed comfortable serverless concurrency;
- client SLA requires independent scaling.

Preferred free/open components include PostgreSQL-backed queues or a managed queue already included in the selected platform. Do not add infrastructure before measured need.

## Appendix B — Decision records to create next

- ADR-001: production identity provider;
- ADR-002: client data retention and region;
- ADR-003: model provider and data-use terms;
- ADR-004: source acquisition policy;
- ADR-005: generated preview sandbox;
- ADR-006: commercial hosting plan;
- ADR-007: approval matrix by campaign class.
