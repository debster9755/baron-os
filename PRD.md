# BaronOS Product Requirements Document

**Product:** BaronOS — Agentic Strategy & Execution Engine  
**Organization:** Red Baron  
**Document type:** Product Requirements Document  
**Version:** 1.0  
**Status:** Build baseline  
**Date:** 2026-07-28  
**Source:** Part (B), “Red Baron's Agentic Workflow Initiative,” in `baronOS.md`  
**Primary audience:** Red Baron leadership, strategy, account management, creative, creator partnerships, engineering, legal/compliance, and client stakeholders

---

## 1. Executive summary

BaronOS is Red Baron's proprietary strategy and campaign operating system. It connects four activities that marketing organizations usually run as separate, slow, lossy processes:

1. detecting meaningful market movement;
2. converting brand strategy into operational rules;
3. creating creator-native briefs within clear non-negotiables; and
4. producing campaign assets through governed agentic workflows.

The product is designed to move Red Baron's value proposition from production capacity to strategic intelligence, governed originality, and measurable business learning. It does not attempt to remove strategists, creators, or approvers. It removes repetitive coordination, makes decisions traceable, and lets humans spend more time on judgment.

The build has a fully functional zero-configuration demo mode. The same interface can use optional free-tier Gemini, Tavily, and Supabase services when keys are provided. Every publish-class action remains subject to named human approval.

## 2. Strategic context

### 2.1 Market shift

Generative AI has reduced the time and marginal cost of producing adequate marketing content. As a result:

- output volume is no longer a durable agency differentiator;
- clients can produce generic drafts without an agency;
- weak positioning now appears immediately as interchangeable AI output;
- creator programs are constrained by approval latency and over-scripting;
- brands need evidence that autonomous systems remain accountable;
- the scarce capability is knowing what deserves a response, why the brand can credibly respond, and how to make the response culturally native.

### 2.2 Red Baron opportunity

BaronOS lets Red Baron package its strategy as a continuously operating system instead of a sequence of documents and meetings. This creates:

- intelligence-led retainers;
- faster campaign cycles;
- reusable brand-governance IP;
- licensable client-specific workflow products;
- auditable evidence for enterprise stakeholders;
- a feedback loop from market signal to campaign outcome.

### 2.3 Product thesis

> Autonomy creates enterprise value only when strategy is explicit, boundaries are operational, and every consequential decision has a human owner.

## 3. Problem statement

Enterprise campaign workflows fail at the handoffs:

- research produces reports rather than ranked decisions;
- brand guidelines remain passive PDFs;
- briefs describe deliverables without establishing a defensible point of view;
- creators receive scripts rather than creative territories;
- compliance enters late and causes rework;
- generated assets inherit generic language;
- campaign outcomes do not update the next brief;
- approvals are fragmented across email, chat, and documents.

The result is slow work that is still insufficiently differentiated.

## 4. Product vision

BaronOS becomes the shared control plane through which a Red Baron team can:

- see the market signals that matter now;
- understand the evidence and reasoning behind each ranked opportunity;
- activate client-specific brand rules in every generation;
- construct creator-friendly territories with explicit guardrails;
- generate, assess, revise, approve, and save campaign assets;
- review the complete decision trail;
- learn from outcome data over time.

## 5. Goals and non-goals

### 5.1 Goals

#### G1 — Improve strategic differentiation

Generated work must express a specific brand position, buyer situation, and creative tension instead of category-generic language.

#### G2 — Reduce signal-to-brief time

A strategist should be able to move a ranked market signal into a campaign workflow in under five minutes.

#### G3 — Reduce approval latency

Brand, creator, legal, and client decisions must occur in one visible state machine with named owners and timestamps.

#### G4 — Preserve creator authenticity

The system must distinguish non-negotiable brand/compliance rules from open creative territory.

#### G5 — Make agent behavior governable

Every agent output must disclose inputs, active constraints, provider mode, confidence or score, and required human review.

