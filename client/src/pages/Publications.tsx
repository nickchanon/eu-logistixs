import { useState, useMemo } from "react";
import { PUBLICATIONS, FIRMS, COUNTRIES, firmBadgeClass, countryFlag, Firm, Country } from "../lib/store";
import { Search, ExternalLink, X, ChevronDown, ChevronRight } from "lucide-react";

// ─── Expandable desktop row ───────────────────────────────────────────────────
function PubRow({ p, i }: { p: typeof PUBLICATIONS[number]; i: number }) {
  const [open, setOpen] = useState(false);
  const isSavills = p.firm === "Savills";

  return (
    <>
      {/* Summary row — always visible */}
      <tr
        onClick={() => setOpen(o => !o)}
        className={`border-b border-slate-800/50 cursor-pointer select-none transition-colors
          ${open ? "bg-slate-800/60" : isSavills ? "bg-amber-500/4 hover:bg-amber-500/8" : i % 2 === 0 ? "hover:bg-slate-800/40" : "bg-slate-800/20 hover:bg-slate-800/40"}`}
        data-testid={`row-publication-${p.id}`}
      >
        <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs font-mono">{p.publish_date}</td>
        <td className="px-4 py-3">
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${firmBadgeClass(p.firm)}`}>
            {isSavills ? "★ Savills" : p.firm}
          </span>
        </td>
        <td className="px-4 py-3 font-medium max-w-xs">
          <div className={isSavills ? "text-amber-100" : "text-slate-200"}>{p.title}</div>
        </td>
        <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-sm">{countryFlag(p.country)} {p.country}</td>
        <td className="px-4 py-3 text-slate-500 text-xs">
          <span className="italic">Click to expand</span>
        </td>
        <td className="px-4 py-3 w-8 text-center">
          {open
            ? <ChevronDown size={14} className="text-slate-400 mx-auto" />
            : <ChevronRight size={14} className="text-slate-500 mx-auto" />}
        </td>
      </tr>

      {/* Expanded summary row */}
      {open && (
        <tr className={`border-b border-slate-700/60 ${isSavills ? "bg-amber-500/6" : "bg-slate-800/40"}`}>
          <td colSpan={6} className="px-4 pb-4 pt-2">
            <div className={`rounded-lg p-3 ${isSavills ? "bg-amber-500/8 border border-amber-500/20" : "bg-slate-900 border border-slate-700"}`}>
              {/* Summary header */}
              <div className="flex items-center gap-2 mb-2">
                {isSavills && <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">★ Savills View</span>}
                <span className="text-[10px] text-slate-500 font-mono">{p.publish_date}</span>
                {p.source && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ml-auto ${p.source === "proprietary" ? "bg-purple-500/15 text-purple-400 border border-purple-500/25" : "bg-slate-700 text-slate-400"}`}>
                    {p.source}
                  </span>
                )}
              </div>
              <p className={`text-sm leading-relaxed ${isSavills ? "text-amber-100/90" : "text-slate-300"}`}>
                {p.summary}
              </p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-amber-500/70 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  {p.url.replace(/^https?:\/\//, "").slice(0, 70)}
                </a>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Expandable mobile card ───────────────────────────────────────────────────
function PubCard({ p }: { p: typeof PUBLICATIONS[number] }) {
  const [open, setOpen] = useState(false);
  const isSavills = p.firm === "Savills";

  return (
    <div
      className={`bg-slate-900 border rounded-xl overflow-hidden ${isSavills ? "border-amber-500/30" : "border-slate-800"}`}
      data-testid={`card-publication-${p.id}`}
    >
      {/* Always-visible header — tap to toggle */}
      <button
        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${open ? (isSavills ? "bg-amber-500/8" : "bg-slate-800/50") : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${firmBadgeClass(p.firm)}`}>
              {isSavills ? "★ Savills" : p.firm}
            </span>
            <span className="text-[10px] text-slate-500">{countryFlag(p.country)} {p.country}</span>
            <span className="text-[10px] text-slate-600 ml-auto font-mono">{p.publish_date}</span>
          </div>
          <div className={`text-sm font-semibold leading-snug ${isSavills ? "text-amber-100" : "text-slate-200"}`}>
            {p.title}
          </div>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {open
            ? <ChevronDown size={16} className="text-slate-400" />
            : <ChevronRight size={16} className="text-slate-500" />}
        </div>
      </button>

      {/* Expanded summary */}
      {open && (
        <div className={`px-4 pb-4 pt-1 border-t ${isSavills ? "border-amber-500/20 bg-amber-500/4" : "border-slate-800 bg-slate-800/20"}`}>
          <p className={`text-xs leading-relaxed mt-2 ${isSavills ? "text-amber-100/80" : "text-slate-400"}`}>
            {p.summary}
          </p>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-500/60 hover:text-amber-400"
            >
              <ExternalLink size={10} />
              {p.url.replace(/^https?:\/\//, "").slice(0, 50)}…
            </a>
          )}
          {p.source && (
            <span className={`mt-2 inline-block text-[10px] px-1.5 py-0.5 rounded font-medium ${p.source === "proprietary" ? "bg-purple-500/15 text-purple-400" : "bg-slate-700 text-slate-500"}`}>
              {p.source}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Publications page ────────────────────────────────────────────────────────
export default function Publications() {
  const [search, setSearch] = useState("");
  const [firmFilter, setFirmFilter] = useState<Firm | "All">("All");
  const [countryFilter, setCountryFilter] = useState<Country | "All">("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    return PUBLICATIONS
      .filter(p => {
        if (firmFilter !== "All" && p.firm !== firmFilter) return false;
        if (countryFilter !== "All" && p.country !== countryFilter) return false;
        if (dateFrom && p.publish_date < dateFrom) return false;
        if (dateTo && p.publish_date > dateTo) return false;
        if (search) {
          const q = search.toLowerCase();
          return p.title.toLowerCase().includes(q) || p.firm.toLowerCase().includes(q)
            || p.country.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => b.publish_date.localeCompare(a.publish_date));
  }, [search, firmFilter, countryFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearch(""); setFirmFilter("All"); setCountryFilter("All"); setDateFrom(""); setDateTo("");
  };

  const hasFilters = search || firmFilter !== "All" || countryFilter !== "All" || dateFrom || dateTo;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">Publications Database</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {filtered.length} of {PUBLICATIONS.length} publications · Industrial & Logistics · Jan–Jun 2026
          <span className="ml-2 text-slate-600">· Click any row to expand summary</span>
        </p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search title, firm, country, summary…"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              data-testid="input-search"
            />
          </div>
          <select value={firmFilter} onChange={e => setFirmFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" data-testid="select-firm">
            <option value="All">All Firms</option>
            {FIRMS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select value={countryFilter} onChange={e => setCountryFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" data-testid="select-country">
            <option value="All">All Countries</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{countryFlag(c)} {c}</option>)}
          </select>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" data-testid="input-date-from" />
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" data-testid="input-date-to" />
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600" data-testid="button-clear-filters">
              <X size={14} />Clear
            </button>
          )}
        </div>
      </div>

      {/* Desktop / tablet table — collapsed rows, click to expand */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium w-28">Date</th>
              <th className="text-left px-4 py-3 font-medium">Firm</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium w-32">Country</th>
              <th className="px-4 py-3 font-medium text-slate-600 italic text-left w-32">Summary</th>
              <th className="w-8 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => <PubRow key={p.id} p={p} i={i} />)}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No publications match your filters</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card stack — collapsed, tap to expand */}
      <div className="md:hidden space-y-2 pb-24">
        {filtered.map(p => <PubCard key={p.id} p={p} />)}
        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-12">No publications match your filters</div>
        )}
      </div>
    </div>
  );
}
