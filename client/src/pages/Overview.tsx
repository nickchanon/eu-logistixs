import { useState } from "react";
import {
  PUBLICATIONS, TIME_SERIES, WEEKLY_SUMMARIES, FIRMS, COUNTRIES,
  FIRM_COLORS, FIRM_SHORT, firmBadgeClass, outlookLabel, countryFlag,
  Firm, Country
} from "../lib/store";
import { ChevronDown, ChevronRight, TrendingDown, TrendingUp, Building2, FileText, BarChart3, Globe } from "lucide-react";

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, amber }: { label: string; value: string | number; sub?: string; icon: any; amber?: boolean }) {
  return (
    <div className={`rounded-xl p-4 border ${amber ? "bg-amber-500/8 border-amber-500/25" : "bg-slate-900 border-slate-800"}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{label}</div>
          <div className={`text-2xl font-bold ${amber ? "text-amber-400" : "text-slate-100"}`}>{value}</div>
          {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
        </div>
        <div className={`p-2 rounded-lg ${amber ? "bg-amber-500/15" : "bg-slate-800"}`}>
          <Icon size={18} className={amber ? "text-amber-400" : "text-slate-400"} />
        </div>
      </div>
    </div>
  );
}

// ─── Coverage Matrix Cell ─────────────────────────────────────────────────────
function MatrixCell({ count, firm }: { count: number; firm: Firm }) {
  const color = FIRM_COLORS[firm];
  const opacity = count === 0 ? 0 : Math.min(1, 0.2 + (count / 5) * 0.8);
  return (
    <div className="flex items-center justify-center h-8 rounded text-xs font-semibold"
      style={{ backgroundColor: count > 0 ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}` : "rgba(30,41,59,0.5)", color: count > 0 ? color : "#475569" }}>
      {count > 0 ? count : "—"}
    </div>
  );
}