#### G6 — Operate on a free stack at pilot scale

The product must remain usable without paid infrastructure or AI keys, and provide optional free-tier adapters.

#### G7 — Create a measurable proprietary workflow

The system must generate reusable brand artifacts, opportunity decisions, briefs, approvals, outputs, and learnings.

### 5.2 Non-goals for v1

- Autonomous publication to paid media or client production channels.
- Replacing legal review for regulated claims.
- Training or fine-tuning a proprietary foundation model.
- Full social-network firehose ingestion.
- Automated creator contracting, payment, or tax processing.
- A general-purpose no-code website builder.
- Predicting campaign revenue without sufficient first-party data.
- Supporting every agency workflow before the four core modules are validated.

## 6. Product principles

1. **Strategy before generation.** No creation workflow starts without an objective, audience situation, and active brand context.
2. **Evidence before confidence.** The system distinguishes observed signals, generated inference, and human judgment.
3. **Guardrails create freedom.** Required boundaries should expand the safe creative territory.
4. **Human accountability is visible.** A named person owns every approval-class decision.
5. **Explain the recommendation.** Ranking without rationale is not intelligence.
6. **Progressive autonomy.** Agents may prepare and recommend before they may execute.
7. **Graceful degradation.** Provider failure cannot make the core workflow unavailable.
8. **Client isolation by default.** No client context may leak into another workspace.
9. **Accessible by design.** The interface is keyboard usable, responsive, and understandable without color alone.
10. **Learning is a first-class output.** Outcomes update future decisions and artifacts.

## 7. Users and personas

### 7.1 Strategy director

**Needs:** Ranked opportunities, credible evidence, a differentiated campaign thesis, client-ready rationale.  
**Pain:** Research volume, slow synthesis, generic outputs, fragmented context.  
**Success:** Moves from signal to approved strategic territory in one session.

### 7.2 Account lead

**Needs:** Workflow visibility, client approvals, deadlines, clear ownership, status reporting.  
**Pain:** Approval chasing and version confusion.  
**Success:** Can answer “what is blocked and why?” without opening another tool.

### 7.3 Brand strategist

**Needs:** Operational voice rules, anti-examples, audience contexts, claim constraints.  
**Pain:** Guidelines are interpreted inconsistently.  
**Success:** Sees brand-fit evidence before work reaches the client.

### 7.4 Creative or copy lead

**Needs:** A clear idea, constraints, reference context, and room to exercise judgment.  
**Pain:** Generated drafts are polished but generic.  
**Success:** Receives a strategically sharp starting point and revises rather than reconstructs it.

### 7.5 Creator partnerships manager

**Needs:** Creator brief, usage boundaries, mandatories, due dates, approval state.  
**Pain:** Rigid scripts, last-minute compliance changes, lost feedback.  
**Success:** Gives creators more production time and fewer contradictory notes.

### 7.6 Creator

**Needs:** One idea, open creative territory, non-negotiables, deliverables, success definition.  
**Pain:** Brand scripts that undermine native voice.  
**Success:** Knows where freedom exists and receives timely decisions.

### 7.7 Legal/compliance reviewer

**Needs:** Claims, sources, disclosures, usage rights, version history.  
**Pain:** Late-stage review without context.  
**Success:** Reviews the relevant deltas and records a defensible decision.

### 7.8 Client marketing leader

**Needs:** Strategic differentiation, speed, governance, business relevance, auditability.  
**Pain:** AI volume without brand trust.  
**Success:** Believes the agency is an intelligence and growth partner.

### 7.9 Workspace administrator

**Needs:** User roles, providers, client isolation, retention, audit export.  
**Pain:** Uncontrolled tools and hidden data movement.  
**Success:** Can explain how data and actions are governed.

## 8. Jobs to be done

