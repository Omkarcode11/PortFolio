import { useState } from "react";

interface ArchitectureNode {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  icon: string;
  color: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  command: string;
  output: string;
  metric: string;
  metricLabel: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: "ai",
    name: "AI & RAG Engine",
    badge: "LLM Orchestration",
    tagline: "Vector Search • Claude & OpenAI • Sub-100ms Streaming",
    icon: "✦",
    color: "from-cyan-500/20 to-blue-500/10",
    glowColor: "rgba(34, 211, 238, 0.25)",
    borderColor: "border-cyan-500/40",
    textColor: "text-cyan-400",
    command: 'ai.streamQuery("Analyze catalog & synthesize custom bundle")',
    output: "✓ Vector similarity match in 14ms • Streaming token response",
    metric: "14ms",
    metricLabel: "Vector Match",
  },
  {
    id: "shopify",
    name: "Shopify Storefront",
    badge: "Sub-Second LCP",
    tagline: "Liquid • Theme App Extensions • Webhook Ingestion",
    icon: "🛍️",
    color: "from-emerald-500/20 to-teal-500/10",
    glowColor: "rgba(52, 211, 153, 0.25)",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-400",
    command: 'shopify.renderThemeExtensions({ mobileLCP: "<1s" })',
    output: "✓ Mobile load time: 3.2s → 0.92s (<1s threshold met)",
    metric: "< 1s",
    metricLabel: "Load Speed",
  },
  {
    id: "backend",
    name: "High-Throughput API",
    badge: "-60% Latency",
    tagline: "Node.js • Redis Distributed Cache • PostgreSQL & Mongo",
    icon: "⚡",
    color: "from-blue-500/20 to-indigo-500/10",
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-400",
    command: 'cache.getOrSet("catalog:variants", { ttl: 3600 })',
    output: "✓ Redis distributed cache hit (1.4ms) • 60% latency drop",
    metric: "1.4ms",
    metricLabel: "Redis Cache Hit",
  },
  {
    id: "automation",
    name: "Workflow Engine",
    badge: "85% Saved",
    tagline: "Puppeteer • BullMQ Queues • WhatsApp Cloud API",
    icon: "⚙️",
    color: "from-violet-500/20 to-purple-500/10",
    glowColor: "rgba(139, 92, 246, 0.25)",
    borderColor: "border-violet-500/40",
    textColor: "text-violet-400",
    command: 'queue.dispatchJob("sync_leads_and_invoices_daily")',
    output: "✓ 20,400+ entries validated & synced across external APIs",
    metric: "20k+",
    metricLabel: "Records Synced",
  },
];

export default function ArchitectureVisualization() {
  const [selectedId, setSelectedId] = useState<string>("ai");
  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Outer Glow Wrapper */}
      <div className="relative rounded-3xl p-px bg-linear-to-b from-white/20 via-white/5 to-transparent dark:from-slate-700/60 dark:via-slate-800/40 dark:to-transparent shadow-2xl">
        
        {/* Main Card */}
        <div className="relative rounded-[23px] bg-(--bg-card)/95 backdrop-blur-2xl border border-(--border-color) overflow-hidden p-4 sm:p-6 space-y-4 sm:space-y-5">
          
          {/* Top Bar: Title & Live Connection Indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-(--border-color)">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
              <span className="text-[11px] font-mono text-(--text-tertiary) ml-1.5 font-medium">
                system.architecture.live
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>99.9% UPTIME</span>
            </div>
          </div>

          {/* Section 1: Ingestion Layer (Visual Pill) */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-(--bg-secondary) border border-(--border-color) text-xs">
            <div className="flex items-center gap-2">
              <span className="text-brand-blue font-bold">●</span>
              <span className="font-semibold text-(--text-primary)">Client Requests</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-(--text-tertiary)">
              <span>Webhooks</span>
              <span>•</span>
              <span>Storefront</span>
              <span>•</span>
              <span>REST / WS</span>
            </div>
          </div>

          {/* Connecting Data Flow Indicator */}
          <div className="flex justify-center -my-2 relative z-10" aria-hidden="true">
            <div className="w-px h-4 bg-linear-to-b from-brand-blue to-brand-cyan" />
          </div>

          {/* Section 2: Interactive 4-Node Core Grid */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-(--text-tertiary) mb-2 flex items-center justify-between">
              <span>Core Application Clusters</span>
              <span className="text-brand-blue text-[10px] lowercase font-normal">tap to inspect</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {NODES.map((node) => {
                const isActive = node.id === selectedId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className={`relative p-3 rounded-xl sm:rounded-2xl text-left transition-all cursor-pointer border ${
                      isActive
                        ? `${node.borderColor} bg-linear-to-br ${node.color} shadow-lg shadow-brand-blue/10 scale-[1.02]`
                        : "border-(--border-color) bg-(--bg-secondary)/60 hover:bg-(--bg-secondary) hover:border-(--border-color-hover)"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-base sm:text-lg">{node.icon}</span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? `${node.textColor} bg-white/10 dark:bg-black/30 font-bold`
                          : "text-(--text-tertiary) bg-(--bg-card)"
                      }`}>
                        {node.badge}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-(--text-primary) leading-snug">
                      {node.name}
                    </div>

                    <div className="text-[10px] text-(--text-secondary) mt-0.5 truncate">
                      {node.tagline.split("•")[0].trim()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connecting Data Flow Indicator */}
          <div className="flex justify-center -my-2 relative z-10" aria-hidden="true">
            <div className="w-px h-4 bg-linear-to-b from-brand-cyan to-brand-violet" />
          </div>

          {/* Section 3: Data & Cache Foundation */}
          <div className="px-3.5 py-2.5 rounded-xl bg-(--bg-secondary) border border-(--border-color) flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <div>
                <span className="font-bold text-(--text-primary)">Persistent Storage &amp; Cache</span>
                <div className="text-[10px] text-(--text-secondary)">PostgreSQL • MongoDB • Redis Distributed</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono font-bold text-emerald-500 dark:text-emerald-400">&lt; 15ms</span>
              <div className="text-[9px] text-(--text-tertiary)">Query P99</div>
            </div>
          </div>

          {/* Section 4: Live Simulated Command Terminal */}
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1 overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800/80 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Active Telemetry: <strong className="text-white">{activeNode.name}</strong></span>
              </span>
              <span className="text-emerald-400 font-bold">{activeNode.metric} {activeNode.metricLabel}</span>
            </div>

            <div className="flex items-center gap-1.5 text-cyan-300 truncate">
              <span className="text-slate-500">❯</span>
              <span className="truncate">{activeNode.command}</span>
            </div>

            <div className="text-emerald-400 text-[10px] truncate pl-3">
              {activeNode.output}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
