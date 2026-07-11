"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconLock, IconLoader2, IconChartAreaLine } from "@tabler/icons-react";

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !password) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(json?.error ?? "Đăng nhập thất bại");
        setIsSubmitting(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="relative rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8">
          {/* Glow ring phía sau icon */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative mb-7 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_rgba(67,208,76,0.2)]">
              <IconChartAreaLine size={26} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-50">
              Analytics Dashboard
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Khu vực riêng tư — nhập mật khẩu để tiếp tục
            </p>
          </div>

          <form onSubmit={onSubmit} className="relative space-y-4">
            <div className="relative">
              <IconLock
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                autoFocus
                className="w-full rounded-xl border border-white/[0.08] bg-black/30 py-2.5 pl-10 pr-4 text-sm text-gray-100 placeholder-gray-600 outline-none transition-all focus:border-primary/50 focus:bg-black/40 focus:shadow-[0_0_0_3px_rgba(67,208,76,0.08)]"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/25 bg-red-500/[0.07] px-3.5 py-2.5 text-xs text-red-300"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/90 px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-primary hover:shadow-[0_0_20px_rgba(67,208,76,0.35)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isSubmitting && (
                <IconLoader2 size={16} className="animate-spin" />
              )}
              Đăng nhập
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
