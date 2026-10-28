"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/components/locale-link";
import { translate, type MessageKey } from "@/lib/i18n";
export function useLocale() {
  return localeFromPath(usePathname());
}
export function useT() {
  const locale = useLocale();
  return (key: MessageKey) => translate(locale, key);
}
export function LocaleHtml({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return children;
}
