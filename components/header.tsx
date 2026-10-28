"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { categories } from "@/lib/products";
import { useStore } from "./store-provider";
import { LocaleLink as Link, localizedHref } from "./locale-link";
import { useLocale, useT } from "./i18n";
export function Header() {
  const { count } = useStore();
  const [open, setOpen] = useState(false);
  const t = useT();
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const other = locale === "tr" ? "en" : "tr";
  const currentPath = pathname.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";
  return (
    <>
      <div className="bg-[#17251f] text-xs text-white">
        <div className="mx-auto flex max-w-[1320px] justify-between px-5 py-2">
          <span>
            {locale === "tr"
              ? "Endüstriyel güç, 1998’den beri."
              : "Industrial strength since 1998."}
          </span>
          <a
            href="tel:+903123549667"
            className="flex items-center gap-2 text-white/80"
          >
            <Phone size={13} /> (0312) 123 45 67{" "}
            <span className="hidden sm:inline">· Ostim / Ankara</span>
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-5 py-4">
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={locale === "tr" ? "Menüyü aç" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
          <Link href="/" className="shrink-0">
            <div className="text-[28px] font-black leading-none tracking-[-2px]">
              HIDRO<span className="text-[#f26735]">AN</span>
              <div className="mt-1 text-[8px] font-semibold tracking-[2.2px] text-[#718078]">
                {t("slogan")}
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 text-[13px] font-semibold text-[#3b4841] lg:flex">
            <Link href="/#categories">
              {t("navProducts")} <ChevronDown size={13} className="inline" />
            </Link>
            <Link href="/#about">{t("navCompany")}</Link>
            <Link href="/#brands">{t("navBrands")}</Link>
            <Link href="/#contact">{t("navContact")}</Link>
          </nav>
          <form
            action={localizedHref("/products", locale)}
            className="ml-auto hidden max-w-[400px] flex-1 items-center rounded-full border border-[#e1e5df] bg-white px-4 py-2.5 md:flex"
          >
            <Search size={16} className="text-[#7b8780]" />
            <input
              name="q"
              placeholder={t("search")}
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
            <kbd className="rounded bg-[#f3f4f1] px-1.5 text-[10px] text-[#89928c]">
              ↵
            </kbd>
          </form>
          <Link
            href="/sign-in"
            className="hidden items-center gap-2 text-xs font-semibold sm:flex"
          >
            <UserRound size={19} />
            <span className="hidden xl:inline">{t("account")}</span>
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full bg-[#17251f] px-4 py-3 text-xs font-bold text-white"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">{t("cart")}</span>
            {count > 0 && (
              <b className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f26735] px-1 text-[10px]">
                {count}
              </b>
            )}
          </Link>
          <Link
            href={localizedHref(currentPath, other)}
            aria-label={other === "en" ? "Switch to English" : "Türkçe'ye geç"}
            className="rounded-full border border-[#dfe4dc] px-2.5 py-2 text-[10px] font-extrabold uppercase tracking-wide"
          >
            {other}
          </Link>
        </div>
        {open && (
          <nav className="grid gap-1 border-t px-5 py-4 text-sm font-medium md:hidden">
            <Link href="/#categories" onClick={() => setOpen(false)}>
              {t("navProducts")}
            </Link>
            <Link href="/#about" onClick={() => setOpen(false)}>
              {t("navCompany")}
            </Link>
            <Link href="/#brands" onClick={() => setOpen(false)}>
              {t("navBrands")}
            </Link>
            <Link href="/#contact" onClick={() => setOpen(false)}>
              {t("navContact")}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
