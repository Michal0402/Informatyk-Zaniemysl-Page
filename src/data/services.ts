export const serviceChoice = [
  {
    id: "komputery",
    href: "#serwis-komputerowy",
    title: "Komputery i laptopy",
    description:
      "Diagnostyka, czyszczenie, naprawa i modernizacja sprzętu stacjonarnego oraz laptopów.",
    highlights: ["Diagnostyka", "Czyszczenie", "Naprawa", "Modernizacja"],
  },
  {
    id: "telefony",
    href: "#serwis-telefonow",
    title: "Telefony",
    description:
      "Wymiana ekranów, baterii, naprawa ładowania i diagnostyka po upadku lub zalaniu.",
    highlights: ["Ekrany", "Baterie", "Ładowanie", "Diagnostyka"],
  },
] as const;

export const computerServiceGroups = [
  {
    title: "Diagnostyka i uruchomienie",
    items: [
      "Sprzęt nie uruchamia się lub wyłącza się niespodziewanie",
      "Brak obrazu na monitorze",
      "Diagnostyka po awarii zasilania lub przepięciu",
    ],
  },
  {
    title: "Czyszczenie i chłodzenie",
    items: [
      "Przegrzewanie laptopa lub komputera",
      "Czyszczenie układu chłodzenia",
      "Wymiana pasty i materiałów termicznych",
    ],
  },
  {
    title: "Modernizacja i oprogramowanie",
    items: [
      "Rozbudowa o SSD i pamięć RAM",
      "Instalacja lub reinstalacja systemu Windows",
      "Optymalizacja działania systemu",
    ],
  },
  {
    title: "Dane, sieć i składanie",
    items: [
      "Odzyskiwanie danych z dysków (gdy to możliwe)",
      "Problemy z Wi‑Fi i łącznością",
      "Składanie komputerów pod konkretne potrzeby",
    ],
  },
] as const;

export const phoneServiceGroups = [
  {
    title: "Wymiany części",
    items: [
      "Wymiana wyświetlaczy",
      "Wymiana baterii",
      "Wymiana szybek aparatów",
      "Wymiana tylnych klapek",
      "Naprawa i wymiana złączy ładowania",
    ],
  },
  {
    title: "Diagnostyka i dane",
    items: [
      "Diagnostyka po upadku",
      "Diagnostyka po zalaniu",
      "Przenoszenie danych między urządzeniami",
    ],
  },
] as const;

export const phoneBrandsNote =
  "Naprawiamy iPhone’y oraz popularne modele z Androidem. Dostępność części i zakres naprawy zależą od konkretnego modelu — po diagnostyce informujemy, co da się zrobić i jaki będzie koszt.";
