import { motion } from "framer-motion";
import type { HabitMeta } from "../types";
import { useIntl } from "../hooks/intl/useIntl";
import { TRANSLATION_KEY } from "../hooks/intl/translationKeys";

interface HabitCardProps {
  habit: HabitMeta;
  checked: boolean;
  relapsedToday: boolean;
  currentStreak: number;
  maxStreak: number;
  progress: number;
  onToggle: () => void;
  onRelapse: () => void;
}

export function HabitCard({
  habit,
  checked,
  relapsedToday,
  currentStreak,
  maxStreak,
  progress,
  onToggle,
  onRelapse,
}: HabitCardProps) {
  const t = useIntl();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl border border-white/15 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">
            <span className="inline-flex items-center gap-2">
              <img src={habit.icon} alt="" className="h-10 w-10 rounded-md object-cover" />
              {habit.label}
            </span>
          </p>
          <p className="text-sm text-white/65">
            {t(TRANSLATION_KEY.CURRENT_STREAK, { days: currentStreak })}
          </p>
        </div>
        <button
          type="button"
          disabled={checked}
          onClick={onToggle}
          className={`rounded-xl px-3 py-2 text-sm font-medium text-white transition ${
            checked
              ? "cursor-not-allowed bg-emerald-500/80 opacity-80"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {checked ? t(TRANSLATION_KEY.CHECKED_TODAY) : t(TRANSLATION_KEY.DAILY_CHECKMARK)}
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm text-white/75">
          <span>{t(TRANSLATION_KEY.PROGRESS_MILESTONE)}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-black/25">
          <div
            style={{ width: `${progress}%`, backgroundColor: habit.accent }}
            className="h-full rounded-full transition-all"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-white/75">
        <span>{t(TRANSLATION_KEY.MAX_STREAK, { days: maxStreak })}</span>
        <button
          type="button"
          disabled={relapsedToday}
          onClick={onRelapse}
          className={`rounded-lg border border-rose-300/50 px-3 py-1.5 text-rose-100 ${
            relapsedToday
              ? "cursor-not-allowed bg-rose-400/10 opacity-70"
              : "bg-rose-400/15 hover:bg-rose-400/25"
          }`}
        >
          {t(TRANSLATION_KEY.MARK_RELAPSE)}
        </button>
      </div>
    </motion.section>
  );
}
