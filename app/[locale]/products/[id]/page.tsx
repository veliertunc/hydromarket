"use client";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store-provider";
import { LocaleLink as Link } from "@/components/locale-link";
import { useLocale, useT } from "@/components/i18n";
import { localizeProduct } from "@/lib/translations";
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { add } = useStore();
  const t = useT();
  const locale = useLocale();
  if (!product)
    return (
      <main className="mx-auto min-h-[60vh] max-w-5xl px-5 py-20">
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>
        <Link className="mt-4 inline-block text-[#f26735]" href="/products">
          {t("backCatalog")}
        </Link>
      </main>
    );
  const item = localizeProduct(product, locale);
  return (
    <main className="mx-auto max-w-[1160px] px-5 py-12">
      <Link
        href="/products"
        className="mb-7 inline-flex items-center gap-2 text-sm text-[#737f77]"
      >
        <ArrowLeft size={16} /> {t("backCatalog")}
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductArt kind={product.image} large />
        <div className="py-3">
          <p className="text-[11px] font-bold tracking-[1.8px] text-[#f26735]">
            {product.brand} · {item.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-1px]">
            {item.name}
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#758078]">
            {item.description}{" "}
            {locale === "tr"
              ? "Hydromarket uzman ekibi, sisteminize uygun ürün seçimi ve teknik uygulama desteğiyle yanınızda."
              : "Our specialists can help you select the right component and provide technical guidance."}
          </p>
          <div className="mt-6 border-y border-[#e5e8e2] py-5">
            <span className="text-3xl font-extrabold">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-xs text-[#87918a]">{t("vat")}</span>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-[#68746d]">
            <Check size={15} className="text-[#f26735]" /> {t("stock")}
          </div>
          <button
            onClick={() => add(product.id)}
            className="mt-6 w-full rounded-full bg-[#f26735] px-6 py-4 text-sm font-bold text-white"
          >
            {locale === "tr" ? "Sepete ekle" : "Add to cart"}
          </button>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl bg-white p-4">
              <Truck className="shrink-0 text-[#f26735]" size={19} />
              <div className="text-xs font-bold">
                {t("safeShipping")}
                <small className="mt-1 block font-normal text-[#88928b]">
                  {t("nationwide")}
                </small>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl bg-white p-4">
              <ShieldCheck className="shrink-0 text-[#f26735]" size={19} />
              <div className="text-xs font-bold">
                {t("support")}
                <small className="mt-1 block font-normal text-[#88928b]">
                  {t("chooseProduct")}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-semibold">{t("similar")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .filter(
              (p) => p.category === product.category && p.id !== product.id,
            )
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </main>
  );
}
