import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (
  lakh?: number | null,
  crore?: number | null,
  fallback?: number | null,
) => {
  if (crore && crore > 0)
    return `${Number.isInteger(crore) ? crore : crore.toFixed(2)} Cr`;
  if (lakh && lakh > 0)
    return `${Number.isInteger(lakh) ? lakh : lakh.toFixed(2)} lakhs`;
  if (fallback && fallback > 0) {
    return fallback >= 100
      ? `${(fallback / 100).toFixed(2)} Cr`
      : `${fallback.toFixed(2)} L`;
  }
  return "Price not available";
};

export const createMarkerIcon = (index: number) => {
  const img = document.createElement("img");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <circle cx="12" cy="12" r="6" fill="${index % 2 === 0 ? "#ffd700" : "#ff8c00"}" />
  </svg>`;

  img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  img.alt = "marker icon";
  img.style.width = "24px";
  img.style.height = "24px";
  return img;
};