| ID | User | Job | Desired outcome |
|---|---|---|---|
| JTBD-01 | Strategist | When the market changes, show me which movement is strategically relevant | I respond before the brief becomes obvious |
| JTBD-02 | Brand strategist | When a team generates content, apply the live brand system | Work is recognizable and defensible |
| JTBD-03 | Creator manager | When a campaign enters creator production, separate freedom from non-negotiables | Creators remain authentic without brand risk |
| JTBD-04 | Account lead | When stakeholders review work, show the state and owner | Approval latency falls |
| JTBD-05 | Creative lead | When a strategy is approved, create channel-ready starting points | Production accelerates without generic output |
| JTBD-06 | Compliance | When a claim or disclosure is required, show the evidence and rule | Review is faster and auditable |
| JTBD-07 | Leadership | When evaluating the product, show business and workflow impact | BaronOS can support a differentiated retainer |

## 9. Information architecture

### 9.1 Primary navigation

- Command Center
- Market Intelligence
- Brand System
- Creator Hub
- Campaign Studio
- Settings

### 9.2 Shared context

Every primary screen displays or inherits:

- active client workspace;
- active brand-system version;
- provider mode: demo, connected, or fallback;
- current user and role;
- notification state;
- relevant audit events.

### 9.3 Core objects

- workspace;
- client;
- user and role;
- source;
- signal;
- opportunity;
- brand artifact;
- guardrail;
- campaign;
- creator;
- brief;
- deliverable;
- approval;
- generated artifact;
- outcome;
- audit event.

## 10. End-to-end workflow

### 10.1 Sense

1. Strategist defines a market query, client keywords, competitors, and sources.
2. Intelligence agent retrieves or loads signals.
3. System deduplicates and ranks signals.
4. Strategist reviews evidence, relevance, momentum, and proposed opportunity.
5. Strategist dismisses, watches, or promotes the signal.

### 10.2 Decide

1. Promoted signal creates an opportunity record.
2. Brand system retrieves active voice, claim, audience, compliance, and anti-example rules.
3. Strategy agent creates a campaign thesis.
4. Human strategist edits and approves the thesis.
5. System records rationale and active brand version.

### 10.3 Collaborate

1. Campaign owner defines objective, audience, mandatories, exclusions, creator, and deliverables.
2. Creator agent converts internal constraints into a creator-native brief.
3. Brand reviewer approves boundaries.
4. Creator reviews territory and raises questions.
5. Legal/compliance reviews claim and disclosure requirements.
6. Final brief is approved with a timestamp and immutable version.

### 10.4 Create

1. User selects an artifact type or provides a natural-language request.
2. Execution agent receives approved strategy and active guardrails.
3. Agent generates content and a brand-fit assessment.
4. User reviews preview and content.
5. Human revises or regenerates.
6. Artifact is saved as draft or ready for approval.

### 10.5 Approve and learn

1. Named reviewer approves or rejects with rationale.
2. Publish/export remains unavailable until required approvals pass.
3. Outcome metrics attach to campaign and artifact versions.
4. Strategist converts outcome into a learning.
5. Approved learning may update future opportunity scoring or brand artifacts.

## 11. Functional requirements

### 11.1 Command Center

#### Purpose

Give a strategy lead an immediately actionable view of the workspace.

#### Requirements

- **CC-01:** Display the strongest current strategic opening.
- **CC-02:** Display signal strength, momentum, and source count.
- **CC-03:** Display ranked opportunities with rationale.
- **CC-04:** Display active campaign pipeline and status.
- **CC-05:** Display brand pass rate, active creators, and shipped artifacts.
- **CC-06:** Display recent audit activity.
- **CC-07:** Provide quick actions into each core module.
- **CC-08:** Permit a new campaign to be created from any viewport.
- **CC-09:** Reflect locally persisted changes after reload.

#### Acceptance criteria

- The page loads useful seeded data without configuration.
- Every card with an action navigates to the appropriate module.
- New campaigns appear immediately and remain after refresh.
- Metrics do not require a paid provider.

### 11.2 Market Intelligence

#### Requirements

