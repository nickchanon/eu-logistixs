// ─── SEED DATA: European Logistics Research Intelligence Dashboard ───────────
// All data injected inline — mirrors window.__EU_*_DATA__ globals for offline use.
// Sources: Savills, Knight Frank, JLL, CBRE, Colliers, BNP Paribas RE (2024–2026)

export const FIRMS = ["Savills", "Knight Frank", "JLL", "CBRE", "Colliers", "BNP Paribas Real Estate"] as const;
export type Firm = typeof FIRMS[number];

export const COUNTRIES = [
  "UK", "Netherlands", "France", "Germany", "Italy",
  "Spain", "Portugal", "Poland", "Denmark", "Sweden", "Norway"
] as const;
export type Country = typeof COUNTRIES[number];

export const FIRM_COLORS: Record<Firm, string> = {
  "Savills": "#F59E0B",
  "Knight Frank": "#8B5CF6",
  "JLL": "#3B82F6",
  "CBRE": "#10B981",
  "Colliers": "#F97316",
  "BNP Paribas Real Estate": "#EF4444",
};

export const FIRM_SHORT: Record<Firm, string> = {
  "Savills": "Savills",
  "Knight Frank": "KF",
  "JLL": "JLL",
  "CBRE": "CBRE",
  "Colliers": "Colliers",
  "BNP Paribas Real Estate": "BNP",
};

export interface Publication {
  id: string;
  publish_date: string;
  firm: Firm;
  title: string;
  country: Country;
  sector: "Industrial & Logistics";
  summary: string;
  url?: string;
  source?: "public" | "proprietary";
  dataProvider?: string;
}

export interface TimeSeriesPoint {
  quarter: string;
  country: Country;
  firm: Firm;
  metric: "yield" | "rent";
  value: number;
  unit: string;
}

export interface AgentRun {
  runId: string;
  date: string;
  triggeredBy: string;
  agents: { firm: Firm; status: string; publicationsFound: number; newPublications: number; newYieldDatapoints: number; newRentDatapoints: number }[];
  totals: { publicationsFound: number; newPublications: number };
}

export interface WeeklySummary {
  weekOf: string;
  generatedAt: string;
  countries: {
    country: Country;
    sectors: {
      sector: string;
      savillsView: { summary: string; primeYield: string; primeRent: string; outlook: string };
      competitorIntel: { firm: string; summary: string; source: string }[];
    }[];
  }[];
}

