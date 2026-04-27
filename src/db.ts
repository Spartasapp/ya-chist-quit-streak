import Dexie, { type EntityTable } from "dexie";
import type { DailyEntry, Relapse } from "./types";

class HabitDatabase extends Dexie {
  daily!: EntityTable<DailyEntry, "date">;
  relapses!: EntityTable<Relapse, "id">;

  constructor() {
    super("badhabits-db");

    this.version(1).stores({
      daily: "date, updatedAt",
      relapses: "++id, habit, date",
    });

    this.version(2).stores({
      daily: "date, updatedAt",
      relapses: "++id, habit, date, createdAt, &[habit+date]",
    });
  }
}

export const db = new HabitDatabase();