- **MI-01:** Accept a free-text market scan query.
- **MI-02:** Retrieve signals from Tavily when configured.
- **MI-03:** Use deterministic seeded signals when no key is configured.
- **MI-04:** Identify provider mode.
- **MI-05:** Rank each signal with relevance and momentum.
- **MI-06:** Label source, category, tags, and recency.
- **MI-07:** Present a strategic opportunity, not only a summary.
- **MI-08:** Filter by competitor, culture, customer, and platform.
- **MI-09:** Open a signal detail view.
- **MI-10:** Promote a signal into Campaign Studio.
- **MI-11:** Preserve the existing queue if a provider request fails.
- **MI-12:** Never present generated inference as a direct source quote.

#### Acceptance criteria

- Submitting a query returns a result set in both connected and demo mode.
- Provider failure produces a fallback result and a visible notification.
- Selecting a signal updates the detail pane.
- “Turn into campaign” opens the execution context.

### 11.3 Brand System

#### Brand artifact types

- positioning thesis;
- voice principles;
- voice examples;
- anti-examples;
- audience situations;
- claims and evidence;
- prohibited claims;
- compliance requirements;
- product facts;
- visual rules;
- competitor distinctions;
- approved terminology.

#### Requirements

- **BS-01:** Display the active client brand system and version.
- **BS-02:** Create a rule in a selected category.
- **BS-03:** Enable or disable a rule without deleting it.
- **BS-04:** Delete a rule.
- **BS-05:** Classify rules as required or preferred.
- **BS-06:** Test content against active guardrails.
- **BS-07:** Report a brand-fit score and individual checks.
- **BS-08:** Identify generic language.
- **BS-09:** Persist local changes.
- **BS-10:** Production implementation must retain artifact source, author, version, and effective date.
- **BS-11:** Production implementation must use workspace-isolated retrieval.
- **BS-12:** Required rules must act as hard constraints during generation.

#### Acceptance criteria

- Adding, toggling, and deleting a rule updates the preflight result.
- Generic phrases lower the score and appear in a warning.
- Active required rules are included in generation API requests.

### 11.4 Creator Hub

#### Requirements

- **CH-01:** Display all campaign workflows and progress.
- **CH-02:** Display objective, audience, channels, creator, and due date.
- **CH-03:** Implement the state sequence Draft → Brand review → Creator review → Approved.
- **CH-04:** Prevent advancement beyond Approved.
- **CH-05:** Generate a creator-facing brief from campaign goal, audience, non-negotiables, and exclusions.
- **CH-06:** Brief must include tension, single-minded idea, creative territories, non-negotiables, deliverables, and success definition.
- **CH-07:** Copy a generated brief.
- **CH-08:** Make the difference between a required rule and creative suggestion visually clear.
- **CH-09:** Production implementation must support comments and change requests.
- **CH-10:** Production implementation must record reviewer, decision, rationale, version, and timestamp.
- **CH-11:** A rejected decision returns the workflow to the named prior state.
- **CH-12:** Usage-rights and disclosure fields are mandatory before final approval.

#### Acceptance criteria

- Advancing a campaign updates its status and progress immediately.
- A generated brief changes when input fields change.
- Approved workflows remain visibly locked at the terminal state.

### 11.5 Campaign Studio

#### Supported v1 artifact types

- landing page copy and preview;
- email sequence;
- social concept;
- campaign brief.

#### Requirements

- **CS-01:** Accept a natural-language creation request.
- **CS-02:** Attach all active guardrails.
- **CS-03:** Use Gemini when configured.
- **CS-04:** Use deterministic generation when Gemini is unavailable.
- **CS-05:** Label connected, demo, or fallback mode through user feedback.
- **CS-06:** Show preview and content views.
- **CS-07:** Show live brand-fit assessment.
- **CS-08:** Copy result content.
- **CS-09:** Save an artifact to the library.
- **CS-10:** Open a saved artifact.
- **CS-11:** Persist saved artifacts locally.
- **CS-12:** Production implementation must retain prompt, provider, model, guardrail version, output, editor, and decision history.
- **CS-13:** Generated code previews must execute only in a sandbox with no workspace secrets.
- **CS-14:** Publish/export must require the configured approval policy.

