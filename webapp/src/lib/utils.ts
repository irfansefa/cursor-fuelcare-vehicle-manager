import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Color mapping for expense categories
const categoryColors = {
  'bg-red-500': '#ef4444',
  'bg-orange-500': '#f97316',
  'bg-amber-500': '#f59e0b',
  'bg-yellow-500': '#eab308',
  'bg-lime-500': '#84cc16',
  'bg-green-500': '#22c55e',
  'bg-emerald-500': '#10b981',
  'bg-teal-500': '#14b8a6',
  'bg-cyan-500': '#06b6d4',
  'bg-sky-500': '#0ea5e9',
  'bg-blue-500': '#3b82f6',
  'bg-indigo-500': '#6366f1',
  'bg-violet-500': '#8b5cf6',
  'bg-purple-500': '#a855f7',
  'bg-fuchsia-500': '#d946ef',
  'bg-pink-500': '#ec4899',
  'bg-rose-500': '#f43f5e',
} as const;

/**
 * Converts a Tailwind color class to its corresponding hex value
 * @param colorClass - The Tailwind color class (e.g., 'bg-blue-500')
 * @returns The corresponding hex color value or a fallback color if not found
 */
export const getTailwindColorValue = (colorClass: string): string => {
  return (categoryColors as Record<string, string>)[colorClass] || '#000000';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 