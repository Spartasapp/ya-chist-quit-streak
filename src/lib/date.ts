import { eachDayOfInterval, format, subDays } from "date-fns";

export const getToday = (): string => format(new Date(), "yyyy-MM-dd");

export const getLastDays = (days: number): string[] => {
  const end = new Date();
  const start = subDays(end, days - 1);
  return eachDayOfInterval({ start, end }).map((d) => format(d, "yyyy-MM-dd"));
};
