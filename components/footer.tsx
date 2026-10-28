"use client";
import { LocaleLink as Link } from "@/components/locale-link";
import { useT } from "@/components/i18n";
export function Footer() {
  const t = useT();
  return (
    <footer id="contact" className="bg-[#17251f] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-3xl font-black tracking-[-2px]">
            HYDRO<span className="text-[#f26735]">MARKET</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            {t("footerAbout")}
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">{t("quickLinks")}</h3>
          <div className="grid gap-3 text-sm text-white/60">
            <Link href="/products">{t("navProducts")}</Link>
            <Link href="/#about">{t("company")}</Link>
            <Link href="/sign-in">{t("account")}</Link>
            <Link href="/cart">{t("cart")}</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">{t("center")}</h3>
          <p className="text-sm leading-6 text-white/60">
            ABC Business Center
            <br />
            No: 123 Ostim / Ankara
          </p>
          <a
            href="tel:+901234567890"
            className="mt-3 block text-sm text-white/80"
          >
            +90 123 456 78 90
          </a>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">{t("factory")}</h3>
          <p className="text-sm leading-6 text-white/60">
            AIZ 1st Industrial Zone
            <br />
            XYZ Street. No:1 Sincan / Ankara
          </p>
          <a
            href="mailto:info@hydromarket.com.tr"
            className="mt-3 block text-sm text-white/80"
          >
            info@hydromarket.com.tr
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">
        © 2026 Hydromarket Ltd· {t("rights")}
      </div>
    </footer>
  );
}
