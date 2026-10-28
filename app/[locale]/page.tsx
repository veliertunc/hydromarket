"use client";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Cog,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { LocaleLink as Link } from "@/components/locale-link";
import { ProductCard } from "@/components/product-card";
import { useLocale, useT } from "@/components/i18n";
import { categories, products } from "@/lib/products";
import { localizeCategory } from "@/lib/translations";
const meta = [
  { icon: Cog, count: "121" },
  { icon: Cog, count: "43" },
  { icon: BadgeCheck, count: "135" },
  { icon: PackageCheck, count: "20" },
  { icon: ShieldCheck, count: "42" },
  { icon: Truck, count: "13" },
  { icon: Building2, count: "44" },
  { icon: PackageCheck, count: "118" },
];
export default function Home() {
  const t = useT();
  const locale = useLocale();
  return (
    <main>
      <section className="relative overflow-hidden bg-[#17251f] text-white">
        <div className="absolute right-[-10%] top-[-25%] h-[650px] w-[650px] rounded-full border border-white/10" />
        <div className="absolute right-[-3%] top-[-14%] h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="mx-auto grid min-h-[540px] max-w-[1320px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[2px] text-[#ff986d]">
              <span className="h-px w-8 bg-[#f26735]" />
              {t("heroEyebrow")}
            </div>
            <h1 className="max-w-[690px] text-[46px] font-semibold leading-[1.06] tracking-[-2px] sm:text-[64px]">
              {t("heroLine1")}{" "}
              <span className="text-[#f26735]">{t("heroHighlight")}</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-7 text-white/60">
              {t("heroText")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full bg-[#f26735] px-6 py-4 text-sm font-bold text-white"
              >
                {t("explore")} <ArrowRight size={17} />
              </Link>
              <Link
                href="#about"
                className="rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white/80"
              >
                {t("about")}
              </Link>
            </div>
            <div className="mt-12 flex gap-10">
              <div>
                <strong className="text-2xl">1998</strong>
                <div className="mt-1 text-[10px] uppercase tracking-[1.6px] text-white/45">
                  {t("founded")}
                </div>
              </div>
              <div>
                <strong className="text-2xl">
                  {locale === "tr" ? "47.000" : "47,000"}
                  <span className="text-[#f26735]"> m²</span>
                </strong>
                <div className="mt-1 text-[10px] uppercase tracking-[1.6px] text-white/45">
                  {t("facilities")}
                </div>
              </div>
              <div>
                <strong className="text-2xl">7/24</strong>
                <div className="mt-1 text-[10px] uppercase tracking-[1.6px] text-white/45">
                  {t("support247")}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="relative aspect-square rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#33453b_0,#223229_55%,#1b2922_100%)] p-8">
              <div className="absolute left-8 top-8 rounded-full border border-white/15 px-3 py-2 text-[9px] font-bold tracking-[1.7px] text-white/60">
                ENGINEERED TO PERFORM
              </div>
              <div className="absolute inset-[18%] rotate-[-12deg] rounded-[30px] border border-white/10 bg-[#c8cfbf]/5 shadow-2xl" />
              <div className="absolute inset-[24%] rotate-[9deg] rounded-[28px] border border-white/10 bg-[#8b9b87]/10" />
              <div className="absolute inset-[31%] grid rotate-[-4deg] place-items-center rounded-[26px] bg-gradient-to-br from-[#79847a] via-[#344139] to-[#1f2c24] shadow-[0_30px_80px_rgba(0,0,0,.4)]">
                <Cog
                  size={142}
                  strokeWidth={1.2}
                  className="text-[#ee7847] drop-shadow-[0_12px_20px_rgba(0,0,0,.6)]"
                />
                <div className="absolute bottom-[-12px] h-5 w-[70%] rounded-full bg-black/30 blur-md" />
              </div>
              <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17251f]/80 p-3 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f26735]">
                  <ShieldCheck size={19} />
                </span>
                <span className="text-xs font-bold">
                  {t("brandsTitle")}
                  <small className="mt-1 block font-normal text-white/50">
                    {t("brandsText")}
                  </small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-[#e5e8e2] bg-white">
        <div className="mx-auto grid max-w-[1320px] divide-y divide-[#e5e8e2] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            [PackageCheck, "stockTitle", "stockText"],
            [Truck, "shippingTitle", "shippingText"],
            [Headphones, "techTitle", "techText"],
            [ShieldCheck, "brandsTitle", "brandsText"],
          ].map(([Icon, title, desc], i) => {
            const ItemIcon = Icon as typeof PackageCheck;
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-5">
                <ItemIcon className="text-[#f26735]" />
                <div className="text-xs font-bold">
                  {t(title as any)}
                  <small className="mt-1 block font-normal text-[#828c85]">
                    {t(desc as any)}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="categories" className="mx-auto max-w-[1320px] px-5 py-20">
        <div className="mb-9 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#f26735]">
              {t("catalog")}
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] sm:text-4xl">
              {t("catalogTitle")}
            </h2>
            <p className="mt-3 text-sm text-[#7e8881]">
              {t("catalogDescription")}
            </p>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-bold sm:flex"
          >
            {t("seeAll")} <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category, i) => {
            const Icon = meta[i]?.icon ?? PackageCheck;
            return (
              <Link
                key={category}
                href={`/products?kategori=${encodeURIComponent(category)}`}
                className="group rounded-[18px] border border-[#e7ebe4] bg-white p-4 transition hover:border-[#f26735]/40 hover:shadow-md"
              >
                <div className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#f1f3ee] text-[#f26735] transition group-hover:bg-[#f26735] group-hover:text-white">
                  <Icon size={21} />
                </div>
                <h3 className="mt-4 min-h-10 text-xs font-bold leading-5">
                  {localizeCategory(category, locale)}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#89928c]">
                  <span>
                    {meta[i]?.count} {locale === "tr" ? "ürün" : "products"}
                  </span>
                  <ChevronRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="bg-[#f0f2ed] py-20">
        <div className="mx-auto max-w-[1320px] px-5">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#f26735]">
                {t("catalog")}
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] sm:text-4xl">
                {t("featuredProducts")}
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-bold sm:flex"
            >
              {t("seeAll")} <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section
        id="about"
        className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 lg:grid-cols-2"
      >
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#1f3027] p-8 text-white">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute bottom-[-70px] left-[-30px] h-72 w-72 rounded-full border border-white/10" />
          <div className="relative flex h-full min-h-[300px] flex-col justify-between">
            <div className="text-[10px] font-bold tracking-[2px] text-[#f58a5f]">
              {locale === "tr"
                ? "ANKARA’DAN TÜRKİYE’YE"
                : "FROM ANKARA TO THE WORLD"}
            </div>
            <div className="max-w-sm text-[38px] font-semibold leading-[1.08] tracking-[-1px]">
              {locale === "tr"
                ? "Gücünüzü üretimden alın."
                : "Power your business with manufacturing expertise."}
            </div>
            <div className="flex gap-8">
              <div>
                <strong className="text-2xl">4</strong>
                <small className="mt-1 block text-[10px] text-white/50">
                  {locale === "tr" ? "Farklı lokasyon" : "Locations"}
                </small>
              </div>
              <div>
                <strong className="text-2xl">25+</strong>
                <small className="mt-1 block text-[10px] text-white/50">
                  {locale === "tr" ? "Dünya markası" : "Global brands"}
                </small>
              </div>
              <div>
                <strong className="text-2xl">360°</strong>
                <small className="mt-1 block text-[10px] text-white/50">
                  {locale === "tr" ? "Uçtan uca hizmet" : "End-to-end service"}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#f26735]">
            {t("aboutEyebrow")}
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-1px] sm:text-4xl">
            {t("aboutTitle")}
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#77827b]">
            {t("aboutText")}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#77827b]">
            {t("aboutText2")}
          </p>
          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold"
          >
            {t("meetTeam")} <ArrowRight size={17} className="text-[#f26735]" />
          </Link>
        </div>
      </section>
      <section id="brands" className="border-y border-[#e6e9e3] bg-white py-12">
        <div className="mx-auto max-w-[1320px] px-5">
          <p className="text-center text-[10px] font-bold uppercase tracking-[2px] text-[#9aa39d]">
            {t("globalBrands")}
          </p>
          <div className="mt-8 grid grid-cols-2 items-center gap-6 text-center text-lg font-black tracking-[-1px] text-[#a7aea9] sm:grid-cols-3 lg:grid-cols-6">
            <span>HEMA</span>
            <span>WALVOIL</span>
            <span>ALFAGOMMA</span>
            <span>OILCOMP</span>
            <span>DANFOSS</span>
            <span>MP FILTRI</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-14">
        <div className="flex flex-col items-center justify-between gap-5 rounded-[26px] bg-[#f26735] px-8 py-9 text-white sm:flex-row sm:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-white/70">
              {t("ctaEyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{t("ctaTitle")}</h2>
          </div>
          <a
            href="tel:+903123549667"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#17251f]"
          >
            {t("callUs")} <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}
