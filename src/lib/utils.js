import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function truncate(str, length) {
  if (str.length <= length) return str
  return str.substring(0, length) + "..."
}

export const generateRandomId = () => Math.random().toString(36).substring(2, 10)
