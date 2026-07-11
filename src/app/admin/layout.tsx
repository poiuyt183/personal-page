import Link from "next/link";
import { IconChartAreaLine, IconArrowUpRight } from "@tabler/icons-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen w-full bg-[#0e0e11] text-gray-300">
    {/* Glow accents */}
    <div className="pointer-events-none fixed -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl" />
    <div className="pointer-events-none fixed -right-24 top-1/3 h-80 w-80 rounded-full bg-secondary/[0.04] blur-3xl" />

    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0e0e11]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/admin" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <IconChartAreaLine size={17} />
          </span>
          <span className="text-sm font-bold tracking-tight text-gray-100">
            Analytics
          </span>
          <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:inline">
            admin
          </span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-primary"
        >
          Xem website
          <IconArrowUpRight size={14} />
        </Link>
      </div>
    </header>

    <main className="relative mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">
      {children}
    </main>
  </div>
);

export default AdminLayout;
