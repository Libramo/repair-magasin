import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatString(str: string) {
//   return str
//     .replace(/([A-Z])/g, " $1")
//     .toLowerCase()
//     .replace(/^./, (char) => char.toUpperCase());
// }
