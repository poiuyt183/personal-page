"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, LinkedIn, Mail, X, Insta } from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const vp = { once: true, margin: "-40px" };

const contacts = [
  {
    label: "Email",
    value: "khuyen.dev183@gmail.com",
    href: "mailto:khuyen.dev183@gmail.com",
    Icon: Mail,
  },
  {
    label: "Facebook",
    value: "Trần Văn Khuyến",
    href: "https://www.facebook.com/hoshikira18",
    Icon: Facebook,
  },
  {
    label: "LinkedIn",
    value: "Trần Văn Khuyến",
    href: "http://www.linkedin.com/in/hoshikira",
    Icon: LinkedIn,
  },
  {
    label: "Twitter / X",
    value: "@khuyen_van24041",
    href: "https://twitter.com/khuyen_van24041",
    Icon: X,
  },
  {
    label: "Instagram",
    value: "@Kira18",
    href: "https://www.instagram.com/hoshikira18/",
    Icon: Insta,
  },
];

const Contact = () => {
  return (
    <div className="relative flex min-h-[100svh] w-full flex-col lg:flex-row">

      {/* ── Left — image panel ── */}
      <div className="relative h-[45vh] w-full flex-shrink-0 lg:sticky lg:top-0 lg:h-screen lg:w-[45%]">
        <Image
          src="/static/contact/my-image.webp"
          alt="Contact"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
          className="object-cover object-center"
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#18181b]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#18181b] to-transparent lg:hidden" />

        {/* overlay text — desktop only */}
        <div className="absolute inset-0 hidden items-end p-12 lg:flex">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Available for work
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white xl:text-4xl">
              Ready to discuss<br />your project?
            </h2>
          </motion.div>
        </div>
      </div>

      {/* accent line */}
      <div
        className="hidden w-px flex-shrink-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block"
        aria-hidden
      />

      {/* ── Right — contact content ── */}
      <div className="flex flex-1 flex-col justify-center px-6 pb-28 pt-10 md:px-12 lg:px-16 lg:pb-16 lg:pt-0">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mx-auto w-full max-w-lg"
        >
          {/* heading */}
          <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Contact
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold text-white sm:text-5xl">
            Get in touch
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-3 h-px w-14 bg-gradient-to-r from-primary to-secondary" />

          <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-gray-400">
            Thinking about a new project, a problem to solve, or just want to
            connect? I&apos;m available for freelance work and collaborations.
            Let&apos;s make something great.
          </motion.p>

          {/* status badge */}
          <motion.div variants={fadeUp} className="mt-6 inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-gray-300">
              Open to freelance opportunities
            </span>
          </motion.div>

          {/* contact list */}
          <motion.div variants={stagger} className="mt-10 space-y-2">
            {contacts.map(({ label, value, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="group flex items-center gap-4 border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.05]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                  <Icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-primary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-600">
                    {label}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                    {value}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 shrink-0 -translate-x-1 text-gray-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.a>
            ))}
          </motion.div>

          {/* footer note */}
          <motion.p variants={fadeUp} className="mt-8 text-xs text-gray-600">
            Prefer email? I usually respond within 24 hours.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
