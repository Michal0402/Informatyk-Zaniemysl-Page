export type CompanyConfig = {
  name: string;
  brand: string;
  /** Numer serwisu komputerowego */
  phonePc: string;
  phonePcDisplay: string;
  /** Numer serwisu GSM */
  phoneGsm: string;
  phoneGsmDisplay: string;
  email: string;
  address: string;
  hours: string;
  area: string;
  domain: string;
  description: string;
};

export type PriceItem = {
  id: string;
  name: string;
  price: string;
  note?: string;
};

export type PricingConfig = {
  intro: string;
  items: PriceItem[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqConfig = {
  items: FaqItem[];
};

export type Realization = {
  id: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
};

export type RealizationsConfig = {
  intro: string;
  items: Realization[];
};

export type SiteContent = {
  company: CompanyConfig;
  pricing: PricingConfig;
  faq: FaqConfig;
  realizations: RealizationsConfig;
};
