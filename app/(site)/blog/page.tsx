import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Editorial notes, market buzz, and thought leadership from Aztran Global Investments.",
};

export default function BlogPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Market buzz, company news, education, and institutional perspective."
        imageSrc="/images/hero-bg.jpg"
        minHeightClass="min-h-[45vh]"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <BlogListing />
        </div>
      </section>
    </>
  );
}