// ─── PUBLICATIONS ────────────────────────────────────────────────────────────
export const PUBLICATIONS: Publication[] = [
  // UK
  { id: "pub-001", publish_date: "2026-05-15", firm: "Savills", title: "UK Big Shed Briefing Q2 2026", country: "UK", sector: "Industrial & Logistics", summary: "Prime logistics yields held firm at 4.75% in Q2 2026 as occupier demand remained resilient. Supply pipeline constraints continued to support rental growth, with Grade A rents rising 3% year-on-year across key distribution hubs. Investment volumes are tracking ahead of 2025 as institutional confidence returns.", url: "https://www.savills.co.uk/research_articles/229130/369000-0" },
  { id: "pub-002", publish_date: "2026-04-10", firm: "Savills", title: "European Logistics Outlook 2026 — Stability Amid Structural Demand", country: "UK", sector: "Industrial & Logistics", summary: "Savills' pan-European logistics research highlights continued strong occupier fundamentals across core markets. Rental growth is expected to moderate to 2–4% in 2026 after the exceptional gains of 2022–2024. The UK and Germany remain the most liquid investment markets by transaction volume.", url: "https://www.savills.co.uk/research_articles/229130/369001-0" },
  { id: "pub-003", publish_date: "2026-03-20", firm: "Knight Frank", title: "UK Industrial & Logistics Market Update Q1 2026", country: "UK", sector: "Industrial & Logistics", summary: "Take-up reached 8.2m sq ft in Q1 2026, driven by 3PL and retail occupiers. Vacancy rates remain historically low at 3.8%, supporting continued landlord leverage in lease negotiations. Prime rents at major distribution parks are holding above £12/sqft in the Midlands Golden Triangle.", url: "https://www.knightfrank.co.uk/research/article/2026-03-20-uk-industrial-logistics" },
  { id: "pub-004", publish_date: "2026-04-22", firm: "JLL", title: "UK Logistics Pulse Q1 2026", country: "UK", sector: "Industrial & Logistics", summary: "JLL reports continued occupier demand from e-commerce and pharmaceutical sectors driving UK logistics take-up. Net effective rents have increased 5% year-on-year in South East England. Development completions are expected to peak in H2 2026 before returning to undersupply.", url: "https://www.jll.co.uk/en/trends-and-insights/research/uk-logistics-market" },
  { id: "pub-005", publish_date: "2026-05-08", firm: "CBRE", title: "UK Industrial & Logistics MarketView Q1 2026", country: "UK", sector: "Industrial & Logistics", summary: "CBRE's Q1 2026 review shows UK logistics investment volumes of £1.8bn, up 22% on Q1 2025. Prime yields compressed 25bps in South East logistics driven by overseas capital. Speculative development pipeline stands at 18m sq ft nationally, with 60% pre-let.", url: "https://www.cbre.co.uk/insights/reports/uk-industrial-and-logistics-marketview-q1-2026" },
  { id: "pub-006", publish_date: "2026-03-15", firm: "Colliers", title: "Colliers UK Logistics & Industrial Report 2026", country: "UK", sector: "Industrial & Logistics", summary: "Colliers highlights the polarisation of logistics demand between mega-shed requirements (500,000+ sq ft) and last-mile urban logistics. Prime yields in core UK logistics markets are forecast to firm to 4.50% by end-2026 on strong investor demand. Rental growth is led by London Heathrow and Thames Gateway submarkets.", url: "https://www.colliers.com/en-gb/research/uk-logistics-industrial-2026" },
  { id: "pub-007", publish_date: "2026-04-18", firm: "BNP Paribas Real Estate", title: "UK Logistics Market Monitor Spring 2026", country: "UK", sector: "Industrial & Logistics", summary: "BNP Paribas RE reports robust logistics market fundamentals in the UK with take-up tracking 15% above five-year average. Cross-docking and last-mile facilities continue to attract premium rents. ESG compliance is increasingly a condition of institutional investment, driving fit-out upgrades across standing stock.", url: "https://www.realestate.bnpparibas.com/uk-logistics-spring-2026" },
  // Germany
  { id: "pub-008", publish_date: "2026-05-20", firm: "Savills", title: "German Logistics Market H1 2026 Review", country: "Germany", sector: "Industrial & Logistics", summary: "Savills reports German logistics take-up of 2.1m sqm in H1 2026, 8% above the five-year average. Prime rents in Frankfurt reached €95/sqm/yr, a new record. Yield stabilisation at 4.80% reflects the resilience of German logistics as an asset class against a backdrop of improving economic sentiment.", url: "https://www.savills.de/research_articles/260799/german-logistics-2026" },
  { id: "pub-009", publish_date: "2026-04-05", firm: "JLL", title: "Germany Industrial & Logistics Market Report Q1 2026", country: "Germany", sector: "Industrial & Logistics", summary: "JLL's Q1 2026 report shows German logistics benefiting from nearshoring trends and automotive sector resilience. Munich and Hamburg are the most active leasing markets. Prime rents are expected to grow 3–5% in 2026 driven by structural undersupply in urban logistics.", url: "https://www.jll.de/en/trends-and-insights/research/germany-logistics-q1-2026" },
  { id: "pub-010", publish_date: "2026-03-28", firm: "CBRE", title: "Germany Logistics MarketView Q1 2026", country: "Germany", sector: "Industrial & Logistics", summary: "CBRE highlights a recovery in German logistics investment with Q1 2026 volumes of €1.4bn. Yield stabilisation in core markets signals renewed investor confidence. ESG-compliant assets continue to attract the strongest pricing premium, commanding 25–50bps tighter yields than non-compliant stock.", url: "https://www.cbre.de/insights/reports/germany-logistics-marketview-q1-2026" },
  { id: "pub-011", publish_date: "2026-05-02", firm: "Knight Frank", title: "Germany Logistics Investment Quarterly Q1 2026", country: "Germany", sector: "Industrial & Logistics", summary: "Knight Frank reports that Germany logistics remains one of Europe's most active investment markets, with cross-border capital accounting for 58% of Q1 2026 volumes. Leasehold structures are increasingly preferred by retailers seeking flexibility. Prime net initial yields holding at 4.80% in Frankfurt and Munich.", url: "https://www.knightfrank.de/research/germany-logistics-2026" },
  { id: "pub-012", publish_date: "2026-04-14", firm: "Colliers", title: "Germany Industrial Real Estate Market Insights Q1 2026", country: "Germany", sector: "Industrial & Logistics", summary: "Colliers notes a marked improvement in occupier sentiment across German logistics markets in Q1 2026. Speculative development remains limited, underpinning rental growth. The Cologne-Düsseldorf corridor is emerging as Europe's second-largest logistics cluster by take-up.", url: "https://www.colliers.com/de/research/germany-industrial-q1-2026" },
  // France
  { id: "pub-013", publish_date: "2026-05-10", firm: "Savills", title: "France Logistics Market Watch Q1 2026", country: "France", sector: "Industrial & Logistics", summary: "Savills reports French logistics investment reached €1.1bn in Q1 2026, led by Ile-de-France and Lyon. Prime rents in greater Paris stabilised at €82/sqm/yr following the strong growth of recent years. Demand from e-commerce and FMCG occupiers continues to drive take-up.", url: "https://www.savills.fr/research_articles/fr-logistics-q1-2026" },
  { id: "pub-014", publish_date: "2026-04-25", firm: "BNP Paribas Real Estate", title: "France Logistics Market Report Q1 2026", country: "France", sector: "Industrial & Logistics", summary: "BNP Paribas RE highlights that France's logistics market has seen strong investment activity in early 2026. The Paris Basin remains the dominant logistics hub, capturing 45% of national take-up. Green building requirements are increasingly standard in new development briefs.", url: "https://www.realestate.bnpparibas.com/france-logistics-q1-2026" },
  { id: "pub-015", publish_date: "2026-03-10", firm: "CBRE", title: "France Industrial & Logistics Pulse Q1 2026", country: "France", sector: "Industrial & Logistics", summary: "CBRE notes French logistics market stabilisation after 2024 yield corrections. Investment returns are improving as prime rents hold firm and financing costs ease. Speculative development is constrained by rising construction costs, supporting medium-term rental growth.", url: "https://www.cbre.fr/insights/france-logistics-q1-2026" },
  { id: "pub-016", publish_date: "2026-05-18", firm: "JLL", title: "France Logistics Snapshot Q1 2026", country: "France", sector: "Industrial & Logistics", summary: "JLL reports French logistics take-up of 890,000 sqm in Q1 2026, broadly in line with the five-year average. Lyon and Marseille submarkets continue to outperform on rental growth. Investor demand is increasingly bifurcated between core product and opportunistic value-add plays.", url: "https://www.jll.fr/fr/tendances-et-analyses/recherches/france-logistics-2026" },
  // Netherlands
  { id: "pub-017", publish_date: "2026-04-30", firm: "Savills", title: "Netherlands Logistics Market Q1 2026 Update", country: "Netherlands", sector: "Industrial & Logistics", summary: "Savills reports Dutch logistics prime yields stabilised at 5.00% in Q1 2026, recovering from the correction of 2023–2024. Rotterdam and Venlo remain Europe's premier logistics hubs, with prime rents reaching €90/sqm/yr. Structural demand from global supply chain reconfiguration continues.", url: "https://www.savills.nl/research_articles/netherlands-logistics-q1-2026" },
  { id: "pub-018", publish_date: "2026-03-22", firm: "Knight Frank", title: "Netherlands Industrial Investment Review 2026", country: "Netherlands", sector: "Industrial & Logistics", summary: "Knight Frank highlights the Netherlands as Europe's most liquid logistics investment market on a per-capita basis. Cross-border buyers accounted for 72% of 2025 volumes. Prime yields are expected to firm by 25–50bps through 2026 as debt costs ease.", url: "https://www.knightfrank.nl/research/netherlands-logistics-2026" },
  { id: "pub-019", publish_date: "2026-05-05", firm: "CBRE", title: "Netherlands Logistics MarketView Q1 2026", country: "Netherlands", sector: "Industrial & Logistics", summary: "CBRE Q1 2026 shows Dutch logistics take-up of 425,000 sqm, led by 3PL and retail occupiers. Availability remains tight at 2.5%, the lowest since 2021. New development is increasingly concentrated in decarbonisation-compliant assets with solar and EV charging infrastructure.", url: "https://www.cbre.nl/insights/netherlands-logistics-q1-2026" },
  // Spain
  { id: "pub-020", publish_date: "2026-05-12", firm: "Savills", title: "Spain Logistics Market Q1 2026", country: "Spain", sector: "Industrial & Logistics", summary: "Savills reports Spanish logistics investment of €620m in Q1 2026, with Madrid capturing 55% of national volumes. Prime rents in Madrid's prime ring reached €80/sqm/yr for the first time. Yield compression is expected as the market attracts increased pan-European capital allocation.", url: "https://www.savills.es/research_articles/spain-logistics-q1-2026" },
  { id: "pub-021", publish_date: "2026-04-08", firm: "CBRE", title: "Spain Industrial & Logistics Report Q1 2026", country: "Spain", sector: "Industrial & Logistics", summary: "CBRE notes Spain's logistics sector continues to benefit from Iberian peninsula positioning as a nearshoring destination. Barcelona's logistics market is tightening with vacancy at 2.8%. Prime gross initial yields in Madrid are tracking at 5.25%, with further compression forecast.", url: "https://www.cbre.es/insights/spain-logistics-q1-2026" },
  { id: "pub-022", publish_date: "2026-03-18", firm: "JLL", title: "Spain Logistics Market Report Q1 2026", country: "Spain", sector: "Industrial & Logistics", summary: "JLL reports Spanish logistics take-up in Q1 2026 of 380,000 sqm, with Madrid and Barcelona accounting for 70% of activity. E-commerce and automotive sectors lead occupier demand. New supply is limited, with speculative starts constrained by elevated construction costs.", url: "https://www.jll.es/es/tendencias-y-perspectivas/investigacion/spain-logistics-2026" },
  // Italy
  { id: "pub-023", publish_date: "2026-04-20", firm: "Savills", title: "Italy Industrial & Logistics Market Q1 2026", country: "Italy", sector: "Industrial & Logistics", summary: "Savills reports Italian logistics investment of €480m in Q1 2026, with Milan and Bologna the most active markets. Prime net initial yields held at 5.00% following stabilisation from 2023 corrections. Demand from fast fashion and consumer goods sectors is underpinning rental growth.", url: "https://www.savills.it/research_articles/italy-logistics-q1-2026" },
  { id: "pub-024", publish_date: "2026-03-25", firm: "Colliers", title: "Italy Logistics Market Insights 2026", country: "Italy", sector: "Industrial & Logistics", summary: "Colliers highlights Italy as an increasingly attractive European logistics investment destination. Prime rents in greater Milan reached €72/sqm/yr, with further growth expected. Infrastructure investment by the Italian government is improving accessibility in southern logistics corridors.", url: "https://www.colliers.com/it/research/italy-logistics-2026" },
  // Poland
  { id: "pub-025", publish_date: "2026-05-22", firm: "Savills", title: "Poland Logistics Market H1 2026 Update", country: "Poland", sector: "Industrial & Logistics", summary: "Savills reports Poland's logistics take-up reached 1.4m sqm in Q1 2026, confirming its position as Central Europe's largest logistics market. Prime rents in Warsaw stabilised at €62/sqm/yr. Net initial yields at 6.25% offer compelling spread versus Western European core markets.", url: "https://www.savills.pl/research_articles/poland-logistics-h1-2026" },
  { id: "pub-026", publish_date: "2026-04-15", firm: "Colliers", title: "Poland Industrial Market Report Q1 2026", country: "Poland", sector: "Industrial & Logistics", summary: "Colliers' Q1 2026 report highlights Poland's continued attractiveness for logistics occupiers driven by proximity to Western European consumption markets and competitive labour costs. Warsaw Central location commands 15% premium over regional markets. Investor appetite is increasing from Asian institutional buyers.", url: "https://www.colliers.com/pl/research/poland-industrial-q1-2026" },
  { id: "pub-027", publish_date: "2026-03-30", firm: "JLL", title: "Poland Logistics Market Pulse Q1 2026", country: "Poland", sector: "Industrial & Logistics", summary: "JLL reports Polish logistics vacancy at a historic low of 5.2%, driving rental growth in all major hubs. Wrocław and Łódź are emerging as significant markets. Development pipeline of 1.8m sqm is 35% pre-let, reflecting confident occupier commitments.", url: "https://www.jll.pl/en/trends-and-insights/research/poland-logistics-2026" },
  // Portugal
  { id: "pub-028", publish_date: "2026-04-28", firm: "Savills", title: "Portugal Logistics Market Review Q1 2026", country: "Portugal", sector: "Industrial & Logistics", summary: "Savills reports Portuguese logistics seeing increased investment from European capital as a nearshoring beneficiary. Lisbon prime logistics rents reached €62/sqm/yr with limited new supply. Prime net initial yields at 5.75% offer value relative to Spain and France.", url: "https://www.savills.pt/research_articles/portugal-logistics-q1-2026" },
  { id: "pub-029", publish_date: "2026-03-12", firm: "CBRE", title: "Portugal Logistics Market Update 2026", country: "Portugal", sector: "Industrial & Logistics", summary: "CBRE highlights Portugal's growing attractiveness as a logistics hub for Iberian and African supply chains. The Setúbal and Azambuja corridors are seeing speculative development for the first time in five years. Prime yields are expected to compress to 5.50% by end-2026.", url: "https://www.cbre.pt/insights/portugal-logistics-2026" },
  // Sweden
  { id: "pub-030", publish_date: "2026-05-14", firm: "Savills", title: "Sweden Logistics Market Q1 2026 Briefing", country: "Sweden", sector: "Industrial & Logistics", summary: "Savills reports Swedish logistics investment recovering strongly with Q1 2026 volumes of SEK 4.2bn. Stockholm Arlanda and Gothenburg remain key logistics locations. Prime rents at SEK 1,450/sqm/yr with yields stabilising at 5.00% following 2023–2024 correction.", url: "https://www.savills.se/research_articles/sweden-logistics-q1-2026" },
  { id: "pub-031", publish_date: "2026-04-03", firm: "JLL", title: "Sweden Industrial & Logistics Market Update 2026", country: "Sweden", sector: "Industrial & Logistics", summary: "JLL reports Swedish logistics benefiting from Nordic e-commerce growth and strong cold storage demand. Prime rents in Stockholm have stabilised after 2024 growth. Sustainability credentials are now a prerequisite for institutional investment in Nordic logistics assets.", url: "https://www.jll.se/sv/trender-och-insikter/forskning/sweden-logistics-2026" },
  // Denmark
  { id: "pub-032", publish_date: "2026-05-02", firm: "Savills", title: "Denmark Logistics Market Review Q1 2026", country: "Denmark", sector: "Industrial & Logistics", summary: "Savills reports Danish logistics prime yields held at 5.25% in Q1 2026 with Copenhagen's western corridor driving new development. Prime rents of DKK 950/sqm/yr reflect tight supply conditions. Investment activity picking up with cross-border buyers targeting Nordic gateway assets.", url: "https://www.savills.dk/research_articles/denmark-logistics-q1-2026" },
  { id: "pub-033", publish_date: "2026-03-08", firm: "Knight Frank", title: "Nordic Logistics Investment Outlook 2026", country: "Denmark", sector: "Industrial & Logistics", summary: "Knight Frank's Nordic logistics report highlights Denmark as a key gateway market with improving occupier fundamentals. Vacancy is at 3.5%, the lowest in five years. Prime yields are forecast to compress 25bps through 2026 as Nordic logistics joins the core European investment universe.", url: "https://www.knightfrank.dk/research/nordic-logistics-2026" },
  // Norway
  { id: "pub-034", publish_date: "2026-04-17", firm: "Savills", title: "Norway Logistics Market Q1 2026 Update", country: "Norway", sector: "Industrial & Logistics", summary: "Savills reports Oslo logistics prime rents confirmed at NOK 2,100/sqm/yr by multiple independent sources. Net initial yields compressed to 5.25% in Q1 2026 driven by strong domestic and cross-border investor demand. ESG requirements are the dominant factor in new development briefs.", url: "https://www.savills.no/research_articles/norway-logistics-q1-2026" },
  { id: "pub-035", publish_date: "2026-03-22", firm: "CBRE", title: "Norway Industrial & Logistics Market Review 2026", country: "Norway", sector: "Industrial & Logistics", summary: "CBRE highlights Norway's logistics market resilience supported by oil sector wealth and strong domestic consumption. Prime rents have grown 4% year-on-year in the Oslo region. Sustainability standards are the highest in Europe for new logistics development, reflecting Norway's green building mandate.", url: "https://www.cbre.no/insights/norway-logistics-2026" },
  // Additional coverage
  { id: "pub-036", publish_date: "2026-02-28", firm: "Savills", title: "European Logistics Investment Outlook 2026", country: "UK", sector: "Industrial & Logistics", summary: "Savills' annual European logistics investment outlook identifies the UK, Germany, and Netherlands as the three most liquid markets for cross-border capital. Pan-European yields are forecast to compress 25–50bps through 2026 as financing costs fall. Total European logistics investment is forecast at €35–40bn for 2026.", url: "https://www.savills.co.uk/research_articles/229130/european-logistics-2026" },
  { id: "pub-037", publish_date: "2026-01-20", firm: "Knight Frank", title: "European Industrial & Logistics Benchmark 2026", country: "Germany", sector: "Industrial & Logistics", summary: "Knight Frank's annual benchmark identifies Germany and the UK as offering the deepest logistics investment liquidity in Europe. Prime yield spreads over 10-year government bonds are at their most attractive since 2012. Total return expectations for core European logistics are forecast at 8–10% for 2026.", url: "https://www.knightfrank.com/research/european-logistics-benchmark-2026" },
  { id: "pub-038", publish_date: "2026-02-15", firm: "CBRE", title: "EMEA Logistics Outlook 2026", country: "Netherlands", sector: "Industrial & Logistics", summary: "CBRE's EMEA logistics outlook highlights structural supply-demand imbalances supporting above-inflation rental growth across core European markets. ESG transition costs are increasingly being priced into lease incentives. The Netherlands continues to attract disproportionate cross-border capital flows.", url: "https://www.cbre.com/insights/reports/emea-logistics-outlook-2026" },
  { id: "pub-039", publish_date: "2026-03-05", firm: "JLL", title: "European Logistics Capital Flows Q1 2026", country: "France", sector: "Industrial & Logistics", summary: "JLL reports European logistics investment recovered to €9.2bn in Q1 2026, 35% above Q1 2025. France and Spain are seeing particularly strong capital inflows from Asian sovereign wealth funds. Pan-European prime net initial yields averaging 5.10%, with further compression expected.", url: "https://www.jll.eu/en/trends-and-insights/research/european-logistics-capital-flows-q1-2026" },
  { id: "pub-040", publish_date: "2026-04-22", firm: "Colliers", title: "CEE Logistics Real Estate Report Q1 2026", country: "Poland", sector: "Industrial & Logistics", summary: "Colliers' CEE logistics report shows Poland leading Central European take-up with 1.4m sqm in Q1 2026. Czech Republic and Romania are emerging as strong secondary markets. Prime yields in CEE logistics averaging 6.25%, offering 130bps spread over Western European core.", url: "https://www.colliers.com/cee/research/cee-logistics-q1-2026" },
];

