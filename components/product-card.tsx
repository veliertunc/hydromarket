"use client";
import { LocaleLink as Link } from "@/components/locale-link";
import { formatPrice, Product } from "@/lib/products";
import { localizeProduct } from "@/lib/translations";
import { useLocale, useT } from "@/components/i18n";
import { useStore } from "./store-provider";
import { ProductArt } from "./product-art";
import { ArrowUpRight, Plus } from "lucide-react";
export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();
  const locale = useLocale();
  const t = useT();
  const item = localizeProduct(product, locale);
  return (
    <article className="group rounded-[22px] border border-[#e8ebe5] bg-white p-3 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,34,29,.08)]">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative">
          <ProductArt kind={product.image} />
          {product.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold">
              {product.tag}
            </span>
          )}
          <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#17251f] opacity-0 shadow transition group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="px-2 pb-1 pt-4">
          <div className="text-[10px] font-bold tracking-[1.5px] text-[#f26735]">
            {product.brand}
          </div>
          <h3 className="mt-1 min-h-11 text-sm font-bold leading-5">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-5 text-[#78827b]">
            {item.description}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between px-2 pb-2 pt-3">
        <span className="text-sm font-extrabold">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={() => add(product.id)}
          aria-label={`${item.name} ${t("addToCart")}`}
          className="grid h-9 w-9 place-items-center rounded-full bg-[#17251f] text-white transition hover:bg-[#f26735]"
        >
          <Plus size={17} />
        </button>
      </div>
    </article>
  );
}
