import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBannerProps {
  badgeText?: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  bulletPoints?: string[];
  primaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
  imageSrc?: string;
  imageAlt?: string;
  imageFloatingBadge?: {
    title: string;
    subtitle: string;
  };
  variant?: "card" | "wide";
}

export default function HeroBanner({
  badgeText = "⭐️ AI-Powered Talent Evaluation Platform",
  title,
  highlightText,
  subtitle,
  bulletPoints = [
    "Wawancara Suara AI Berbasis Taksonomi Kompetensi B7",
    "Pemetaan Otomatis 4 Tingkat Coverage (0% s/d 100%)",
    "Analisis Fit/Gap Objektif dengan Human Override Governance",
  ],
  primaryAction,
  secondaryAction,
  imageSrc = "/images/hero-rakamin-logo.png",
  imageAlt = "Rakamin Talent",
  imageFloatingBadge = {
    title: "100% Objektif",
    subtitle: "UU PDP Compliant",
  },
  variant = "card",
}: HeroBannerProps) {
  if (variant === "wide") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#01959f] via-[#01808a] to-[#016870] text-white p-6 sm:p-10 shadow-lg shadow-teal-900/10 mb-6">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-2">
          {badgeText && (
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs mb-1">
              {badgeText}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {title}{" "}
            {highlightText && <span className="text-[#fbc036]">{highlightText}</span>}
          </h1>
          <p className="text-sm sm:text-base text-teal-50 font-normal leading-relaxed">
            {subtitle}
          </p>

          {primaryAction && (
            <div className="pt-4 flex items-center gap-3">
              <Button
                variant="cta"
                onClick={primaryAction.onClick}
                className="shadow-md"
              >
                {primaryAction.icon}
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button
                  variant="outline"
                  onClick={secondaryAction.onClick}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {imageSrc && (
          <div className="hidden lg:block absolute right-4 bottom-0 top-0 w-80 pointer-events-none">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-contain object-bottom drop-shadow-xl"
            />
          </div>
        )}
      </div>
    );
  }

  // Card variant (inspired by Reference Image 2)
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full relative overflow-hidden rounded-2xl border border-teal-100/80 bg-gradient-to-r from-teal-50/70 via-white to-amber-50/40 p-3.5 sm:py-3.5 sm:px-5 lg:px-6 shadow-xs mb-5"
    >
      {/* Decorative ambient radial orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[240px] h-[240px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[200px] h-[200px] rounded-full bg-[#fbc036]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Column: Headlines, bullets chips, and CTAs */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {badgeText && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#01808a] bg-teal-100/80 border border-teal-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                {badgeText}
              </span>
            )}
            <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900 leading-snug">
              {title}{" "}
              {highlightText && (
                <span className="text-[#01959f] underline decoration-[#fbc036] decoration-2 underline-offset-4">
                  {highlightText}
                </span>
              )}
            </h1>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {/* Compact checklist chips */}
          {bulletPoints && bulletPoints.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {bulletPoints.map((point, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-white/90 border border-teal-100/90 px-2 py-0.5 rounded-md shadow-2xs"
                >
                  <CheckCircle2 className="h-3 w-3 text-[#01959f] shrink-0" />
                  <span className="truncate max-w-[280px] sm:max-w-none">{point}</span>
                </span>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {primaryAction && (
                <Button
                  variant="cta"
                  size="sm"
                  onClick={primaryAction.onClick}
                  className="rounded-xl px-3.5 font-bold text-xs shadow-xs h-8"
                >
                  {primaryAction.icon}
                  <span>{primaryAction.label}</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={secondaryAction.onClick}
                  className="rounded-xl px-3 font-semibold text-xs bg-white/90 border-slate-200 hover:bg-slate-50 text-slate-700 h-8"
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Compact illustration or photo */}
        <div className="hidden sm:flex shrink-0 items-center justify-end relative self-center">
          {imageSrc.includes("hero-rakamin-logo") || imageSrc.includes("rakamin-logo") ? (
            <div className="relative w-auto flex items-center justify-center">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#01959f]/20 via-[#fbc036]/15 to-transparent rounded-full blur-lg pointer-events-none" />
              <img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-16 sm:h-20 lg:h-24 w-auto object-contain drop-shadow-sm select-none pointer-events-none"
              />
              {imageFloatingBadge && (
                <div className="absolute -bottom-1 -left-2 z-20 bg-white/95 backdrop-blur-md rounded-lg py-1 px-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-[#01959f] text-white flex items-center justify-center font-bold text-[9px]">
                    ✓
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 leading-none">
                      {imageFloatingBadge.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-28 sm:w-36 lg:w-44 h-16 sm:h-20 lg:h-22 rounded-xl overflow-hidden shadow-xs border border-white/90 group">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              {imageFloatingBadge && (
                <div className="absolute bottom-1 left-1 right-1 z-20 bg-white/95 backdrop-blur-md rounded-md py-0.5 px-1.5 border border-white/60 shadow-2xs flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-[#01959f] text-white flex items-center justify-center font-bold text-[8px] shrink-0">
                    ✓
                  </div>
                  <p className="text-[9px] font-bold text-slate-900 leading-none truncate">
                    {imageFloatingBadge.title}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
