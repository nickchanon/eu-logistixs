import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Overview from "./pages/Overview";
import Publications from "./pages/Publications";
import YieldsRents from "./pages/YieldsRents";
import CoverageGaps from "./pages/CoverageGaps";
import AddEntry from "./pages/AddEntry";
import AgentLog from "./pages/AgentLog";

// Icons
import {
  LayoutDashboard, FileText, TrendingUp, AlertTriangle,
  PlusCircle, Bot, Menu, X, Sun, Moon, ChevronLeft
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/publications", label: "Publications", icon: FileText },
  { href: "/yields", label: "Yields & Rents", icon: TrendingUp },
  { href: "/coverage", label: "Coverage Gaps", icon: AlertTriangle },
  { href: "/add", label: "Add Entry", icon: PlusCircle },
  { href: "/log", label: "Agent Log", icon: Bot },
];

function NavItem({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: any; onClick?: () => void }) {
  const [location] = useLocation();
  const active = location === href;
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
          active
            ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
        data-testid={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <Icon size={16} className={active ? "text-amber-400" : ""} />
        <span>{label}</span>
        {active && <div className="ml-auto w-1 h-1 rounded-full bg-amber-400" />}
      </a>
    </Link>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="EU Logistics Intelligence">
        <rect width="28" height="28" rx="6" fill="#F59E0B" />
        <path d="M7 14h14M14 7v14M7 10l7-3 7 3M7 18l7 3 7-3" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <div className="text-xs font-bold tracking-wider text-amber-400 uppercase leading-none">EU Logistics</div>
        <div className="text-[10px] text-slate-500 leading-none mt-0.5">Research Intelligence</div>
      </div>
    </div>
  );
}

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar: icon-only on tablet (md=768-1023px), full on desktop (lg=1024px+) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 bg-slate-900 border-r border-slate-800 transition-all duration-200 w-16 lg:w-56">
        <div className="flex items-center justify-between p-3 border-b border-slate-800 h-14">
          {/* Logo: full on lg, icon-only on md */}
          <div className="hidden lg:flex items-center"><Logo /></div>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="flex lg:hidden flex-shrink-0">
            <rect width="28" height="28" rx="6" fill="#F59E0B"/>
            <path d="M7 14h14M14 7v14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const [loc] = useLocation();
            const active = loc === href;
            return (
              <Link key={href} href={href}>
                <a className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}>
                  <Icon size={18} className={`flex-shrink-0 mx-auto lg:mx-0 ${active ? 'text-amber-400' : ''}`} />
                  <span className="hidden lg:block truncate">{label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-slate-800">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 w-full text-sm"
            data-testid="toggle-theme"
          >
            {dark ? <Sun size={16} className="flex-shrink-0 mx-auto lg:mx-0" /> : <Moon size={16} className="flex-shrink-0 mx-auto lg:mx-0" />}
            <span className="hidden lg:block">{dark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <div className="mt-2 px-2 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 hidden lg:block">
            <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Savills Internal</div>
            <div className="text-[10px] text-slate-500 mt-0.5">6 firms · 11 markets</div>
          </div>
        </div>
      </aside>

      {/* Main content: offset by icon-sidebar on md, full sidebar on lg */}
      <main className="flex-1 flex flex-col min-h-screen transition-all duration-200 md:ml-16 lg:ml-56">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-400 hover:text-slate-200" data-testid="open-mobile-menu">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 md:hidden">
            <Logo />
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live · Q2 2026
            </span>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 md:hidden" data-testid="toggle-theme-mobile">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Mobile overlay menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-64 bg-slate-900 h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <Logo />
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-200"><X size={20} /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {NAV_ITEMS.map(item => (
                  <NavItem key={item.href} {...item} onClick={() => setMobileMenuOpen(false)} />
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="flex-1 p-4 md:p-5 lg:p-6 pb-20 md:pb-5 lg:pb-6">
          <Switch>
            <Route path="/" component={Overview} />
            <Route path="/publications" component={Publications} />
            <Route path="/yields" component={YieldsRents} />
            <Route path="/coverage" component={CoverageGaps} />
            <Route path="/add" component={AddEntry} />
            <Route path="/log" component={AgentLog} />
          </Switch>
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 safe-bottom flex">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const [location] = useLocation();
            const active = location === href;
            return (
              <Link key={href} href={href}>
                <a className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 text-[10px] font-medium ${active ? "text-amber-400" : "text-slate-500"}`}>
                  <Icon size={18} />
                  <span className="truncate">{label.split(" ")[0]}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

export default function App() {
  // Set dark class immediately to prevent flash
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <AppInner />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}
