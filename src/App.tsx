import { useEffect, useMemo, useState, useTransition } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "framer-motion";
import { format, startOfMonth } from "date-fns";
import { db } from "./db";
import { getToday } from "./lib/date";
import { getCurrentStreak, getMaxStreak, getMissedDays, getProgressPercent, getRelapseCount } from "./lib/stats";
import type { DailyEntry, HabitMeta, HabitKey, Relapse } from "./types";
import { BottomNav, type TabKey } from "./components/BottomNav";
import { AppHeader } from "./components/AppHeader";
import { FloatingControls } from "./components/FloatingControls";
import { DashboardTab } from "./components/tabs/DashboardTab";
import { StatsTab } from "./components/tabs/StatsTab";
import { HistoryTab } from "./components/tabs/HistoryTab";
import { PrivacyTab } from "./components/tabs/PrivacyTab";
import { useIntl } from "./hooks/intl/useIntl";
import { TRANSLATION_KEY } from "./hooks/intl/translationKeys";
import { useIntlStore } from "./hooks/intl/useIntlStore";
import alcoholIcon from "./assets/alcohol.png";
import smokeIcon from "./assets/smoke.png";

const habits: HabitMeta[] = [
  { key: "alcohol", label: "Alcohol", icon: alcoholIcon, accent: "#34d399" },
  { key: "cigarettes", label: "Cigarettes", icon: smokeIcon, accent: "#34d399" },
];
const EMPTY_ENTRIES: DailyEntry[] = [];
const EMPTY_RELAPSES: Relapse[] = [];

function App() {
  const [activeTab, setActiveTab] = useState<TabKey | "privacy">("dashboard");
  const [historyMonthCursor, setHistoryMonthCursor] = useState(() => startOfMonth(new Date()));
  const [relapseMonthCursor, setRelapseMonthCursor] = useState(() => startOfMonth(new Date()));
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("app_theme") === "light" ? "light" : "dark";
  });
  const [isPending, startTransition] = useTransition();
  const t = useIntl();
  const { lang, setLang } = useIntlStore();
  const getHabitLabel = (habit: HabitKey) =>
    habit === "alcohol" ? t(TRANSLATION_KEY.ALCOHOL) : t(TRANSLATION_KEY.CIGARETTES);

  const dailyEntries = useLiveQuery(() => db.daily.orderBy("date").toArray(), []);
  const relapses = useLiveQuery(() => db.relapses.orderBy("date").reverse().toArray(), []);

  const entries = dailyEntries ?? EMPTY_ENTRIES;
  const relapseEntries = relapses ?? EMPTY_RELAPSES;
  const today = getToday();

  const todayRecord = useMemo(
    () => entries.find((entry) => entry.date === today),
    [entries, today],
  );

  const metrics = useMemo(() => {
    return habits.map((habit) => {
      const currentStreak = getCurrentStreak(entries, habit.key);
      return {
        habit,
        currentStreak,
        maxStreak: getMaxStreak(entries, habit.key),
        progress: getProgressPercent(currentStreak),
        relapses: getRelapseCount(relapseEntries, habit.key),
        relapsedToday: relapseEntries.some(
          (relapse) => relapse.habit === habit.key && relapse.date === today,
        ),
      };
    });
  }, [entries, relapseEntries, today]);

  const onToggleDay = async (habit: HabitKey) => {
    const existing = await db.daily.get(today);
    if (existing?.[habit]) {
      return;
    }
    const draft = existing ?? {
      date: today,
      alcohol: false,
      cigarettes: false,
    };

    await db.daily.put({
      ...draft,
      [habit]: true,
    });
  };

  const onRelapse = async (habit: HabitKey) => {
    const alreadyExists = await db.relapses
      .where("[habit+date]")
      .equals([habit, today])
      .first();
    if (alreadyExists) {
      return;
    }

    await db.relapses.add({ habit, date: today, createdAt: new Date().toISOString() });
    const existing = await db.daily.get(today);
    await db.daily.put({
      date: today,
      alcohol: existing?.alcohol ?? false,
      cigarettes: existing?.cigarettes ?? false,
      [habit]: false,
    });
  };

  const handleTabChange = (next: TabKey) => {
    startTransition(() => {
      setActiveTab(next);
    });
  };
  const openPrivacy = () => {
    startTransition(() => {
      setActiveTab("privacy");
    });
  };
  
  const historyMonthKey = format(historyMonthCursor, "yyyy-MM");
  const relapseMonthKey = format(relapseMonthCursor, "yyyy-MM");
  const historyEntriesByMonth = useMemo(
    () =>
      entries
        .filter((entry) => entry.date.startsWith(historyMonthKey))
        .slice()
        .reverse(),
    [entries, historyMonthKey],
  );
  const relapseEntriesByMonth = useMemo(
    () => relapseEntries.filter((entry) => entry.date.startsWith(relapseMonthKey)),
    [relapseEntries, relapseMonthKey],
  );

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    window.localStorage.setItem("app_theme", theme);
  }, [theme]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-6 text-slate-50">
      {activeTab !== "privacy" && <AppHeader today={today} />}
      <FloatingControls
        lang={lang}
        onLangChange={setLang}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <AnimatePresence mode="wait">
        {activeTab === "dashboard" && (
          <motion.section
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPending ? 0.95 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <DashboardTab
              metrics={metrics}
              todayRecord={todayRecord}
              getHabitLabel={getHabitLabel}
              onToggleDay={onToggleDay}
              onRelapse={onRelapse}
              onOpenPrivacy={openPrivacy}
            />
          </motion.section>
        )}

        {activeTab === "stats" && (
          <motion.section
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPending ? 0.95 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <StatsTab
              entries={entries}
              habits={habits}
              metrics={metrics}
              missedDays={getMissedDays(entries)}
            />
          </motion.section>
        )}

        {activeTab === "history" && (
          <motion.section
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPending ? 0.95 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <HistoryTab
              lang={lang}
              historyMonthCursor={historyMonthCursor}
              relapseMonthCursor={relapseMonthCursor}
              setHistoryMonthCursor={setHistoryMonthCursor}
              setRelapseMonthCursor={setRelapseMonthCursor}
              historyEntriesByMonth={historyEntriesByMonth}
              relapseEntriesByMonth={relapseEntriesByMonth}
              getHabitLabel={getHabitLabel}
            />
          </motion.section>
        )}

        {activeTab === "privacy" && (
          <motion.section
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPending ? 0.95 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <PrivacyTab />
          </motion.section>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab === "privacy" ? "dashboard" : activeTab} onChange={handleTabChange} />
    </main>
  );
}

export default App;
