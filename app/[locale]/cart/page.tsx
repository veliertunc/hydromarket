"use client";
import { LocaleLink as Link } from "@/components/locale-link";
import { useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { ProductArt } from "@/components/product-art";
import { useStore } from "@/components/store-provider";
import { useLocale, useT } from "@/components/i18n";
import { localizeProduct } from "@/lib/translations";
export default function CartPage() {
  const { cart, setQuantity, remove } = useStore();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const t = useT();
  const locale = useLocale();
  const lines = cart
    .map((i) => ({ item: i, product: products.find((p) => p.id === i.id) }))
    .filter((x) => x.product);
  const total = lines.reduce(
    (a, x) => a + x.product!.price * x.item.quantity,
    0,
  );
  if (done)
    return (
      <main className="mx-auto min-h-[65vh] max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e4f0e7] text-[#278148]">
          ✓
        </div>
        <h1 className="mt-5 text-3xl font-semibold">{t("orderReceived")}</h1>
        <p className="mt-3 text-sm leading-6 text-[#78827b]">
          {t("orderReceivedText")}
        </p>
        <Link
          href="/products"
          className="mt-7 inline-block rounded-full bg-[#17251f] px-6 py-3 text-sm font-bold text-white"
        >
          {t("continueShopping")}
        </Link>
      </main>
    );
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1160px] px-5 py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-[#737f77]"
      >
        <ArrowLeft size={16} /> {t("continueShopping")}
      </Link>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-1px]">
        {t("shoppingCart")}
      </h1>
      {!lines.length ? (
        <div className="mt-9 rounded-2xl border border-dashed border-[#dfe4dc] bg-white p-14 text-center">
          <div className="text-4xl">🛒</div>
          <p className="mt-4 font-semibold">{t("emptyCart")}</p>
          <Link
            href="/products"
            className="mt-5 inline-block rounded-full bg-[#f26735] px-6 py-3 text-sm font-bold text-white"
          >
            {t("discover")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_370px]">
          <section className="grid content-start gap-3">
            {lines.map(({ item, product }) => {
              const display = localizeProduct(product!, locale);
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[90px_1fr_auto] items-center gap-4 rounded-2xl border border-[#e7ebe5] bg-white p-3 sm:grid-cols-[110px_1fr_auto_auto]"
                >
                  <div className="scale-[.75]">
                    <ProductArt kind={product!.image} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[1px] text-[#f26735]">
                      {product!.brand}
                    </p>
                    <h2 className="mt-1 text-sm font-bold">{display.name}</h2>
                    <p className="mt-1 text-xs text-[#7d8880]">
                      {formatPrice(product!.price)}
                    </p>
                  </div>
                  <div className="flex items-center rounded-full border border-[#e5e8e2]">
                    <button
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      className="p-2"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="min-w-6 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      className="p-2"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="hidden p-2 text-[#9aa39d] hover:text-red-500 sm:block"
                    aria-label={locale === "tr" ? "Ürünü sil" : "Remove item"}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </section>
          <aside className="h-fit rounded-2xl border border-[#e7ebe5] bg-white p-6">
            <h2 className="text-lg font-bold">{t("summary")}</h2>
            <div className="mt-5 flex justify-between text-sm text-[#758078]">
              <span>{t("subtotal")}</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm text-[#758078]">
              <span>{t("shipping")}</span>
              <span className="text-[#388654]">{t("free")}</span>
            </div>
            <div className="my-5 border-t border-[#e7ebe5]" />
            <div className="flex justify-between font-bold">
              <span>{t("total")}</span>
              <span>{formatPrice(total)}</span>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setBusy(true);
                const data = new FormData(e.currentTarget);
                try {
                  const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      customerName: data.get("name"),
                      email: data.get("email"),
                      address: data.get("address"),
                      items: cart,
                    }),
                  });
                  const body = await response.json();
                  if (!response.ok)
                    throw new Error(
                      body.error ??
                        (locale === "tr"
                          ? "Sipariş alınamadı."
                          : "Order request failed."),
                    );
                  setDone(true);
                  cart.forEach((i) => remove(i.id));
                } catch (err) {
                  setError(
                    err instanceof Error
                      ? err.message
                      : locale === "tr"
                        ? "Bir sorun oluştu."
                        : "Something went wrong.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
              className="mt-6 grid gap-3"
            >
              <input
                name="name"
                required
                placeholder={t("fullName")}
                className="rounded-xl border border-[#e5e8e2] px-4 py-3 text-sm outline-none focus:border-[#f26735]"
              />
              <input
                name="email"
                required
                type="email"
                placeholder={t("email")}
                className="rounded-xl border border-[#e5e8e2] px-4 py-3 text-sm outline-none focus:border-[#f26735]"
              />
              <textarea
                name="address"
                required
                placeholder={t("address")}
                rows={3}
                className="resize-none rounded-xl border border-[#e5e8e2] px-4 py-3 text-sm outline-none focus:border-[#f26735]"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                disabled={busy}
                className="mt-2 rounded-full bg-[#f26735] px-5 py-4 text-sm font-bold text-white disabled:opacity-60"
              >
                {busy ? t("sending") : t("orderRequest")}
              </button>
            </form>
            <p className="mt-4 flex items-center gap-2 text-[10px] leading-4 text-[#8a948d]">
              <ShieldCheck size={14} /> {t("secureInfo")}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[10px] text-[#8a948d]">
              <Truck size={14} /> {t("shippingConfirm")}
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
