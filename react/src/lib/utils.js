import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const combineTwoArrays = (array1, array2) => {
  return [...array1, ...array2];
};