import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import isEqual from "lodash/isEqual";

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

export const elapsedTime = (data: string) => {
  const start = new Date(data);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${start.toLocaleDateString()}`;
};
