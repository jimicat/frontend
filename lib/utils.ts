import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Ensure this file contains the export for formatDate
export function formatDate(date: string): string {
  // Implementation for formatDate
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export function formatDuration(duration: number): string {
  // Converts duration in seconds to a human-readable format (e.g., "1h 2m 3s")
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    seconds > 0 ? `${seconds}s` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

