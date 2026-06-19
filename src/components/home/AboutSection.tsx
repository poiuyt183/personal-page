"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const traits = ["Clean Code", "User-First", "Performance", "Accessibility", "Creative"];

const AboutSection = () => {
  return (
    <section id="about" className="relative w-full overflow-hidden px-5 py-20 md:px-10 lg:py-28 lg:px-16">
      {/* section separator top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-5xl xl:max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: text ── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
            >
              About Me
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]"
            >
              Hey, I&apos;m a developer
              <br />
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                with a passion for coding
              </span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-3 h-px w-16 bg-gradient-to-r from-primary to-secondary" />

            <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-gray-400">
              I thrive on building tech solutions that not only work but also tell a story. Whether it&apos;s
              shaping clean, user-friendly websites or diving into the logic of a tricky problem, I bring a
              blend of technical skill and creative curiosity to the table.
            </motion.p>

            {/* trait chips */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
              {traits.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/60 hover:bg-primary/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 max-w-[14rem]">
              <Button href="/about">More Details</Button>
            </motion.div>
          </motion.div>

          {/* ── Right: image ── */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeLeft}
          >
            {/* decorative offset border */}
            <div
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-primary/20"
              aria-hidden
            />
            {/* glow blob */}
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/static/about/my-image.webp"
                alt="Hoshikira working"
                width={600}
                height={720}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
              {/* bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#18181b]/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
