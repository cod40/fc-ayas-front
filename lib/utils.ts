import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? "0" + month.toString() : month.toString();
  const formattedDay = day < 10 ? "0" + day.toString() : day.toString();

  return `${year}${formattedMonth}${formattedDay}`;
}

export function loadSessionData(key, defaultValue) {
  const storedData = sessionStorage.getItem(key);
  return storedData ? storedData : defaultValue;
}
