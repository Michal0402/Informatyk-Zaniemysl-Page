# Serwis Zaniemyśl

Strona serwisu komputerów i telefonów w Zaniemyślu.
Next.js · TypeScript · Tailwind CSS · panel admina zapisujący JSON.

## Start

```bash
cp .env.example .env.local   # ustaw ADMIN_PASSWORD
npm install
npm run dev
```

Strona: http://localhost:3000  
Panel: http://localhost:3000/admin

## Produkcja

Panel zapisuje pliki, więc hosting musi uruchamiać Node (`next start`), nie sam katalog statyczny.

```bash
npm run build
npm start
```

## Panel admina (`/admin`)

- Chroniony hasłem z `ADMIN_PASSWORD` (min. 8 znaków) w `.env.local`
- Sesja w cookie HttpOnly (12 h)
- Zapis do plików w `content/`
- Nie indeksowany (`robots`, `noindex`)
- Nie linkowany ze strony publicznej

Edytowalne sekcje: firma, cennik, FAQ, realizacje.

## Treść w plikach

| Treść | Plik |
| --- | --- |
| Firma | `content/company.json` |
| Cennik | `content/pricing.json` |
| FAQ | `content/faq.json` |
| Realizacje | `content/realizations.json` |
| Usługi (stałe) | `src/data/services.ts` |
| Usterki | `src/data/issues.ts` |
| Proces | `src/data/process.ts` |

## Zdjęcia

- `public/images/hero.jpg`
- `public/images/realizations/` + wpisy w panelu / `content/realizations.json`

## Skrypty

- `npm run dev` — lokalny podgląd
- `npm run build` — build produkcyjny
- `npm start` — serwer Node (wymagany do panelu)
- `npm run lint` / `npm run typecheck`
