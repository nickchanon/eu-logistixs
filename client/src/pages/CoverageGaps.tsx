import { useMemo } from "react";
import { PUBLICATIONS, FIRMS, COUNTRIES, FIRM_COLORS, FIRM_SHORT, countryFlag, Firm, Country } from "../lib/store";
import { AlertTriangle, CheckCircle, TrendingUp, Search } from "lucide-react";

export default function CoverageGaps() {
  const matrix = useMemo(() => {
    const m: Record<Country, Record<Firm, number>> = {} as any;
    COUNTRIES.forEach(c => {
      m[c] = {} as any;
      FIRMS.forEach(f => { m[c][f] = 0; });
    });
    PUBLICATIONS.forEach(p => { m[p.country][p.firm]++; });
    return m;
  }, []);

  const maxCount = useMemo(() => Math.max(...COUNTRIES.flatMap(c => FIRMS.map(f => matrix[c][f]))), [matrix]);

  function cellColor(count: number, firm: Firm): string {
    if (count === 0) return "bg-slate-800 text-slate-600";
    const intensity = Math.round(30 + (count / maxCount) * 220);
    const hex = intensity.toString(16).padStart(2, "0");
    return `text-white`;
  }

  // Gap analysis
  const zeroGaps = COUNTRIES.flatMap(c => FIRMS.filter(f => matrix[c][f] === 0).map(f => ({ country: c, firm: f })));
  const savillsGaps = COUNTRIES.filter(c => matrix[c]["Savills"] === 0);
  const competitorOnlyCountries = COUNTRIES.filter(c => {
    const hasSavills = matrix[c]["Savills"] > 0;
    const hasCompetitor = FIRMS.filter(f => f !== "Savills").some(f => matrix[c][f] > 0);
    return !hasSavills && hasCompetitor;
  });
  const wellCovered = COUNTRIES.filter(c => FIRMS.every(f => matrix[c][f] > 0));
  const totalPossible = COUNTRIES.length * FIRMS.length;
  const totalCovered = COUNTRIES.flatMap(c => FIRMS.map(f => matrix[c][f] > 0 ? 1 : 0)).reduce((a, b) => a + b, 0);
  const coveragePct = Math.round((totalCovered / totalPossible) * 100);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">Coverage Gaps</h1>
        <p className="text-sm text-slate-500 mt-0.5">Identify research gaps across 11 markets × 6 firms</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Coverage Rate</div>
          <div className="text-2xl font-bold text-slate-100">{coveragePct}%</div>
          <div className="text-xs text-slate-500">{totalCovered}/{totalPossible} cells</div>
        </div>
        <div className="bg-amber-500/8 border border-amber-500/25 rounded-xl p-4">
          <div className="text-xs text-amber-500/70 uppercase tracking-wider mb-1">Savills Gaps</div>
          <div className="text-2xl font-bold text-amber-400">{savillsGaps.length}</div>
          <div className="text-xs text-amber-500/60">markets without Savills pub</div>
        </div>
        <div className="bg-red-500/8 border border-red-500/25 rounded-xl p-4">
          <div className="text-xs text-red-500/70 uppercase tracking-wider mb-1">Zero-Coverage Cells</div>
          <div className="text-2xl font-bold text-red-400">{zeroGaps.length}</div>
          <div className="text-xs text-red-500/60">country × firm combos</div>
        </div>
        <div className="bg-emerald-500/8 border border-emerald-500/25 rounded-xl p-4">
          <div className="text-xs text-emerald-500/70 uppercase tracking-wider mb-1">Full Coverage</div>
          <div className="text-2xl font-bold text-emerald-400">{wellCovered.length}</div>
          <div className="text-xs text-emerald-500/60">markets with all 6 firms</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Coverage Heatmap</div>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-800" />0</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500/40" />1-2</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500/80" />3+</div>
          </div>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left pb-2 text-slate-500 font-medium w-28">Market</th>
                {FIRMS.map(f => (
                  <th key={f} className="pb-2 text-center px-1" style={{ color: FIRM_COLORS[f] }}>
                    <div className="text-[10px] font-bold">{FIRM_SHORT[f]}</div>
                  </th>
                ))}
                <th className="pb-2 text-center px-2 text-slate-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map((c, ri) => {
                const rowTotal = FIRMS.reduce((s, f) => s + matrix[c][f], 0);
                return (
                  <tr key={c} className={ri % 2 === 0 ? "" : "bg-slate-800/20"}>
                    <td className="py-1.5 pr-3 font-medium text-slate-300">{countryFlag(c)} {c}</td>
                    {FIRMS.map(f => {
                      const count = matrix[c][f];
                      const baseColor = FIRM_COLORS[f];
                      const opacity = count === 0 ? 0 : Math.min(0.9, 0.25 + (count / Math.max(maxCount, 1)) * 0.7);
                      return (
                        <td key={f} className="py-1 px-1">
                          <div className="w-10 h-8 mx-auto rounded flex items-center justify-center text-xs font-bold transition-all"
                            style={{
                              backgroundColor: count > 0 ? `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, "0")}` : "rgba(30,41,59,0.6)",
                              color: count > 0 ? "#fff" : "#475569",
                              border: count === 0 ? "1px dashed rgba(71,85,105,0.4)" : "none"
                            }}
                            data-testid={`cell-${c}-${f}`}>
                            {count > 0 ? count : "—"}
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-1 px-2 text-center font-bold text-slate-300">{rowTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap analysis panels */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Savills opportunity gaps */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Savills Opportunity Markets</span>
          </div>
          {competitorOnlyCountries.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle size={14} />Savills has coverage in all markets where competitors publish
            </div>
          ) : (
            <div className="space-y-2">
              {competitorOnlyCountries.map(c => {
                const competitorCount = FIRMS.filter(f => f !== "Savills").reduce((s, f) => s + matrix[c][f], 0);
                const coveredBy = FIRMS.filter(f => f !== "Savills" && matrix[c][f] > 0);
                return (
                  <div key={c} className="flex items-start gap-3 p-2.5 rounded-lg bg-amber-500/8 border border-amber-500/20">
                    <span className="text-base">{countryFlag(c)}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-amber-300 text-xs">{c}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{competitorCount} competitor pub{competitorCount > 1 ? "s" : ""} · no Savills coverage</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {coveredBy.map(f => (
                          <span key={f} className="text-[9px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${FIRM_COLORS[f]}20`, color: FIRM_COLORS[f], border: `1px solid ${FIRM_COLORS[f]}40` }}>
                            {FIRM_SHORT[f]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Missing coverage alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Zero Coverage Alerts</span>
          </div>
          {zeroGaps.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle size={14} />All market × firm combinations have at least one publication
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
              {COUNTRIES.map(c => {
                const gaps = FIRMS.filter(f => matrix[c][f] === 0);
                if (gaps.length === 0) return null;
                return (
                  <div key={c} className="flex items-center gap-2 text-xs py-1.5 border-b border-slate-800/50">
                    <span>{countryFlag(c)}</span>
                    <span className="text-slate-400 w-24">{c}</span>
                    <div className="flex flex-wrap gap-1">
                      {gaps.map(f => (
                        <span key={f} className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">{FIRM_SHORT[f]}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Well covered markets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={14} className="text-emerald-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Well-Covered Markets (all 6 firms)</span>
        </div>
        {wellCovered.length === 0 ? (
          <p className="text-xs text-slate-500">No markets have full 6-firm coverage yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {wellCovered.map(c => (
              <div key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-medium">
                <span>{countryFlag(c)}</span>{c}
                <CheckCircle size={10} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