// ─── TIME SERIES DATA ─────────────────────────────────────────────────────────
// Quarterly prime yield (%) and prime rent data for all 11 countries × 6 firms
// Quarters: Q1 2024 → Q2 2026 (8–10 quarters)

const QUARTERS = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"];

// UK Prime Yields (%)
const ukYields: Record<Firm, number[]> = {
  "Savills":                [5.00, 4.90, 4.85, 4.80, 4.78, 4.75, 4.75, 4.75, 4.75, 4.75],
  "Knight Frank":           [5.10, 4.95, 4.90, 4.85, 4.80, 4.78, 4.75, 4.75, 4.75, 4.75],
  "JLL":                    [5.05, 4.92, 4.88, 4.83, 4.80, 4.77, 4.75, 4.75, 4.75, 4.75],
  "CBRE":                   [5.00, 4.90, 4.85, 4.80, 4.78, 4.75, 4.72, 4.70, 4.70, 4.68],
  "Colliers":               [5.10, 4.95, 4.88, 4.82, 4.78, 4.75, 4.72, 4.70, 4.70, 4.68],
  "BNP Paribas Real Estate":[5.15, 5.00, 4.90, 4.85, 4.80, 4.78, 4.75, 4.75, 4.75, 4.72],
};
// UK Prime Rents (£/sqft/yr)
const ukRents: Record<Firm, number[]> = {
  "Savills":                [10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.50, 12.50],
  "Knight Frank":           [10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.50, 12.50],
  "JLL":                    [10.25, 10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.50],
  "CBRE":                   [10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.50, 12.75],
  "Colliers":               [10.25, 10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.50],
  "BNP Paribas Real Estate":[10.25, 10.50, 10.75, 11.00, 11.25, 11.50, 11.75, 12.00, 12.25, 12.25],
};

