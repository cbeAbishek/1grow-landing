import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Pricing } from "@/components/sections/pricing";
import { siteConfig } from "@/lib/seo-config";
import {
  generateMetadata as genMeta,
  webpageSchema,
  breadcrumbSchema,
  productSchema,
  renderJsonLd,
} from "@/lib/seo";

const pageTitle = "Persona-Based Pricing - Affordable SaaS ERP for Indian Businesses";
const pageDescription =
  "1Grow pricing starts at ₹999/month. Choose Solo, Business, or Scale plan built around your operational stage with a 20-day unrestricted free trial. No credit card required.";
const pageUrl = `${siteConfig.url}/pricing`;

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
});

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Pricing", url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Pricing", url: pageUrl },
  ]),
  productSchema({
    name: "1Grow Solo Plan",
    description:
      "Single-operator SaaS ERP for independent coaches, studios, and rental businesses. Automated fee collection and mobile check-ins.",
    price: 999,
    image: "/assert/solo.png",
    sku: "1GROW-SOLO",
  }),
  productSchema({
    name: "1Grow Business Plan",
    description:
      "Multi-branch SaaS ERP for expanding teams up to 3 locations with role permissions, WhatsApp automation, and client portal.",
    price: 1899,
    image: "/assert/business.png",
    sku: "1GROW-BUSINESS",
  }),
  productSchema({
    name: "1Grow Scale Plan",
    description:
      "Enterprise SaaS ERP with predictive AI revenue analytics, unlimited records, multi-portal ecosystem, and priority support.",
    price: 2499,
    image: "/assert/complete.png",
    sku: "1GROW-COMPLETE",
  }),
];

export default function PricingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd({
            "@context": "https://schema.org",
            "@graph": schemas,
          }),
        }}
        key="pricing-schemas"
      />
      <SiteHeader />
      <main className="pt-20 sm:pt-28 pb-16">
        <Pricing showHeading={true} />
      </main>
      <SiteFooter />
    </div>
  );
}
