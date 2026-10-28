"use client";
import { LocaleLink as Link } from "@/components/locale-link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useLocale, useT } from "@/components/i18n";
export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const t = useT();
  const locale = useLocale();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const result =
      mode === "login"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({
            name: String(data.get("name")),
            email,
            password,
          });
    setBusy(false);
    if (result.error) {
      setError(
        result.error.message ??
          (locale === "tr"
            ? "Bir sorun oluştu. Bilgilerinizi kontrol edip tekrar deneyin."
            : "Something went wrong. Check your details and try again."),
      );
      return;
    }
    router.push(`/${locale}/cart`);
  }
  return (
    <main className="mx-auto grid min-h-[72vh] max-w-[1060px] items-center gap-12 px-5 py-14 md:grid-cols-2">
      <div className="rounded-[28px] bg-[#17251f] p-9 text-white sm:p-12">
        <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#f58a5f]">
          {t("accountPanel")}
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-1px]">
          {t("accountHeadline")}
        </h1>
        <p className="mt-5 text-sm leading-7 text-white/60">
          {t("accountDescription")}
        </p>
        <div className="mt-9 grid gap-4 text-sm text-white/75">
          <span>✓ {t("fastOrder")}</span>
          <span>✓ {t("offerSupport")}</span>
          <span>✓ {t("productHistory")}</span>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md">
        <h2 className="text-2xl font-bold">
          {mode === "login" ? t("welcome") : t("createAccount")}
        </h2>
        <p className="mt-2 text-sm text-[#7e8881]">
          {mode === "login" ? t("loginDescription") : t("registerDescription")}
        </p>
        <form onSubmit={submit} className="mt-7 grid gap-4">
          {mode === "register" && (
            <label className="grid gap-2 text-xs font-bold">
              {t("fullName")}
              <input
                name="name"
                required
                className="rounded-xl border border-[#e3e7e1] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#f26735]"
                placeholder={t("fullName")}
              />
            </label>
          )}
          <label className="grid gap-2 text-xs font-bold">
            {t("email")}
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-[#e3e7e1] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#f26735]"
              placeholder="name@company.com"
            />
          </label>
          <label className="grid gap-2 text-xs font-bold">
            {t("password")}
            <input
              name="password"
              type="password"
              minLength={8}
              required
              className="rounded-xl border border-[#e3e7e1] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#f26735]"
              placeholder={t("passwordHint")}
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            disabled={busy}
            className="mt-2 rounded-full bg-[#f26735] px-5 py-4 text-sm font-bold text-white disabled:opacity-60"
          >
            {busy
              ? t("logging")
              : mode === "login"
                ? t("login")
                : t("register")}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-[#7e8881]">
          {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
          <button
            onClick={() => {
              setError("");
              setMode(mode === "login" ? "register" : "login");
            }}
            className="font-bold text-[#f26735]"
          >
            {mode === "login" ? t("signup") : t("signin")}
          </button>
        </p>
        <p className="mt-5 text-center text-xs text-[#a0a9a3]">
          {locale === "tr" ? "Ürün seçimi için" : "To browse products,"}{" "}
          <Link href="/products" className="underline">
            {t("browseCatalog")}
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
