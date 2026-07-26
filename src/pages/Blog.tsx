import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui";
import { BLOG_CATEGORIES } from "@/constants/site";
import { useBlogPosts } from "@/hooks/useContent";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const { data: posts } = useBlogPosts();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = category === "all" || p.category === category;
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [query, category, posts]);

  return (
    <>
      <Seo
        title="Blog — AI, Learning & the Builder Mindset"
        description="Guides and ideas from Spark Labs on artificial intelligence, prompt engineering, automation, student projects, careers and the builder mindset."
        path="/blog"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Ideas for <span className="text-accent">curious builders.</span>
          </>
        }
        intro="Practical writing on AI, learning, projects and the mindset that turns beginners into builders."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="w-full rounded-full border border-line-2 bg-white py-3 pl-11 pr-4 text-[14px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <CatChip active={category === "all"} onClick={() => setCategory("all")}>
                All
              </CatChip>
              {BLOG_CATEGORIES.map((c) => (
                <CatChip key={c.slug} active={category === c.name} onClick={() => setCategory(c.name)}>
                  {c.name}
                </CatChip>
              ))}
            </div>
          </div>

          {/* grid */}
          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-mute">No articles match your search yet.</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 80}>
                  <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent-tint px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-faint">
                        <Clock className="h-3 w-3" /> {post.readingMinutes} min
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-ink">
                      <Link to={`/blog/${post.slug}`} className="transition-colors group-hover:text-accent">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-mute">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[11px] text-faint">{formatDate(post.date)}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent"
                      >
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CatChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-[12.5px] font-semibold transition-all ${
        active
          ? "border-accent bg-accent text-white"
          : "border-line-2 bg-white text-mute hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}
