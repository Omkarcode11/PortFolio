import * as Icons from "./icons";

interface ArchitectureVisualizationProps {
  prefersReducedMotion?: boolean;
}

export default function ArchitectureVisualization({
  prefersReducedMotion = false,
}: ArchitectureVisualizationProps) {
  return (
    <div className="relative hidden lg:block h-[580px] w-full perspective-1000 group">
      <div
        className="absolute inset-0 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500 ease-out"
        style={{
          opacity: 1,
          transform: "rotateY(-4deg) rotateX(2deg)",
        }}
      >
        {/* Main Product Engineering Console */}
        <div className="relative w-[520px] bg-(--bg-card) backdrop-blur-2xl rounded-3xl border border-(--border-color) shadow-2xl shadow-brand-blue/10 z-20 overflow-hidden">
          {/* Console Header */}
          <div className="h-12 border-b border-(--border-color) flex items-center justify-between px-6 bg-(--bg-secondary)/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs font-mono text-(--text-secondary)">
                production-stack.architecture
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Architecture Visualization Body */}
          <div className="p-6 space-y-4">
            {/* Top: AI & Commerce Entry Layer */}
            <div className="p-4 rounded-2xl bg-linear-to-r from-brand-cyan/15 via-brand-blue/15 to-brand-violet/15 border border-brand-blue/30 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-(--text-primary) flex items-center gap-2">
                    <span className="text-brand-cyan">✦</span>
                    <span>AI Integrations &amp; Shopify Commerce</span>
                  </div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">
                    LLM Agents • Storefront APIs • Webhook Ingestion
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                  Sub-second
                </span>
              </div>
            </div>

            {/* Middle: Core Services */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex flex-col justify-between group/service hover:border-brand-blue/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">
                    JS
                  </div>
                  <span className="text-[10px] font-mono text-(--text-tertiary)">Node.js API</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-(--text-primary)">
                    High-Throughput Backend
                  </div>
                  <div className="text-[10px] text-(--text-secondary) mt-0.5">
                    REST &amp; WebSockets
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex flex-col justify-between group/service hover:border-brand-violet/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center text-xs font-bold">
                    ⚡
                  </div>
                  <span className="text-[10px] font-mono text-(--text-tertiary)">Automation</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-(--text-primary)">
                    Workflow Engine
                  </div>
                  <div className="text-[10px] text-(--text-secondary) mt-0.5">
                    Puppeteer • Bull Queues
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Database & Cache */}
            <div className="p-4 rounded-2xl bg-(--bg-secondary)/80 border border-(--border-color) flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 font-bold text-xs flex items-center justify-center">
                  RD
                </div>
                <div>
                  <div className="text-xs font-bold text-(--text-primary)">
                    Redis Cache &amp; PostgreSQL
                  </div>
                  <div className="text-[10px] text-(--text-secondary)">
                    500K+ records • Latency &lt; 15ms
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400">
                99.9% Uptime
              </span>
            </div>

            {/* Terminal Live Output Simulation */}
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span>❯</span>
                <span>agent.processQuery("Analyze Shopify catalog &amp; suggest bundle")</span>
              </div>
              <div className="text-emerald-400 pl-4">
                ✓ Vector search executed (14ms) • 3 candidate variants returned
              </div>
              <div className="text-slate-400 pl-4">
                ✓ Response streamed to client with sub-100ms first token
              </div>
            </div>
          </div>
        </div>

        {/* Floating Accent Cards in 3D Perspective */}
        <div className="absolute -top-6 -right-6 px-4 py-2.5 rounded-2xl bg-(--bg-card) border border-(--border-color) shadow-xl shadow-slate-900/10 z-30 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-(--text-primary)">Shopify &lt; 1s Load Time</span>
        </div>

        <div className="absolute -bottom-6 -left-6 px-4 py-2.5 rounded-2xl bg-(--bg-card) border border-(--border-color) shadow-xl shadow-slate-900/10 z-30 flex items-center gap-2.5">
          <span className="text-brand-cyan text-sm">✦</span>
          <span className="text-xs font-bold text-(--text-primary)">AI + Automation Architect</span>
        </div>
      </div>
    </div>
  );
}
