import type { DailyEntry, HabitKey, HabitMeta } from "../../types";
import { AdBanner } from "../AdBanner";
import { HabitCard } from "../HabitCard";

interface DashboardMetric {
  habit: HabitMeta;
  currentStreak: number;
  maxStreak: number;
  progress: number;
  relapsedToday: boolean;
}

interface DashboardTabProps {
  metrics: DashboardMetric[];
  todayRecord?: DailyEntry;
  getHabitLabel: (habit: HabitKey) => string;
  onToggleDay: (habit: HabitKey) => void;
  onRelapse: (habit: HabitKey) => void;
  onOpenPrivacy: () => void;
}

export function DashboardTab({
  metrics,
  todayRecord,
  getHabitLabel,
  onToggleDay,
  onRelapse,
  onOpenPrivacy,
}: DashboardTabProps) {
  return (
    <section className="space-y-4">
      {metrics.map((item) => (
        <HabitCard
          key={item.habit.key}
          checked={Boolean(todayRecord?.[item.habit.key])}
          habit={{ ...item.habit, label: getHabitLabel(item.habit.key) }}
          currentStreak={item.currentStreak}
          maxStreak={item.maxStreak}
          progress={item.progress}
          relapsedToday={item.relapsedToday}
          onToggle={() => onToggleDay(item.habit.key)}
          onRelapse={() => onRelapse(item.habit.key)}
        />
      ))}
      <AdBanner />
      <footer className="pb-2 pt-1 text-center text-xs text-white/65">
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="underline decoration-dotted underline-offset-4 hover:text-white"
        >
          Privacy Policy
        </button>
      </footer>
    </section>
  );
}
