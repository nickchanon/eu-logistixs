import { useState } from "react";
import { FIRMS, COUNTRIES, firmBadgeClass, countryFlag, Firm, Country, PUBLICATIONS } from "../lib/store";
import { PlusCircle, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  firm: Firm;
  country: Country;
  title: string;
  publish_date: string;
  summary: string;
  url: string;
  prime_yield: string;
  prime_rent: string;
  rent_unit: string;
  source: "public" | "proprietary";
  dataProvider: string;
}

const DEFAULT_FORM: FormData = {
  firm: "Savills",
  country: "UK",
  title: "",
  publish_date: new Date().toISOString().split("T")[0],
  summary: "",
  url: "",
  prime_yield: "",
  prime_rent: "",
  rent_unit: "€/sqm/yr",
  source: "public",
  dataProvider: "",
};

const RENT_UNITS = ["€/sqm/yr", "£/sqft/yr", "DKK/sqm/yr", "SEK/sqm/yr", "NOK/sqm/yr", "USD/sqft/yr"];

export default function AddEntry() {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [localPubs, setLocalPubs] = useState<any[]>([]);

  function set(key: keyof FormData, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.summary) { setStatus("error"); return; }
    const newPub = {
      id: `pub-local-${Date.now()}`,
      publish_date: form.publish_date,
      firm: form.firm,
      title: form.title,
      country: form.country,
      sector: "Industrial & Logistics" as const,
      summary: form.summary,
      url: form.url || undefined,
      source: form.source,
      dataProvider: form.dataProvider || undefined,
    };
    setLocalPubs(p => [newPub, ...p]);
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
    setForm(DEFAULT_FORM);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-100">Add Entry</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manually add a publication or data point to the in-memory dataset</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        {/* Row 1 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Firm *</label>
            <select value={form.firm} onChange={e => set("firm", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
              data-testid="select-add-firm">
              {FIRMS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Country *</label>
            <select value={form.country} onChange={e => set("country", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
              data-testid="select-add-country">
              {COUNTRIES.map(c => <option key={c} value={c}>{countryFlag(c)} {c}</option>)}
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={e => set("title", e.target.value)}
            placeholder="e.g. UK Logistics Market Q3 2026"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
            data-testid="input-add-title" />
        </div>

        {/* Date + Sector */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Publish Date *</label>
            <input type="date" value={form.publish_date} onChange={e => set("publish_date", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
              data-testid="input-add-date" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Sector</label>
            <input type="text" value="Industrial & Logistics" disabled
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed" />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Summary *</label>
          <textarea value={form.summary} onChange={e => set("summary", e.target.value)}
            placeholder="2–3 sentence summary of the publication's key findings…"
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 resize-none"
            data-testid="textarea-add-summary" />
        </div>

        {/* URL */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">URL</label>
          <input type="url" value={form.url} onChange={e => set("url", e.target.value)}
            placeholder="https://www.savills.co.uk/research…"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
            data-testid="input-add-url" />
        </div>

        {/* Market data */}
        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Market Data (optional)</div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Prime Yield (%)</label>
              <input type="number" step="0.01" min="0" max="20" value={form.prime_yield} onChange={e => set("prime_yield", e.target.value)}
                placeholder="e.g. 4.75"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                data-testid="input-add-yield" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Prime Rent</label>
              <input type="number" step="0.01" min="0" value={form.prime_rent} onChange={e => set("prime_rent", e.target.value)}
                placeholder="e.g. 12.50"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                data-testid="input-add-rent" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Rent Unit</label>
              <select value={form.rent_unit} onChange={e => set("rent_unit", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
                data-testid="select-add-rent-unit">
                {RENT_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Source / data provider (extensibility hooks) */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Source Type</label>
            <select value={form.source} onChange={e => set("source", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
              data-testid="select-add-source">
              <option value="public">Public</option>
              <option value="proprietary">Proprietary</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Data Provider</label>
            <input type="text" value={form.dataProvider} onChange={e => set("dataProvider", e.target.value)}
              placeholder="e.g. Savills internal, CoStar, MSCI, PMA"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
              data-testid="input-add-provider" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors"
            data-testid="button-add-submit">
            <PlusCircle size={16} />Add to Dataset
          </button>
          {status === "success" && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
              <CheckCircle size={16} />Entry added to in-memory dataset
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-1.5 text-red-400 text-sm">
              <AlertCircle size={16} />Title and summary are required
            </div>
          )}
        </div>
      </form>

      {/* Recently added */}
      {localPubs.length > 0 && (
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Added This Session ({localPubs.length})</div>
          <div className="space-y-2">
            {localPubs.map(p => (
              <div key={p.id} className={`flex items-start gap-3 p-3 rounded-lg border ${p.firm === "Savills" ? "bg-amber-500/8 border-amber-500/25" : "bg-slate-800 border-slate-700"}`}>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${firmBadgeClass(p.firm as Firm)} mt-0.5`}>{p.firm}</span>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-200">{p.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{countryFlag(p.country as Country)} {p.country} · {p.publish_date} · {p.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schema note */}
      <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800/50 rounded-xl">
        <div className="text-[10px] text-slate-600 font-mono leading-relaxed">
          <div className="text-slate-500 font-bold mb-1">// Data schema (extensibility hooks)</div>
          <div>source: "public" | "proprietary"</div>
          <div>dataProvider: "Savills internal" | "CoStar" | "MSCI" | "PMA" | …</div>
          <div className="mt-1 text-slate-600">// When proprietary sources are connected, they slot into this schema without changes</div>
        </div>
      </div>
    </div>
  );
}
