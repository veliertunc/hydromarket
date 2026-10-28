"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useLocale, useT } from "@/components/i18n";
import { localizeCategory, localizeProduct } from "@/lib/translations";
import { LocaleLink as Link } from "@/components/locale-link";
export default function Catalog() {
  const t = useT();
  const locale = useLocale();
  const [category, setCategory] = useState("Tüm ürünler");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("kategori") ?? "Tüm ürünler");
    setQuery(params.get("q") ?? "");
  }, []);
  const shown = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (category === "Tüm ürünler" || p.category === category) &&
        `${p.name} ${p.brand} ${p.category} ${localizeProduct(p, locale).name} ${localizeProduct(p, locale).description}`
          .toLocaleLowerCase(locale)
          .includes(query.toLocaleLowerCase(locale)),
    );
    return sort === "asc"
      ? filtered.sort((a, b) => a.price - b.price)
      : sort === "desc"
        ? filtered.sort((a, b) => b.price - a.price)
        : filtered;
  }, [category, query, sort, locale]);
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1320px] px-5 py-12">
      <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#f26735]">
        {t("catalog")}
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-1.5px]">
        {t("catalogTitle")}
      </h1>
      <p className="mt-3 text-sm text-[#7e8881]">{t("catalogDescription")}</p>
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 rounded-2xl border border-[#e6e9e3] bg-white p-5 lg:w-64">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold">
            <SlidersHorizontal size={16} /> {t("filters")}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchProduct")}
            className="mb-5 w-full rounded-xl border border-[#e5e8e2] px-3 py-3 text-sm outline-none focus:border-[#f26735]"
          />
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[1.4px] text-[#98a19b]">
            {t("categories")}
          </div>
          <div className="grid gap-1">
            <button
              onClick={() => setCategory("Tüm ürünler")}
              className={`rounded-lg px-3 py-2 text-left text-sm ${category === "Tüm ürünler" ? "bg-[#f1f3ee] font-bold" : "text-[#6f7b73] hover:bg-[#f7f8f5]"}`}
            >
              {t("allProducts")}{" "}
              <span className="float-right text-xs">{products.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${category === c ? "bg-[#f1f3ee] font-bold" : "text-[#6f7b73] hover:bg-[#f7f8f5]"}`}
              >
                {localizeCategory(c, locale)}
              </button>
            ))}
          </div>
        </aside>
        <section className="flex-1">
          <div className="mb-4 flex items-center justify-between text-xs text-[#89928c]">
            <span>
              {shown.length} {t("productsListed")}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-[#e5e8e2] bg-white px-3 py-2 text-xs"
            >
              <option value="featured">{t("featured")}</option>
              <option value="asc">{t("priceLow")}</option>
              <option value="desc">{t("priceHigh")}</option>
            </select>
          </div>
          {shown.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p) => (
                <ProductCard key={p.id} product={localizeProduct(p, locale)} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#dfe4dc] p-14 text-center">
              <Search className="mx-auto text-[#a7aea9]" />
              <p className="mt-3 text-sm font-semibold">{t("noResults")}</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("Tüm ürünler");
                }}
                className="mt-3 text-sm font-bold text-[#f26735]"
              >
                {t("clearFilters")}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