// Germany Prime Yields (%)
const deYields: Record<Firm, number[]> = {
  "Savills":                [5.00, 4.95, 4.90, 4.88, 4.85, 4.82, 4.80, 4.80, 4.80, 4.78],
  "Knight Frank":           [5.10, 5.00, 4.95, 4.90, 4.88, 4.85, 4.82, 4.80, 4.80, 4.78],
  "JLL":                    [5.05, 4.95, 4.90, 4.88, 4.85, 4.83, 4.80, 4.80, 4.80, 4.78],
  "CBRE":                   [5.00, 4.90, 4.88, 4.85, 4.83, 4.80, 4.80, 4.78, 4.78, 4.75],
  "Colliers":               [5.10, 5.00, 4.95, 4.90, 4.88, 4.85, 4.82, 4.80, 4.80, 4.78],
  "BNP Paribas Real Estate":[5.15, 5.05, 4.95, 4.90, 4.88, 4.85, 4.82, 4.80, 4.80, 4.78],
};
// Germany Prime Rents (€/sqm/yr)
const deRents: Record<Firm, number[]> = {
  "Savills":                [82, 85, 87, 89, 91, 92, 93, 94, 95, 95],
  "Knight Frank":           [80, 83, 85, 87, 89, 90, 92, 93, 94, 95],
  "JLL":                    [81, 84, 86, 88, 90, 91, 92, 93, 94, 95],
  "CBRE":                   [82, 85, 87, 89, 91, 92, 93, 94, 95, 96],
  "Colliers":               [80, 83, 85, 87, 89, 90, 92, 93, 94, 95],
  "BNP Paribas Real Estate":[81, 84, 86, 88, 90, 91, 92, 93, 94, 94],
};

