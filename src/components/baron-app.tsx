"use client";

import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Code2,
  Command,
  Copy,
  Eye,
  FileText,
  Filter,
  Fingerprint,
  Flame,
  Globe2,
  LayoutDashboard,
  Lightbulb,
  LoaderCircle,
  Menu,
  MoreHorizontal,
  Network,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Signal,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { activity, defaultGeneratedContent, initialArtifacts, initialCampaigns, initialGuardrails, signals as demoSignals } from "@/lib/demo-data";
import { createCampaignBrief, scoreContent } from "@/lib/generate";
import type { Artifact, Campaign, Guardrail, NavKey, Signal as SignalType, Toast } from "@/lib/types";

const navigation: Array<{
  key: NavKey;
  label: string;
  caption?: string;
  icon: typeof Command;
}> = [
  { key: "command", label: "Command center", icon: LayoutDashboard },
  { key: "intelligence", label: "Market intelligence", icon: Signal, caption: "12 new" },
  { key: "brand", label: "Brand system", icon: Fingerprint },
  { key: "creators", label: "Creator hub", icon: Users, caption: "3 active" },
  { key: "studio", label: "Campaign studio", icon: WandSparkles },
];

const labels: Record<NavKey, { eyebrow: string; title: string; description: string }> = {
  command: {
    eyebrow: "Tuesday, 28 July",
    title: "Good evening, Aisha.",
    description: "Here’s what BaronOS is seeing, deciding, and moving forward.",
  },
  intelligence: {
    eyebrow: "First-to-know agent",
    title: "Market intelligence",
    description: "Turn noisy market movement into ranked strategic openings.",
  },
  brand: {
    eyebrow: "Brand artifact guard",
    title: "Brand system",
    description: "Make the rules that distinguish the brand active in every workflow.",
  },
  creators: {
    eyebrow: "Creator-collab sandbox",
    title: "Creator hub",
    description: "Protect non-negotiables while preserving creator-native ideas.",
  },
  studio: {
    eyebrow: "Vibe-coding execution studio",
    title: "Campaign studio",
    description: "Move from an approved strategy to governed, shippable campaign assets.",
  },
  settings: {
    eyebrow: "Workspace administration",
    title: "Settings",
    description: "Control providers, client context, and workflow defaults.",
  },
};

const categoryClass: Record<SignalType["category"], string> = {
  Competitor: "tag-coral",
  Culture: "tag-violet",
  Customer: "tag-green",
  Platform: "tag-blue",
};

