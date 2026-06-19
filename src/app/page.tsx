import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Pan from "@/components/animation/Pan";
import Button from "@/components/Button";
import SocialLinks from "@/components/home/SocialLinks";

/* ── lazy client components ── */
const Writer = dynamic(() => import("@/components/home/Writer"), {
  loading: () => (
    <div className="mx-auto h-9 w-56 animate-pulse rounded-md bg-white/5" aria-hidden />
  ),
});

const SpotifyEmbed = dynamic(() => import("@/components/home/SpotifyEmbed"), {
  loading: () => (
    <div className="h-[152px] w-full animate-pulse rounded-xl bg-white/5 sm:h-[352px]" aria-hidden />
  ),
});

const AboutSection = dynamic(() => import("@/components/home/AboutSection"));

/* ══════════════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="relative flex min-h-full w-full flex-col">

      {/* ═══════════════════════════════════════
          01 — HERO
      ═══════════════════════════════════════ */}
      <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 pb-28 pt-10 md:pb-10">

        {/* blurred bg photo */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/static/home/avt.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-top opacity-20 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#18181b]/70 via-[#18181b]/60 to-[#18181b]" />
        </div>

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#43d04c 1px,transparent 1px),linear-gradient(90deg,#43d04c 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />

        {/* content */}
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">

          {/* avatar with spinning ring */}
          <Pan>
            <div className="relative mx-auto mb-7 w-fit">
              <svg
                className="absolute -inset-3 animate-spin [animation-duration:12s]"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden
              >
                <circle cx="60" cy="60" r="56" stroke="url(#ring-grad)"
                  strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ring-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b0f50e" />
                    <stop offset="1" stopColor="#43d04c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-secondary/40 to-primary/40 blur-xl" aria-hidden />
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/50 sm:h-44 sm:w-44">
                <Image
                  src="/static/home/avt.jpg"
                  alt="Kira portrait"
                  width={176} height={176}
                  sizes="(max-width: 640px) 144px, 176px"
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#18181b] bg-primary sm:bottom-3 sm:right-3">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
              </span>
            </div>
          </Pan>

          {/* name */}
          <Pan>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Kira
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                .dev
              </span>
            </h1>
            <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </Pan>

          {/* typewriter */}
          <Pan className="mt-5 flex justify-center">
            <Writer />
          </Pan>

          {/* bio */}
          <Pan className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400 sm:text-base">
            Building thoughtful, performant web experiences with React, Next.js, and modern tooling.
          </Pan>

          {/* stats */}
          <Pan className="mt-7 flex w-full justify-center gap-6 border-y border-white/5 py-5 sm:gap-10">
            {[
              { label: "Years exp.", value: "1+" },
              { label: "Projects", value: "20+" },
              { label: "Location", value: "Hà Nội" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </Pan>

          {/* CTAs */}
          <Pan className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-sm sm:flex-row">
            <Button href="#about" className="flex-1">About me</Button>
            <Button href="/static/CV_TRANVANKHUYEN.pdf" newTab="1" className="flex-1">
              Resume
            </Button>
          </Pan>

          {/* social */}
          <Pan className="mt-6">
            <SocialLinks />
          </Pan>

          <Pan className="mt-5 text-xs text-gray-600">
            Made with <span className="text-primary">coffee</span>
            
          </Pan>

          {/* scroll cue */}
          <Pan className="mt-8">
            <div className="flex animate-bounce flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-600">scroll</span>
              <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </Pan>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02 — ABOUT
      ═══════════════════════════════════════ */}
      <AboutSection />

      {/* ═══════════════════════════════════════
          03 — CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden px-5 py-20 md:px-10 lg:px-16">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/static/about/my-image.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/80 to-[#18181b]" />
        </div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <Pan>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Let&apos;s connect
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to discuss
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {" "}your project?
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-gray-400">
              Thinking about a new project, a problem to solve, or just want to connect?
              Let&apos;s do it.
            </p>
          </Pan>

          <Pan className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" className="sm:min-w-[160px]">Get in touch</Button>
            <Button href="/articles" className="sm:min-w-[160px]">Read articles</Button>
          </Pan>
        </div>
      </section>

    </div>
  );
};

export default Home;
