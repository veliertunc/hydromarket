import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { products } from "@/lib/products";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerName = String(body.customerName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const address = String(body.address ?? "").trim();
    const items: unknown = body.items;
    if (
      !customerName ||
      customerName.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      !address ||
      address.length > 1500 ||
      !Array.isArray(items) ||
      items.length < 1 ||
      items.length > 30
    ) {
      return NextResponse.json(
        { error: "Lütfen geçerli sipariş ve iletişim bilgileri girin." },
        { status: 400 },
      );
    }
    const normalized = items.map(
      (item: { id?: unknown; quantity?: unknown }) => {
        const product = products.find((entry) => entry.id === item.id);
        const quantity = Number(item.quantity);
        if (
          !product ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 50
        )
          throw new Error("Sepetinizde geçersiz bir ürün var.");
        return { productId: product.id, quantity, unitPrice: product.price };
      },
    );
    const total = normalized.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const id = randomUUID();
    const createdAt = new Date();
    db.transaction((tx) => {
      tx.insert(orders)
        .values({
          id,
          customerName,
          email,
          address,
          total,
          status: "pending",
          createdAt,
        })
        .run();
      tx.insert(orderItems)
        .values(
          normalized.map((item) => ({
            id: randomUUID(),
            orderId: id,
            ...item,
          })),
        )
        .run();
    });
    return NextResponse.json({ orderId: id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Sipariş alınırken bir sorun oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
