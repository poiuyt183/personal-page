"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";
import SkillsSection from "@/components/home/SkillsSection";

/* ─────────────────────────────────────────
   Animation helpers
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});
const vp = { once: true, margin: "-60px" };

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const experience = [
  {
    company: "Freelancer",
    role: "Frontend & Full Stack Developer",
    location: "Remote",
    period: "Mar. 2026 — Present",
    current: true,
    bullets: [
      "Designing and building full-stack web products for clients across Vietnam.",
      "Shipping performant UIs with React, Next.js, and TailwindCSS.",
      "Delivering end-to-end solutions from architecture to production deployment.",
    ],
  },
  {
    company: "Mor Software",
    role: "Frontend Developer",
    location: "Vietnam",
    period: "Apr. 2025 — Mar. 2026",
    current: false,
    bullets: [
      "Engineered the L1F3 & SUNPOP apps in React and React Native, converting Figma designs into fully responsive, production-ready interfaces across web and mobile.",
      "Architected and maintained a shared library of reusable UI components, reducing duplication and ensuring design consistency across the codebase.",
      "Partnered with backend engineers to integrate REST APIs, triage bugs, and ship features within sprint deadlines in an Agile environment.",
      "Participated in weekly code reviews, improving team code quality and adhering to established engineering standards.",
    ],
  },
];

const projects = [
  {
    name: "SangXanh",
    role: "Full Stack Developer",
    period: "May. 2025 — Feb. 2026",
    link: "https://sangxanh.net",
    bullets: [
      "Content-rich lighting e-commerce platform using Next.js SSR, improving initial page load speed and SEO for a catalog of 500+ product SKUs.",
      "High-performance RESTful API in Golang — product listings, inventory filtering, and order management with low-latency response under concurrent load.",
      "Custom admin dashboard with Vite.js empowering non-technical staff to manage all site content independently.",
      "Containerised the full application stack with Docker & Docker Compose for consistent dev/prod environments.",
      "Automated CI/CD pipeline: linting → Docker image builds → deploy to GCP on every push to main.",
    ],
  },
  {
    name: "DMB Company Website",
    role: "Frontend Developer",
    period: "Aug. 2024 — Oct. 2024",
    link: "https://dmb.com.vn",
    bullets: [
      "Responsive web app showcasing DMB Company's profile, products, and services.",
      "Optimised performance and responsiveness for a seamless cross-device UX.",
      "Integrated backend services to manage dynamic content updates efficiently.",
    ],
  },
  {
    name: "Personal Portfolio",
    role: "Full Stack Developer",
    period: "Apr. 2024",
    link: "https://khuyentv.tech",
    bullets: [
      "Modern, responsive portfolio built with Next.js 14 App Router, GraphQL + Grafbase, and Framer Motion.",
    ],
  },
];

const awards = [
  {
    title: "CodeFest 2024 — 3rd Prize",
    date: "Sep. 2024",
    bullets: [
      "Led a 4-member team in a competitive programming & robotics challenge focused on autonomous bot navigation, opponent detection, and strategic eliminations.",
    ],
  },
  {
    title: "NinjaShin 2024 — 2nd Prize",
    date: "Oct. 2024",
    bullets: [
      "Product demo: Formill — applied AI to build a product that enhances the study experience.",
    ],
  },
];

const certs = [
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    date: "Feb. 2025",
  },
  {
    title: "Project Management Principles and Practices Specialization",
    issuer: "University of Michigan",
    date: "Feb. 2025",
  },
];

/* ─────────────────────────────────────────
   Section wrapper
───────────────────────────────────────── */
const Section = ({
  id, label, title, children,
}: {
  id: string; label: string; title: string; children: React.ReactNode;
}) => (
  <section id={id} className="relative w-full px-5 py-16 md:px-10 lg:py-20 lg:px-16">
    <div className="mx-auto max-w-5xl xl:max-w-6xl">
      <motion.div
        initial="hidden" whileInView="show" viewport={vp}
        variants={stagger(0.1)}
        className="mb-10"
      >
        <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {label}
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
          {title}
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-3 h-px w-14 bg-gradient-to-r from-primary to-secondary" />
      </motion.div>
      {children}
    </div>
  </section>
);

