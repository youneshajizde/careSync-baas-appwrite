import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));
export function encryptKey(passkey) {
  return btoa(passkey);
}
export function decryptKey(passkey) {
  return atob(passkey);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Options for formatting the date and time
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // AM/PM format
  };

  // Returns the date in the format MM/DD/YYYY hh:mm AM/PM
  return date.toLocaleDateString("en-US", options);
}