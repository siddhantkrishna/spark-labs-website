import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminSection,
  LoadingState,
  Select,
  TextArea,
  TextInput,
} from "@/components/admin/AdminUI";
import { getSiteContent, upsertSiteContent } from "@/services/content";
import { SITE } from "@/constants/site";
import type { FaqItem } from "@/types";

/* ------------------------------------------------------------------ */
/* Site content editor — hero, stats, faq, footer, seo                 */
/* ------------------------------------------------------------------ */

interface HeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  paragraph: string;
  primaryCta: string;
  secondaryCta: string;
}

const DEFAULT_HERO: HeroContent = {
  eyebrow: "Admissions Open · Batch 01",
  headlineLine1: "Build AI.",
  headlineLine2: "Don't just learn",
  headlineLine3: "about it.",
  paragraph:
    "Spark Labs is a six-week, project-based AI laboratory for students aged 13–18. No lecture halls. No theory dumps.",
  primaryCta: "Apply for Admission",
  secondaryCta: "Book a Free Counseling Session",
};

type Tab = "hero" | "faq" | "seo";

export function AdminContent() {
  const [tab, setTab] = useState<Tab>("hero");

  return (
    <AdminSection
      title="Website content"
      description="Edit the copy shown on the public site. Changes are live immediately."
    >
      <div className="flex gap-2 border-b border-line">
        {(["hero", "faq", "seo"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-[13.5px] font-semibold capitalize transition-colors ${
              tab === t ? "border-accent text-accent" : "border-transparent text-mute hover:text-ink"
            }`}
          >
            {t === "seo" ? "SEO" : t}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {tab === "hero" && <HeroEditor />}
        {tab === "faq" && <FaqEditor />}
        {tab === "seo" && <SeoEditor />}
      </div>
    </AdminSection>
  );
}

/* ---------- Hero ---------- */

function HeroEditor() {
  const [value, setValue] = useState<HeroContent>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const v = await getSiteContent<HeroContent>("hero");
      setValue({ ...DEFAULT_HERO, ...(v ?? {}) });
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true); setSaved(false);
    try { await upsertSiteContent("hero", value); setSaved(true); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingState />;
  const set = (k: keyof HeroContent) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue({ ...value, [k]: e.target.value });

  return (
    <AdminCard className="p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Eyebrow badge"><TextInput value={value.eyebrow} onChange={set("eyebrow")} /></AdminField>
        <AdminField label="Primary CTA"><TextInput value={value.primaryCta} onChange={set("primaryCta")} /></AdminField>
        <AdminField label="Headline line 1"><TextInput value={value.headlineLine1} onChange={set("headlineLine1")} /></AdminField>
        <AdminField label="Headline line 2"><TextInput value={value.headlineLine2} onChange={set("headlineLine2")} /></AdminField>
        <AdminField label="Headline line 3"><TextInput value={value.headlineLine3} onChange={set("headlineLine3")} /></AdminField>
        <AdminField label="Secondary CTA"><TextInput value={value.secondaryCta} onChange={set("secondaryCta")} /></AdminField>
      </div>
      <div className="mt-4"><AdminField label="Paragraph"><TextArea value={value.paragraph} onChange={set("paragraph")} rows={3} /></AdminField></div>
      <div className="mt-6 flex items-center justify-end gap-3">
        {saved && <span className="text-[13px] text-emerald-600">Saved.</span>}
        <AdminButton onClick={save} loading={saving}><Save className="h-4 w-4" /> Save changes</AdminButton>
      </div>
    </AdminCard>
  );
}

/* ---------- FAQ ---------- */

function FaqEditor() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const v = await getSiteContent<{ items: FaqItem[] }>("faq");
      setItems(v?.items ?? []);
      setLoading(false);
    })();
  }, []);

  const update = (i: number, patch: Partial<FaqItem>) => setItems((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const remove = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setItems((prev) => [...prev, { q: "", a: "" }]);

  const save = async () => {
    setSaving(true); setSaved(false);
    try { await upsertSiteContent("faq", { items }); setSaved(true); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <AdminCard className="p-6 text-[14px] text-mute">
          Leave empty to use the default FAQ from code. Add entries here to override.
        </AdminCard>
      )}
      {items.map((it, i) => (
        <AdminCard key={i} className="p-6">
          <div className="grid gap-4">
            <AdminField label={`Question ${i + 1}`}>
              <TextInput value={it.q} onChange={(e) => update(i, { q: e.target.value })} />
            </AdminField>
            <AdminField label="Answer">
              <TextArea value={it.a} onChange={(e) => update(i, { a: e.target.value })} rows={3} />
            </AdminField>
            <div className="flex justify-end">
              <AdminButton variant="danger" onClick={() => remove(i)}>Remove</AdminButton>
            </div>
          </div>
        </AdminCard>
      ))}
      <div className="flex items-center justify-between">
        <AdminButton variant="ghost" onClick={add}>+ Add question</AdminButton>
        <div className="flex items-center gap-3">
          {saved && <span className="text-[13px] text-emerald-600">Saved.</span>}
          <AdminButton onClick={save} loading={saving}><Save className="h-4 w-4" /> Save FAQ</AdminButton>
        </div>
      </div>
    </div>
  );
}

/* ---------- SEO ---------- */

interface SeoContent { title: string; description: string; keywords: string; ogImage: string }
const DEFAULT_SEO: SeoContent = {
  title: "Spark Labs — AI Learning Laboratory",
  description: "A 6-week, project-based AI laboratory for students aged 13–18 in Raigarh.",
  keywords: "AI course, AI Builder Program, Raigarh, Chhattisgarh, students, teenagers",
  ogImage: `${SITE.url}/og-image.jpg`,
};

function SeoEditor() {
  const [value, setValue] = useState<SeoContent>(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const v = await getSiteContent<SeoContent>("seo");
      setValue({ ...DEFAULT_SEO, ...(v ?? {}) });
      setLoading(false);
    })();
  }, []);
  const set = (k: keyof SeoContent) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue({ ...value, [k]: e.target.value });
  const save = async () => { setSaving(true); setSaved(false); try { await upsertSiteContent("seo", value); setSaved(true); } finally { setSaving(false); } };
  if (loading) return <LoadingState />;

  return (
    <AdminCard className="p-6 sm:p-8">
      <div className="grid gap-4">
        <AdminField label="Default page title"><TextInput value={value.title} onChange={set("title")} /></AdminField>
        <AdminField label="Default meta description"><TextArea value={value.description} onChange={set("description")} rows={3} /></AdminField>
        <AdminField label="Keywords" hint="Comma-separated"><TextInput value={value.keywords} onChange={set("keywords")} /></AdminField>
        <AdminField label="Open Graph image URL"><TextInput value={value.ogImage} onChange={set("ogImage")} /></AdminField>
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        {saved && <span className="text-[13px] text-emerald-600">Saved.</span>}
        <AdminButton onClick={save} loading={saving}><Save className="h-4 w-4" /> Save SEO</AdminButton>
      </div>
    </AdminCard>
  );
}

/* ------------------------------------------------------------------ */
/* Settings — brand/contact/socials/analytics info                     */
/* ------------------------------------------------------------------ */

interface SettingsForm {
  brand: string;
  tagline: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappMessage: string;
  address: typeof SITE.address;
  socials: typeof SITE.socials;
  brandAccent: string;
  countdownEnabled: boolean;
  countdownDate: string;
}

const DEFAULTS: SettingsForm = {
  brand: SITE.brand,
  tagline: SITE.tagline,
  email: SITE.email,
  phone: SITE.phone,
  phoneDisplay: SITE.phoneDisplay,
  whatsappMessage: SITE.whatsappMessage,
  address: SITE.address,
  socials: SITE.socials,
  brandAccent: "#5b21b6",
  countdownEnabled: false,
  countdownDate: "",
};

export function AdminSettings() {
  const [value, setValue] = useState<SettingsForm>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const v = await getSiteContent<Partial<SettingsForm>>("settings");
      setValue({ ...DEFAULTS, ...(v ?? {}), address: { ...DEFAULTS.address, ...(v?.address ?? {}) }, socials: { ...DEFAULTS.socials, ...(v?.socials ?? {}) } });
      setLoading(false);
    })();
  }, []);

  const setField = <K extends keyof SettingsForm>(k: K, v: SettingsForm[K]) => setValue({ ...value, [k]: v });
  const setAddress = (k: keyof typeof SITE.address, v: string) => setValue({ ...value, address: { ...value.address, [k]: v } });
  const setSocial = (k: keyof typeof SITE.socials, v: string) => setValue({ ...value, socials: { ...value.socials, [k]: v } });

  const save = async () => {
    setSaving(true); setSaved(false);
    try { await upsertSiteContent("settings", value); setSaved(true); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminSection title="Settings"><LoadingState /></AdminSection>;

  return (
    <AdminSection title="Settings" description="Brand, contact information, social links, and site-wide options.">
      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Brand</h3>
          <div className="grid gap-4">
            <AdminField label="Brand name"><TextInput value={value.brand} onChange={(e) => setField("brand", e.target.value)} /></AdminField>
            <AdminField label="Tagline"><TextInput value={value.tagline} onChange={(e) => setField("tagline", e.target.value)} /></AdminField>
            <AdminField label="Accent colour"><TextInput type="color" value={value.brandAccent} onChange={(e) => setField("brandAccent", e.target.value)} className="h-11 !p-1" /></AdminField>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Contact</h3>
          <div className="grid gap-4">
            <AdminField label="Email"><TextInput value={value.email} onChange={(e) => setField("email", e.target.value)} type="email" /></AdminField>
            <AdminField label="Phone (digits only, no +)"><TextInput value={value.phone} onChange={(e) => setField("phone", e.target.value)} /></AdminField>
            <AdminField label="Phone (display)"><TextInput value={value.phoneDisplay} onChange={(e) => setField("phoneDisplay", e.target.value)} /></AdminField>
            <AdminField label="WhatsApp prefilled message"><TextArea value={value.whatsappMessage} onChange={(e) => setField("whatsappMessage", e.target.value)} rows={2} /></AdminField>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Address</h3>
          <div className="grid gap-4">
            <AdminField label="Address line"><TextInput value={value.address.line1} onChange={(e) => setAddress("line1", e.target.value)} /></AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="City"><TextInput value={value.address.city} onChange={(e) => setAddress("city", e.target.value)} /></AdminField>
              <AdminField label="State"><TextInput value={value.address.state} onChange={(e) => setAddress("state", e.target.value)} /></AdminField>
              <AdminField label="Country"><TextInput value={value.address.country} onChange={(e) => setAddress("country", e.target.value)} /></AdminField>
              <AdminField label="Postal code"><TextInput value={value.address.postalCode} onChange={(e) => setAddress("postalCode", e.target.value)} /></AdminField>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Social links</h3>
          <div className="grid gap-4">
            <AdminField label="Instagram"><TextInput value={value.socials.instagram} onChange={(e) => setSocial("instagram", e.target.value)} /></AdminField>
            <AdminField label="YouTube"><TextInput value={value.socials.youtube} onChange={(e) => setSocial("youtube", e.target.value)} /></AdminField>
            <AdminField label="LinkedIn"><TextInput value={value.socials.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} /></AdminField>
            <AdminField label="X (Twitter)"><TextInput value={value.socials.x} onChange={(e) => setSocial("x", e.target.value)} /></AdminField>
          </div>
        </AdminCard>

        <AdminCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Admissions countdown (optional)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Enable countdown">
              <Select value={String(value.countdownEnabled)} onChange={(e) => setField("countdownEnabled", e.target.value === "true")}>
                <option value="false">Disabled</option><option value="true">Enabled</option>
              </Select>
            </AdminField>
            <AdminField label="Deadline (ISO date)" hint="e.g. 2026-03-15">
              <TextInput value={value.countdownDate} onChange={(e) => setField("countdownDate", e.target.value)} placeholder="YYYY-MM-DD" />
            </AdminField>
          </div>
        </AdminCard>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-[13px] text-emerald-600">Settings saved. New visitors see the update immediately.</span>}
        <AdminButton onClick={save} loading={saving}><Save className="h-4 w-4" /> Save settings</AdminButton>
      </div>
    </AdminSection>
  );
}
