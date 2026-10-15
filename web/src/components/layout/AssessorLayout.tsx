import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { tenantAtom } from "@/stores/tenantAtom";
import { authAtom, clearToken } from "@/stores/authAtom";
import { Button } from "@/components/ui/button";
import { ClipboardList, Briefcase, LogOut, Building, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/common/PageLoader";
import PageTransition from "@/components/common/PageTransition";
import { AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/vacancies", label: "Role Vacancies", icon: Briefcase },
];

export default function AssessorLayout() {
  const tenant = useAtomValue(tenantAtom);
  const setAuth = useSetAtom(authAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearToken();
    setAuth({ token: null });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* Top animated page loader bar on route changes */}
      <PageLoader />

      {/* Brand accent gradient bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#01959f] via-teal-400 to-[#fbc036] w-full" />

      {/* Top sticky header */}
      <header className="border-b border-border/70 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/assessments" className="flex items-center gap-3 group">
              <img
                src="/images/rakamin-logo.png"
                alt="Rakamin"
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-102"
              />
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
                <Award className="h-4 w-4 text-[#01959f]" />
                <span className="text-xs font-bold text-slate-700 tracking-tight">
                  Talent Assessment
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = location.pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    to={href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all",
                      isActive
                        ? "bg-[#01959f]/10 text-[#01959f] shadow-2xs"
                        : "text-muted-foreground hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Tenant context & Profile actions */}
          <div className="flex items-center gap-3">
            {tenant.name && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 bg-teal-50/70 border border-teal-200/60 rounded-full px-3 py-1">
                <Building className="h-3 w-3 text-[#01959f]" />
                <span className="text-muted-foreground font-normal">Org:</span>
                <span className="font-semibold text-slate-800">{tenant.name}</span>
              </div>
            )}

            <div className="h-4 w-[1px] bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#01959f]/15 text-[#01959f] text-xs font-bold flex items-center justify-center border border-[#01959f]/30">
                RA
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Sign out of account"
              >
                <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content with animated transition */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}
