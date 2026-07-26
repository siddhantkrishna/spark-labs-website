import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, ApplyButton } from "@/components/ui";
import { SITE } from "@/constants/site";

const waHref = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

const CARDS = [
  {
    icon: Phone,
    title: "Call us",
    value: SITE.phoneDisplay,
    href: `tel:+${SITE.phone}`,
    note: "Mon – Sat, 9 AM – 8 PM",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: waHref,
    note: "Fastest response",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "We reply within 24 hours",
  },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Spark Labs"
        description="Get in touch with Spark Labs in Raigarh, Chhattisgarh. Call, WhatsApp or email us about admissions to the AI Builder Program, or book a free counseling session."
        path="/contact"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk about your child&rsquo;s <span className="text-accent">future.</span>
          </>
        }
        intro="Have a question, or ready to visit the lab? Reach us however you prefer — we're happy to help."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold text-ink">{c.title}</h2>
                  <p className="mt-1 text-[15px] font-semibold text-accent">{c.value}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-faint">{c.note}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-paper p-8 shadow-card sm:p-10">
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                  <MapPin className="h-5 w-5 text-accent" /> Visit the lab
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-mute">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.postalCode}
                  <br />
                  {SITE.address.country}
                </p>
                <p className="mt-4 flex items-center gap-2 text-[14px] text-mute">
                  <Clock className="h-4 w-4 text-accent" /> Open Mon – Sat · 3 batches daily
                </p>
                <ApplyButton mode="counsel" className="mt-7">
                  Book a Free Counseling Session
                </ApplyButton>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl bg-ink p-8 text-white shadow-lift sm:p-10">
                <div className="dotgrid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative">
                  <p className="font-mono text-[11px] tracking-[0.24em] text-accent-bright uppercase">
                    Prefer to apply now?
                  </p>
                  <p className="mt-4 font-display text-2xl font-bold leading-snug">
                    Skip the queue and start your admission in two minutes.
                  </p>
                  <ApplyButton mode="apply" variant="light" className="mt-7">
                    Apply for Admission
                  </ApplyButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
