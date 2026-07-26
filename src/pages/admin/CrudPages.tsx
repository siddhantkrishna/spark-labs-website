import { AdminCrud, type CrudField } from "@/components/admin/AdminCrud";
import type { BlogRow, ProjectRow, TestimonialRow } from "@/services/content";

/* ---------- Blog ---------- */

const BLOG_FIELDS: CrudField<BlogRow>[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "slug", label: "Slug", type: "text", hint: "URL-friendly, no spaces. e.g. why-ai-matters" },
  { key: "category", label: "Category", type: "text", showInList: true },
  { key: "author", label: "Author", type: "text" },
  { key: "excerpt", label: "Excerpt", type: "textarea", hint: "One or two sentences shown in the blog listing." },
  { key: "body", label: "Body", type: "textarea", hint: "Plain text. Separate paragraphs with a blank line." },
  { key: "tags", label: "Tags", type: "tags" },
  { key: "cover_image", label: "Cover image URL", type: "url" },
  { key: "reading_minutes", label: "Reading minutes", type: "number" },
  { key: "featured", label: "Featured", type: "checkbox", showInList: true },
  { key: "published", label: "Published", type: "checkbox", showInList: true },
];

export function AdminBlog() {
  return (
    <AdminCrud<BlogRow>
      title="Blog"
      description="Write and publish articles. Published posts appear on /blog immediately."
      table="blog_posts"
      orderBy="created_at"
      ascending={false}
      fields={BLOG_FIELDS}
      defaults={{
        title: "", slug: "", category: "Learning", author: "Spark Labs Team", excerpt: "",
        body: "", tags: [], cover_image: null, reading_minutes: 5, featured: false, published: false,
      }}
      rowTitle={(r) => r.title}
    />
  );
}

/* ---------- Projects ---------- */

const PROJECT_FIELDS: CrudField<ProjectRow>[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "problem", label: "Problem", type: "textarea" },
  { key: "tools", label: "Tools", type: "text", showInList: true },
  { key: "outcome", label: "Outcome", type: "textarea" },
  { key: "image", label: "Image URL", type: "url" },
  { key: "github_url", label: "GitHub URL", type: "url" },
  { key: "live_url", label: "Live URL", type: "url" },
  { key: "student_name", label: "Student name", type: "text", showInList: true },
  { key: "batch", label: "Batch", type: "text" },
  { key: "difficulty", label: "Difficulty", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
  { key: "featured", label: "Featured", type: "checkbox", showInList: true },
  { key: "sort_order", label: "Sort order", type: "number" },
];

export function AdminProjects() {
  return (
    <AdminCrud<ProjectRow>
      title="Student projects"
      description="Showcase what students actually build. Toggle Featured to highlight on the home page."
      table="projects"
      orderBy="sort_order"
      ascending={true}
      fields={PROJECT_FIELDS}
      defaults={{
        title: "", problem: "", tools: "", outcome: "", image: null, github_url: null, live_url: null,
        student_name: null, batch: null, difficulty: "Beginner", featured: false, sort_order: 0,
      }}
      rowTitle={(r) => r.title}
    />
  );
}

/* ---------- Testimonials ---------- */

const TESTIMONIAL_FIELDS: CrudField<TestimonialRow>[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role / relationship", type: "text", showInList: true, hint: "e.g. Parent of a Class 9 student" },
  { key: "initials", label: "Initials", type: "text", hint: "Two-letter avatar fallback." },
  { key: "quote", label: "Quote", type: "textarea" },
  { key: "image", label: "Photo URL (optional)", type: "url" },
  { key: "sort_order", label: "Sort order", type: "number" },
  { key: "published", label: "Published", type: "checkbox", showInList: true },
];

export function AdminTestimonials() {
  return (
    <AdminCrud<TestimonialRow>
      title="Testimonials"
      description="Manage the quotes shown across the site. Reorder using Sort order (lower first)."
      table="testimonials"
      orderBy="sort_order"
      ascending={true}
      fields={TESTIMONIAL_FIELDS}
      defaults={{
        name: "", role: "", initials: "", quote: "", image: null, sort_order: 0, published: true,
      }}
      rowTitle={(r) => `${r.name} — ${r.role}`}
    />
  );
}
