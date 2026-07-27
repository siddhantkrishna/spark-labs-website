import type {
  BlogCategory,
  BlogPost,
  FaqItem,
  Mentor,
  NavGroup,
  NavItem,
  Testimonial,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Brand & organisation                                                */
/* ------------------------------------------------------------------ */

export const SITE = {
  brand: "Spark Labs",
  legalName: "Charvikon Training & Research Centre",
  positioning: "AI Learning Laboratory",
  tagline: "Learn. Build. Launch.",
  mission:
    "Transform complete beginners into confident AI builders through practical, project-based education.",
  vision: "Build India's most respected AI Learning Laboratory.",
  /** Update to the real production domain before launch. */
  url: "https://siddhantkrishna.com",
  email: "s@charvikon.com",
  /** Digits only, international format, no plus — used for tel: and wa.me links. */
  phone: "916266916169",
  phoneDisplay: "+91 62669 16169",
  whatsappMessage:
    "Hi Spark Labs! I'd like to know more about the AI Builder Program admissions.",
  address: {
    line1: "Charvikon Training & Research Centre",
    city: "Raigarh",
    state: "Chhattisgarh",
    country: "India",
    postalCode: "496001",
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Program facts                                                       */
/* ------------------------------------------------------------------ */

export const PROGRAM = {
  name: "AI Builder Program",
  durationWeeks: 6,
  sessions: 36,
  mode: "Offline · In-Person",
  batchSize: 8,
  batchesPerDay: 3,
  fee: 20000,
  feeDisplay: "₹20,000",
  ageMin: 13,
  ageMax: 18,
  seatsPerBatchCopy: "8 students per batch",
  currentBatch: "Batch 01",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const MEGA_MENU: NavGroup[] = [
  {
    label: "The Program",
    items: [
      { label: "AI Builder Program", href: "/program", description: "6 weeks · 36 live sessions" },
      { label: "Curriculum", href: "/curriculum", description: "16 integrated modules" },
      { label: "Student Journey", href: "/journey", description: "Week-by-week transformation" },
    ],
  },
  {
    label: "Proof",
    items: [
      { label: "What Students Build", href: "/projects", description: "10+ real AI projects" },
      { label: "About & Mentors", href: "/about", description: "Meet the people & method" },
      { label: "Blog", href: "/blog", description: "Guides, mindset & careers" },
    ],
  },
];

export const FOOTER_NAV = {
  program: [
    { label: "AI Builder Program", href: "/program" },
    { label: "Curriculum", href: "/curriculum" },
    { label: "Student Journey", href: "/journey" },
    { label: "What Students Build", href: "/projects" },
  ] as NavItem[],
  company: [
    { label: "About Spark Labs", href: "/about" },
    { label: "Admissions", href: "/admissions" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Code of Conduct", href: "/code-of-conduct" },
  ] as NavItem[],
};

/* ------------------------------------------------------------------ */
/* Batch availability (ethical urgency)                                */
/* ------------------------------------------------------------------ */

export const BATCHES = [
  { name: "Morning Lab", time: "10:00 AM – 12:00 PM", seatsLeft: 3 },
  { name: "Afternoon Lab", time: "2:00 PM – 4:00 PM", seatsLeft: 5 },
  { name: "Evening Lab", time: "5:00 PM – 7:00 PM", seatsLeft: 2 },
] as const;

export const CONTACT_TIMES = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
  "Anytime",
] as const;

export const EXPERIENCE_LEVELS = [
  "Complete beginner (no coding)",
  "Tried a little on my own",
  "Some school computer classes",
  "Comfortable with computers, new to AI",
] as const;

export const CLASS_OPTIONS = [
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Other",
] as const;

/* ------------------------------------------------------------------ */
/* Mentors                                                             */
/* ------------------------------------------------------------------ */

export const MENTORS: Mentor[] = [
  {
    name: "Lead AI Mentor",
    role: "Founder & Head of Learning",
    initials: "SL",
    focus: "First Principles · Curriculum",
    bio: "Designs the Spark Labs method and leads the flagship labs — obsessed with turning beginners into confident builders.",
  },
  {
    name: "Build Mentor",
    role: "Projects & Automation",
    initials: "BM",
    focus: "Automation · Web · APIs",
    bio: "Guides students through shipping real, working products — from first prompt to live launch.",
  },
  {
    name: "Design Mentor",
    role: "Design & Communication",
    initials: "DM",
    focus: "Design · Presentation",
    bio: "Helps builders make work that looks sharp and presents with confidence on Demo Day.",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials (social proof)                                         */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My daughter walked in a complete beginner and came home talking about the projects she'd built. The confidence is the real result.",
    name: "Parent of a Class 9 student",
    role: "Raigarh",
    initials: "PR",
  },
  {
    quote:
      "I didn't know a single line of code. In six weeks I built a chatbot, a website and my own capstone project. Demo Day was unreal.",
    name: "AI Builder Program graduate",
    role: "Age 15",
    initials: "AG",
  },
  {
    quote:
      "The small batch made the difference. The mentor actually knew what I was stuck on and helped me fix it, every single class.",
    name: "AI Builder Program graduate",
    role: "Age 16",
    initials: "AB",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ (shared between page + FAQ schema)                              */
/* ------------------------------------------------------------------ */

export const FAQS: FaqItem[] = [
  {
    q: "Who is this program for?",
    a: "Students aged 13 to 18 who want to understand and build with AI — regardless of their current skill level. The program is deliberately designed so complete beginners and tech-curious students can thrive side by side.",
  },
  {
    q: "Does my child need to know how to code?",
    a: "No. The program assumes zero coding experience and starts from first principles. Many of the most powerful AI tools require no code at all — and we teach the thinking that matters far more than syntax.",
  },
  {
    q: "Will students actually build real projects?",
    a: "Yes — that's the entire point. Every student ships 10+ working projects: chatbots, automation systems, generators, websites and a self-chosen capstone presented live at Demo Day.",
  },
  {
    q: "What if my child is a complete beginner?",
    a: "Then this program was built for them. Week 1 assumes nothing. The eight-step teaching loop is specifically engineered to take a student from zero to confident builder in six weeks.",
  },
  {
    q: "What should my child bring to class?",
    a: "Curiosity and a notebook. The lab is set up for hands-on work. If your child owns a laptop they're welcome to bring it — it makes taking projects home easier, but it isn't mandatory.",
  },
  {
    q: "How are classes conducted?",
    a: "Entirely offline and in-person at our Raigarh lab. 36 practical sessions across six weeks, in batches of at most eight students, following the same disciplined build loop every single class.",
  },
  {
    q: "Will my child receive a certificate?",
    a: "Yes — a completion certificate from Charvikon Training & Research Centre. More importantly, they leave with a live portfolio and documented projects, which carry far more weight than any certificate.",
  },
  {
    q: "How many students are in each batch?",
    a: "A maximum of eight. Never more. We run up to three batches per day so every student gets genuine mentorship, feedback and stage time.",
  },
  {
    q: "What is the fee and what does it include?",
    a: "The AI Builder Program fee is ₹20,000 and covers all 36 live sessions, mentorship, the Builder Handbook, project tooling, certification and Demo Day.",
  },
  {
    q: "Do you offer a refund?",
    a: "Yes. If you withdraw before the second session, you're eligible for a refund as described in our Refund Policy. We want committed builders, not locked-in customers.",
  },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence" },
  { slug: "prompt-engineering", name: "Prompt Engineering" },
  { slug: "automation", name: "Automation" },
  { slug: "student-projects", name: "Student Projects" },
  { slug: "technology", name: "Technology" },
  { slug: "career", name: "Career" },
  { slug: "learning", name: "Learning" },
  { slug: "builder-mindset", name: "Builder Mindset" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-beginners-learn-ai-faster-by-building",
    title: "Why Beginners Learn AI Faster by Building, Not Watching",
    excerpt:
      "The fastest way to understand artificial intelligence isn't a lecture series — it's shipping your first tiny project. Here's the science and the method behind learning by doing.",
    category: "Learning",
    author: "Spark Labs Team",
    date: "2026-01-12",
    readingMinutes: 6,
    tags: ["learning by doing", "beginners", "project-based learning"],
    body: [
      "Most people believe you have to 'learn the theory first' before you can build anything with AI. At Spark Labs we've found the opposite to be true. Beginners who start building on day one understand concepts faster, retain them longer, and — crucially — actually enjoy the process.",
      "This isn't a hunch. Decades of research into project-based learning show that knowledge sticks when it's attached to a real problem you care about. When a 14-year-old builds a chatbot for their family's shop, every concept — prompts, context, iteration — suddenly has a reason to exist.",
      "Our method flips the traditional order. Instead of 'concept then maybe practice', we run: mindset, concept, demonstration, guided practice, independent build, documentation, feedback, reflection. The building happens early and often.",
      "If your child is curious about AI, don't wait for them to 'be ready'. Readiness is built, not found — one small project at a time.",
    ],
  },
  {
    slug: "prompt-engineering-basics-for-teenagers",
    title: "Prompt Engineering Basics Every Teenager Should Know",
    excerpt:
      "Talking to AI well is a real skill. These five fundamentals turn vague requests into precise, useful results — and they're the first thing we teach.",
    category: "Prompt Engineering",
    author: "Spark Labs Team",
    date: "2026-01-05",
    readingMinutes: 5,
    tags: ["prompt engineering", "ai tools", "fundamentals"],
    body: [
      "Prompt engineering sounds intimidating, but at its core it's just clear thinking made visible. If you can explain what you want precisely, you can prompt well.",
      "Fundamental one: give the AI a role. 'You are a patient tutor explaining to a beginner' produces dramatically better output than a cold question.",
      "Fundamental two: show, don't just tell. One good example in your prompt is worth a paragraph of instructions.",
      "Fundamental three: iterate. Your first prompt is a draft, not a verdict. The builders who get the best results are the ones who refine relentlessly.",
      "We teach these fundamentals in Week 2 of the AI Builder Program, then apply them across every project that follows.",
    ],
  },
  {
    slug: "what-a-student-ai-portfolio-looks-like",
    title: "What a Student AI Portfolio Actually Looks Like",
    excerpt:
      "A certificate says you attended. A portfolio proves you can build. Here's exactly what our students walk away with after six weeks.",
    category: "Student Projects",
    author: "Spark Labs Team",
    date: "2025-12-20",
    readingMinutes: 4,
    tags: ["portfolio", "student projects", "demo day"],
    body: [
      "At Spark Labs, the goal isn't a grade — it's evidence. By Demo Day, every student has a live portfolio site linking to the projects they built with their own hands.",
      "A typical portfolio includes an AI chatbot, an AI image generator, a working automation, a personal website and a self-chosen capstone project — each with written documentation explaining the problem, the tools and the outcome.",
      "This body of work matters because it's specific and verifiable. Anyone can click through and see what the student actually made.",
      "That's the difference between learning about AI and being able to build with it — and it's the difference we obsess over.",
    ],
  },
  {
    slug: "the-builder-mindset-explained",
    title: "The Builder Mindset, Explained for Parents",
    excerpt:
      "We teach students how to think before we teach them any software. Here's what the 'builder mindset' means and why it outlasts every tool.",
    category: "Builder Mindset",
    author: "Spark Labs Team",
    date: "2025-12-08",
    readingMinutes: 7,
    tags: ["builder mindset", "first principles", "critical thinking"],
    body: [
      "AI tools will change many times over the course of your child's life. Chasing individual tools is a losing game. So at Spark Labs we install something more durable: the builder mindset.",
      "It rests on a few pillars — first-principles thinking, problem decomposition, systems thinking, and learning how to learn. These are the mental habits that make any new tool easy to pick up.",
      "A student with the builder mindset doesn't panic at an error message; they read it like a clue. They don't wait to be told the next step; they break the problem down and try.",
      "This is why we say software is the easy part. Give a student the right way of thinking, and the tools take care of themselves.",
    ],
  },
];
