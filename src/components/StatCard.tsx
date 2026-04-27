import { motion } from "framer-motion";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: "blue" | "emerald" | "violet" | "rose";
  compact?: boolean;
}

export function StatCard({ title, value, subtitle, accent = "blue", compact = false }: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "glass-card rounded-2xl border p-4",
        compact && "flex min-h-[96px] flex-col justify-between px-3 py-2",
        accent === "blue" && "border-blue-300/30",
        accent === "emerald" && "border-emerald-300/30",
        accent === "violet" && "border-violet-300/30",
        accent === "rose" && "border-rose-300/30",
      )}
    >
      <p
        className={clsx(
          "text-xs uppercase tracking-[0.2em] text-white/55",
          compact && "h-8 overflow-hidden text-[11px] leading-4 tracking-[0.08em]",
        )}
      >
        {title}
      </p>
      <p className={clsx("mt-2 text-3xl font-semibold", compact && "mt-1 text-2xl")}>{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-white/65">{subtitle}</p> : null}
    </motion.article>
  );
}
