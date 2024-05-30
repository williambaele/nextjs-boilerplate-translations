import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr"] as const;

export const pathnames = {
  "/": "/",
  "/about": {
    en: "/about",
    fr: "/a-propos",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
