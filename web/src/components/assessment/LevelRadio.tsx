import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LEVEL_LABELS, LEVEL_DESCRIPTIONS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface LevelRadioProps {
  value: number;
  onChange: (level: number) => void;
  disabled?: boolean;
  className?: string;
}

export default function LevelRadio({ value, onChange, disabled, className }: LevelRadioProps) {
  return (
    <RadioGroup
      value={String(value)}
      onValueChange={(v) => onChange(Number(v))}
      disabled={disabled}
      className={cn("grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 w-full", className)}
    >
      {[1, 2, 3, 4, 5].map((level) => {
        const isSelected = value === level;
        return (
          <Label
            key={level}
            htmlFor={`level-${level}`}
            className={cn(
              "relative flex items-center sm:flex-col sm:items-start justify-between sm:justify-center p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none",
              isSelected
                ? "bg-teal-50/80 border-[#01959f] shadow-sm text-slate-900 ring-2 ring-[#01959f]/20 scale-[1.01]"
                : "bg-white border-slate-200/90 hover:border-teal-300 hover:bg-slate-50/80 text-slate-700",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
          >
            <div className="flex items-center gap-2.5 w-full">
              <RadioGroupItem
                value={String(level)}
                id={`level-${level}`}
                className={cn(
                  "border-slate-300 text-[#01959f] focus:ring-[#01959f]",
                  isSelected && "border-[#01959f]"
                )}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-black tracking-tight",
                    isSelected ? "text-[#01959f]" : "text-slate-800"
                  )}
                >
                  {LEVEL_LABELS[level]}
                </span>
                <span className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">
                  {LEVEL_DESCRIPTIONS[level]}
                </span>
              </div>
            </div>
          </Label>
        );
      })}
    </RadioGroup>
  );
}
