import { Helmet } from "react-helmet-async";
import { SITE, PROGRAM, FAQS } from "@/constants/site";

interface Breadcrumb {
  name: string;
  path: string;
}

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/admissions". Canonical is derived from SITE.url. */
  path?: string;
  keywords?: string[];
  /** Include the FAQPage schema (only on pages that show the FAQ). */
  includeFaqSchema?: boolean;
  /** Include the Course schema (program-related pages). */
  includeCourseSchema?: boolean;
  breadcrumbs?: Breadcrumb[];
  ogType?: "website" | "article";
  image?: string;
  noindex?: boolean;
}

const DEFAULT_KEYWORDS = [
  "AI course for students",
  "AI Builder Program",
  "learn AI Raigarh",
  "AI classes Chhattisgarh",
  "coding for teenagers",
  "prompt engineering course",
  "project based AI learning",
  "Spark Labs",
  "Charvikon Training Research Centre",
];

export function Seo({
  title,
  description,
  path = "/",
  keywords = [],
  includeFaqSchema = false,
  includeCourseSchema = false,
  breadcrumbs,
  ogType = "website",
  image = `${SITE.url}/og-image.jpg`,
  noindex = false,
}: SeoProps) {
  const canonical = `${SITE.url}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? `${SITE.brand} — ${SITE.positioning} · ${SITE.tagline}` : `${title} · ${SITE.brand}`;
  const allKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])].join(", ");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.brand,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.mission,
    email: SITE.email,
    telephone: `+${SITE.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: "IN",
    },
    sameAs: Object.values(SITE.socials),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: `${SITE.brand} — ${SITE.legalName}`,
    image,
    url: SITE.url,
    telephone: `+${SITE.phone}`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: "IN",
    },
    areaServed: "Raigarh, Chhattisgarh",
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: PROGRAM.name,
    description:
      "A six-week, project-based AI laboratory for students aged 13–18. Beginners build 10+ real AI projects and graduate with a portfolio.",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.brand,
      sameAs: SITE.url,
    },
    offers: {
      "@type": "Offer",
      price: PROGRAM.fee,
      priceCurrency: "INR",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: SITE.legalName,
        address: `${SITE.address.city}, ${SITE.address.state}, India`,
      },
      courseWorkload: `P${PROGRAM.durationWeeks}W`,
    },
  };

  const breadcrumbSchema = breadcrumbs && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE.url}${b.path === "/" ? "" : b.path}`,
    })),
  };

  const faqSchema = includeFaqSchema && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.brand} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {includeCourseSchema && (
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
}
