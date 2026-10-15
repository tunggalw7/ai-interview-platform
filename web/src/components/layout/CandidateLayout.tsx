import { Outlet } from "react-router-dom";
import PageLoader from "@/components/common/PageLoader";

export default function CandidateLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <PageLoader />
      {/* Brand accent gradient bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#01959f] via-teal-400 to-[#fbc036] w-full" />

      {/* Minimal header */}
      <header className="border-b border-border/70 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/rakamin-logo.png"
              alt="Rakamin"
              className="h-7 w-auto object-contain"
            />
            <span className="text-xs font-semibold text-slate-500 pl-3 border-l border-slate-200">
              Interactive AI Interview Session
            </span>
          </div>
          <div className="text-[11px] font-semibold text-[#01959f] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Secure Candidate Portal
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
