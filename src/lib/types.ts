export type NavKey =
  | "command"
  | "intelligence"
  | "brand"
  | "creators"
  | "studio"
  | "settings";

export type Signal = {
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

export type Guardrail = {
  id: string;
  category: "Voice" | "Claim" | "Compliance" | "Audience" | "Anti-example";
  rule: string;
  severity: "Required" | "Preferred";
  active: boolean;
};

export type Campaign = {
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

export type Artifact = {
  id: string;
  name: string;
  type: "Landing page" | "Email sequence" | "Social concept" | "Campaign brief";
  createdAt: string;
  status: "Draft" | "Ready";
  content: string;
  score: number;
};

export type Toast = {
  id: number;
  message: string;
  tone?: "success" | "neutral";
};
