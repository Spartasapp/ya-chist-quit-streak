interface FloatingControlsProps {
  lang: "ru" | "en";
  onLangChange: (lang: "ru" | "en") => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function FloatingControls({
  lang,
  onLangChange,
  theme,
  onToggleTheme,
}: FloatingControlsProps) {
  return (
    <>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => onLangChange(e.target.value as "ru" | "en")}
        className="fixed right-[10px] top-[10px] z-30 appearance-none rounded-lg border border-white/15 bg-[#0b1020]/85 px-2 py-1 text-[16px] text-white outline-none"
      >
        <option value="en" className="bg-slate-900">
          en
        </option>
        <option value="ru" className="bg-slate-900">
          ru
        </option>
      </select>

      <button
        type="button"
        onClick={onToggleTheme}
        className="fixed left-[10px] top-[10px] z-30 rounded-lg border border-white/15 bg-[#0b1020]/85 px-2 py-1 text-[16px] text-white outline-none"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </>
  );
}
