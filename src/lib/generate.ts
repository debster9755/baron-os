import type { Guardrail } from "./types";

const genericPhrases = [
  "in today's fast-paced",
  "game-changer",
  "revolutionize",
  "cutting-edge",
  "unlock the power",
  "seamlessly",
];

export function scoreContent(content: string, guardrails: Guardrail[]) {
  const normalized = content.toLowerCase();
  const genericHits = genericPhrases.filter((phrase) => normalized.includes(phrase));
  const hasDecisiveLanguage = /\b(we believe|must|will|is|are|choose|stop|start)\b/i.test(content);
  const hasSpecificity = /\b\d+|enterprise|creator|brand|campaign|workflow|customer\b/i.test(content);
  const activeRequired = guardrails.filter(
    (guardrail) => guardrail.active && guardrail.severity === "Required",
  ).length;
  const score = Math.max(
    54,
    Math.min(
      98,
      76 + activeRequired * 3 + (hasDecisiveLanguage ? 6 : 0) + (hasSpecificity ? 5 : 0) - genericHits.length * 12,
    ),
  );

  return {
    score,
    genericHits,
    checks: [
      { label: "Voice alignment", passed: hasDecisiveLanguage },
      { label: "Audience specificity", passed: hasSpecificity },
      { label: "No generic language", passed: genericHits.length === 0 },
      { label: "Required guardrails active", passed: activeRequired >= 3 },
    ],
  };
}

export function createCampaignBrief(input: {
  goal: string;
  audience: string;
  mustInclude: string;
  avoid: string;
}) {
  const goal = input.goal || "Create demand for a strategically differentiated offer";
  const audience = input.audience || "Enterprise marketing leaders";
  const mustInclude = input.mustInclude || "Evidence, brand point of view, and a clear next step";
  const avoid = input.avoid || "Generic transformation claims and scripted creator language";

  return {
    title: `Creator brief — ${goal.split(" ").slice(0, 5).join(" ")}`,
    tension: `${audience} need to move faster, but they cannot trade away trust, originality, or brand accountability.`,
    singleMindedIdea:
      "Speed is only an advantage when the work still sounds like you—and every claim can survive scrutiny.",
    creativeTerritory: [
      "Show the messy, human moment where a generic idea becomes recognizably on-brand.",
      "Use a personal operating-system metaphor, experiment, or before/after contrast.",
      "Invite the audience to diagnose their own workflow instead of presenting a polished product demo.",
    ],
    nonNegotiables: mustInclude
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    avoid,
    deliverables: ["1 × 45–60 sec vertical video", "1 × native LinkedIn post", "3 × hook variants"],
    success: "Qualified saves, completion rate, and strategy-session intent—not raw impression volume.",
  };
}

export function createStudioArtifact(prompt: string) {
  const cleanPrompt = prompt.trim() || "Create a campaign landing page for governed AI workflows";
  const promptLower = cleanPrompt.toLowerCase();
  const type = promptLower.includes("email")
    ? "Email sequence"
    : promptLower.includes("social") || promptLower.includes("linkedin")
      ? "Social concept"
      : promptLower.includes("brief")
        ? "Campaign brief"
        : "Landing page";

  if (type === "Email sequence") {
    return {
      type,
      title: "The work got faster. Did the strategy get sharper?",
      content:
        "Email 1 — The tension\nAI removed the cost of producing more. It did not remove the cost of being forgettable.\n\nEmail 2 — The system\nBaronOS connects live intelligence to operational brand rules, then gives creators room to make the idea culturally native.\n\nEmail 3 — The invitation\nBring one live brief. In 45 minutes, we will show where differentiation disappears—and rebuild the workflow around it.",
    };
  }

  if (type === "Social concept") {
    return {
      type,
      title: "The generic brief test",
      content:
        "Hook: If your AI output could wear your competitor’s logo, the model is not your first problem.\n\nFormat: Creator screen-records three increasingly specific versions of the same brief. Each version reveals one missing strategic artifact: a contested belief, a buyer situation, and an anti-example.\n\nClose: Better prompts are not a copy trick. They are evidence of a better strategy.",
    };
  }

  if (type === "Campaign brief") {
    return {
      type,
      title: "Campaign territory — Governed originality",
      content:
        "Business objective: Make brand governance feel like a creative advantage, not a compliance tax.\n\nAudience tension: Enterprise teams want creator-native speed, but fear loss of control.\n\nSingle-minded idea: Guardrails create the confidence to go further.\n\nMandatories: Show the decision trail. Name the human approver. Avoid autonomous-AI hype.",
    };
  }

  return {
    type,
    title: "Strategy that moves at market speed.",
    content:
      "Hero\nSee the signal. Find the opening. Ship work only your brand could make.\n\nProof\nBaronOS connects four systems that agencies usually run apart: market intelligence, living brand rules, creator collaboration, and campaign execution.\n\nHow it works\n01 Sense — rank live signals by strategic relevance.\n02 Decide — turn brand artifacts into enforceable rules.\n03 Create — define creative territory without writing the creator’s script.\n04 Learn — capture approvals and outcomes for the next decision.\n\nCTA\nRun your next brief through BaronOS.",
  };
}
