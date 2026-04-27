export type HabitKey = "alcohol" | "cigarettes";

export interface DailyEntry {
  date: string;
  alcohol: boolean;
  cigarettes: boolean;
  updatedAt?: number;
}

export interface Relapse {
  id?: number;
  habit: HabitKey;
  date: string;
  createdAt?: string;
  note?: string;
}

export interface HabitMeta {
  key: HabitKey;
  label: string;
  icon: string;
  accent: string;
}
