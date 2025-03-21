import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number | undefined) => {
  if (!price) return "0 lakhs";
  return price >= 100
    ? `${(price / 100).toFixed(2)} crore`
    : `${price.toFixed(2)} lakhs`;
};
