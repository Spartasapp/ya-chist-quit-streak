import { DayCountdown } from "./DayCountdown";
import { TRANSLATION_KEY } from "../hooks/intl/translationKeys";
import { useIntl } from "../hooks/intl/useIntl";

interface AppHeaderProps {
  today: string;
}

export function AppHeader({ today }: AppHeaderProps) {
  const t = useIntl();

  return (
    <header className="relative mb-6 flex min-h-12 flex-wrap items-center justify-center gap-3">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="glass-card rounded-xl border border-white/15 bg-white/10 px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
            {t(TRANSLATION_KEY.TODAY)}
          </p>
          <div className="mt-0.5 font-mono text-base font-semibold text-white">{today}</div>
        </div>

        <DayCountdown hidden={false} />
      </div>
      <p className="w-full text-center text-[15px] italic text-[#FE080A] opacity-60 [font-synthesis:weight]">
        {t(TRANSLATION_KEY.DAILY_RESET_DISCLAIMER)}
      </p>
    </header>
  );
}