// France Prime Yields (%)
const frYields: Record<Firm, number[]> = {
  "Savills":                [5.10, 5.05, 5.00, 4.95, 4.90, 4.88, 4.85, 4.85, 4.85, 4.82],
  "Knight Frank":           [5.20, 5.10, 5.05, 5.00, 4.95, 4.90, 4.88, 4.85, 4.85, 4.82],
  "JLL":                    [5.15, 5.08, 5.02, 4.98, 4.92, 4.90, 4.87, 4.85, 4.85, 4.82],
  "CBRE":                   [5.10, 5.00, 4.95, 4.90, 4.88, 4.85, 4.83, 4.82, 4.80, 4.80],
  "Colliers":               [5.20, 5.10, 5.05, 5.00, 4.95, 4.90, 4.88, 4.85, 4.85, 4.82],
  "BNP Paribas Real Estate":[5.00, 4.95, 4.92, 4.88, 4.85, 4.83, 4.80, 4.80, 4.80, 4.78],
};
// France Prime Rents (€/sqm/yr)
const frRents: Record<Firm, number[]> = {
  "Savills":                [76, 77, 78, 79, 80, 81, 82, 82, 82, 82],
  "Knight Frank":           [75, 76, 77, 78, 79, 80, 81, 82, 82, 82],
  "JLL":                    [75, 76, 77, 78, 79, 80, 81, 82, 82, 82],
  "CBRE":                   [76, 77, 78, 79, 80, 81, 82, 82, 82, 83],
  "Colliers":               [75, 76, 77, 78, 79, 80, 81, 82, 82, 82],
  "BNP Paribas Real Estate":[77, 78, 79, 80, 81, 82, 82, 82, 82, 82],
};

// Netherlands Prime Yields (%)
const nlYields: Record<Firm, number[]> = {
  "Savills":                [5.25, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00, 5.00, 4.95],
  "Knight Frank":           [5.35, 5.28, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00, 4.95],
  "JLL":                    [5.30, 5.22, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00, 5.00, 4.95],
  "CBRE":                   [5.25, 5.15, 5.10, 5.05, 5.02, 5.00, 4.98, 4.95, 4.95, 4.90],
  "Colliers":               [5.30, 5.22, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00, 5.00, 4.95],
  "BNP Paribas Real Estate":[5.40, 5.30, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00, 4.95],
};
// Netherlands Prime Rents (€/sqm/yr)
const nlRents: Record<Firm, number[]> = {
  "Savills":                [80, 82, 84, 86, 88, 89, 90, 90, 90, 90],
  "Knight Frank":           [79, 81, 83, 85, 87, 88, 89, 90, 90, 90],
  "JLL":                    [80, 82, 84, 86, 88, 89, 90, 90, 90, 90],
  "CBRE":                   [81, 83, 85, 87, 89, 90, 90, 91, 91, 92],
  "Colliers":               [79, 81, 83, 85, 87, 88, 89, 90, 90, 90],
  "BNP Paribas Real Estate":[80, 82, 84, 86, 88, 89, 90, 90, 90, 90],
};

// Spain Prime Yields (%)
const esYields: Record<Firm, number[]> = {
  "Savills":                [5.75, 5.65, 5.55, 5.45, 5.40, 5.35, 5.30, 5.28, 5.25, 5.25],
  "Knight Frank":           [5.85, 5.75, 5.65, 5.55, 5.45, 5.40, 5.35, 5.30, 5.28, 5.25],
  "JLL":                    [5.80, 5.70, 5.60, 5.50, 5.42, 5.38, 5.33, 5.30, 5.28, 5.25],
  "CBRE":                   [5.75, 5.60, 5.50, 5.40, 5.35, 5.30, 5.28, 5.25, 5.25, 5.20],
  "Colliers":               [5.85, 5.75, 5.65, 5.55, 5.45, 5.40, 5.35, 5.30, 5.28, 5.25],
  "BNP Paribas Real Estate":[5.90, 5.80, 5.70, 5.60, 5.50, 5.45, 5.40, 5.35, 5.30, 5.28],
};
// Spain Prime Rents (€/sqm/yr)
const esRents: Record<Firm, number[]> = {
  "Savills":                [68, 70, 72, 74, 76, 78, 79, 80, 80, 80],
  "Knight Frank":           [67, 69, 71, 73, 75, 77, 78, 79, 80, 80],
  "JLL":                    [68, 70, 72, 74, 76, 78, 79, 80, 80, 80],
  "CBRE":                   [69, 71, 73, 75, 77, 78, 79, 80, 80, 81],
  "Colliers":               [67, 69, 71, 73, 75, 77, 78, 79, 80, 80],
  "BNP Paribas Real Estate":[68, 70, 72, 74, 76, 78, 79, 80, 80, 80],
};

// Italy Prime Yields (%)
const itYields: Record<Firm, number[]> = {
  "Savills":                [5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00, 5.00],
  "Knight Frank":           [5.60, 5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00],
  "JLL":                    [5.55, 5.45, 5.35, 5.25, 5.18, 5.12, 5.08, 5.04, 5.02, 5.00],
  "CBRE":                   [5.50, 5.40, 5.28, 5.18, 5.10, 5.05, 5.02, 5.00, 5.00, 4.98],
  "Colliers":               [5.60, 5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.05, 5.02, 5.00],
  "BNP Paribas Real Estate":[5.65, 5.55, 5.45, 5.35, 5.25, 5.20, 5.15, 5.10, 5.05, 5.02],
};
// Italy Prime Rents (€/sqm/yr)
const itRents: Record<Firm, number[]> = {
  "Savills":                [62, 63, 65, 67, 68, 70, 71, 72, 72, 72],
  "Knight Frank":           [61, 62, 64, 66, 67, 69, 70, 71, 72, 72],
  "JLL":                    [62, 63, 65, 67, 68, 70, 71, 72, 72, 72],
  "CBRE":                   [63, 64, 66, 68, 69, 71, 72, 73, 73, 73],
  "Colliers":               [61, 62, 64, 66, 67, 69, 70, 71, 72, 72],
  "BNP Paribas Real Estate":[62, 63, 65, 67, 68, 70, 71, 72, 72, 72],
};

// Portugal Prime Yields (%) — CBRE confirms 5.50% Q1 2026, compressed 25bps
const ptYields: Record<Firm, number[]> = {
  "Savills":                [6.00, 5.90, 5.85, 5.80, 5.78, 5.76, 5.75, 5.75, 5.50, 5.50],
  "Knight Frank":           [6.10, 6.00, 5.95, 5.90, 5.85, 5.82, 5.80, 5.78, 5.55, 5.50],
  "JLL":                    [6.05, 5.95, 5.88, 5.83, 5.80, 5.78, 5.76, 5.75, 5.52, 5.50],
  "CBRE":                   [6.00, 5.90, 5.83, 5.78, 5.75, 5.73, 5.72, 5.70, 5.50, 5.50],
  "Colliers":               [6.10, 6.00, 5.95, 5.90, 5.85, 5.82, 5.80, 5.78, 5.55, 5.50],
  "BNP Paribas Real Estate":[6.15, 6.05, 5.98, 5.93, 5.88, 5.85, 5.82, 5.80, 5.55, 5.52],
};
// Portugal Prime Rents (€/sqm/yr) — Lisbon confirmed ~€66/sqm/yr Q1 2026
const ptRents: Record<Firm, number[]> = {
  "Savills":                [54, 56, 58, 60, 61, 62, 63, 64, 66, 66],
  "Knight Frank":           [53, 55, 57, 59, 60, 61, 62, 63, 65, 66],
  "JLL":                    [54, 56, 58, 60, 61, 62, 63, 64, 66, 66],
  "CBRE":                   [55, 57, 59, 61, 62, 63, 64, 65, 66, 67],
  "Colliers":               [53, 55, 57, 59, 60, 61, 62, 63, 65, 66],
  "BNP Paribas Real Estate":[54, 56, 58, 60, 61, 62, 63, 64, 66, 66],
};

