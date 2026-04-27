import clsx from "clsx";
import { useIntl } from "../hooks/intl/useIntl";
import { TRANSLATION_KEY, type TranslationKey } from "../hooks/intl/translationKeys";

export type TabKey = "dashboard" | "stats" | "history";

interface BottomNavProps {
  activeTab: TabKey;
  onChange: (next: TabKey) => void;
}

const tabs: Array<{ key: TabKey; labelKey: TranslationKey;  }> = [
  { key: "stats", labelKey: TRANSLATION_KEY.STATS },
  { key: "dashboard", labelKey: TRANSLATION_KEY.DASHBOARD },
  { key: "history", labelKey: TRANSLATION_KEY.HISTORY },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const t = useIntl();

  return (
    <nav className="glass-card fixed inset-x-4 bottom-4 z-20 rounded-2xl border border-white/20 p-2 backdrop-blur-xl">
      <ul className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              type="button"
              onClick={() => onChange(tab.key)}
              className={clsx(
                "w-full rounded-xl px-3 py-2 text-sm transition",
                activeTab === tab.key
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {t(tab.labelKey)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
