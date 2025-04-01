import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("zh-CN", options)
}

export function formatDuration(durationString: string): string {
  // Assuming durationString is in the format "MM:SS" or "HH:MM:SS"
  const parts = durationString.split(":")
  const seconds = Number.parseInt(parts.pop() || "0", 10)
  const minutes = Number.parseInt(parts.pop() || "0", 10)
  const hours = Number.parseInt(parts.pop() || "0", 10)

  let formattedDuration = ""

  if (hours > 0) {
    formattedDuration += `${hours} 小时 `
  }

  if (minutes > 0 || hours > 0) {
    formattedDuration += `${minutes} 分钟 `
  }

  formattedDuration += `${seconds} 秒`

  return formattedDuration.trim()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

