import { addMonths, format, subMonths } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import type { DailyEntry, HabitKey, Relapse } from "../../types";
import { AdBanner } from "../AdBanner";
import { TRANSLATION_KEY } from "../../hooks/intl/translationKeys";
import { useIntl } from "../../hooks/intl/useIntl";
import type { Locale } from "../../hooks/intl/useIntlStore";

interface HistoryTabProps {
  lang: Locale;
  historyMonthCursor: Date;
  relapseMonthCursor: Date;
  setHistoryMonthCursor: Dispatch<SetStateAction<Date>>;
  setRelapseMonthCursor: Dispatch<SetStateAction<Date>>;
  historyEntriesByMonth: DailyEntry[];
  relapseEntriesByMonth: Relapse[];
  getHabitLabel: (habit: HabitKey) => string;
}

export function HistoryTab({
  lang,
  historyMonthCursor,
  relapseMonthCursor,
  setHistoryMonthCursor,
  setRelapseMonthCursor,
  historyEntriesByMonth,
  relapseEntriesByMonth,
  getHabitLabel,
}: HistoryTabProps) {
  const t = useIntl();
  const historyMonthLabel = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(historyMonthCursor);
  const relapseMonthLabel = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(relapseMonthCursor);

  return (
    <section className="space-y-4">
      <article className="glass-card rounded-3xl border border-white/15 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t(TRANSLATION_KEY.HISTORY_LIST)}</h2>
          <p className="text-sm text-white/70">{historyEntriesByMonth.length}</p>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setHistoryMonthCursor((current) => subMonths(current, 1))}
            className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          >
            {"<"}
          </button>
          <p className="text-sm capitalize text-white/80">{historyMonthLabel}</p>
          <button
            type="button"
            onClick={() => setHistoryMonthCursor((current) => addMonths(current, 1))}
            className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          >
            {">"}
          </button>
        </div>
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {historyEntriesByMonth.length === 0 ? (
            <p className="text-sm text-white/65">{t(TRANSLATION_KEY.NO_DATA_YET)}</p>
          ) : (
            historyEntriesByMonth.map((entry) => (
              <div
                key={entry.date}
                className="rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-sm"
              >
                <p className="font-medium">{entry.date}</p>
                <p className="text-white/70">
                  {t(TRANSLATION_KEY.ALCOHOL)}:{" "}
                  {entry.alcohol ? t(TRANSLATION_KEY.ABSTINENT) : t(TRANSLATION_KEY.MISSED)} |{" "}
                  {t(TRANSLATION_KEY.CIGARETTES)}:{" "}
                  {entry.cigarettes ? t(TRANSLATION_KEY.ABSTINENT) : t(TRANSLATION_KEY.MISSED)}
                </p>
              </div>
            ))
          )}
        </div>
      </article>

      <article className="glass-card rounded-3xl border border-white/15 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t(TRANSLATION_KEY.RELAPSES)}</h2>
          <p className="text-sm text-white/70">{relapseEntriesByMonth.length}</p>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRelapseMonthCursor((current) => subMonths(current, 1))}
            className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          >
            {"<"}
          </button>
          <p className="text-sm capitalize text-white/80">{relapseMonthLabel}</p>
          <button
            type="button"
            onClick={() => setRelapseMonthCursor((current) => addMonths(current, 1))}
            className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          >
            {">"}
          </button>
        </div>
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {relapseEntriesByMonth.length === 0 ? (
            <p className="text-sm text-white/65">{t(TRANSLATION_KEY.NO_RELAPSES)}</p>
          ) : (
            relapseEntriesByMonth.map((row) => (
              <div
                key={`${row.habit}-${row.id}`}
                className="rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-sm"
              >
                <p className="font-medium">
                  {row.date}{" "}
                  {t(TRANSLATION_KEY.RELAPSE_AT, {
                    time: row.createdAt ? format(new Date(row.createdAt), "HH:mm") : "--:--",
                  })}{" "}
                  - {getHabitLabel(row.habit)}
                </p>
                {row.note ? <p className="text-white/70">{row.note}</p> : null}
              </div>
            ))
          )}
        </div>
      </article>

      <AdBanner />
    </section>
  );
}