#### Acceptance criteria

- Each supported prompt type produces a structured, useful output without a key.
- Connected model failure returns a fallback artifact.
- Saved artifacts appear in the recent artifact library and persist after reload.

### 11.6 Settings

- **ST-01:** Edit workspace name, market, and positioning thesis.
- **ST-02:** Display supported provider configuration.
- **ST-03:** Display human-approval controls.
- **ST-04:** Reset seeded local data.
- **ST-05:** Production implementation must support role-based administration.
- **ST-06:** Secrets must only be configured in server-side environment storage.

### 11.7 Search and commands

Production search must support signals, campaigns, brand artifacts, creators, and generated artifacts. Results must be workspace scoped and permission filtered. Keyboard command support should include:

- open command menu;
- create campaign;
- run scan;
- open brand preflight;
- generate artifact;
- jump to pending approvals.

## 12. Agentic system requirements

### 12.1 Agent 1 — Intelligence Sniffer

**Inputs:** workspace, market query, competitor list, source allowlist, time window.  
**Tools:** search provider, approved feeds, internal source cache.  
**Outputs:** normalized signals, evidence links, relevance, momentum, opportunity hypothesis.  
**Human gate:** signal promotion.  
**Prohibited behavior:** fabricating a source, quoting unavailable text, or publishing an inferred claim as fact.

### 12.2 Agent 2 — Brand Artifact Guard

**Inputs:** request, active brand-system version, artifact retrieval results.  
**Tools:** structured rule store, optional vector retrieval, brand-fit evaluator.  
**Outputs:** constrained prompt context, check results, violations, revision guidance.  
**Human gate:** changing a required rule or approving a brand-system version.  
**Prohibited behavior:** relaxing a required rule silently.

### 12.3 Agent 3 — Creator-Collab Agent

**Inputs:** strategy, creator profile, required boundaries, deliverables, rights, due dates.  
**Tools:** brief template, guardrail evaluator, approval workflow.  
**Outputs:** creator view, non-negotiables, open territories, questions, approval state.  
**Human gate:** brand approval, creator acceptance, compliance approval.  
**Prohibited behavior:** converting a suggestion into a mandatory instruction without authorization.

### 12.4 Agent 4 — Execution Studio Agent

**Inputs:** approved strategy, artifact type, channel, active rules, user request.  
**Tools:** model provider, templates, renderer, evaluator.  
**Outputs:** structured artifact, preview, checks, version metadata.  
**Human gate:** save-as-ready, export, publish.  
**Prohibited behavior:** using unapproved claims or secrets in generated output.

### 12.5 Orchestrator

The orchestrator:

- resolves active client and permissions;
- obtains immutable context versions;
- selects deterministic or connected mode;
- enforces input and output schemas;
- applies timeouts and retries;
- invokes the brand guard before returning an output;
- records a trace;
- routes the result to human review;
- never grants an agent more tools than the task requires.

## 13. Human approval model

### 13.1 Action classes

| Class | Examples | Default policy |
|---|---|---|
| Read | View signals, rules, campaigns | Allowed for workspace member |
| Prepare | Generate draft, summarize, score | Allowed and logged |
| Modify | Edit rule, brief, or artifact | Allowed by role and logged |
| Important | Approve brief, change required guardrail | Named human confirmation |
| External | Publish, message creator, launch media | Explicit confirmation at action time |

### 13.2 Approval evidence

Every important or external action stores:

- workspace and client;
- object type and version;
- actor and role;
- decision;
- rationale;
- relevant rules;
- evidence links;
- timestamp;
- provider and model if applicable.

## 14. Roles and permissions

