import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocaleHtml } from "@/components/i18n";
export const metadata: Metadata = {
  title: "Hydromarket | Hydraulic Systems & Industrial Solutions",
  description:
    "Hydraulic pumps, motors, valves, and industrial solutions from Hydromarket.",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-locale") ?? "tr";
  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <LocaleHtml>
            <Header />
            {children}
            <Footer />
          </LocaleHtml>
        </StoreProvider>
      </body>
    </html>
  );
}
