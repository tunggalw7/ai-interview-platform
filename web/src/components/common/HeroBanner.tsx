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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50/60 via-white to-amber-50/40 p-6 sm:p-8 lg:p-10 shadow-sm shadow-slate-900/5 mb-8"
    >
      {/* Decorative ambient radial orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#fbc036]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Headlines, bullets, and CTAs */}
        <div className="md:col-span-7 space-y-4 sm:space-y-5">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01808a] bg-teal-100/70 border border-teal-200/80 px-3 py-1 rounded-full shadow-2xs">
              <span>{badgeText}</span>
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {title}{" "}
              {highlightText && (
                <span className="text-[#01959f] underline decoration-[#fbc036] decoration-4 underline-offset-4">
                  {highlightText}
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Checklist bullets */}
          {bulletPoints && bulletPoints.length > 0 && (
            <div className="space-y-2 pt-0.5">
              {bulletPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#01959f] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons in #fbc036 */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              {primaryAction && (
                <Button
                  variant="cta"
                  size="lg"
                  onClick={primaryAction.onClick}
                  className="rounded-xl px-5 sm:px-6 font-bold text-xs sm:text-sm shadow-md shadow-amber-400/20"
                >
                  {primaryAction.icon}
                  <span>{primaryAction.label}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              )}

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryAction.onClick}
                  className="rounded-xl px-4 sm:px-5 font-semibold text-xs sm:text-sm bg-white/90 border-slate-200 hover:bg-slate-50 text-slate-700"
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Seamless Cutout or Clean Photo Card */}
        <div className="hidden md:flex md:col-span-5 items-center justify-center relative">
          {imageSrc.includes("hero-rakamin-logo") || imageSrc.includes("rakamin-logo") ? (
            /* Organic Transparent Cutout: No boxed frame, natural floating illustration */
            <div className="relative w-full max-w-[320px] lg:max-w-[380px] flex items-center justify-center">
              {/* Soft ambient aura blur behind cutout */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#01959f]/20 via-[#fbc036]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-full h-auto max-h-[300px] object-contain drop-shadow-xl select-none pointer-events-none"
              />

              {/* Floating verification badge */}
              {imageFloatingBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute bottom-2 -left-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-lg shadow-slate-900/5 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#01959f] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none">
                      {imageFloatingBadge.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {imageFloatingBadge.subtitle}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Real Photography Card: Modern rounded-2xl photo frame with clean aspect ratio */
            <div className="relative w-full max-w-[320px] lg:max-w-[360px] aspect-4/3 rounded-2xl overflow-hidden shadow-xl shadow-teal-950/10 border-2 border-white/90 group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover select-none"
              />

              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating verification badge */}
              {imageFloatingBadge && (
                <div className="absolute bottom-2 left-2 right-2 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 border border-white/60 shadow-md flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#01959f] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate">
                      {imageFloatingBadge.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {imageFloatingBadge.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