| Capability | Admin | Strategist | Account lead | Creative | Creator manager | Creator | Reviewer | Client viewer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Manage workspace | ✓ |  |  |  |  |  |  |  |
| Run intelligence scan | ✓ | ✓ | ✓ |  |  |  |  | view |
| Promote signal | ✓ | ✓ | ✓ |  |  |  |  |  |
| Edit brand rules | ✓ | ✓ |  |  |  |  |  |  |
| Generate artifacts | ✓ | ✓ | ✓ | ✓ | ✓ |  |  |  |
| Edit creator brief | ✓ | ✓ | ✓ | ✓ | ✓ | comment | comment | comment |
| Approve brand | ✓ | ✓ |  |  |  |  | assigned | assigned |
| Approve creator | ✓ |  |  |  | ✓ | assigned | assigned |  |
| Publish/export | ✓ | assigned | assigned |  |  |  |  |  |
| View audit | ✓ | ✓ | ✓ |  |  |  | assigned | assigned |

## 15. Data and privacy requirements

### 15.1 Data classification

- **Public:** public URLs, public campaign examples.
- **Internal:** strategy drafts, non-sensitive workflow metadata.
- **Confidential:** brand guidelines, campaign plans, creator negotiations.
- **Restricted:** personal data, contracts, unreleased claims, credentials.

### 15.2 Requirements

- Workspace identifiers are present on every persistent object.
- Row-level access controls isolate workspaces.
- Service-role credentials never reach the browser.
- Provider requests send only the minimum necessary context.
- Logs redact API keys, tokens, and restricted content.
- Client data is not used for model training unless contractually authorized.
- Production retention is configurable by object type.
- Deletion propagates to primary data, indexed chunks, and cached files.
- Export provides a machine-readable record of relevant decisions.

## 16. Non-functional requirements

### 16.1 Performance

- Initial app shell usable within 2.5 seconds on a typical 4G connection.
- Local UI interactions acknowledge within 100 ms.
- Demo generation responds within 500 ms.
- Connected generation target p95 under 15 seconds.
- Intelligence scan target p95 under 20 seconds.
- Lists remain responsive to at least 500 visible objects through pagination or virtualization.

### 16.2 Availability and resilience

- Core local workflow remains available during provider failure.
- Provider calls use explicit timeouts.
- Mutating requests are idempotent.
- Retries use bounded exponential backoff for transient failures only.
- Failed external actions enter a visible retry state.

### 16.3 Accessibility

- Target WCAG 2.2 AA.
- Full keyboard navigation.
- Visible focus indicators.
- Semantic headings and forms.
- Status conveyed by label as well as color.
- Minimum 4.5:1 contrast for body text.
- Reduced-motion preference respected.
- Responsive down to 320 px.

### 16.4 Security

- OWASP ASVS Level 2 target for production.
- Input schemas validate all route bodies.
- Rate limiting on generation and search endpoints.
- Content Security Policy in production.
- Sandboxed generated previews.
- SSRF protection for URL ingestion.
- Malware scanning for uploaded files.
- Prompt-injection defenses separate retrieved content from instructions.
- Dependency and secret scanning in CI.

## 17. Analytics and success metrics

### 17.1 North-star metric

**Governed campaign decisions completed per active workspace per month.**

This counts a decision only when a signal or strategy is linked to an approved brief or artifact with recorded rationale.

### 17.2 Leading indicators

- weekly active strategists;
- signal-to-promotion rate;
- median signal-to-brief time;
- median brief-to-approval time;
- percentage of outputs passing required guardrails on first generation;
- regeneration rate;
- creator change-request rate;
- provider fallback rate;
- artifact reuse rate;
- audit completeness.

### 17.3 Business indicators

- intelligence-retainer attach rate;
- renewal rate for BaronOS-enabled accounts;
- strategy workshop conversion;
- campaign gross margin;
- time saved per campaign;
- percentage of client work using the brand system;
- client satisfaction with differentiation and speed.

### 17.4 Guardrail metrics

