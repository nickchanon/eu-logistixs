# EU Logistics Research Intelligence Dashboard

> European Industrial & Logistics market research aggregator — 11 markets × 6 firms × Q1 2024–Q2 2026

Built with **React 18 + Vite + Tailwind CSS + Recharts**. Deployed on Perplexity Computer.

## Markets
🇬🇧 UK · 🇳🇱 Netherlands · 🇫🇷 France · 🇩🇪 Germany · 🇮🇹 Italy · 🇪🇸 Spain · 🇵🇹 Portugal · 🇵🇱 Poland · 🇩🇰 Denmark · 🇸🇪 Sweden · 🇳🇴 Norway

## Firms
Savills (amber) · Knight Frank · JLL · CBRE · Colliers · BNP Paribas Real Estate

## Pages
1. **Overview** — KPIs, Weekly Market Roundup, Coverage Matrix, Publications feed
2. **Publications** — Filterable database (40 publications, Jan–Jun 2026)
3. **Yields & Rents** — Recharts time-series (Q1 2024–Q2 2026), per-country commentary
4. **Coverage Gaps** — Heatmap, Savills opportunity markets, zero-coverage alerts
5. **Add Entry** — Manual data entry form with `source: public|proprietary` and `dataProvider` extensibility hooks
6. **Agent Log** — Research agent run history

## Data
- **40 publications** across all 6 firms and 11 countries
- **1,320 time-series datapoints** (yield + rent, 10 quarters, 6 firms, 11 countries)
- Sources: Savills, Knight Frank, JLL, CBRE, Colliers, BNP Paribas Real Estate research (2024–2026)

## Quick start
```bash
npm install
npm run dev       # http://localhost:5000
npm run build     # builds to dist/public
```

## Standalone
See `eu-logistics-dashboard-standalone.html` — opens directly in any browser, no build step needed.

## Design
- Dark mode default (navy/slate-950 background)
- Savills highlighted in amber (#F59E0B) throughout
- Mobile-responsive with bottom tab navigation
- Firm colour coding: Savills=amber, KF=purple, JLL=blue, CBRE=green, Colliers=orange, BNP=red
