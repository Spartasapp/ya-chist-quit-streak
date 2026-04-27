import { Heatmap } from "../Heatmap";
import { StatCard } from "../StatCard";
import { AdBanner } from "../AdBanner";
import { TRANSLATION_KEY } from "../../hooks/intl/translationKeys";
import { useIntl } from "../../hooks/intl/useIntl";
import type { DailyEntry, HabitMeta } from "../../types";

interface StatsMetric {
  habit: HabitMeta;
  relapses: number;
}

interface StatsTabProps {
  entries: DailyEntry[];
  habits: HabitMeta[];
  metrics: StatsMetric[];
  missedDays: number;
}

export function StatsTab({ entries, habits, metrics, missedDays }: StatsTabProps) {
  const t = useIntl();

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard title={t(TRANSLATION_KEY.TOTAL_ENTRIES)} value={entries.length} accent="blue" compact />
        <StatCard title={t(TRANSLATION_KEY.MISSED_DAYS)} value={missedDays} accent="rose" compact />
        <StatCard
          title={t(TRANSLATION_KEY.ALCOHOL_RELAPSES)}
          value={metrics[0]?.relapses ?? 0}
          accent="violet"
          compact
        />
        <StatCard
          title={t(TRANSLATION_KEY.CIGARETTES_RELAPSES)}
          value={metrics[1]?.relapses ?? 0}
          accent="emerald"
          compact
        />
      </div>

      {habits.map((habit) => (
        <article key={habit.key} className="glass-card rounded-3xl border border-white/15 p-4">
          <h2 className="mb-3 text-lg font-semibold">
            <span className="inline-flex items-center gap-2">
              <img src={habit.icon} alt="" className="h-10 w-10 rounded-md object-cover" />
              {habit.key === "alcohol"
                ? t(TRANSLATION_KEY.ALCOHOL_SOBER_DAYS)
                : t(TRANSLATION_KEY.CIGARETTES_SOBER_DAYS)}
            </span>
          </h2>
          <Heatmap entries={entries} habit={habit.key} />
        </article>
      ))}

      <AdBanner />
    </section>
  );
}
