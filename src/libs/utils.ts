import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themeMap: { [key: string]: string } = {
  Green: "bg-Green",
  Grey: "bg-ArmyGreen",
  Cyan: "bg-Cyan",
  Orange: "bg-Orange",
  Purple: "bg-PurplePrimary",
  Red: "bg-Red",
  Yellow: "bg-Yellow",
  Navy: "bg-Navy",
  Turquoise: "bg-Turquoise",
  Brown: "bg-Brown",
  Magenta: "bg-Magenta",
};
