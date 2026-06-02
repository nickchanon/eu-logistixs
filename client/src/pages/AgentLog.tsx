import { AGENT_RUNS, FIRMS, FIRM_COLORS, FIRM_SHORT, Firm } from "../lib/store";
import { Bot, CheckCircle, XCircle, Clock, TrendingUp, FileText, BarChart3 } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  if (status === "success") return (
    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
      <CheckCircle size={10} />Success
    </span>
  );
  if (status === "error") return (
    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-semibold">
      <XCircle size={10} />Error
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 font-semibold">
      <Clock size={10} />Pending
    </span>
  );
}

export default function AgentLog() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">Agent Log</h1>
        <p className="text-sm text-slate-500 mt-0.5">Research agent run history — publications collected, new entries, datapoints added</p>
      </div>

      {/* Run cards */}
      <div className="space-y-4">
        {AGENT_RUNS.map(run => (
          <div key={run.runId} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden" data-testid={`card-run-${run.runId}`}>
            {/* Run header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800 bg-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/15">
                  <Bot size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Research Run — {run.date}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    <span className="font-mono">{run.runId}</span> · Triggered by <span className="text-amber-400/70">{run.triggeredBy}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-400">{run.totals.publicationsFound}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Pubs Found</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-400">{run.totals.newPublications}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">New Pubs</div>
                </div>
              </div>
            </div>

            {/* Per-firm results */}
            <div className="p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3">Per-Firm Results</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {run.agents.map(agent => (
                  <div key={agent.firm}
                    className={`flex flex-col gap-2 p-3 rounded-lg border ${agent.firm === "Savills" ? "bg-amber-500/8 border-amber-500/20" : "bg-slate-800/60 border-slate-700/50"}`}
                    data-testid={`card-agent-${agent.firm}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: FIRM_COLORS[agent.firm as Firm] }} />
                        <span className={`text-xs font-semibold ${agent.firm === "Savills" ? "text-amber-300" : "text-slate-300"}`}>
                          {agent.firm === "Savills" ? "★ " : ""}{FIRM_SHORT[agent.firm as Firm] ?? agent.firm}
                        </span>
                      </div>
                      <StatusBadge status={agent.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-slate-900/50 rounded p-1.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 mb-0.5">
                          <FileText size={9} className="text-slate-500" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Found</span>
                        </div>
                        <div className="text-sm font-bold text-slate-200">{agent.publicationsFound}</div>
                      </div>
                      <div className="bg-slate-900/50 rounded p-1.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 mb-0.5">
                          <FileText size={9} className="text-emerald-500" />
                          <span className="text-[9px] text-emerald-600 uppercase tracking-wider">New</span>
                        </div>
                        <div className="text-sm font-bold text-emerald-400">{agent.newPublications}</div>
                      </div>
                      <div className="bg-slate-900/50 rounded p-1.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 mb-0.5">
                          <TrendingUp size={9} className="text-amber-500" />
                          <span className="text-[9px] text-amber-600 uppercase tracking-wider">Yields</span>
                        </div>
                        <div className="text-sm font-bold text-amber-400">{agent.newYieldDatapoints}</div>
                      </div>
                      <div className="bg-slate-900/50 rounded p-1.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 mb-0.5">
                          <BarChart3 size={9} className="text-blue-500" />
                          <span className="text-[9px] text-blue-600 uppercase tracking-wider">Rents</span>
                        </div>
                        <div className="text-sm font-bold text-blue-400">{agent.newRentDatapoints}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Run totals bar */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-800/20 flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FileText size={12} className="text-slate-600" />
                <span>Total pubs found:</span><span className="text-slate-300 font-semibold">{run.totals.publicationsFound}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle size={12} className="text-emerald-600" />
                <span>New publications:</span><span className="text-emerald-400 font-semibold">{run.totals.newPublications}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <TrendingUp size={12} className="text-amber-600" />
                <span>Yield datapoints:</span>
                <span className="text-amber-400 font-semibold">{run.agents.reduce((s, a) => s + a.newYieldDatapoints, 0)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <BarChart3 size={12} className="text-blue-600" />
                <span>Rent datapoints:</span>
                <span className="text-blue-400 font-semibold">{run.agents.reduce((s, a) => s + a.newRentDatapoints, 0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schema reference */}
      <div className="mt-6 bg-slate-900/50 border border-slate-800/50 rounded-xl p-4">
        <div className="text-[10px] text-slate-600 font-mono leading-loose">
          <div className="text-slate-500 font-bold mb-1">// Agent run schema (mirrors window.__EU_RUNS_DATA__)</div>
          <div>{"{ runId: 'ISO timestamp', date: 'YYYY-MM-DD', triggeredBy: 'manual|scheduled',"}</div>
          <div>{"  agents: [{ firm, status, publicationsFound, newPublications, newYieldDatapoints, newRentDatapoints }],"}</div>
          <div>{"  totals: { publicationsFound, newPublications } }"}</div>
        </div>
      </div>
    </div>
  );
}
