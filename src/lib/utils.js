import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const sortDates = (a, b) => new Date(b.date.toDate() - new Date(a.date.toDate()));

export const sortProducts = (products, sortByField, sortOrder) => {
  const sortedProducts = [...products].sort((a, b) => {
    const fieldA = a[sortByField]?.toLowerCase() || '';
    const fieldB = b[sortByField]?.toLowerCase() || '';

    if (sortOrder === "asc") {
      return fieldA.localeCompare(fieldB);
    } else if (sortOrder === "desc") {
      return -fieldA.localeCompare(fieldB);
    }

    return 0;
  });

  return sortedProducts;
};