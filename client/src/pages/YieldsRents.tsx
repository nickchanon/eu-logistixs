import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  TIME_SERIES, WEEKLY_SUMMARIES, FIRMS, COUNTRIES, FIRM_COLORS, FIRM_SHORT,
  firmBadgeClass, outlookLabel, countryFlag, Country, Firm
} from "../lib/store";
import { ChevronDown, ChevronRight } from "lucide-react";

const QUARTERS = ["Q1 2024","Q2 2024","Q3 2024","Q4 2024","Q1 2025","Q2 2025","Q3 2025","Q4 2025","Q1 2026","Q2 2026"];

function buildChartData(country: Country, metric: "yield" | "rent") {
  return QUARTERS.map(q => {
    const row: any = { quarter: q };
    FIRMS.forEach(f => {
      const pt = TIME_SERIES.find(t => t.quarter === q && t.country === country && t.firm === f && t.metric === metric);
      if (pt) row[f] = pt.value;
    });
    return row;
  });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a, b) => {
    if (a.name === "Savills") return -1;
    if (b.name === "Savills") return 1;
    return b.value - a.value;
  });
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl text-xs">
      <div className="font-semibold text-slate-300 mb-2">{label}</div>
      {sorted.map((entry: any) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className={entry.name === "Savills" ? "text-amber-300 font-semibold" : "text-slate-400"}>{FIRM_SHORT[entry.name as Firm] ?? entry.name}</span>
          </div>
          <span className={entry.name === "Savills" ? "text-amber-300 font-bold" : "text-slate-300"}>{entry.value?.toFixed(entry.value > 10 ? 0 : 2)}</span>
        </div>
      ))}
    </div>
  );
}

