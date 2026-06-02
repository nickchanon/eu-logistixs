// Global in-memory store — mirrors window.__EU_*_DATA__ globals
import { useState, useCallback } from "react";
import {
  PUBLICATIONS, TIME_SERIES, AGENT_RUNS, WEEKLY_SUMMARIES,
  Publication, TimeSeriesPoint, AgentRun, WeeklySummary,
  FIRMS, COUNTRIES, FIRM_COLORS, FIRM_SHORT, Firm, Country
} from "../data/seed";

// Re-export everything from seed for convenience
export { PUBLICATIONS, TIME_SERIES, AGENT_RUNS, WEEKLY_SUMMARIES };
export { FIRMS, COUNTRIES, FIRM_COLORS, FIRM_SHORT };
export type { Publication, TimeSeriesPoint, AgentRun, WeeklySummary, Firm, Country };

// Firm badge CSS class
export function firmBadgeClass(firm: Firm): string {
  const map: Record<Firm, string> = {
    "Savills": "badge-savills",
    "Knight Frank": "badge-kf",
    "JLL": "badge-jll",
    "CBRE": "badge-cbre",
    "Colliers": "badge-colliers",
    "BNP Paribas Real Estate": "badge-bnp",
  };
  return map[firm] ?? "badge-savills";
}

// Outlook badge
export function outlookLabel(outlook: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    "positive": { label: "Positive", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
    "stable-positive": { label: "Stable-Positive", color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
    "stable": { label: "Stable", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
    "cautious": { label: "Cautious", color: "text-orange-400 bg-orange-400/10 border-orange-400/30" },
    "cautious-recovery": { label: "Cautious Recovery", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
    "stable-cautious": { label: "Stable-Cautious", color: "text-slate-400 bg-slate-400/10 border-slate-400/30" },
    "constrained": { label: "Constrained", color: "text-red-400 bg-red-400/10 border-red-400/30" },
    "bifurcated": { label: "Bifurcated", color: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
    "mixed": { label: "Mixed", color: "text-slate-400 bg-slate-400/10 border-slate-400/30" },
    "stabilising": { label: "Stabilising", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30" },
  };
  return map[outlook] ?? { label: outlook, color: "text-slate-400 bg-slate-400/10 border-slate-400/30" };
}

// Country flag emoji
export function countryFlag(country: Country): string {
  const flags: Record<Country, string> = {
    "UK": "🇬🇧", "Netherlands": "🇳🇱", "France": "🇫🇷", "Germany": "🇩🇪",
    "Italy": "🇮🇹", "Spain": "🇪🇸", "Portugal": "🇵🇹", "Poland": "🇵🇱",
    "Denmark": "🇩🇰", "Sweden": "🇸🇪", "Norway": "🇳🇴",
  };
  return flags[country] ?? "🏳";
}
