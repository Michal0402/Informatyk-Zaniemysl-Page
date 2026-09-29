"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Plus, Save, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/contentTypes";

type AuthState = {
  configured: boolean;
  authenticated: boolean;
};

const emptyContent = (): SiteContent => ({
  company: {
    name: "",
    brand: "",
    phonePc: "",
    phonePcDisplay: "",
    phoneGsm: "",
    phoneGsmDisplay: "",
    email: "",
    address: "",
    hours: "",
    area: "",
    domain: "",
    description: "",
  },
  pricing: { intro: "", items: [] },
  faq: { items: [] },
  realizations: { intro: "", items: [] },
});

function Field({
  label,
  value,
  onChange,
  hint,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
  multiline?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      <span className="text-sm font-medium text-fg">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
        />
      )}
      {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function AdminPanel() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(emptyContent);
  const [tab, setTab] = useState<"firma" | "cennik" | "faq" | "realizacje">(
    "firma",
  );
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const refreshAuth = useCallback(async () => {
    const res = await fetch("/api/admin/auth", { cache: "no-store" });
    const data = (await res.json()) as AuthState;
    setAuth(data);
    return data;
  }, []);

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    if (!res.ok) {
      setError("Nie udało się wczytać treści");
      return;
    }
    const data = (await res.json()) as SiteContent;
    setContent(data);
  }, []);

  useEffect(() => {
    void (async () => {
      const state = await refreshAuth();
      if (state.authenticated) {
        await loadContent();
      }
    })();
  }, [refreshAuth, loadContent]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Logowanie nieudane");
        return;
      }
      setPassword("");
      await refreshAuth();
      await loadContent();
      setStatus("Zalogowano");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setContent(emptyContent());
    await refreshAuth();
    setStatus("Wylogowano");
  }

  async function handleSave() {
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Zapis nieudany");
        return;
      }
      setStatus("Zapisano do plików w katalogu content/");
    } finally {
      setBusy(false);
    }
  }

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-muted">
        Ładowanie…
      </div>
    );
  }

  if (!auth.configured) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 p-6">
        <h1 className="font-display text-2xl font-bold">Panel niedostępny</h1>
        <p className="text-muted leading-relaxed">
          Utwórz plik <code className="text-accent">.env.local</code> z hasłem
          (min. 8 znaków) i zrestartuj serwer:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border bg-bg-card p-4 text-sm text-accent">
          {`ADMIN_PASSWORD=twoje-silne-haslo`}
        </pre>
        <Link href="/" className="text-sm text-accent hover:text-accent-hover">
          ← Wróć na stronę
        </Link>
      </div>
    );
  }

  if (!auth.authenticated) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
        <h1 className="font-display text-2xl font-bold">Konfiguracja strony</h1>
        <p className="mt-2 text-sm text-muted">
          Panel chroniony hasłem. Zmiany trafiają do plików JSON w{" "}
          <code className="text-accent">content/</code>.
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Field
            label="Hasło"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={busy || password.length < 1}
          >
            Zaloguj
          </button>
        </form>
        <Link href="/" className="mt-6 text-sm text-muted hover:text-accent">
          ← Wróć na stronę
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "firma" as const, label: "Firma" },
    { id: "cennik" as const, label: "Cennik" },
    { id: "faq" as const, label: "FAQ" },
    { id: "realizacje" as const, label: "Realizacje" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            Panel konfiguracji
          </h1>
          <p className="mt-1 text-sm text-muted">
            Zapisuje dane do <code className="text-accent">content/*.json</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => void handleSave()}
            disabled={busy}
          >
            <Save className="size-4" aria-hidden />
            Zapisz
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => void handleLogout()}
          >
            <LogOut className="size-4" aria-hidden />
            Wyloguj
          </button>
        </div>
      </div>

      {status ? <p className="mt-4 text-sm text-accent">{status}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <div
        className="mt-6 flex flex-wrap gap-2 border-b border-border pb-3"
        role="tablist"
        aria-label="Sekcje konfiguracji"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === item.id
                ? "bg-accent text-bg"
                : "bg-bg-card text-muted hover:text-fg"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {tab === "firma" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nazwa"
              value={content.company.name}
              onChange={(name) =>
                setContent((c) => ({ ...c, company: { ...c.company, name } }))
              }
            />
            <Field
              label="Marka (nagłówek)"
              value={content.company.brand}
              onChange={(brand) =>
                setContent((c) => ({ ...c, company: { ...c.company, brand } }))
              }
            />
            <Field
              label="Telefon — serwis komputerowy"
              value={content.company.phonePc}
              onChange={(phonePc) =>
                setContent((c) => ({
                  ...c,
                  company: { ...c.company, phonePc },
                }))
              }
              hint='Np. "788369543". Puste = bez linku tel:'
            />
            <Field
              label="Telefon PC — wyświetlany"
              value={content.company.phonePcDisplay}
              onChange={(phonePcDisplay) =>
                setContent((c) => ({
                  ...c,
                  company: { ...c.company, phonePcDisplay },
                }))
              }
              hint='Np. "788 369 543"'
            />
            <Field
              label="Telefon — serwis GSM"
              value={content.company.phoneGsm}
              onChange={(phoneGsm) =>
                setContent((c) => ({
                  ...c,
                  company: { ...c.company, phoneGsm },
                }))
              }
              hint='Np. "518518671"'
            />
            <Field
              label="Telefon GSM — wyświetlany"
              value={content.company.phoneGsmDisplay}
              onChange={(phoneGsmDisplay) =>
                setContent((c) => ({
                  ...c,
                  company: { ...c.company, phoneGsmDisplay },
                }))
              }
              hint='Np. "518 518 671"'
            />
            <Field
              label="E-mail"
              value={content.company.email}
              onChange={(email) =>
                setContent((c) => ({ ...c, company: { ...c.company, email } }))
              }
            />
            <Field
              label="Obszar działania"
              value={content.company.area}
              onChange={(area) =>
                setContent((c) => ({ ...c, company: { ...c.company, area } }))
              }
            />
            <Field
              label="Adres punktu"
              value={content.company.address}
              onChange={(address) =>
                setContent((c) => ({
                  ...c,
                  company: { ...c.company, address },
                }))
              }
              hint="Zostaw puste, jeśli nie ma stałego adresu"
            />
            <Field
              label="Godziny kontaktu"
              value={content.company.hours}
              onChange={(hours) =>
                setContent((c) => ({ ...c, company: { ...c.company, hours } }))
              }
              hint="Zostaw puste, jeśli nie ustalono"
            />
            <Field
              label="Domena"
              value={content.company.domain}
              onChange={(domain) =>
                setContent((c) => ({ ...c, company: { ...c.company, domain } }))
              }
              hint='Np. "https://przyklad.pl"'
            />
            <div className="sm:col-span-2">
              <Field
                label="Opis"
                value={content.company.description}
                onChange={(description) =>
                  setContent((c) => ({
                    ...c,
                    company: { ...c.company, description },
                  }))
                }
                multiline
              />
            </div>
          </div>
        ) : null}

        {tab === "cennik" ? (
          <div className="space-y-4">
            <Field
              label="Wstęp do cennika"
              value={content.pricing.intro}
              onChange={(intro) =>
                setContent((c) => ({
                  ...c,
                  pricing: { ...c.pricing, intro },
                }))
              }
              multiline
            />
            {content.pricing.items.map((item, index) => (
              <div
                key={item.id}
                className="card space-y-3 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Pozycja {index + 1}</p>
                  <button
                    type="button"
                    className="btn btn-secondary !min-h-9 !px-3"
                    aria-label="Usuń pozycję"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        pricing: {
                          ...c.pricing,
                          items: c.pricing.items.filter((_, i) => i !== index),
                        },
                      }))
                    }
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="ID"
                    value={item.id}
                    onChange={(id) =>
                      setContent((c) => {
                        const items = [...c.pricing.items];
                        items[index] = { ...items[index]!, id };
                        return { ...c, pricing: { ...c.pricing, items } };
                      })
                    }
                  />
                  <Field
                    label="Cena"
                    value={item.price}
                    onChange={(price) =>
                      setContent((c) => {
                        const items = [...c.pricing.items];
                        items[index] = { ...items[index]!, price };
                        return { ...c, pricing: { ...c.pricing, items } };
                      })
                    }
                    hint='Np. "Wycena po diagnozie" lub "od 80 zł"'
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Nazwa usługi"
                      value={item.name}
                      onChange={(name) =>
                        setContent((c) => {
                          const items = [...c.pricing.items];
                          items[index] = { ...items[index]!, name };
                          return { ...c, pricing: { ...c.pricing, items } };
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Notatka (opcjonalnie)"
                      value={item.note ?? ""}
                      onChange={(note) =>
                        setContent((c) => {
                          const items = [...c.pricing.items];
                          const current = items[index]!;
                          items[index] = note
                            ? { ...current, note }
                            : { id: current.id, name: current.name, price: current.price };
                          return { ...c, pricing: { ...c.pricing, items } };
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  pricing: {
                    ...c.pricing,
                    items: [
                      ...c.pricing.items,
                      {
                        id: `pozycja-${Date.now()}`,
                        name: "Nowa usługa",
                        price: "Wycena po diagnozie",
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="size-4" aria-hidden />
              Dodaj pozycję
            </button>
          </div>
        ) : null}

        {tab === "faq" ? (
          <div className="space-y-4">
            {content.faq.items.map((item, index) => (
              <div key={item.id} className="card space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Pytanie {index + 1}</p>
                  <button
                    type="button"
                    className="btn btn-secondary !min-h-9 !px-3"
                    aria-label="Usuń pytanie"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        faq: {
                          items: c.faq.items.filter((_, i) => i !== index),
                        },
                      }))
                    }
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
                <Field
                  label="ID"
                  value={item.id}
                  onChange={(id) =>
                    setContent((c) => {
                      const items = [...c.faq.items];
                      items[index] = { ...items[index]!, id };
                      return { ...c, faq: { items } };
                    })
                  }
                />
                <Field
                  label="Pytanie"
                  value={item.question}
                  onChange={(question) =>
                    setContent((c) => {
                      const items = [...c.faq.items];
                      items[index] = { ...items[index]!, question };
                      return { ...c, faq: { items } };
                    })
                  }
                />
                <Field
                  label="Odpowiedź"
                  value={item.answer}
                  onChange={(answer) =>
                    setContent((c) => {
                      const items = [...c.faq.items];
                      items[index] = { ...items[index]!, answer };
                      return { ...c, faq: { items } };
                    })
                  }
                  multiline
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  faq: {
                    items: [
                      ...c.faq.items,
                      {
                        id: `pytanie-${Date.now()}`,
                        question: "Nowe pytanie?",
                        answer: "",
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="size-4" aria-hidden />
              Dodaj pytanie
            </button>
          </div>
        ) : null}

        {tab === "realizacje" ? (
          <div className="space-y-4">
            <Field
              label="Wstęp sekcji"
              value={content.realizations.intro}
              onChange={(intro) =>
                setContent((c) => ({
                  ...c,
                  realizations: { ...c.realizations, intro },
                }))
              }
              multiline
            />
            {content.realizations.items.map((item, index) => (
              <div key={item.id} className="card space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Realizacja {index + 1}</p>
                  <button
                    type="button"
                    className="btn btn-secondary !min-h-9 !px-3"
                    aria-label="Usuń realizację"
                    onClick={() =>
                      setContent((c) => ({
                        ...c,
                        realizations: {
                          ...c.realizations,
                          items: c.realizations.items.filter((_, i) => i !== index),
                        },
                      }))
                    }
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="ID"
                    value={item.id}
                    onChange={(id) =>
                      setContent((c) => {
                        const items = [...c.realizations.items];
                        items[index] = { ...items[index]!, id };
                        return {
                          ...c,
                          realizations: { ...c.realizations, items },
                        };
                      })
                    }
                  />
                  <Field
                    label="Ścieżka obrazu"
                    value={item.image ?? ""}
                    onChange={(image) =>
                      setContent((c) => {
                        const items = [...c.realizations.items];
                        const current = items[index]!;
                        items[index] = {
                          id: current.id,
                          title: current.title,
                          description: current.description,
                          ...(image.trim() ? { image: image.trim() } : {}),
                          ...(current.alt ? { alt: current.alt } : {}),
                        };
                        return {
                          ...c,
                          realizations: { ...c.realizations, items },
                        };
                      })
                    }
                    hint='Np. "/images/realizations/laptop.jpg"'
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Tytuł"
                      value={item.title}
                      onChange={(title) =>
                        setContent((c) => {
                          const items = [...c.realizations.items];
                          items[index] = { ...items[index]!, title };
                          return {
                            ...c,
                            realizations: { ...c.realizations, items },
                          };
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Opis"
                      value={item.description}
                      onChange={(description) =>
                        setContent((c) => {
                          const items = [...c.realizations.items];
                          items[index] = { ...items[index]!, description };
                          return {
                            ...c,
                            realizations: { ...c.realizations, items },
                          };
                        })
                      }
                      multiline
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Alt zdjęcia"
                      value={item.alt ?? ""}
                      onChange={(alt) =>
                        setContent((c) => {
                          const items = [...c.realizations.items];
                          const current = items[index]!;
                          items[index] = alt
                            ? { ...current, alt }
                            : {
                                id: current.id,
                                title: current.title,
                                description: current.description,
                                ...(current.image ? { image: current.image } : {}),
                              };
                          return {
                            ...c,
                            realizations: { ...c.realizations, items },
                          };
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  realizations: {
                    ...c.realizations,
                    items: [
                      ...c.realizations.items,
                      {
                        id: `realizacja-${Date.now()}`,
                        title: "Nowa realizacja",
                        description: "",
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="size-4" aria-hidden />
              Dodaj realizację
            </button>
          </div>
        ) : null}
      </div>

      <p className="mt-10 text-xs text-muted">
        Adres panelu: <code className="text-accent">/admin</code> · nie linkuj go
        publicznie. Po zapisie odśwież stronę główną.
      </p>
    </div>
  );
}
