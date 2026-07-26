import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui";
import { SITE } from "@/constants/site";
import { useBlogPosts } from "@/hooks/useContent";
import NotFound from "./NotFound";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const { data: posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (loading && !post) return null;
  if (!post) return <NotFound />;

  const related = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 2);
  const url = `${SITE.url}/blog/${post.slug}`;

  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        ogType="article"
        keywords={post.tags}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article className="relative overflow-hidden pt-[72px]">
        <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8 lg:pt-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.category, path: "/blog" },
            ]}
          />
          <Reveal>
            <span className="rounded-full bg-accent-tint px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.02em] text-ink">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[12px] text-faint">
              <span>{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-line-2" />
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-line-2" />
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="prose-spark mt-10 space-y-5">
              {post.body.map((para, i) => (
                <p key={i} className="text-[17px] leading-relaxed text-ink/85">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* tags + share */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-line py-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-faint" />
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-line-2 px-3 py-1 text-[12px] text-mute">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-wide text-faint uppercase">Share</span>
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line-2 px-3 py-1 text-[12px] font-semibold text-mute transition hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-ink">Related articles</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
                  >
                    <h3 className="font-display text-[15.5px] font-bold leading-snug text-ink group-hover:text-accent">
                      {r.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link
            to="/blog"
            className="mt-12 inline-flex items-center gap-2 text-[14px] font-semibold text-mute transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