/* ─────────────────────────────────────────
   About Page
───────────────────────────────────────── */
const About = () => {
  return (
    <div className="relative flex w-full flex-col">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative flex min-h-[55vh] items-end lg:min-h-[65vh]">
          <Image
            src="/static/about/my-image.webp"
            alt="Kira"
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18181b]/60 to-transparent" />

          <div className="relative z-10 w-full px-5 pb-12 md:px-10 lg:px-16 lg:pb-16">
            <motion.div
              initial="hidden" animate="show"
              variants={stagger(0.12)}
            >
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                About me
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Kira<span className="text-primary">.dev</span>
              </motion.h1>
              <motion.div variants={fadeUp} className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Frontend Developer
                </span>
                <span className="text-gray-500">→</span>
                <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                  Freelancer (Now)
                </span>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-4 max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base">
                Frontend developer with experience at Mor Software. Now building products for clients
                as a freelancer — from pixel-perfect UIs to full-stack systems shipped to production.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-6 max-w-[160px]">
                <Button href="/contact">Get in touch</Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

            {/* ══════════════════════════════════
          SKILLS
      ══════════════════════════════════ */}
      <SkillsSection />

      {/* ══════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════ */}
      <Section id="experience" label="Work" title="Experience">
        <div className="relative ml-3 border-l border-white/10 pl-8 space-y-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial="hidden" whileInView="show"
              viewport={vp}
              variants={stagger(0.08)}
              className="relative"
            >
              {/* dot */}
              <span
                className={`absolute -left-[2.65rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  job.current
                    ? "border-primary bg-primary/20"
                    : "border-white/20 bg-[#18181b]"
                }`}
              >
                {job.current && (
                  <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
                )}
              </span>

              {/* header */}
              <motion.div variants={fadeLeft} className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{job.company}</h3>
                  <p className="text-sm font-medium text-primary">{job.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    job.current ? "bg-primary/15 text-primary" : "bg-white/5 text-gray-400"
                  }`}>
                    {job.current ? "● Current" : job.period}
                  </span>
                  {job.current && (
                    <span className="text-xs text-gray-500">{job.period}</span>
                  )}
                  <span className="text-xs text-gray-600">{job.location}</span>
                </div>
              </motion.div>

              {/* bullets */}
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b, bi) => (
                  <motion.li
                    key={bi} variants={fadeUp}
                    className="flex items-start gap-2.5 text-sm text-gray-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent md:mx-10 lg:mx-16" />

      {/* ══════════════════════════════════
          PROJECTS
      ══════════════════════════════════ */}
      {/*
      <Section id="projects" label="Work" title="Projects">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial="hidden" whileInView="show"
              viewport={vp}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } } }}
              className="group flex flex-col border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.04]"
            >
              
              <div className="mb-4 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors">{p.name}</h3>
                  <span className="text-xs font-medium text-primary/80">{p.role}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="whitespace-nowrap rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-500">
                    {p.period}
                  </span>
                  {p.link && (
                    <Link
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary/60 underline-offset-2 transition-colors hover:text-primary hover:underline"
                    >
                      {p.link.replace("https://", "")}
                    </Link>
                  )}
                </div>
              </div>

           
              <ul className="space-y-1.5 flex-1">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-xs leading-relaxed text-gray-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      */}

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent md:mx-10 lg:mx-16" />



      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent md:mx-10 lg:mx-16" />

      {/* ══════════════════════════════════
          AWARDS + CERTS
      ══════════════════════════════════ */}
      <section className="w-full px-5 py-16 md:px-10 lg:py-20 lg:px-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 xl:max-w-6xl lg:grid-cols-2">

          {/* Awards */}
          <div>
            <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger(0.1)} className="mb-8">
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Achievements</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">Awards</motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-px w-14 bg-gradient-to-r from-primary to-secondary" />
            </motion.div>

            <div className="space-y-5">
              {awards.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial="hidden" whileInView="show" viewport={vp}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                  className="border border-white/[0.07] bg-white/[0.03] p-5"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{a.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary/10 px-2 py-0.5 text-[11px] font-medium text-secondary">
                      {a.date}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {a.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary/50" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger(0.1)} className="mb-8">
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Learning</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">Certificates</motion.h2>
              <motion.div variants={fadeUp} className="mt-3 h-px w-14 bg-gradient-to-r from-primary to-secondary" />
            </motion.div>

            <div className="space-y-4">
              {certs.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial="hidden" whileInView="show" viewport={vp}
                  variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                  className="border border-white/[0.07] bg-white/[0.03] p-5"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-white">{c.title}</h3>
                    <p className="mt-1 text-xs text-primary/80">{c.issuer}</p>
                    <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-500">
                      {c.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent md:mx-10 lg:mx-16" />

      {/* ══════════════════════════════════
          EDUCATION
      ══════════════════════════════════ */}
      <Section id="education" label="Background" title="Education">
        <motion.div
          initial="hidden" whileInView="show" viewport={vp}
          variants={fadeUp}
          className="border border-white/[0.07] bg-white/[0.03] p-6 lg:p-8"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">FPT University</h3>
                <p className="text-sm text-primary">Software Engineering</p>
                <p className="mt-0.5 text-xs text-gray-500">Hanoi, Vietnam</p>
              </div>
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                Sep. 2022 — Now
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Major: Software Engineering
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                70% Scholarship
              </span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="relative w-full overflow-hidden px-5 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger(0.1)}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Let&apos;s work together
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
              Ready to discuss{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                your project?
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-sm text-gray-400 sm:text-base">
              Have a project in mind or just want to connect? I&apos;m available for freelance work.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="/contact" className="sm:min-w-[160px]">Get in touch</Button>
              <Button href="/static/CV_TRANVANKHUYEN.pdf" newTab="1" className="sm:min-w-[160px]">
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
