import type { Artifact, Campaign, Guardrail, Signal } from "./types";

export const signals: Signal[] = [
  {
    id: "sig-001",
    source: "LinkedIn pulse",
    title: "Enterprise teams are replacing AI pilots with governed workflows",
    summary:
      "Operations leaders are shifting budget from standalone copilots toward traceable, role-based AI systems with clear human approvals.",
    category: "Customer",
    relevance: 96,
    momentum: 82,
    publishedAt: "18 min ago",
    tags: ["AI governance", "enterprise", "operations"],
    opportunity:
      "Own the category narrative: autonomy earns trust only when every decision has a visible reason and accountable owner.",
  },
  {
    id: "sig-002",
    source: "Competitor watch",
    title: "Rival agency launches a high-volume creator content subscription",
    summary:
      "The offer leads with output quantity and 48-hour delivery, but provides no brand governance or performance learning loop.",
    category: "Competitor",
    relevance: 91,
    momentum: 74,
    publishedAt: "1 hr ago",
    tags: ["creator economy", "agency", "positioning"],
    opportunity:
      "Counter-position on governed originality: fewer interchangeable assets, more creator-native ideas that compound brand memory.",
  },
  {
    id: "sig-003",
    source: "Search pattern",
    title: "‘AI slop’ searches accelerate across marketing communities",
    summary:
      "Marketers are looking for concrete methods to distinguish synthetic volume from strategically differentiated work.",
    category: "Culture",
    relevance: 89,
    momentum: 93,
    publishedAt: "3 hrs ago",
    tags: ["AI slop", "brand voice", "content quality"],
    opportunity:
      "Publish a diagnostic scorecard that shows where vague strategy enters the workflow and how brand artifacts prevent it.",
  },
  {
    id: "sig-004",
    source: "Platform update",
    title: "Short-form platforms expand creator collaboration controls",
    summary:
      "New controls make it easier to share approvals and usage permissions without forcing creators into rigid production templates.",
    category: "Platform",
    relevance: 83,
    momentum: 66,
    publishedAt: "Yesterday",
    tags: ["short-form", "workflow", "rights"],
    opportunity:
      "Build creator briefs around creative territory and non-negotiable boundaries, then capture approvals as reusable evidence.",
  },
];

export const initialGuardrails: Guardrail[] = [
  {
    id: "gr-001",
    category: "Voice",
    rule: "Lead with a decisive point of view; support it with operational evidence.",
    severity: "Required",
    active: true,
  },
  {
    id: "gr-002",
    category: "Anti-example",
    rule: "Never use ‘in today’s fast-paced digital landscape’ or interchangeable transformation language.",
    severity: "Required",
    active: true,
  },
  {
    id: "gr-003",
    category: "Claim",
    rule: "Quantified performance claims must name the source, cohort, and measurement window.",
    severity: "Required",
    active: true,
  },
  {
    id: "gr-004",
    category: "Audience",
    rule: "Address the enterprise marketing lead who needs speed without surrendering brand control.",
    severity: "Preferred",
    active: true,
  },
  {
    id: "gr-005",
    category: "Compliance",
    rule: "Creator content must disclose material partnerships in the first visible caption block.",
    severity: "Required",
    active: true,
  },
];

export const initialCampaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Proof, not promises",
    objective: "Position governed AI workflows as a growth advantage",
    audience: "Enterprise marketing leaders",
    channels: ["LinkedIn", "Short-form video"],
    creator: "Maya / Systems & Culture",
    status: "Brand review",
    dueDate: "Aug 02",
    progress: 58,
  },
  {
    id: "camp-002",
    name: "The anti-slop field guide",
    objective: "Generate qualified strategy workshop leads",
    audience: "CMOs and agency transformation heads",
    channels: ["Microsite", "Email"],
    creator: "Red Baron Studio",
    status: "Creator review",
    dueDate: "Aug 05",
    progress: 72,
  },
  {
    id: "camp-003",
    name: "Signals before briefs",
    objective: "Demonstrate the first-to-know intelligence proposition",
    audience: "Consumer category leaders",
    channels: ["Newsletter", "LinkedIn"],
    creator: "Arjun / Market Signals",
    status: "Approved",
    dueDate: "Jul 31",
    progress: 100,
  },
];

export const initialArtifacts: Artifact[] = [
  {
    id: "art-001",
    name: "Anti-slop field guide",
    type: "Landing page",
    createdAt: "Today, 11:42",
    status: "Ready",
    score: 94,
    content:
      "A decisive landing page that helps enterprise marketing leaders diagnose generic AI output and replace it with governed, evidence-backed workflows.",
  },
  {
    id: "art-002",
    name: "Signals before briefs — launch",
    type: "Email sequence",
    createdAt: "Yesterday, 16:10",
    status: "Draft",
    score: 87,
    content:
      "Three-email sequence: category tension, the intelligence loop, and an invitation to a working session.",
  },
];

export const metricTrends = {
  signals: [31, 34, 36, 40, 39, 44, 48],
  brandFit: [86, 88, 89, 91, 90, 93, 94],
  creators: [5, 6, 6, 7, 7, 8, 8],
  assets: [14, 16, 18, 19, 21, 24, 26],
};

export const performanceTrend = {
  labels: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
  series: [
    { key: "signals", label: "Signals ranked", color: "var(--coral)", values: metricTrends.signals },
    { key: "approvals", label: "Brand-safe approvals", color: "var(--green)", values: [18, 20, 23, 25, 27, 30, 33] },
  ],
};

export const activity = [
  { action: "Opportunity promoted", detail: "AI governance → campaign studio", time: "12 min" },
  { action: "Guardrail passed", detail: "Proof, not promises / creator brief", time: "34 min" },
  { action: "Approval recorded", detail: "Signals before briefs / legal", time: "1 hr" },
  { action: "Artifact revised", detail: "Anti-slop field guide / hero", time: "2 hrs" },
];

export const defaultGeneratedContent = {
  headline: "Move at the speed of culture. Keep the control of strategy.",
  subhead:
    "BaronOS turns live market signals, brand truth, and creator instinct into governed campaigns your team can explain—and ship.",
  cta: "See the workflow",
  sections: [
    {
      eyebrow: "01 / Listen",
      title: "Know what matters before it becomes the brief.",
      body: "The intelligence layer finds emerging conversations, competitor whitespace, and customer tension—then ranks what deserves a strategic response.",
    },
    {
      eyebrow: "02 / Govern",
      title: "Make brand rules operational.",
      body: "Voice, claims, audience context, and anti-examples become active constraints. Every output is scored before it reaches a human reviewer.",
    },
    {
      eyebrow: "03 / Create",
      title: "Give creators a territory, not a script.",
      body: "Clear non-negotiables protect the brand while open creative territories preserve the creator’s native voice.",
    },
  ],
};
