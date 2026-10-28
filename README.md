# Hydromarket Storefront

A bilingual Turkish and English industrial hydraulics storefront built with Next.js, Tailwind CSS, Drizzle ORM, and Better Auth (a Clerk alternative).

## Routes and languages

- Turkish: `/tr`, `/tr/products`, `/tr/products/[id]`, `/tr/cart`, `/tr/sign-in`
- English: `/en`, `/en/products`, `/en/products/[id]`, `/en/cart`, `/en/sign-in`
- The old Turkish paths (`/urunler`, `/sepet`, `/giris`) redirect to Turkish pages with English route slugs.
- Translation strings live in `lib/i18n.ts`; product/category translations live in `lib/translations.ts`. Add a locale to `lib/i18n.ts` and `locales` to support additional languages.

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set a unique `BETTER_AUTH_SECRET`.
3. Generate and apply the SQLite schema: `npm run db:generate`, then `npm run db:migrate`.
4. Start the app with `npm run dev`.

The product catalog and cart are demo-ready. Cart contents persist in the browser. Checkout stores validated order requests and line items in SQLite. Add a payment provider and shipping integration before collecting real payments.