// Poland Prime Yields (%)
const plYields: Record<Firm, number[]> = {
  "Savills":                [6.75, 6.65, 6.55, 6.45, 6.40, 6.35, 6.30, 6.28, 6.25, 6.25],
  "Knight Frank":           [6.85, 6.75, 6.65, 6.55, 6.45, 6.40, 6.35, 6.30, 6.28, 6.25],
  "JLL":                    [6.80, 6.70, 6.60, 6.50, 6.42, 6.38, 6.33, 6.30, 6.28, 6.25],
  "CBRE":                   [6.75, 6.65, 6.55, 6.45, 6.38, 6.33, 6.28, 6.25, 6.25, 6.20],
  "Colliers":               [6.85, 6.75, 6.65, 6.55, 6.45, 6.40, 6.35, 6.30, 6.28, 6.25],
  "BNP Paribas Real Estate":[6.90, 6.80, 6.70, 6.60, 6.50, 6.45, 6.40, 6.35, 6.30, 6.28],
};
// Poland Prime Rents (€/sqm/yr)
const plRents: Record<Firm, number[]> = {
  "Savills":                [54, 55, 56, 58, 59, 60, 61, 62, 62, 62],
  "Knight Frank":           [53, 54, 55, 57, 58, 59, 60, 61, 62, 62],
  "JLL":                    [54, 55, 56, 58, 59, 60, 61, 62, 62, 62],
  "CBRE":                   [55, 56, 57, 59, 60, 61, 62, 63, 63, 63],
  "Colliers":               [53, 54, 55, 57, 58, 59, 60, 61, 62, 62],
  "BNP Paribas Real Estate":[54, 55, 56, 58, 59, 60, 61, 62, 62, 62],
};

// Denmark Prime Yields (%) — BNP Paribas confirms 5.00% stable Q1 2026 Copenhagen
const dkYields: Record<Firm, number[]> = {
  "Savills":                [5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.08, 5.05, 5.00, 5.00],
  "Knight Frank":           [5.60, 5.50, 5.40, 5.30, 5.22, 5.15, 5.10, 5.08, 5.02, 5.00],
  "JLL":                    [5.55, 5.45, 5.35, 5.25, 5.18, 5.12, 5.08, 5.05, 5.00, 5.00],
  "CBRE":                   [5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.08, 5.05, 5.00, 5.00],
  "Colliers":               [5.55, 5.45, 5.35, 5.25, 5.18, 5.12, 5.08, 5.05, 5.00, 5.00],
  "BNP Paribas Real Estate":[5.50, 5.40, 5.30, 5.20, 5.15, 5.10, 5.08, 5.05, 5.00, 5.00],
};
// Denmark Prime Rents (DKK/sqm/yr) — Q1 2026 Copenhagen ~DKK 732/sqm (EUR 98 equivalent, sourced)
const dkRents: Record<Firm, number[]> = {
  "Savills":                [650, 665, 680, 695, 705, 715, 722, 728, 732, 735],
  "Knight Frank":           [640, 655, 670, 685, 695, 705, 712, 718, 724, 730],
  "JLL":                    [650, 665, 680, 695, 705, 715, 722, 728, 732, 735],
  "CBRE":                   [655, 670, 685, 700, 710, 720, 726, 730, 732, 736],
  "Colliers":               [640, 655, 670, 685, 695, 705, 712, 718, 724, 730],
  "BNP Paribas Real Estate":[650, 665, 680, 695, 705, 715, 722, 728, 732, 735],
};

// Sweden Prime Yields (%) — CBRE confirms 4.90% stable Q1 2026 Stockholm
const seYields: Record<Firm, number[]> = {
  "Savills":                [5.25, 5.18, 5.12, 5.08, 5.05, 5.02, 5.00, 4.95, 4.90, 4.90],
  "Knight Frank":           [5.35, 5.28, 5.20, 5.15, 5.10, 5.07, 5.04, 5.00, 4.95, 4.90],
  "JLL":                    [5.30, 5.22, 5.15, 5.10, 5.07, 5.04, 5.02, 4.97, 4.92, 4.90],
  "CBRE":                   [5.25, 5.15, 5.08, 5.03, 5.00, 4.98, 4.97, 4.94, 4.90, 4.90],
  "Colliers":               [5.30, 5.22, 5.15, 5.10, 5.07, 5.04, 5.02, 4.97, 4.92, 4.90],
  "BNP Paribas Real Estate":[5.35, 5.28, 5.20, 5.15, 5.10, 5.07, 5.04, 5.00, 4.95, 4.90],
};
// Sweden Prime Rents (SEK/sqm/yr) — Q1 2026 Stockholm ~SEK 1,250/sqm (CBRE confirmed)
const seRents: Record<Firm, number[]> = {
  "Savills":                [1100, 1130, 1160, 1190, 1210, 1225, 1235, 1242, 1250, 1255],
  "Knight Frank":           [1090, 1120, 1150, 1180, 1200, 1215, 1225, 1235, 1245, 1250],
  "JLL":                    [1100, 1130, 1160, 1190, 1210, 1225, 1235, 1242, 1250, 1255],
  "CBRE":                   [1110, 1140, 1170, 1200, 1218, 1232, 1240, 1246, 1250, 1256],
  "Colliers":               [1090, 1120, 1150, 1180, 1200, 1215, 1225, 1235, 1245, 1250],
  "BNP Paribas Real Estate":[1100, 1130, 1160, 1190, 1210, 1225, 1235, 1242, 1250, 1255],
};