function CountryChart({ country }: { country: Country }) {
  const [metric, setMetric] = useState<"yield" | "rent">("yield");
  const [expanded, setExpanded] = useState<string | null>(null);
  const data = buildChartData(country, metric);

  // Get units from first available data point
  const samplePt = TIME_SERIES.find(t => t.country === country && t.metric === metric);
  const unit = samplePt?.unit ?? (metric === "yield" ? "%" : "");

  // Commentary from weekly summary
  const summary = WEEKLY_SUMMARIES[0];
  const countrySum = summary?.countries.find(c => c.country === country)?.sectors[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-base">{countryFlag(country)}</span>
          <span className="font-semibold text-slate-200 text-sm">{country}</span>
          {countrySum && (() => {
            const { label, color } = outlookLabel(countrySum.savillsView.outlook);
            return <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${color}`}>{label}</span>;
          })()}
        </div>
        <div className="flex rounded-lg border border-slate-700 overflow-hidden text-xs">
          <button onClick={() => setMetric("yield")}
            className={`px-3 py-1.5 font-medium transition-colors ${metric === "yield" ? "bg-amber-500/20 text-amber-400" : "text-slate-400 hover:bg-slate-800"}`}
            data-testid={`button-yield-${country}`}>Yield %</button>
          <button onClick={() => setMetric("rent")}
            className={`px-3 py-1.5 font-medium transition-colors ${metric === "rent" ? "bg-amber-500/20 text-amber-400" : "text-slate-400 hover:bg-slate-800"}`}
            data-testid={`button-rent-${country}`}>Rent</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Chart */}
        <div className="lg:col-span-2 p-4">
          <div className="text-xs text-slate-500 mb-2">
            Prime {metric === "yield" ? "Net Initial Yield" : "Headline Rent"} ({unit}) · Q1 2024 – Q2 2026
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.3)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false}
                tickFormatter={q => q.replace(" 20", " '")} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false}
                domain={["auto", "auto"]}
                tickFormatter={v => metric === "yield" ? `${v}%` : v >= 1000 ? `${(v/1000).toFixed(1)}k` : String(v)} width={45} />
              <Tooltip content={<CustomTooltip />} />
              {FIRMS.map(f => (
                <Line key={f} type="monotone" dataKey={f}
                  stroke={FIRM_COLORS[f]}
                  strokeWidth={f === "Savills" ? 3 : 1.5}
                  dot={f === "Savills" ? { r: 3, fill: FIRM_COLORS[f] } : false}
                  activeDot={{ r: 4 }}
                  connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
          {/* Firm colour legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {FIRMS.map(f => (
              <div key={f} className="flex items-center gap-1">
                <div className="rounded-full" style={{ width: f === "Savills" ? 16 : 10, height: f === "Savills" ? 3 : 1.5, backgroundColor: FIRM_COLORS[f] }} />
                <span className={`text-[10px] ${f === "Savills" ? "text-amber-400 font-semibold" : "text-slate-500"}`}>{FIRM_SHORT[f]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commentary panel */}
        <div className="p-4 flex flex-col gap-3">
          {countrySum ? (
            <>
              {/* Savills view — always first */}
              <div className="savills-card rounded-lg p-3">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1.5">★ Savills View</div>
                <div className="flex gap-2 mb-2">
                  <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded p-1.5 text-center">
                    <div className="text-[9px] text-amber-500/60 uppercase">Yield</div>
                    <div className="text-xs font-bold text-amber-400">{countrySum.savillsView.primeYield}</div>
                  </div>
                  <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded p-1.5 text-center">
                    <div className="text-[9px] text-amber-500/60 uppercase">Rent</div>
                    <div className="text-[10px] font-bold text-amber-400 leading-tight">{countrySum.savillsView.primeRent}</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{countrySum.savillsView.summary}</p>
              </div>

              {/* Competitor intel — collapsible */}
              {countrySum.competitorIntel.map((ci, i) => (
                <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === `${country}-${i}` ? null : `${country}-${i}`)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors"
                  >
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${firmBadgeClass(ci.firm as Firm)}`}>{ci.firm}</span>
                    {expanded === `${country}-${i}` ? <ChevronDown size={12} className="text-slate-500" /> : <ChevronRight size={12} className="text-slate-500" />}
                  </button>
                  {expanded !== `${country}-${i}` && (
                    <div className="px-3 pb-2 text-[10px] text-slate-600 truncate">{ci.summary.slice(0, 60)}…</div>
                  )}
                  {expanded === `${country}-${i}` && (
                    <div className="px-3 pb-3">
                      <p className="text-[11px] text-slate-400 leading-relaxed">{ci.summary}</p>
                      <div className="mt-1 text-[10px] text-slate-600 italic">Source: {ci.source}</div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="text-xs text-slate-500 p-2">No commentary available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function YieldsRents() {
  const [activeCountry, setActiveCountry] = useState<Country>("UK");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">Yields & Rents</h1>
        <p className="text-sm text-slate-500 mt-0.5">Prime net initial yield (%) and prime headline rent · Q1 2024–Q2 2026 · 6 firms</p>
      </div>

      {/* Country selector tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 bg-slate-900 border border-slate-800 rounded-xl p-3">
        {COUNTRIES.map(c => (
          <button key={c} onClick={() => setActiveCountry(c)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCountry === c
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "text-slate-400 hover:bg-slate-800 border border-transparent"
            }`}
            data-testid={`tab-country-${c}`}>
            <span>{countryFlag(c)}</span>{c}
          </button>
        ))}
      </div>

      <CountryChart country={activeCountry} />

      {/* Snapshot table — latest quarter across all countries */}
      <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Quarter Snapshot — All Markets (Q2 2026 Savills)</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-2.5 font-medium">Market</th>
                <th className="text-right px-4 py-2.5 font-medium">Prime Yield</th>
                <th className="text-right px-4 py-2.5 font-medium">Prime Rent</th>
                <th className="text-right px-4 py-2.5 font-medium">Unit</th>
                <th className="text-left px-4 py-2.5 font-medium">Outlook</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map((c, i) => {
                const yPt = TIME_SERIES.find(t => t.country === c && t.firm === "Savills" && t.metric === "yield" && t.quarter === "Q2 2026");
                const rPt = TIME_SERIES.find(t => t.country === c && t.firm === "Savills" && t.metric === "rent" && t.quarter === "Q2 2026");
                const sum = WEEKLY_SUMMARIES[0]?.countries.find(x => x.country === c)?.sectors[0];
                const { label, color } = sum ? outlookLabel(sum.savillsView.outlook) : { label: "—", color: "text-slate-500" };
                return (
                  <tr key={c}
                    onClick={() => setActiveCountry(c)}
                    className={`border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-800/20"} ${activeCountry === c ? "bg-amber-500/5" : ""}`}
                    data-testid={`row-snapshot-${c}`}>
                    <td className="px-4 py-2.5 font-medium text-slate-200">{countryFlag(c)} {c}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{yPt ? `${yPt.value.toFixed(2)}%` : "—"}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-300">{rPt ? rPt.value >= 1000 ? rPt.value.toLocaleString() : rPt.value.toFixed(0) : "—"}</td>
                    <td className="px-4 py-2.5 text-right text-slate-500">{rPt?.unit ?? "—"}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${color}`}>{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
