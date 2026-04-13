import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ContactPageAside } from "@/components/contact/ContactPageAside";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Aztran Global Investments in Lekki, Lagos—institutional enquiries, partnership desk, and mandated briefings.",
};

export default function ContactPage(): ReactElement {
  return (
    <>
      <PageHero title="Contact Us" imageSrc="/images/hero-bg.jpg" />
      <section className="relative overflow-hidden py-section">
        <div
          className="pointer-events-none absolute inset-0 dark:opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--color-cyan) 10%, transparent), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 xl:col-span-5">
              <ContactPageAside />
            </div>
            <div className="lg:col-span-7 xl:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
