"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";
import { defaultLocale, type Locale, locales } from "@/lib/i18n";
export function localeFromPath(pathname: string | null): Locale {
  const first = pathname?.split("/")[1];
  return locales.includes(first as Locale) ? (first as Locale) : defaultLocale;
}
export function localizedHref(href: string, locale: Locale) {
  const [pathname, ...tail] = href.split("?");
  const query = tail.length ? `?${tail.join("?")}` : "";
  if (/^\/(tr|en)(?=\/|$)/.test(pathname)) return `${pathname}${query}`;
  let path = pathname;
  if (path === "/") return `/${locale}${query}`;
  path = path
    .replace(/^\/urunler(?=\/|$)/, "/products")
    .replace(/^\/sepet$/, "/cart")
    .replace(/^\/giris$/, "/sign-in");
  return `/${locale}${path}${query}`;
}
type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };
export function LocaleLink({ href, ...props }: Props) {
  const locale = localeFromPath(usePathname());
  return <Link href={localizedHref(href, locale)} {...props} />;
}