// ─── Weekly Roundup ───────────────────────────────────────────────────────────
function WeeklyRoundupSection() {
  const [activeCountry, setActiveCountry] = useState<Country>("UK");
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null);
  const summary = WEEKLY_SUMMARIES[0];
  const countryData = summary?.countries.find(c => c.country === activeCountry);
  const sector = countryData?.sectors[0];

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 rounded-full bg-amber-400" />
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Weekly Market Roundup</h2>
        <span className="text-xs text-slate-500 ml-1">w/c {summary?.weekOf}</span>
      </div>
      {/* Country tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {COUNTRIES.map(c => (
          <button key={c} onClick={() => setActiveCountry(c)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeCountry === c ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-transparent"}`}>
            <span>{countryFlag(c)}</span>{c}
          </button>
        ))}
      </div>
      {sector && (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Savills view — amber card */}
          <div className="md:col-span-2 savills-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Savills View</span>
                <span className="text-xs px-1.5 py-0.5 rounded badge-savills font-medium">{countryFlag(activeCountry)} {activeCountry}</span>
              </div>
              {(() => {
                const { label, color } = outlookLabel(sector.savillsView.outlook);
                return <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${color}`}>{label}</span>;
              })()}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{sector.savillsView.summary}</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-center">
                <div className="text-[10px] text-amber-500/70 uppercase tracking-wider mb-0.5">Prime Yield</div>
                <div className="text-lg font-bold text-amber-400">{sector.savillsView.primeYield}</div>
              </div>
              <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-center">
                <div className="text-[10px] text-amber-500/70 uppercase tracking-wider mb-0.5">Prime Rent</div>
                <div className="text-base font-bold text-amber-400 leading-tight mt-0.5">{sector.savillsView.primeRent}</div>
              </div>
            </div>
          </div>
          {/* Competitor intel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Competitor Intel</div>
            <div className="space-y-2">
              {sector.competitorIntel.map((ci, i) => (
                <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFirm(expandedFirm === `${activeCountry}-${i}` ? null : `${activeCountry}-${i}`)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors"
                  >
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${firmBadgeClass(ci.firm as Firm)}`}>{ci.firm}</span>
                    {expandedFirm === `${activeCountry}-${i}` ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
                  </button>
                  {expandedFirm !== `${activeCountry}-${i}` && (
                    <div className="px-3 pb-2 text-xs text-slate-500 truncate">{ci.summary.slice(0, 60)}…</div>
                  )}
                  {expandedFirm === `${activeCountry}-${i}` && (
                    <div className="px-3 pb-3">
                      <p className="text-xs text-slate-400 leading-relaxed">{ci.summary}</p>
                      <div className="mt-1.5 text-[10px] text-slate-600 italic">Source: {ci.source}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Coverage Matrix ──────────────────────────────────────────────────────────
function CoverageMatrix() {
  const matrix: Record<Country, Record<Firm, number>> = {} as any;
  COUNTRIES.forEach(c => {
    matrix[c] = {} as any;
    FIRMS.forEach(f => { matrix[c][f] = 0; });
  });
  PUBLICATIONS.forEach(p => { matrix[p.country][p.firm]++; });

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 rounded-full bg-blue-400" />
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Market × Firm Coverage Matrix</h2>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-4 py-3 text-slate-500 font-medium w-28">Market</th>
                {FIRMS.map(f => (
                  <th key={f} className="px-2 py-3 text-center" style={{ color: FIRM_COLORS[f] }}>
                    <div className="font-bold">{FIRM_SHORT[f]}</div>
                  </th>
                ))}
                <th className="px-3 py-3 text-slate-500 font-medium text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map((c, i) => {
                const total = FIRMS.reduce((s, f) => s + matrix[c][f], 0);
                return (
                  <tr key={c} className={`border-b border-slate-800/50 ${i % 2 === 0 ? "" : "bg-slate-800/20"}`}>
                    <td className="px-4 py-2 font-medium text-slate-300">
                      <span>{countryFlag(c)} {c}</span>
                    </td>
                    {FIRMS.map(f => (
                      <td key={f} className="px-2 py-1.5">
                        <MatrixCell count={matrix[c][f]} firm={f} />
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center font-bold text-slate-300">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-slate-800">
          {FIRMS.map(f => (
            <div key={f} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: FIRM_COLORS[f] }} />
              <span className="text-[10px] text-slate-500">{FIRM_SHORT[f]} = {f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Publications by Firm Bar Chart ──────────────────────────────────────────
function PubsByFirmChart() {
  const counts: Record<Firm, number> = {} as any;
  FIRMS.forEach(f => { counts[f] = 0; });
  PUBLICATIONS.forEach(p => { counts[p.firm]++; });
  const max = Math.max(...Object.values(counts));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Publications by Firm</div>
      <div className="space-y-2.5">
        {FIRMS.map(f => (
          <div key={f} className="flex items-center gap-3">
            <div className="w-16 text-right text-xs text-slate-400 truncate">{FIRM_SHORT[f]}</div>
            <div className="flex-1 bg-slate-800 rounded-full h-5 relative overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(counts[f] / max) * 100}%`, backgroundColor: FIRM_COLORS[f], opacity: 0.85 }} />
              <span className="absolute right-2 top-0 h-full flex items-center text-xs font-medium text-white">{counts[f]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Latest Publications Feed ─────────────────────────────────────────────────
function LatestPubs() {
  const latest = [...PUBLICATIONS].sort((a, b) => b.publish_date.localeCompare(a.publish_date)).slice(0, 8);
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Latest Publications</div>
      <div className="space-y-3">
        {latest.map(p => (
          <div key={p.id} className={`flex flex-col gap-1 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0 ${p.firm === "Savills" ? "pl-2 border-l-2 border-l-amber-500/50" : ""}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${firmBadgeClass(p.firm)}`}>{p.firm}</span>
              <span className="text-[10px] text-slate-600">{countryFlag(p.country)} {p.country}</span>
              <span className="text-[10px] text-slate-600 ml-auto">{p.publish_date}</span>
            </div>
            <div className="text-xs font-medium text-slate-300 leading-tight">{p.title}</div>
            {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-amber-500/70 hover:text-amber-400 truncate">{p.url.replace(/^https?:\/\//, "")}</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Coverage Alerts ──────────────────────────────────────────────────────────
function CoverageAlerts() {
  const pubsByCountryFirm: Record<string, number> = {};
  PUBLICATIONS.forEach(p => { pubsByCountryFirm[`${p.country}|${p.firm}`] = (pubsByCountryFirm[`${p.country}|${p.firm}`] ?? 0) + 1; });

  // Countries where Savills hasn't published but competitors have
  const opportunityCountries = COUNTRIES.filter(c => {
    const savillsCount = pubsByCountryFirm[`${c}|Savills`] ?? 0;
    const competitorCount = FIRMS.filter(f => f !== "Savills").reduce((s, f) => s + (pubsByCountryFirm[`${c}|${f}`] ?? 0), 0);
    return savillsCount === 0 && competitorCount > 0;
  });

  const gapCountries = COUNTRIES.filter(c => {
    const total = FIRMS.reduce((s, f) => s + (pubsByCountryFirm[`${c}|${f}`] ?? 0), 0);
    return total < 2;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Coverage Alerts</div>
      {opportunityCountries.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-amber-400 font-semibold mb-1.5 flex items-center gap-1"><TrendingUp size={12} />Savills opportunity gaps</div>
          <div className="flex flex-wrap gap-1.5">
            {opportunityCountries.map(c => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">{countryFlag(c)} {c}</span>
            ))}
          </div>
        </div>
      )}
      {gapCountries.length > 0 && (
        <div>
          <div className="text-xs text-red-400 font-semibold mb-1.5 flex items-center gap-1"><TrendingDown size={12} />Thin coverage markets (&lt;2 pubs)</div>
          <div className="flex flex-wrap gap-1.5">
            {gapCountries.map(c => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400">{countryFlag(c)} {c}</span>
            ))}
          </div>
        </div>
      )}
      {opportunityCountries.length === 0 && gapCountries.length === 0 && (
        <div className="text-xs text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Full coverage across all markets
        </div>
      )}
    </div>
  );
}

// ─── Overview page ────────────────────────────────────────────────────────────
export default function Overview() {
  const yieldPts = TIME_SERIES.filter(t => t.metric === "yield").length;
  const rentPts = TIME_SERIES.filter(t => t.metric === "rent").length;
  const savPubs = PUBLICATIONS.filter(p => p.firm === "Savills").length;
  const countries = new Set(PUBLICATIONS.map(p => p.country)).size;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">European Logistics Research Intelligence</h1>
        <p className="text-sm text-slate-500 mt-0.5">Industrial & Logistics · 6 firms · 11 markets · Q1 2024–Q2 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KpiCard label="Total Publications" value={PUBLICATIONS.length} sub="Jan–Jun 2026" icon={FileText} />
        <KpiCard label="Savills Reports" value={savPubs} sub="Amber-highlighted" icon={Building2} amber />
        <KpiCard label="Yield Datapoints" value={yieldPts} sub="Q1 2024–Q2 2026" icon={TrendingDown} />
        <KpiCard label="Markets Covered" value={countries} sub={`of ${COUNTRIES.length} total`} icon={Globe} />
      </div>

      <WeeklyRoundupSection />
      <CoverageMatrix />

      <div className="grid md:grid-cols-2 gap-4">
        <PubsByFirmChart />
        <LatestPubs />
      </div>

      <div className="mt-4">
        <CoverageAlerts />
      </div>
    </div>
  );
}
