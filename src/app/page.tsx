import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServiceChoice } from "@/components/ServiceChoice";
import { ComputerService } from "@/components/ComputerService";
import { PhoneService } from "@/components/PhoneService";
import { CommonIssues } from "@/components/CommonIssues";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Realizations } from "@/components/Realizations";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileContactBar } from "@/components/MobileContactBar";
import {
  ContactProvider,
  companyToContact,
} from "@/components/ContactProvider";
import { getCompany, getFaq } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const company = getCompany();
  const contact = companyToContact(company);
  const faq = getFaq().items;

  return (
    <ContactProvider value={contact}>
      <Header />
      <main id="main" className="page-main flex-1">
        <Hero />
        <ServiceChoice />
        <ComputerService />
        <PhoneService />
        <CommonIssues />
        <HowItWorks />
        <Pricing />
        <Realizations />
        <FAQ items={faq} />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </ContactProvider>
  );
}