The product must not optimize volume at the expense of:

- unsubstantiated claims;
- creator satisfaction;
- approval quality;
- brand distinctiveness;
- client data isolation;
- human accountability.

## 18. Event taxonomy

Representative events:

- `workspace_opened`
- `market_scan_requested`
- `market_scan_completed`
- `signal_viewed`
- `signal_promoted`
- `guardrail_created`
- `guardrail_toggled`
- `brand_check_completed`
- `campaign_created`
- `campaign_stage_changed`
- `creator_brief_generated`
- `approval_recorded`
- `artifact_generated`
- `artifact_regenerated`
- `artifact_saved`
- `artifact_exported`
- `provider_fallback_used`
- `workspace_reset`

Events must exclude raw secrets and restricted body content.

## 19. Failure states

| Failure | User experience | System response |
|---|---|---|
| Search provider unavailable | Existing signals remain; fallback is disclosed | Return demo cache and log provider error |
| Model provider unavailable | Deterministic result is generated | Mark mode as fallback |
| Invalid generation input | Inline validation | Return 400 with safe message |
| Brand context missing | Generation can proceed only in explicit ungoverned draft mode | Mark artifact not publishable |
| Required rule violated | Clear failed check | Block ready/publish state |
| Approval rejected | Rationale shown; workflow moves back | Create immutable decision event |
| Upload unsupported | Explain accepted formats | Do not store partial file |
| Browser storage unavailable | Session remains usable | Notify that changes will not persist |
| Concurrent edit conflict | Show newer version and diff | Require user choice |
| Provider quota exceeded | Explain retry timing | Do not loop retries |

## 20. Rollout plan

### Phase 0 — Internal functional prototype

- zero-config demo mode;
- all four modules;
- local persistence;
- optional live generation and search;
- product, design, and workflow validation.

**Exit:** Five Red Baron users complete a full signal-to-artifact workflow without assistance.

### Phase 1 — Internal pilot

- Supabase authentication and persistence;
- workspace isolation and roles;
- brand artifact ingestion;
- audit log;
- structured approvals;
- basic analytics.

**Exit:** Two internal campaigns complete with 100% approval evidence.

### Phase 2 — Design-partner pilot

- one or two enterprise clients;
- client-specific brand systems;
- approved source lists;
- creator comments;
- outcome import;
- legal and privacy review.

**Exit:** At least 30% faster brief-to-approval time and positive qualitative differentiation score.

### Phase 3 — Commercial beta

- billing/entitlement integration;
- service-level monitoring;
- export and client reporting;
- administration and retention;
- reusable workflow templates.

**Exit:** Repeatable onboarding and positive gross-margin case.

## 21. Prioritization

### Must have

- command center;
- intelligence scan and ranked signal detail;
- brand guardrail CRUD and preflight;
- campaign workflow;
- creator brief generator;
- campaign studio with fallback generation;
- artifact library;
- responsive interface;
- local persistence;
- provider disclosure;
- human approval model in specification.

### Should have

- Supabase production adapter;
- authentication and roles;
- file ingestion;
- comments;
- immutable approval events;
- analytics instrumentation;
- outcome learning.

### Could have

- source scheduling;
- creator matching;
- contract workflow;
- channel integrations;
- component-level microsite editor;
- experiment design agent;
- brand visual evaluator.

### Won't have in v1

- autonomous ad spend;
- unreviewed publication;
- creator payouts;
- proprietary foundation model training.

## 22. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Generic model output | Product fails core promise | Anti-examples, required brand rules, scoring, human review |
| False or weak intelligence | Bad strategic decisions | Evidence links, source policy, human promotion |
| Prompt injection from sources | Agent follows hostile content | Delimit retrieval, tool allowlists, schema validation |
| Brand-rule drift | Inconsistent work | Versioned systems and approval ownership |
| Creator over-control | Inauthentic content | Separate territory from non-negotiables |
| Free-tier limits | Pilot interruption | Demo fallback, usage visibility, provider abstraction |
| Sensitive data leakage | Client harm | isolation, redaction, minimization, contractual controls |
| Automation bias | Weak judgment | explainability, confidence, explicit human gates |
| Adoption friction | Low usage | seed data, quick actions, guided first workflow |
| Unclear ROI | Commercial risk | baseline cycle time and quality before pilot |

