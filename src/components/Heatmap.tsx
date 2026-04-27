import clsx from "clsx";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { memo, useMemo, useState } from "react";
import type { DailyEntry, HabitKey } from "../types";
import { getToday } from "../lib/date";
import { useIntlStore } from "../hooks/intl/useIntlStore";

interface HeatmapProps {
  entries: DailyEntry[];
  habit: HabitKey;
}

export const Heatmap = memo(function Heatmap({ entries, habit }: HeatmapProps) {
  const [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()));
  const { lang } = useIntlStore();
  const todayStr = getToday();
  const days = useMemo(() => {
    const monthStart = startOfMonth(monthCursor);
    const monthEnd = endOfMonth(monthCursor);
    const start = startOfWeek(monthStart, { weekStartsOn: 1 });
    const end = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end }).map((date) => ({
      key: format(date, "yyyy-MM-dd"),
      day: date.getDate(),
      inCurrentMonth:
        date.getMonth() === monthCursor.getMonth() && date.getFullYear() === monthCursor.getFullYear(),
    }));
  }, [monthCursor]);
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(monthCursor),
    [lang, monthCursor],
  );
  const byDate = useMemo(() => new Map(entries.map((entry) => [entry.date, entry])), [entries]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthCursor((current) => subMonths(current, 1))}
          className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
        >
          {"<"}
        </button>
        <p className="text-sm font-medium capitalize">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setMonthCursor((current) => addMonths(current, 1))}
          className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const entry = byDate.get(day.key);
          const abstinent = entry?.[habit] ?? false;
          const isFuture = day.key > todayStr;

          return (
            <div
              key={day.key}
              title={`${day.key} - ${abstinent ? "Abstinent" : "With"}`}
              className={clsx(
                "h-8 rounded-md border border-white/10 text-center text-[10px] leading-8 text-white/70",
                !day.inCurrentMonth && "opacity-35",
                isFuture && "bg-white/5",
                !isFuture && abstinent && "bg-emerald-400/70 text-slate-950",
                !isFuture && !abstinent && "bg-rose-400/70 text-white",
              )}
            >
              {day.day}
            </div>
          );
        })}
      </div>
    </div>
  );
});
