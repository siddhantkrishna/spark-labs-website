import { SITE, PROGRAM } from "./site";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const UPDATED = "January 2026";

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: `How ${SITE.brand} collects, uses and protects the personal information you share with us.`,
    updated: UPDATED,
    intro: `${SITE.legalName} ("Spark Labs", "we", "us") respects your privacy. This policy explains what information we collect through this website, why we collect it, and how we protect it.`,
    sections: [
      {
        heading: "1. Information we collect",
        paragraphs: [
          "When you submit an admissions or enquiry form, we collect the details you provide: student name, parent/guardian name, email, phone number, age, school, class, city, state, prior experience, your reason for joining, and preferred batch and contact time.",
          "We may also collect anonymous, aggregated usage data (such as pages visited) through privacy-friendly analytics, but only after you grant consent.",
        ],
      },
      {
        heading: "2. How we use your information",
        paragraphs: [
          "We use your information solely to respond to admissions and counseling requests, to schedule lab visits, to process enrolment, and to communicate with you about the AI Builder Program.",
          "We never sell, rent or trade your personal information to any third party.",
        ],
      },
      {
        heading: "3. Analytics & cookies",
        paragraphs: [
          "Analytics tools (such as Google Analytics and Microsoft Clarity) load only after you accept cookies via our consent banner. You can decline at any time, and the site will continue to work normally.",
          "See our Cookie Policy for more detail.",
        ],
      },
      {
        heading: "4. Data retention & security",
        paragraphs: [
          "We keep admissions data only as long as necessary to serve your enquiry and meet legal obligations. Submissions are transmitted securely over HTTPS to our form provider.",
          "While no online transmission is perfectly secure, we take reasonable technical and organisational measures to protect your data.",
        ],
      },
      {
        heading: "5. Your rights",
        paragraphs: [
          `You may request access to, correction of, or deletion of your personal data at any time by emailing ${SITE.email}. We will respond within a reasonable period.`,
        ],
      },
      {
        heading: "6. Children's privacy",
        paragraphs: [
          "Because our program serves minors, admissions forms are intended to be completed by a parent or guardian, whose consent we rely on for all communications.",
        ],
      },
      {
        heading: "7. Contact",
        paragraphs: [
          `For any privacy question, contact us at ${SITE.email} or ${SITE.phoneDisplay}, or write to ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.state}, ${SITE.address.country}.`,
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    description: `The terms governing your use of the ${SITE.brand} website and enrolment in our programs.`,
    updated: UPDATED,
    intro: `These Terms & Conditions govern your use of the ${SITE.brand} website and your enrolment in programs offered by ${SITE.legalName}. By using this site or applying, you agree to these terms.`,
    sections: [
      {
        heading: "1. About the program",
        paragraphs: [
          `The ${PROGRAM.name} is an in-person educational program of ${PROGRAM.durationWeeks} weeks comprising ${PROGRAM.sessions} live practical sessions, delivered in batches of at most ${PROGRAM.batchSize} students in ${SITE.address.city}, ${SITE.address.state}.`,
          `The program fee is ${PROGRAM.feeDisplay} and covers all sessions, materials, mentorship, certification and Demo Day.`,
        ],
      },
      {
        heading: "2. Admissions & seats",
        paragraphs: [
          "Submitting an application does not guarantee a seat. Seats are limited and confirmed on a first-come, first-served basis upon fee payment and confirmation by our admissions team.",
        ],
      },
      {
        heading: "3. Student conduct",
        paragraphs: [
          "Enrolled students are expected to follow our Code of Conduct. We reserve the right to remove any student whose behaviour disrupts the learning environment, without refund of fees for sessions already delivered.",
        ],
      },
      {
        heading: "4. Intellectual property",
        paragraphs: [
          "Course materials, the Builder Handbook and curriculum remain the intellectual property of Spark Labs. Projects built by students belong to the students.",
          "Website content, branding and design may not be copied or reused without permission.",
        ],
      },
      {
        heading: "5. Limitation of liability",
        paragraphs: [
          "We deliver the program with care and professionalism but make no guarantee of specific outcomes. To the fullest extent permitted by law, our liability is limited to the fees paid for the program.",
        ],
      },
      {
        heading: "6. Changes",
        paragraphs: [
          "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },

  refund: {
    slug: "refund",
    title: "Refund Policy",
    description: `Our fair, transparent refund policy for the ${PROGRAM.name}.`,
    updated: UPDATED,
    intro: "We want committed builders, not locked-in customers. Our refund policy is designed to be fair and transparent.",
    sections: [
      {
        heading: "1. Full refund window",
        paragraphs: [
          "If you withdraw before the second session begins, you are eligible for a full refund of the program fee, minus any non-recoverable payment gateway charges.",
        ],
      },
      {
        heading: "2. Partial refund",
        paragraphs: [
          "If you withdraw after the second session but before the end of the first week, you are eligible for a 50% refund of the program fee.",
        ],
      },
      {
        heading: "3. No refund",
        paragraphs: [
          "After the first week, fees are non-refundable, as your seat has been reserved and materials and mentorship have been committed.",
        ],
      },
      {
        heading: "4. How to request a refund",
        paragraphs: [
          `To request a refund, email ${SITE.email} with your enrolment details. Approved refunds are processed to the original payment method within 7–10 working days.`,
        ],
      },
      {
        heading: "5. Program cancellation by Spark Labs",
        paragraphs: [
          "In the unlikely event that we cancel a batch before it begins, you will receive a full refund or the option to move to the next available batch.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    description: `How ${SITE.brand} uses cookies and similar technologies on this website.`,
    updated: UPDATED,
    intro: "This Cookie Policy explains how and why we use cookies and similar technologies on this website.",
    sections: [
      {
        heading: "1. What are cookies?",
        paragraphs: [
          "Cookies are small text files stored on your device that help websites function and understand how they are used.",
        ],
      },
      {
        heading: "2. How we use them",
        paragraphs: [
          "We use a single strictly-necessary preference to remember your consent choice. Analytics cookies (Google Analytics, Microsoft Clarity and, optionally, Meta Pixel) are only set after you click Accept on our consent banner.",
          "We do not use advertising cookies for retargeting without your consent.",
        ],
      },
      {
        heading: "3. Managing cookies",
        paragraphs: [
          "You can decline analytics cookies via our banner, and the site will continue to work. You can also clear or block cookies through your browser settings at any time.",
        ],
      },
    ],
  },

  "code-of-conduct": {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    description: `The values and behaviour we expect from every member of the ${SITE.brand} community.`,
    updated: UPDATED,
    intro: "Spark Labs is a focused, respectful and safe place to learn. Everyone in our community — students, parents, mentors and staff — is expected to uphold this Code of Conduct.",
    sections: [
      {
        heading: "1. Respect everyone",
        paragraphs: [
          "Treat fellow students, mentors and staff with kindness and respect. Harassment, bullying, discrimination or hurtful language of any kind will not be tolerated.",
        ],
      },
      {
        heading: "2. Build with integrity",
        paragraphs: [
          "Do your own work, document it honestly, and give credit where it's due. Use AI tools responsibly and ethically — never to harm, deceive or plagiarise.",
        ],
      },
      {
        heading: "3. Keep the lab focused",
        paragraphs: [
          "Screens and tools are for building and learning during sessions. Come curious, stay engaged, and help maintain a distraction-free environment.",
        ],
      },
      {
        heading: "4. Stay safe online",
        paragraphs: [
          "Protect your privacy and others'. Do not share personal information carelessly, and report anything that feels unsafe to a mentor immediately.",
        ],
      },
      {
        heading: "5. Consequences",
        paragraphs: [
          "Serious or repeated breaches may result in removal from the program in line with our Terms & Conditions. Our priority is always a safe, positive learning environment.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description: `Important disclaimers regarding the ${SITE.brand} website and program.`,
    updated: UPDATED,
    intro: "Please read this disclaimer carefully before using the Spark Labs website or enrolling in our programs.",
    sections: [
      {
        heading: "1. Educational purpose",
        paragraphs: [
          "All content on this website and within our programs is provided for educational purposes. While we strive for accuracy, technology and AI tools change rapidly and we make no warranty that all information is current at all times.",
        ],
      },
      {
        heading: "2. No guaranteed outcomes",
        paragraphs: [
          "Results depend on each student's effort and engagement. We do not guarantee specific academic, career or financial outcomes from participation.",
        ],
      },
      {
        heading: "3. Third-party tools & links",
        paragraphs: [
          "Our program uses third-party AI tools and may link to external websites. We are not responsible for the content, policies or availability of third-party services.",
        ],
      },
      {
        heading: "4. Contact",
        paragraphs: [`For any questions about this disclaimer, contact ${SITE.email}.`],
      },
    ],
  },
};
