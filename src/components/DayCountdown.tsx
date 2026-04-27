import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntl } from "../hooks/intl/useIntl";
import { TRANSLATION_KEY } from "../hooks/intl/translationKeys";

const getRemainingMs = () => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return Math.max(0, end.getTime() - now.getTime());
};

const formatClock = (remainingMs: number) => {
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return { hours, minutes, seconds };
};

interface DayCountdownProps {
  hidden: boolean;
}

export function DayCountdown({ hidden }: DayCountdownProps) {
  const t = useIntl();
  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs());

  useEffect(() => {
    if (hidden) return;

    const timer = window.setInterval(() => {
      setRemainingMs(getRemainingMs());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [hidden]);

  const { hours, minutes, seconds } = useMemo(() => formatClock(remainingMs), [remainingMs]);

  if (hidden) return null;

  return (
    <div className="glass-card rounded-xl border border-white/15 bg-white/10 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
        {t(TRANSLATION_KEY.DAY_ENDS_IN)}
      </p>
      <div className="mt-0.5 font-mono text-base font-semibold text-white">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={seconds}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block min-w-[2ch] text-center"
          >
            {seconds}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
