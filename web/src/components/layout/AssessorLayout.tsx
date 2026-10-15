import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { tenantAtom } from "@/stores/tenantAtom";
import { authAtom, clearToken } from "@/stores/authAtom";
import { Button } from "@/components/ui/button";
import { Sparkles, ClipboardList, Briefcase, LogOut, Building } from "lucide-react";
import { cn } from "@/lib/utils";

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
      {/* Brand accent gradient bar */}
      <div className="h-[3px] bg-gradient-to-r from-teal-500 via-primary to-amber-400 w-full" />

      {/* Top sticky header */}
      <header className="border-b border-border/70 bg-background/80 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/assessments" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-foreground leading-none">
                  Rakamin AI
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
                  Assessor Suite
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
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 bg-muted/60 border border-border/80 rounded-full px-3 py-1">
                <Building className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground font-normal">Org:</span>
                <span className="font-semibold">{tenant.name}</span>
              </div>
            )}

            <div className="h-4 w-[1px] bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                AD
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

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