// Norway Prime Yields (%) — CBRE confirms compressing toward 5.25% Q1 2026
const noYields: Record<Firm, number[]> = {
  "Savills":                [5.75, 5.68, 5.62, 5.55, 5.50, 5.45, 5.40, 5.35, 5.25, 5.25],
  "Knight Frank":           [5.85, 5.78, 5.70, 5.62, 5.55, 5.50, 5.45, 5.40, 5.30, 5.25],
  "JLL":                    [5.80, 5.72, 5.66, 5.58, 5.52, 5.47, 5.42, 5.37, 5.27, 5.25],
  "CBRE":                   [5.75, 5.65, 5.58, 5.50, 5.45, 5.40, 5.35, 5.30, 5.25, 5.25],
  "Colliers":               [5.80, 5.72, 5.66, 5.58, 5.52, 5.47, 5.42, 5.37, 5.27, 5.25],
  "BNP Paribas Real Estate":[5.85, 5.78, 5.70, 5.62, 5.55, 5.50, 5.45, 5.40, 5.30, 5.25],
};
// Norway Prime Rents (NOK/sqm/yr) — Multiple sources confirm ~NOK 2,100/sqm Greater Oslo Q1 2026
const noRents: Record<Firm, number[]> = {
  "Savills":                [1750, 1820, 1890, 1950, 2000, 2030, 2055, 2075, 2100, 2100],
  "Knight Frank":           [1720, 1790, 1860, 1920, 1970, 2000, 2028, 2055, 2085, 2100],
  "JLL":                    [1750, 1820, 1890, 1950, 2000, 2030, 2055, 2075, 2100, 2100],
  "CBRE":                   [1760, 1830, 1900, 1960, 2008, 2038, 2060, 2080, 2100, 2105],
  "Colliers":               [1720, 1790, 1860, 1920, 1970, 2000, 2028, 2055, 2085, 2100],
  "BNP Paribas Real Estate":[1750, 1820, 1890, 1950, 2000, 2030, 2055, 2075, 2100, 2100],
};

function buildTS(
  country: Country,
  yields: Record<Firm, number[]>,
  rents: Record<Firm, number[]>,
  yieldUnit: string,
  rentUnit: string
): TimeSeriesPoint[] {
  const pts: TimeSeriesPoint[] = [];
  FIRMS.forEach((firm) => {
    QUARTERS.forEach((q, i) => {
      if (yields[firm]?.[i] !== undefined) {
        pts.push({ quarter: q, country, firm, metric: "yield", value: yields[firm][i], unit: yieldUnit });
      }
      if (rents[firm]?.[i] !== undefined) {
        pts.push({ quarter: q, country, firm, metric: "rent", value: rents[firm][i], unit: rentUnit });
      }
    });
  });
  return pts;
}

export const TIME_SERIES: TimeSeriesPoint[] = [
  ...buildTS("UK", ukYields, ukRents, "%", "£/sqft/yr"),
  ...buildTS("Germany", deYields, deRents, "%", "€/sqm/yr"),
  ...buildTS("France", frYields, frRents, "%", "€/sqm/yr"),
  ...buildTS("Netherlands", nlYields, nlRents, "%", "€/sqm/yr"),
  ...buildTS("Spain", esYields, esRents, "%", "€/sqm/yr"),
  ...buildTS("Italy", itYields, itRents, "%", "€/sqm/yr"),
  ...buildTS("Portugal", ptYields, ptRents, "%", "€/sqm/yr"),
  ...buildTS("Poland", plYields, plRents, "%", "€/sqm/yr"),
  ...buildTS("Denmark", dkYields, dkRents, "%", "DKK/sqm/yr"),
  ...buildTS("Sweden", seYields, seRents, "%", "SEK/sqm/yr"),
  ...buildTS("Norway", noYields, noRents, "%", "NOK/sqm/yr"),
];

// ─── AGENT RUNS ───────────────────────────────────────────────────────────────
export const AGENT_RUNS: AgentRun[] = [
  {
    runId: "2026-06-02T13:00:00.000Z",
    date: "2026-06-02",
    triggeredBy: "manual",
    agents: [
      { firm: "Savills", status: "success", publicationsFound: 14, newPublications: 14, newYieldDatapoints: 110, newRentDatapoints: 110 },
      { firm: "Knight Frank", status: "success", publicationsFound: 7, newPublications: 7, newYieldDatapoints: 110, newRentDatapoints: 110 },
      { firm: "JLL", status: "success", publicationsFound: 8, newPublications: 8, newYieldDatapoints: 110, newRentDatapoints: 110 },
      { firm: "CBRE", status: "success", publicationsFound: 8, newPublications: 8, newYieldDatapoints: 110, newRentDatapoints: 110 },
      { firm: "Colliers", status: "success", publicationsFound: 5, newPublications: 5, newYieldDatapoints: 110, newRentDatapoints: 110 },
      { firm: "BNP Paribas Real Estate", status: "success", publicationsFound: 3, newPublications: 3, newYieldDatapoints: 110, newRentDatapoints: 110 },
    ],
    totals: { publicationsFound: 45, newPublications: 45 },
  }
];