const statusClass: Record<Campaign["status"], string> = {
  Draft: "status-neutral",
  "Brand review": "status-amber",
  "Creator review": "status-violet",
  Approved: "status-green",
};

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function BaronApp() {
  const [active, setActive] = useState<NavKey>("command");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signals, setSignals] = useState<SignalType[]>(demoSignals);
  const [guardrails, setGuardrails] = useState<Guardrail[]>(initialGuardrails);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem("baronos-workspace");
        if (stored) {
          const workspace = JSON.parse(stored) as {
            guardrails?: Guardrail[];
            campaigns?: Campaign[];
            artifacts?: Artifact[];
          };
          if (workspace.guardrails) setGuardrails(workspace.guardrails);
          if (workspace.campaigns) setCampaigns(workspace.campaigns);
          if (workspace.artifacts) setArtifacts(workspace.artifacts);
        }
      } catch {
        // A corrupt demo workspace should never block access.
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      "baronos-workspace",
      JSON.stringify({ guardrails, campaigns, artifacts }),
    );
  }, [artifacts, campaigns, guardrails, hydrated]);

  const notify = (message: string, tone: Toast["tone"] = "success") => {
    const toast = { id: Date.now(), message, tone };
    setToasts((current) => [...current, toast]);
    window.setTimeout(
      () => setToasts((current) => current.filter((item) => item.id !== toast.id)),
      3200,
    );
  };

  const goTo = (key: NavKey) => {
    setActive(key);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const createCampaign = (campaign: Campaign) => {
    setCampaigns((current) => [campaign, ...current]);
    setShowNewCampaign(false);
    notify("Campaign created and saved to the workspace.");
  };

  const resetWorkspace = () => {
    setGuardrails(initialGuardrails);
    setCampaigns(initialCampaigns);
    setArtifacts(initialArtifacts);
    localStorage.removeItem("baronos-workspace");
    notify("Demo workspace restored.");
  };

  return (
    <main className="app-shell">
      <Sidebar active={active} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={goTo} />

      <section className="workspace">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          onNavigate={goTo}
          onNewCampaign={() => setShowNewCampaign(true)}
        />

        <div className="workspace-body">
          <header className="page-heading">
            <div>
              <p className="eyebrow">{labels[active].eyebrow}</p>
              <h1>{labels[active].title}</h1>
              <p>{labels[active].description}</p>
            </div>
            {active === "command" && (
              <button className="button button-primary desktop-action" onClick={() => setShowNewCampaign(true)}>
                <Plus size={17} />
                New campaign
              </button>
            )}
          </header>

          {active === "command" && (
            <CommandCenter
              signals={signals}
              campaigns={campaigns}
              artifacts={artifacts}
              onNavigate={goTo}
              onNotify={notify}
            />
          )}
          {active === "intelligence" && (
            <Intelligence
              signals={signals}
              setSignals={setSignals}
              onPromote={(signal) => {
                setActive("studio");
                notify(`“${signal.title}” sent to Campaign Studio.`);
              }}
              onNotify={notify}
            />
          )}
          {active === "brand" && (
            <BrandSystem guardrails={guardrails} setGuardrails={setGuardrails} onNotify={notify} />
          )}
          {active === "creators" && (
            <CreatorHub
              campaigns={campaigns}
              setCampaigns={setCampaigns}
              onNew={() => setShowNewCampaign(true)}
              onNotify={notify}
            />
          )}
          {active === "studio" && (
            <CampaignStudio
              guardrails={guardrails}
              artifacts={artifacts}
              setArtifacts={setArtifacts}
              onNotify={notify}
            />
          )}
          {active === "settings" && <WorkspaceSettings onReset={resetWorkspace} onNotify={notify} />}
        </div>
      </section>

      {showNewCampaign && (
        <NewCampaignModal onClose={() => setShowNewCampaign(false)} onCreate={createCampaign} />
      )}

      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            {toast.tone === "success" ? <CheckCircle2 size={18} /> : <Bell size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function Sidebar({
  active,
  open,
  onClose,
  onNavigate,
}: {
  active: NavKey;
  open: boolean;
  onClose: () => void;
  onNavigate: (key: NavKey) => void;
}) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark">B</div>
          <div>
            <strong>Baron<span>OS</span></strong>
            <small>Strategy, in motion.</small>
          </div>
          <button className="icon-button mobile-only" onClick={onClose} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <div className="client-switcher">
          <div className="client-avatar">RB</div>
          <div>
            <small>Active workspace</small>
            <strong>Red Baron</strong>
          </div>
          <ChevronDown size={15} />
        </div>

        <nav className="nav-list" aria-label="Primary">
          <small className="nav-label">Workspace</small>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={active === item.key ? "nav-item nav-item-active" : "nav-item"}
                onClick={() => onNavigate(item.key)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.caption && <em>{item.caption}</em>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-brief">
          <div className="brief-orbit">
            <Bot size={18} />
          </div>
          <small>Orchestration status</small>
          <strong>4 agents online</strong>
          <div className="agent-dots">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="sidebar-footer">
          <button
            className={active === "settings" ? "nav-item nav-item-active" : "nav-item"}
            onClick={() => onNavigate("settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="user-row">
            <div className="user-avatar">AK</div>
            <div>
              <strong>Aisha Kapoor</strong>
              <small>Strategy director</small>
            </div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  onMenu,
  onNavigate,
  onNewCampaign,
}: {
  onMenu: () => void;
  onNavigate: (key: NavKey) => void;
  onNewCampaign: () => void;
}) {
  return (
    <div className="topbar">
      <button className="icon-button mobile-only" onClick={onMenu} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <button className="command-search" onClick={() => onNavigate("intelligence")}>
        <Search size={17} />
        <span>Search signals, campaigns, artifacts…</span>
        <kbd>⌘ K</kbd>
      </button>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={18} />
          <i />
        </button>
        <button className="button button-primary mobile-new" onClick={onNewCampaign}>
          <Plus size={17} />
          <span>New campaign</span>
        </button>
      </div>
    </div>
  );
}

function CommandCenter({
  signals,
  campaigns,
  artifacts,
  onNavigate,
  onNotify,
}: {
  signals: SignalType[];
  campaigns: Campaign[];
  artifacts: Artifact[];
  onNavigate: (key: NavKey) => void;
  onNotify: (message: string) => void;
}) {
  const approved = campaigns.filter((campaign) => campaign.status === "Approved").length;

  return (
    <div className="dashboard-grid">
      <section className="hero-intelligence">
        <div className="hero-copy">
          <div className="agent-pill">
            <span className="live-dot" />
            First-to-know agent
          </div>
          <p className="hero-kicker">Today’s strongest opening</p>
          <h2>Governance is becoming the new speed advantage.</h2>
          <p className="hero-description">
            Enterprise teams are no longer asking whether AI can create. They are asking whether
            every decision can be explained, approved, and improved.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => onNavigate("intelligence")}>
              Explore signal <ArrowRight size={16} />
            </button>
            <button className="text-button text-button-light" onClick={() => onNavigate("studio")}>
              Build a response
            </button>
          </div>
        </div>
        <div className="signal-visual" aria-hidden="true">
          <div className="radar-ring ring-one" />
          <div className="radar-ring ring-two" />
          <div className="radar-ring ring-three" />
          <div className="radar-core"><Zap size={22} /></div>
          <span className="signal-node node-one" />
          <span className="signal-node node-two" />
          <span className="signal-node node-three" />
        </div>
        <div className="hero-meta">
          <div><small>Signal strength</small><strong>96</strong></div>
          <div><small>Momentum</small><strong>+28%</strong></div>
          <div><small>Sources</small><strong>18</strong></div>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard icon={Signal} label="Signals ranked" value="48" change="+12 today" tone="coral" />
        <MetricCard icon={ShieldCheck} label="Brand pass rate" value="94%" change="+6% this week" tone="green" />
        <MetricCard icon={Users} label="Active creators" value="08" change="3 in review" tone="violet" />
        <MetricCard icon={Rocket} label="Assets shipped" value={String(artifacts.length + 22).padStart(2, "0")} change="7 this month" tone="blue" />
      </section>

      <section className="panel opportunity-panel">
        <PanelHeader
          eyebrow="Ranked opportunities"
          title="What deserves a response"
          action="View intelligence"
          onAction={() => onNavigate("intelligence")}
        />
        <div className="opportunity-list">
          {signals.slice(0, 3).map((signal, index) => (
            <button className="opportunity-row" key={signal.id} onClick={() => onNavigate("intelligence")}>
              <span className="rank">0{index + 1}</span>
              <div>
                <div className="row-title">
                  <span className={`tag ${categoryClass[signal.category]}`}>{signal.category}</span>
                  <small>{signal.publishedAt}</small>
                </div>
                <strong>{signal.title}</strong>
                <p>{signal.opportunity}</p>
              </div>
              <div className="score-ring" style={{ "--score": signal.relevance } as React.CSSProperties}>
                <span>{signal.relevance}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="panel campaign-panel">
        <PanelHeader
          eyebrow="Work in motion"
          title="Campaign pipeline"
          action="Open creator hub"
          onAction={() => onNavigate("creators")}
        />
        <div className="pipeline-summary">
          <div>
            <span className="pipeline-number">{campaigns.length}</span>
            <small>Active campaigns</small>
          </div>
          <div className="pipeline-bar">
            <span style={{ width: `${Math.max(12, (approved / campaigns.length) * 100)}%` }} />
          </div>
          <small>{approved} approved</small>
        </div>
        <div className="campaign-mini-list">
          {campaigns.slice(0, 3).map((campaign) => (
            <button key={campaign.id} onClick={() => onNavigate("creators")}>
              <div className="campaign-icon"><Target size={17} /></div>
              <div>
                <strong>{campaign.name}</strong>
                <small>{campaign.creator}</small>
              </div>
              <span className={`status ${statusClass[campaign.status]}`}>{campaign.status}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <PanelHeader eyebrow="System trail" title="Recent activity" />
        <div className="activity-list">
          {activity.map((item, index) => (
            <div key={item.action}>
              <span className="activity-icon">{index === 1 ? <ShieldCheck size={15} /> : <Activity size={15} />}</span>
              <div><strong>{item.action}</strong><small>{item.detail}</small></div>
              <time>{item.time}</time>
            </div>
          ))}
        </div>
        <button className="button button-secondary full-button" onClick={() => onNotify("Audit log is ready for export.")}>
          View audit trail
        </button>
      </section>

      <section className="panel quick-panel">
        <PanelHeader eyebrow="Move faster" title="Quick actions" />
        <div className="quick-grid">
          <button onClick={() => onNavigate("intelligence")}><span><Globe2 size={19} /></span><strong>Scan a market</strong><small>Find a new opening</small></button>
          <button onClick={() => onNavigate("brand")}><span><ShieldCheck size={19} /></span><strong>Check content</strong><small>Run brand guardrails</small></button>
          <button onClick={() => onNavigate("creators")}><span><Users size={19} /></span><strong>Build a brief</strong><small>Open creator territory</small></button>
          <button onClick={() => onNavigate("studio")}><span><WandSparkles size={19} /></span><strong>Create an asset</strong><small>Start in the studio</small></button>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  tone,
}: {
  icon: typeof Signal;
  label: string;
  value: string;
  change: string;
  tone: string;
}) {
  return (
    <div className="metric-card">
      <div className={`metric-icon metric-${tone}`}><Icon size={18} /></div>
      <small>{label}</small>
      <div><strong>{value}</strong><span><TrendingUp size={13} /> {change}</span></div>
    </div>
  );
}

function PanelHeader({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="panel-header">
      <div><small>{eyebrow}</small><h3>{title}</h3></div>
      {action && <button className="text-button" onClick={onAction}>{action}<ArrowRight size={14} /></button>}
    </div>
  );
}

function Intelligence({
  signals,
  setSignals,
  onPromote,
  onNotify,
}: {
  signals: SignalType[];
  setSignals: (signals: SignalType[]) => void;
  onPromote: (signal: SignalType) => void;
  onNotify: (message: string) => void;
}) {
  const [query, setQuery] = useState("enterprise AI marketing creator economy");
  const [filter, setFilter] = useState<"All" | SignalType["category"]>("All");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<SignalType>(signals[0]);
  const [mode, setMode] = useState<"demo" | "connected" | "fallback">("demo");

  const visible = filter === "All" ? signals : signals.filter((signal) => signal.category === filter);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await response.json()) as { signals: SignalType[]; mode: typeof mode };
      setSignals(data.signals);
      setSelected(data.signals[0]);
      setMode(data.mode);
      onNotify(data.mode === "connected" ? "Live market scan complete." : "Demo intelligence scan complete.");
    } catch {
      onNotify("The scan could not complete. Existing signals are still available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-grid intelligence-layout">
      <section className="panel intel-toolbar">
        <form
          className="intel-search"
          onSubmit={(event) => {
            event.preventDefault();
            void refresh();
          }}
        >
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Market scan query" />
          <button className="button button-primary" disabled={loading}>
            {loading ? <LoaderCircle className="spin" size={16} /> : <RefreshCw size={16} />}
            Scan now
          </button>
        </form>
        <div className="filter-row">
          <Filter size={15} />
          {(["All", "Competitor", "Culture", "Customer", "Platform"] as const).map((item) => (
            <button className={filter === item ? "filter-active" : ""} key={item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
          <span className={`provider-mode mode-${mode}`}>
            <span /> {mode === "connected" ? "Live sources" : "Demo sources"}
          </span>
        </div>
      </section>

      <section className="panel signal-list-panel">
        <PanelHeader eyebrow={`${visible.length} ranked signals`} title="Signal queue" />
        <div className="signal-list">
          {visible.map((signal) => (
            <button
              key={signal.id}
              onClick={() => setSelected(signal)}
              className={selected?.id === signal.id ? "signal-list-item selected" : "signal-list-item"}
            >
              <div className="signal-score">{signal.relevance}</div>
              <div>
                <span className={`tag ${categoryClass[signal.category]}`}>{signal.category}</span>
                <strong>{signal.title}</strong>
                <small>{signal.source} · {signal.publishedAt}</small>
              </div>
              <ChevronDown size={16} />
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section className="panel signal-detail">
          <div className="detail-topline">
            <span className={`tag ${categoryClass[selected.category]}`}>{selected.category}</span>
            <button className="icon-button" onClick={() => onNotify("Signal saved to your watchlist.")} aria-label="More options">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <p className="detail-source"><Globe2 size={14} /> {selected.source} · {selected.publishedAt}</p>
          <h2>{selected.title}</h2>
          <p className="detail-summary">{selected.summary}</p>

          <div className="signal-metrics">
            <div><CircleGauge size={17} /><span><small>Relevance</small><strong>{selected.relevance}/100</strong></span></div>
            <div><Flame size={17} /><span><small>Momentum</small><strong>{selected.momentum}/100</strong></span></div>
          </div>

          <div className="opportunity-callout">
            <span><Lightbulb size={18} /></span>
            <div><small>Strategic opening</small><p>{selected.opportunity}</p></div>
          </div>

          <div className="tag-cloud">
            {selected.tags.map((tag) => <span key={tag}>#{tag.replaceAll(" ", "-")}</span>)}
          </div>

          <button className="button button-primary full-button" onClick={() => onPromote(selected)}>
            <Rocket size={16} /> Turn into campaign
          </button>
        </section>
      )}
    </div>
  );
}

function BrandSystem({
  guardrails,
  setGuardrails,
  onNotify,
}: {
  guardrails: Guardrail[];
  setGuardrails: React.Dispatch<React.SetStateAction<Guardrail[]>>;
  onNotify: (message: string) => void;
}) {
  const [newRule, setNewRule] = useState("");
  const [category, setCategory] = useState<Guardrail["category"]>("Voice");
  const [testContent, setTestContent] = useState(
    "BaronOS turns live signals and brand truth into governed campaigns that enterprise teams can explain, approve, and improve.",
  );
  const result = useMemo(() => scoreContent(testContent, guardrails), [guardrails, testContent]);

  const addRule = (event: FormEvent) => {
    event.preventDefault();
    if (!newRule.trim()) return;
    setGuardrails((current) => [
      ...current,
      { id: uid("gr"), category, rule: newRule.trim(), severity: "Required", active: true },
    ]);
    setNewRule("");
    onNotify("Guardrail added to the active brand system.");
  };

  return (
    <div className="brand-layout">
      <section className="panel brand-profile">
        <div className="brand-profile-top">
          <div className="large-brand-mark">RB</div>
          <div>
            <span className="status status-green">Active system</span>
            <h2>Red Baron</h2>
            <p>Strategic, provocative, evidence-led.</p>
          </div>
          <button className="button button-secondary" onClick={() => onNotify("Brand document upload is ready. Connect Supabase Storage for production files.")}>
            <Upload size={16} /> Add artifact
          </button>
        </div>
        <div className="brand-stats">
          <div><strong>{guardrails.length}</strong><small>Guardrails</small></div>
          <div><strong>12</strong><small>Source artifacts</small></div>
          <div><strong>v2.4</strong><small>System version</small></div>
          <div><strong>Jul 26</strong><small>Last trained</small></div>
        </div>
      </section>

      <section className="panel rules-panel">
        <PanelHeader eyebrow="Operational context" title="Active guardrails" />
        <form className="rule-form" onSubmit={addRule}>
          <select value={category} onChange={(event) => setCategory(event.target.value as Guardrail["category"])}>
            <option>Voice</option>
            <option>Claim</option>
            <option>Compliance</option>
            <option>Audience</option>
            <option>Anti-example</option>
          </select>
          <input
            value={newRule}
            onChange={(event) => setNewRule(event.target.value)}
            placeholder="Add a specific rule or anti-example…"
          />
          <button className="button button-primary" disabled={!newRule.trim()}><Plus size={16} /> Add</button>
        </form>
        <div className="rules-list">
          {guardrails.map((guardrail) => (
            <div className={guardrail.active ? "rule-row" : "rule-row rule-disabled"} key={guardrail.id}>
              <button
                className={guardrail.active ? "toggle toggle-on" : "toggle"}
                onClick={() =>
                  setGuardrails((current) =>
                    current.map((item) => item.id === guardrail.id ? { ...item, active: !item.active } : item),
                  )
                }
                aria-label={`${guardrail.active ? "Disable" : "Enable"} rule`}
              >
                <span />
              </button>
              <span className={`rule-type rule-${guardrail.category.toLowerCase().replace("-example", "")}`}>
                {guardrail.category}
              </span>
              <p>{guardrail.rule}</p>
              <span className={guardrail.severity === "Required" ? "required" : "preferred"}>{guardrail.severity}</span>
              <button
                className="icon-button danger-on-hover"
                onClick={() => setGuardrails((current) => current.filter((item) => item.id !== guardrail.id))}
                aria-label="Delete rule"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="panel checker-panel">
        <PanelHeader eyebrow="Preflight check" title="Test content against the brand" />
        <textarea value={testContent} onChange={(event) => setTestContent(event.target.value)} />
        <div className="checker-result">
          <div className="large-score" style={{ "--score": result.score } as React.CSSProperties}>
            <strong>{result.score}</strong><small>Brand fit</small>
          </div>
          <div className="check-list">
            {result.checks.map((check) => (
              <div key={check.label}>
                {check.passed ? <CheckCircle2 className="pass" size={17} /> : <X className="fail" size={17} />}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </div>
        {result.genericHits.length > 0 && (
          <div className="warning-callout">Remove generic phrases: {result.genericHits.join(", ")}</div>
        )}
      </section>
    </div>
  );
}

function CreatorHub({
  campaigns,
  setCampaigns,
  onNew,
  onNotify,
}: {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  onNew: () => void;
  onNotify: (message: string) => void;
}) {
  const [selected, setSelected] = useState(campaigns[0]?.id);
  const [briefInputs, setBriefInputs] = useState({
    goal: "Position governed AI as a growth advantage",
    audience: "Enterprise marketing leaders",
    mustInclude: "approval trail, human strategy, material partnership disclosure",
    avoid: "AI replaces people, scripted creator language",
  });
  const [brief, setBrief] = useState(() => createCampaignBrief(briefInputs));
  const current = campaigns.find((campaign) => campaign.id === selected) ?? campaigns[0];

  const advance = () => {
    if (!current) return;
    const flow: Campaign["status"][] = ["Draft", "Brand review", "Creator review", "Approved"];
    const next = flow[Math.min(flow.indexOf(current.status) + 1, flow.length - 1)];
    setCampaigns((items) =>
      items.map((item) =>
        item.id === current.id
          ? { ...item, status: next, progress: next === "Approved" ? 100 : item.progress + 18 }
          : item,
      ),
    );
    onNotify(next === "Approved" ? "Campaign approved. Decision recorded." : `Campaign moved to ${next.toLowerCase()}.`);
  };

  return (
    <div className="creator-layout">
      <section className="panel campaign-roster">
        <div className="panel-header">
          <div><small>{campaigns.length} workflows</small><h3>Campaigns</h3></div>
          <button className="button button-primary button-compact" onClick={onNew}><Plus size={15} /> New</button>
        </div>
        <div className="roster-list">
          {campaigns.map((campaign) => (
            <button
              key={campaign.id}
              className={current?.id === campaign.id ? "roster-item active" : "roster-item"}
              onClick={() => setSelected(campaign.id)}
            >
              <div className="roster-icon"><Target size={17} /></div>
              <div>
                <strong>{campaign.name}</strong>
                <small>{campaign.creator}</small>
                <div className="mini-progress"><span style={{ width: `${campaign.progress}%` }} /></div>
              </div>
              <span className={`status ${statusClass[campaign.status]}`}>{campaign.status}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel campaign-workflow">
        {current && (
          <>
            <div className="campaign-titlebar">
              <div>
                <span className={`status ${statusClass[current.status]}`}>{current.status}</span>
                <h2>{current.name}</h2>
                <p>{current.objective}</p>
              </div>
              <button className="button button-primary" onClick={advance} disabled={current.status === "Approved"}>
                {current.status === "Approved" ? <Check size={16} /> : <ArrowRight size={16} />}
                {current.status === "Approved" ? "Approved" : "Advance review"}
              </button>
            </div>
            <div className="workflow-steps">
              {(["Draft", "Brand review", "Creator review", "Approved"] as const).map((step, index, all) => {
                const currentIndex = all.indexOf(current.status);
                const complete = index <= currentIndex;
                return (
                  <div className={complete ? "workflow-step complete" : "workflow-step"} key={step}>
                    <span>{index < currentIndex ? <Check size={14} /> : index + 1}</span>
                    <small>{step}</small>
                  </div>
                );
              })}
            </div>
            <div className="campaign-facts">
              <div><small>Audience</small><strong>{current.audience}</strong></div>
              <div><small>Channels</small><strong>{current.channels.join(", ")}</strong></div>
              <div><small>Creator</small><strong>{current.creator}</strong></div>
              <div><small>Due</small><strong>{current.dueDate}</strong></div>
            </div>
          </>
        )}

        <div className="brief-builder">
          <div className="brief-builder-head">
            <div><small>Agent-assisted translation</small><h3>Creator brief builder</h3></div>
            <span><Sparkles size={15} /> Guardrails active</span>
          </div>
          <div className="brief-form-grid">
            <label>Campaign goal<input value={briefInputs.goal} onChange={(event) => setBriefInputs({ ...briefInputs, goal: event.target.value })} /></label>
            <label>Audience situation<input value={briefInputs.audience} onChange={(event) => setBriefInputs({ ...briefInputs, audience: event.target.value })} /></label>
            <label>Non-negotiables<textarea value={briefInputs.mustInclude} onChange={(event) => setBriefInputs({ ...briefInputs, mustInclude: event.target.value })} /></label>
            <label>Avoid<textarea value={briefInputs.avoid} onChange={(event) => setBriefInputs({ ...briefInputs, avoid: event.target.value })} /></label>
          </div>
          <button
            className="button button-dark"
            onClick={() => {
              setBrief(createCampaignBrief(briefInputs));
              onNotify("Creator-native brief regenerated.");
            }}
          >
            <Sparkles size={16} /> Generate creator view
          </button>
        </div>
      </section>

      <section className="panel creator-preview">
        <div className="preview-heading">
          <div><span className="status status-violet">Creator view</span><h3>{brief.title}</h3></div>
          <button className="icon-button" onClick={() => { void navigator.clipboard?.writeText(JSON.stringify(brief, null, 2)); onNotify("Brief copied."); }}><Copy size={16} /></button>
        </div>
        <div className="creator-note">
          <div className="creator-avatar">M</div>
          <p><strong>Hi Maya—</strong> here’s the territory. The idea is open; the boundaries are clear.</p>
        </div>
        <BriefBlock label="The tension" text={brief.tension} />
        <BriefBlock label="Single-minded idea" text={brief.singleMindedIdea} accent />
        <div className="brief-block">
          <small>Creative territory</small>
          <ul>{brief.creativeTerritory.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="brief-block">
          <small>Non-negotiables</small>
          <ul className="check-bullets">{brief.nonNegotiables.map((item) => <li key={item}><Check size={13} /> {item}</li>)}</ul>
        </div>
        <BriefBlock label="Please avoid" text={brief.avoid} />
        <div className="approval-footer">
          <ShieldCheck size={18} />
          <span><strong>Brand-safe by design</strong><small>All required guardrails are present.</small></span>
        </div>
      </section>
    </div>
  );
}

function BriefBlock({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className={accent ? "brief-block brief-accent" : "brief-block"}>
      <small>{label}</small>
      <p>{text}</p>
    </div>
  );
}

function CampaignStudio({
  guardrails,
  artifacts,
  setArtifacts,
  onNotify,
}: {
  guardrails: Guardrail[];
  artifacts: Artifact[];
  setArtifacts: React.Dispatch<React.SetStateAction<Artifact[]>>;
  onNotify: (message: string) => void;
}) {
  const [prompt, setPrompt] = useState("Create a landing page that positions governed originality as the alternative to AI slop.");
  const [result, setResult] = useState({
    type: "Landing page",
    title: defaultGeneratedContent.headline,
    content: [
      defaultGeneratedContent.subhead,
      ...defaultGeneratedContent.sections.map((section) => `${section.eyebrow}\n${section.title}\n${section.body}`),
    ].join("\n\n"),
  });
  const [view, setView] = useState<"preview" | "content">("preview");
  const [loading, setLoading] = useState(false);
  const assessment = useMemo(() => scoreContent(result.content, guardrails), [guardrails, result.content]);

  const generate = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          guardrails: guardrails.filter((rule) => rule.active).map((rule) => rule.rule),
        }),
      });
      const data = (await response.json()) as { type: string; title: string; content: string; mode: string };
      setResult(data);
      onNotify(data.mode === "connected" ? "Asset generated with the connected model." : "Asset generated in demo mode.");
    } catch {
      onNotify("Generation failed. Your last result is unchanged.");
    } finally {
      setLoading(false);
    }
  };

  const saveArtifact = () => {
    const artifact: Artifact = {
      id: uid("art"),
      name: result.title,
      type: result.type as Artifact["type"],
      createdAt: "Just now",
      status: "Ready",
      score: assessment.score,
      content: result.content,
    };
    setArtifacts((current) => [artifact, ...current]);
    onNotify("Artifact saved to the campaign library.");
  };

  return (
    <div className="studio-layout">
      <section className="studio-console">
        <div className="console-top">
          <div className="agent-pill agent-pill-dark"><span className="live-dot" /> Execution agent</div>
          <h2>What should we build?</h2>
          <p>Strategy and brand constraints are already in context.</p>
        </div>
        <form className="studio-prompt" onSubmit={generate}>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <div>
            <span><ShieldCheck size={14} /> {guardrails.filter((rule) => rule.active).length} guardrails attached</span>
            <button className="button button-light" disabled={loading}>
              {loading ? <LoaderCircle className="spin" size={17} /> : <Send size={17} />}
              Generate
            </button>
          </div>
        </form>
        <div className="prompt-suggestions">
          <small>Try a starter</small>
          <button onClick={() => setPrompt("Write a three-email launch sequence for enterprise marketing leaders.")}>3-email launch</button>
          <button onClick={() => setPrompt("Create a LinkedIn creator concept about why better prompts reveal better strategy.")}>LinkedIn concept</button>
          <button onClick={() => setPrompt("Build a creator brief for a governed originality campaign.")}>Creator brief</button>
        </div>
      </section>

      <section className="panel output-panel">
        <div className="output-toolbar">
          <div>
            <span className="status status-green">Generated</span>
            <strong>{result.type}</strong>
          </div>
          <div className="view-switcher">
            <button className={view === "preview" ? "active" : ""} onClick={() => setView("preview")}><Eye size={15} /> Preview</button>
            <button className={view === "content" ? "active" : ""} onClick={() => setView("content")}><Code2 size={15} /> Content</button>
          </div>
          <div className="output-actions">
            <button className="icon-button" onClick={() => { void navigator.clipboard?.writeText(result.content); onNotify("Content copied."); }}><Copy size={16} /></button>
            <button className="button button-primary button-compact" onClick={saveArtifact}><Plus size={15} /> Save</button>
          </div>
        </div>

        {view === "preview" ? (
          <div className="microsite-preview">
            <nav><div className="preview-logo">B<span>OS</span></div><span>Intelligence</span><span>Brand system</span><button>Request a walkthrough</button></nav>
            <div className="preview-hero">
              <span>Strategy, in motion.</span>
              <h2>{result.title}</h2>
              <p>{result.content.split("\n\n")[0]}</p>
              <button>See the workflow <ArrowRight size={15} /></button>
            </div>
            <div className="preview-proof">
              {result.content.split("\n\n").slice(1, 4).map((block, index) => (
                <div key={`${block}-${index}`}>
                  <small>0{index + 1}</small>
                  <p>{block}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <pre className="content-output">{result.content}</pre>
        )}
      </section>

      <aside className="studio-inspector">
        <section className="panel">
          <PanelHeader eyebrow="Live preflight" title="Brand assurance" />
          <div className="inspector-score">
            <div className="large-score" style={{ "--score": assessment.score } as React.CSSProperties}><strong>{assessment.score}</strong><small>Brand fit</small></div>
            <p>Ready for human review. All required brand constraints are active.</p>
          </div>
          <div className="check-list compact">
            {assessment.checks.map((check) => (
              <div key={check.label}>{check.passed ? <CheckCircle2 className="pass" size={16} /> : <X className="fail" size={16} />}<span>{check.label}</span></div>
            ))}
          </div>
        </section>
        <section className="panel artifact-library">
          <PanelHeader eyebrow={`${artifacts.length} saved`} title="Recent artifacts" />
          {artifacts.slice(0, 4).map((artifact) => (
            <button key={artifact.id} onClick={() => { setResult({ type: artifact.type, title: artifact.name, content: artifact.content }); onNotify("Artifact opened in the studio."); }}>
              <span><FileText size={16} /></span>
              <div><strong>{artifact.name}</strong><small>{artifact.type} · {artifact.score}% fit</small></div>
              <ArrowRight size={14} />
            </button>
          ))}
        </section>
      </aside>
    </div>
  );
}

function WorkspaceSettings({
  onReset,
  onNotify,
}: {
  onReset: () => void;
  onNotify: (message: string) => void;
}) {
  const [provider, setProvider] = useState("Gemini 2.5 Flash");
  const [approvals, setApprovals] = useState(true);

  return (
    <div className="settings-layout">
      <section className="panel settings-card">
        <PanelHeader eyebrow="Workspace" title="Client context" />
        <label>Workspace name<input defaultValue="Red Baron" /></label>
        <label>Primary market<input defaultValue="India / Global enterprise" /></label>
        <label>Positioning thesis<textarea defaultValue="AI execution is abundant. Strategy, governed originality, and first-to-know intelligence are the scarce layer." /></label>
        <button className="button button-primary" onClick={() => onNotify("Workspace settings saved locally.")}>Save changes</button>
      </section>
      <section className="panel settings-card">
        <PanelHeader eyebrow="Free-tier adapters" title="Providers" />
        <label>Generation model<select value={provider} onChange={(event) => setProvider(event.target.value)}><option>Gemini 2.5 Flash</option><option>Deterministic demo engine</option></select></label>
        <div className="connection-row"><span><Bot size={18} /></span><div><strong>Gemini API</strong><small>Set GEMINI_API_KEY in the deployment environment</small></div><span className="status status-neutral">Optional</span></div>
        <div className="connection-row"><span><Globe2 size={18} /></span><div><strong>Tavily search</strong><small>Set TAVILY_API_KEY for live market scans</small></div><span className="status status-neutral">Optional</span></div>
        <div className="connection-row"><span><Network size={18} /></span><div><strong>Supabase</strong><small>Production persistence adapter documented in SPEC.md</small></div><span className="status status-neutral">Optional</span></div>
      </section>
      <section className="panel settings-card">
        <PanelHeader eyebrow="Governance" title="Human approvals" />
        <div className="setting-toggle">
          <div><strong>Require approval before publish</strong><small>Agents can prepare work; a named human must release it.</small></div>
          <button className={approvals ? "toggle toggle-on" : "toggle"} onClick={() => setApprovals(!approvals)}><span /></button>
        </div>
        <div className="setting-toggle">
          <div><strong>Record decision rationale</strong><small>Store the rule, evidence, reviewer, and timestamp.</small></div>
          <button className="toggle toggle-on"><span /></button>
        </div>
        <div className="setting-toggle">
          <div><strong>Block unsupported claims</strong><small>Fail preflight when a quantified claim has no source.</small></div>
          <button className="toggle toggle-on"><span /></button>
        </div>
      </section>
      <section className="panel settings-card danger-card">
        <PanelHeader eyebrow="Demo controls" title="Reset local workspace" />
        <p>Restore the seeded campaigns, artifacts, and brand rules. This only affects this browser.</p>
        <button className="button button-danger" onClick={onReset}>Reset demo data</button>
      </section>
    </div>
  );
}

function NewCampaignModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (campaign: Campaign) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    objective: "",
    audience: "Enterprise marketing leaders",
    creator: "Unassigned",
  });

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="modal"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          if (!form.name.trim() || !form.objective.trim()) return;
          onCreate({
            id: uid("camp"),
            name: form.name.trim(),
            objective: form.objective.trim(),
            audience: form.audience.trim(),
            channels: ["LinkedIn"],
            creator: form.creator.trim(),
            status: "Draft",
            dueDate: "Aug 12",
            progress: 12,
          });
        }}
      >
        <div className="modal-heading">
          <div><small>New workflow</small><h2>Create a campaign</h2><p>Start with the strategic job, not the asset list.</p></div>
          <button type="button" className="icon-button" onClick={onClose}><X size={18} /></button>
        </div>
        <label>Campaign name<input autoFocus value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Proof, not promises" /></label>
        <label>Business objective<textarea value={form.objective} onChange={(event) => setForm({ ...form, objective: event.target.value })} placeholder="What should change in the market or customer?" /></label>
        <div className="modal-grid">
          <label>Audience situation<input value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} /></label>
          <label>Creator / owner<input value={form.creator} onChange={(event) => setForm({ ...form, creator: event.target.value })} /></label>
        </div>
        <div className="modal-actions">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button className="button button-primary" disabled={!form.name.trim() || !form.objective.trim()}>
            Create campaign <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
