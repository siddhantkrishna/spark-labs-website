import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Image as ImageIcon, MessageSquare, Rocket, Users } from "lucide-react";
import { listAll, type ApplicationRow, type BlogRow, type MediaRow, type ProjectRow, type TestimonialRow } from "@/services/content";
import { AdminCard, AdminSection, LoadingState } from "@/components/admin/AdminUI";

interface Counts {
  applications: number;
  new: number;
  blog: number;
  projects: number;
  testimonials: number;
  media: number;
  latest: ApplicationRow[];
}

export default function AdminDashboard() {
  const [c, setC] = useState<Counts | null>(null);

  useEffect(() => {
    (async () => {
      const [apps, blog, projects, testimonials, media] = await Promise.all([
        listAll<ApplicationRow>("applications", { orderBy: "created_at", ascending: false }),
        listAll<BlogRow>("blog_posts"),
        listAll<ProjectRow>("projects"),
        listAll<TestimonialRow>("testimonials"),
        listAll<MediaRow>("media"),
      ]);
      setC({
        applications: apps.length,
        new: apps.filter((a) => a.status === "new").length,
        blog: blog.length,
        projects: projects.length,
        testimonials: testimonials.length,
        media: media.length,
        latest: apps.slice(0, 5),
      });
    })();
  }, []);

  if (!c) return <LoadingState label="Loading dashboard…" />;

  const cards = [
    { icon: FileText, label: "Applications", value: c.applications, note: `${c.new} new`, to: "/admin/applications" },
    { icon: BookOpen, label: "Blog posts", value: c.blog, note: "Draft & published", to: "/admin/blog" },
    { icon: Rocket, label: "Projects", value: c.projects, note: "Portfolio showcase", to: "/admin/projects" },
    { icon: MessageSquare, label: "Testimonials", value: c.testimonials, note: "Live on site", to: "/admin/testimonials" },
    { icon: ImageIcon, label: "Media", value: c.media, note: "Files uploaded", to: "/admin/media" },
    { icon: Users, label: "Total leads", value: c.applications, note: "All time", to: "/admin/applications" },
  ];

  return (
    <AdminSection title="Overview" description="A quick pulse of everything happening across the site.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className="group">
            <AdminCard className="p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-tint text-accent">
                  <card.icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <div className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">{card.value}</div>
              <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{card.label}</p>
              <p className="mt-1 text-[13px] text-mute">{card.note}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <AdminCard className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Latest applications</h2>
          <Link to="/admin/applications" className="text-[13px] font-semibold text-accent hover:underline">
            View all →
          </Link>
        </div>
        {c.latest.length === 0 ? (
          <p className="px-6 py-10 text-center text-[14px] text-mute">No applications yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {c.latest.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{a.student_name}</p>
                  <p className="truncate font-mono text-[11px] text-faint">{a.email} · {a.phone}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent-tint px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wide text-accent">
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </AdminSection>
  );
}