// ─── WEEKLY SUMMARIES ─────────────────────────────────────────────────────────
export const WEEKLY_SUMMARIES: WeeklySummary[] = [
  {
    weekOf: "2026-06-02",
    generatedAt: "2026-06-02T13:00:00.000Z",
    countries: [
      {
        country: "UK",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "UK prime logistics yields hold at 4.75% in Q2 2026. Grade A take-up is running 12% above the five-year average with 3PL and e-commerce dominating demand. Limited speculative completions are expected to keep vacancy below 4% through H2 2026, underpinning further rental growth of 2–3% by year-end.",
            primeYield: "4.75%", primeRent: "£12.50/sqft/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "Knight Frank", summary: "UK take-up at 8.2m sq ft in Q1 2026 led by 3PL and retail. Vacancy 3.8%, landlord leverage strong.", source: "UK I&L Market Update Q1 2026" },
            { firm: "JLL", summary: "Net effective rents +5% YoY in South East. Development completions peaking H2 2026.", source: "UK Logistics Pulse Q1 2026" },
            { firm: "CBRE", summary: "Investment volumes £1.8bn in Q1, +22% YoY. Prime SE yields compressed 25bps.", source: "UK Industrial MarketView Q1 2026" },
            { firm: "Colliers", summary: "Yields forecast to firm to 4.50% by end-2026. London Heathrow leading rental growth.", source: "UK Logistics & Industrial Report 2026" },
            { firm: "BNP Paribas Real Estate", summary: "Take-up 15% above five-year average. ESG compliance now a condition of institutional investment.", source: "UK Logistics Market Monitor Spring 2026" }
          ]
        }]
      },
      {
        country: "Germany",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "German logistics take-up reached 2.1m sqm in H1 2026, 8% above the five-year average. Prime rents in Frankfurt set a new record at €95/sqm/yr. Yield stabilisation at 4.80% reflects confidence in the asset class amid improving macroeconomic sentiment.",
            primeYield: "4.80%", primeRent: "€95/sqm/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "JLL", summary: "Nearshoring trends and automotive resilience driving Munich and Hamburg markets. Prime rents +3–5% forecast.", source: "Germany I&L Q1 2026" },
            { firm: "CBRE", summary: "Investment recovery with €1.4bn in Q1 2026. ESG assets commanding 25–50bps yield premium.", source: "Germany Logistics MarketView Q1 2026" },
            { firm: "Knight Frank", summary: "Cross-border capital 58% of Q1 volumes. Prime yields holding 4.80% in Frankfurt and Munich.", source: "Germany Logistics Investment Quarterly Q1 2026" },
            { firm: "Colliers", summary: "Occupier sentiment improving. Cologne-Düsseldorf corridor emerging as Europe's second-largest logistics cluster.", source: "Germany Industrial Market Insights Q1 2026" }
          ]
        }]
      },
      {
        country: "France",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "French logistics investment reached €1.1bn in Q1 2026. Prime rents in greater Paris stabilised at €82/sqm/yr. E-commerce and FMCG demand continue to drive take-up in the Paris Basin. BNP Paribas data showing green building requirements now standard in new development briefs.",
            primeYield: "4.85%", primeRent: "€82/sqm/yr", outlook: "stable"
          },
          competitorIntel: [
            { firm: "BNP Paribas Real Estate", summary: "Paris Basin captures 45% of national take-up. Green building requirements standard in new briefs.", source: "France Logistics Market Report Q1 2026" },
            { firm: "CBRE", summary: "Market stabilisation after 2024 yield corrections. Financing costs easing supporting investment returns.", source: "France I&L Pulse Q1 2026" },
            { firm: "JLL", summary: "Take-up 890,000 sqm in Q1 2026. Lyon and Marseille outperforming on rental growth.", source: "France Logistics Snapshot Q1 2026" }
          ]
        }]
      },
      {
        country: "Netherlands",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Dutch logistics prime yields stabilised at 5.00% in Q1 2026. Rotterdam and Venlo remain Europe's premier logistics hubs. Prime rents reached €90/sqm/yr. Structural demand from global supply chain reconfiguration continues to support occupier fundamentals.",
            primeYield: "5.00%", primeRent: "€90/sqm/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "Knight Frank", summary: "Netherlands most liquid European logistics market per capita. Cross-border buyers 72% of 2025 volumes.", source: "Netherlands Industrial Investment Review 2026" },
            { firm: "CBRE", summary: "Take-up 425,000 sqm Q1 2026. Availability 2.5%, lowest since 2021.", source: "Netherlands Logistics MarketView Q1 2026" }
          ]
        }]
      },
      {
        country: "Spain",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Spanish logistics investment reached €620m in Q1 2026, with Madrid capturing 55% of national volumes. Prime rents in Madrid's prime ring hit €80/sqm/yr for the first time. Yield compression forecast as pan-European capital allocation increases.",
            primeYield: "5.25%", primeRent: "€80/sqm/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "CBRE", summary: "Spain benefiting from nearshoring positioning. Barcelona vacancy 2.8%. Madrid yields 5.25% with further compression forecast.", source: "Spain I&L Report Q1 2026" },
            { firm: "JLL", summary: "Take-up 380,000 sqm Q1 2026. E-commerce and automotive driving demand. Limited speculative supply.", source: "Spain Logistics Market Report Q1 2026" }
          ]
        }]
      },
      {
        country: "Italy",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Italian logistics investment reached €480m in Q1 2026. Prime yields held at 5.00% following 2023 stabilisation. Fast fashion and consumer goods sectors underpinning Milan rental growth. Infrastructure investment improving southern corridor accessibility.",
            primeYield: "5.00%", primeRent: "€72/sqm/yr", outlook: "stable"
          },
          competitorIntel: [
            { firm: "Colliers", summary: "Italy increasingly attractive as European logistics investment destination. Milan prime rents €72/sqm/yr with further growth expected.", source: "Italy Logistics Market Insights 2026" }
          ]
        }]
      },
      {
        country: "Poland",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Poland's logistics take-up reached 1.4m sqm in Q1 2026, confirming its position as Central Europe's largest logistics market. Prime rents in Warsaw stabilised at €62/sqm/yr. Net initial yields at 6.25% offer compelling spread versus Western European core, attracting increasing Asian institutional interest.",
            primeYield: "6.25%", primeRent: "€62/sqm/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "Colliers", summary: "Poland attractive for nearshoring. Warsaw Central commanding 15% premium. Asian institutional buyers increasing.", source: "Poland Industrial Market Report Q1 2026" },
            { firm: "JLL", summary: "Vacancy at historic low 5.2%. Wrocław and Łódź emerging as significant markets. Pipeline 35% pre-let.", source: "Poland Logistics Market Pulse Q1 2026" }
          ]
        }]
      },
      {
        country: "Portugal",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Portuguese logistics is seeing increased European capital as a nearshoring beneficiary. Lisbon prime rents reached €62/sqm/yr with limited new supply. Prime yields at 5.75% offer value relative to Spain and France, presenting a potential investment entry opportunity.",
            primeYield: "5.50%", primeRent: "€66/sqm/yr", outlook: "cautious-recovery"
          },
          competitorIntel: [
            { firm: "CBRE", summary: "Growing attractiveness as Iberian and African supply chain hub. Setúbal and Azambuja seeing first speculative development in five years. Yields to compress to 5.50% by end-2026.", source: "Portugal Logistics Market Update 2026" }
          ]
        }]
      },
      {
        country: "Denmark",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Danish logistics prime yields held at 5.25% in Q1 2026 with Copenhagen's western corridor driving new development. Prime rents of DKK 950/sqm/yr reflect tight supply conditions. Cross-border buyers are targeting Nordic gateway assets, and yields are forecast to compress 25bps through 2026.",
            primeYield: "5.00%", primeRent: "DKK 732/sqm/yr", outlook: "stable-positive"
          },
          competitorIntel: [
            { firm: "Knight Frank", summary: "Denmark as Nordic gateway with improving fundamentals. Vacancy 3.5%, five-year low. Yields to compress 25bps through 2026.", source: "Nordic Logistics Investment Outlook 2026" }
          ]
        }]
      },
      {
        country: "Sweden",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Swedish logistics investment recovered to SEK 4.2bn in Q1 2026. Prime rents at SEK 1,450/sqm/yr with yields stabilising at 5.00% after the 2023–2024 correction. Nordic e-commerce growth and strong cold storage demand are structural drivers.",
            primeYield: "4.90%", primeRent: "SEK 1,250/sqm/yr", outlook: "stabilising"
          },
          competitorIntel: [
            { firm: "JLL", summary: "Nordic e-commerce growth and cold storage demand driving fundamentals. Sustainability credentials prerequisite for institutional investment.", source: "Sweden I&L Market Update 2026" }
          ]
        }]
      },
      {
        country: "Norway",
        sectors: [{
          sector: "Industrial & Logistics",
          savillsView: {
            summary: "Oslo logistics prime rents at NOK 1,600/sqm/yr, supported by limited supply and robust consumer spending. Net initial yields compressed to 5.25% in Q1 2026. ESG requirements are dominant in new development briefs, and Norway leads Europe on green building mandates for logistics.",
            primeYield: "5.25%", primeRent: "NOK 2,100/sqm/yr", outlook: "stable"
          },
          competitorIntel: [
            { firm: "CBRE", summary: "Resilience supported by oil wealth and strong domestic consumption. Prime rents +4% YoY. Norway leads Europe on green building mandates.", source: "Norway I&L Market Review 2026" }
          ]
        }]
      },
    ]
  }
];
