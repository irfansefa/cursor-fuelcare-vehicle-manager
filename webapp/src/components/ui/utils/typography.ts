import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Typography scale configuration
export const typographyScale = {
  xs: {
    mobile: "text-xs-mobile leading-4",
    desktop: "text-xs leading-4",
  },
  sm: {
    mobile: "text-sm-mobile leading-5",
    desktop: "text-sm leading-5",
  },
  base: {
    mobile: "text-base-mobile leading-6",
    desktop: "text-base leading-6",
  },
  lg: {
    mobile: "text-lg-mobile leading-7",
    desktop: "text-lg leading-7",
  },
  xl: {
    mobile: "text-xl-mobile leading-7",
    desktop: "text-xl leading-7",
  },
} as const;

// Typography variant types
export type TypographySize = keyof typeof typographyScale;
export type TypographyDevice = "mobile" | "desktop";

// Typography utility function
export function getTypographyClass(size: TypographySize, device: TypographyDevice = "desktop"): string {
  return typographyScale[size][device];
}

// Utility function to merge typography classes with other Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Typography component classes
export const typographyVariants = {
  h1: {
    mobile: cn(
      getTypographyClass("xl", "mobile"),
      "font-bold tracking-tight"
    ),
    desktop: cn(
      getTypographyClass("xl", "desktop"),
      "font-bold tracking-tight"
    ),
  },
  h2: {
    mobile: cn(
      getTypographyClass("lg", "mobile"),
      "font-semibold tracking-tight"
    ),
    desktop: cn(
      getTypographyClass("lg", "desktop"),
      "font-semibold tracking-tight"
    ),
  },
  h3: {
    mobile: cn(
      getTypographyClass("base", "mobile"),
      "font-semibold tracking-tight"
    ),
    desktop: cn(
      getTypographyClass("base", "desktop"),
      "font-semibold tracking-tight"
    ),
  },
  p: {
    mobile: getTypographyClass("base", "mobile"),
    desktop: getTypographyClass("base", "desktop"),
  },
  small: {
    mobile: getTypographyClass("sm", "mobile"),
    desktop: getTypographyClass("sm", "desktop"),
  },
  tiny: {
    mobile: getTypographyClass("xs", "mobile"),
    desktop: getTypographyClass("xs", "desktop"),
  },
} as const;

export type TypographyVariant = keyof typeof typographyVariants; 