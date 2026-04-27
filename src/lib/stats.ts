import { differenceInCalendarDays, format, parseISO, subDays } from "date-fns";
import type { DailyEntry, HabitKey, Relapse } from "../types";
import { getToday } from "./date";

const getEntryMap = (entries: DailyEntry[]) =>
  new Map(entries.map((entry) => [entry.date, entry]));

export const getCurrentStreak = (entries: DailyEntry[], habit: HabitKey): number => {
  const map = getEntryMap(entries);
  let streak = 0;
  let cursor = new Date();

  while (true) {
    const date = format(cursor, "yyyy-MM-dd");
    const current = map.get(date);

    if (!current || !current[habit]) {
      break;
    }

    streak += 1;
    cursor = subDays(cursor, 1);
  }

  return streak;
};

export const getMaxStreak = (entries: DailyEntry[], habit: HabitKey): number => {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  let maxStreak = 0;
  let current = 0;

  for (const entry of sorted) {
    if (entry[habit]) {
      current += 1;
      if (current > maxStreak) {
        maxStreak = current;
      }
    } else {
      current = 0;
    }
  }

  return maxStreak;
};

export const getRelapseCount = (relapses: Relapse[], habit: HabitKey): number =>
  relapses.filter((r) => r.habit === habit).length;

export const getProgressPercent = (currentStreak: number, target = 30): number =>
  Math.min(100, Math.round((currentStreak / target) * 100));

export const getWeeklyTrend = (entries: DailyEntry[], habit: HabitKey) => {
  const byDate = getEntryMap(entries);
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(today, 6 - i), "yyyy-MM-dd");
    const entry = byDate.get(date);

    return {
      date: date.slice(5),
      abstinent: entry?.[habit] ? 1 : 0,
    };
  });
};

export const getCumulativeData = (entries: DailyEntry[], habit: HabitKey) => {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  let score = 0;

  return sorted.map((entry) => {
    score += entry[habit] ? 1 : -1;
    return {
      date: entry.date.slice(5),
      score,
    };
  });
};

export const getMissedDays = (entries: DailyEntry[]): number => {
  if (entries.length === 0) return 0;
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const firstDay = parseISO(sorted[0].date);
  const today = parseISO(getToday());
  const totalSpan = differenceInCalendarDays(today, firstDay) + 1;
  return Math.max(0, totalSpan - sorted.length);
};
