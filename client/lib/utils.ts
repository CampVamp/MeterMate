import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Sour_Gummy, Open_Sans } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonts
export const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
