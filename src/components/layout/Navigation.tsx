"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  About,
  Articles,
  Mail,
  Facebook,
  Insta,
  LinkedIn,
  X,
} from "@/components/icons";

const navItems = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/moments", label: "Moments", Icon: About },
  { href: "/articles", label: "Articles", Icon: Articles },
  { href: "/contact", label: "Contact", Icon: Mail },
] as const;

const socialItems = [
  {
    href: "https://www.facebook.com/hoshikira18",
    Icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://twitter.com/khuyen_van24041",
    Icon: X,
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/hoshikira18/",
    Icon: Insta,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/hoshikira",
    Icon: LinkedIn,
    label: "LinkedIn",
  },
] as const;

const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop — right sidebar */}
      <aside className="sticky top-0 hidden h-screen shrink-0 md:flex">
        <div className="w-1 shrink-0 bg-gradient-to-b from-secondary to-primary" />
        <div className="flex h-full w-16 flex-col bg-gradient-to-b from-[#18181b] to-[#222225]">

          {/* logo */}
          <div className="flex shrink-0 justify-center pt-10">
            <Link
              href="/"
              aria-label="Home"
              className="flex h-10 w-10 items-center justify-center border border-primary/50 bg-primary/10 text-base font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary/20"
            >
              K
            </Link>
          </div>

          {/* nav — vertically centered */}
          <nav className="flex flex-1 flex-col justify-center">
            {navItems.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <div key={href} className="group relative w-full">
                  <span
                    className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 translate-x-2 whitespace-nowrap border border-white/10 bg-[#222225] px-4 py-2 text-sm font-medium text-gray-200 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  >
                    {label}
                    <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#222225]" />
                  </span>

                  <Link
                    href={href}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex h-16 w-full items-center justify-center transition-all duration-200 ${active
                        ? "bg-primary/10 text-primary"
                        : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-100"
                      }`}
                  >
                    {active && (
                      <span className="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-b from-secondary to-primary" />
                    )}
                    <Icon
                      className="h-7 w-7 md:h-8 md:w-8"
                      color={active ? "#43d04c" : "currentColor"}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* social */}
          <div className="flex shrink-0 flex-col pb-8">
            {socialItems.map(({ href, Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-full items-center justify-center text-gray-500 transition-all duration-200 hover:bg-white/[0.05] hover:text-primary"
              >
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile — bottom bar */}
      <nav className="fixed bottom-0 left-0 z-[200] flex h-16 w-full items-stretch border-t border-white/[0.08] bg-[#18181b]/95 backdrop-blur-md md:hidden">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 transition-colors duration-150 ${active ? "text-primary" : "text-gray-400"
                }`}
            >
              {active && (
                <span className="absolute inset-x-3 top-0 h-[2px] bg-gradient-to-r from-secondary to-primary" />
              )}
              <Icon
                className="h-6 w-6"
                color={active ? "#43d04c" : "currentColor"}
              />
              <span className="text-xs font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;
