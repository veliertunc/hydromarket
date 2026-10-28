import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "en"
        ? "Hydromarket | Hydraulic Systems & Industrial Solutions"
        : "Hydromarket | Hidrolik Sistemler & Endüstriyel Çözümler",
    description:
      locale === "en"
        ? "Hydraulic pumps, motors, valves, and industrial solutions from Hydromarket."
        : "Hydromarket güvencesiyle hidrolik pompa, motor, valf ve endüstriyel çözümler.",
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <>{children}</>;
}