## 23. Dependencies

- Red Baron sponsor and product owner.
- One pilot client and approved brand artifacts.
- Named brand and compliance reviewers.
- Source allowlist and competitor list.
- Optional Gemini API key.
- Optional Tavily API key.
- Optional Supabase project.
- GitHub repository and deployment account.
- Privacy and client-contract review before live confidential data.

## 24. Open product decisions

These decisions do not block the functional prototype but must be resolved before a client pilot:

1. First client and category.
2. Required approval roles by campaign type.
3. Data residency and retention obligations.
4. Whether client users access the workspace directly.
5. Approved external source list.
6. Creator data and contract boundaries.
7. Commercial packaging: retainer feature, license, or managed service.
8. Preferred production model provider.
9. Live publication integrations, if any.
10. Success baseline for the first pilot.

## 25. Definition of done

The v1 functional prototype is done when:

- the repository builds without errors;
- lint and type checks pass;
- all six primary navigation areas render;
- a user can create and persist a campaign;
- a user can scan and filter market signals;
- a user can create, toggle, and delete guardrails;
- the brand checker reacts to content and rules;
- a campaign advances through the defined approval stages;
- a creator view can be generated and copied;
- Campaign Studio generates all supported artifact types;
- model and search failures fall back safely;
- generated artifacts can be saved and reopened;
- layouts are usable on desktop and mobile;
- no secret is committed;
- PRD, specification, environment example, and deployment instructions are included.

## 26. Product acceptance test

1. Open BaronOS with no environment variables.
2. Confirm Command Center shows seeded opportunities, pipeline, and activity.
3. Create a campaign and refresh the browser.
4. Confirm the campaign persists.
5. Run a market scan in demo mode and promote a signal.
6. Add an anti-example in Brand System.
7. Paste that phrase into the checker and confirm the score falls.
8. Open Creator Hub and advance a campaign.
9. Change creator-brief constraints and regenerate.
10. Open Campaign Studio and generate a landing page.
11. Switch between preview and content.
12. Save and reopen the artifact.
13. Reset demo data from Settings.
14. Repeat with optional Gemini and Tavily keys and verify connected mode.

---

## Appendix A — Glossary

- **Agent:** A bounded software actor that uses context and tools to complete a task.
- **Artifact:** A campaign output or a source document used by the system.
- **Brand system:** Versioned operational rules derived from brand strategy.
- **Creative territory:** A space in which a creator can make an original execution.
- **Guardrail:** A required or preferred rule applied during preparation and evaluation.
- **Opportunity:** A human-promoted interpretation of one or more market signals.
- **Provider mode:** Connected, demo, or fallback execution state.
- **Signal:** A normalized observation from an approved source.
- **Trace:** Inputs, context, tools, outputs, checks, and decisions associated with an agent run.
- **Vibe coding:** Natural-language-driven software or asset construction, constrained here by brand context and human approval.

## Appendix B — Source-to-requirement mapping

| Source initiative | Product implementation |
|---|---|
| “First-to-Know” Intelligence Sniffer | Market scan, signal ranking, opportunity detail, promotion |
| Brand Artifact Guard | Guardrail CRUD, active constraints, preflight scoring |
| Creator-Collab Sandbox | Dual internal/creator context, creative territory, approval workflow |
| Vibe-Coding Execution Studio | Natural-language generation, preview/content views, artifact library |
| Shift from output to intelligence | Command Center metrics and ranked strategic openings |
| Reduce creator friction | Explicit separation of non-negotiables and creative freedom |
| Free tools/stack | Next.js, local mode, optional free-tier adapters |
