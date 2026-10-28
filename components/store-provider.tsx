"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
type CartItem = { id: string; quantity: number };
type Store = {
  cart: CartItem[];
  add: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  remove: (id: string) => void;
  count: number;
};
const CartContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hydromarket-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("hydromarket-cart", JSON.stringify(cart));
  }, [cart, ready]);
  const value = useMemo(
    () => ({
      cart,
      add: (id: string) =>
        setCart((c) => {
          const item = c.find((x) => x.id === id);
          return item
            ? c.map((x) =>
                x.id === id ? { ...x, quantity: x.quantity + 1 } : x,
              )
            : [...c, { id, quantity: 1 }];
        }),
      setQuantity: (id: string, q: number) =>
        setCart((c) =>
          q < 1
            ? c.filter((x) => x.id !== id)
            : c.map((x) => (x.id === id ? { ...x, quantity: q } : x)),
        ),
      remove: (id: string) => setCart((c) => c.filter((x) => x.id !== id)),
      count: cart.reduce((a, x) => a + x.quantity, 0),
    }),
    [cart],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useStore() {
  const value = useContext(CartContext);
  if (!value) throw new Error("StoreProvider eksik");
  return value;
}
