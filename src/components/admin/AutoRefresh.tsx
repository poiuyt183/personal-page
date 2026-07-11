"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL_MS = 10_000;

/**
 * Tự refetch dữ liệu dashboard theo chu kỳ bằng router.refresh() —
 * server component chạy lại và React cập nhật UI tại chỗ, không reload trang.
 * Tạm dừng khi tab bị ẩn để tiết kiệm quota Hygraph.
 */
const AutoRefresh = () => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [isRefreshing, startTransition] = useTransition();

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      if (document.visibilityState === "visible") {
        startTransition(() => router.refresh());
      }
    };

    const id = setInterval(tick, REFRESH_INTERVAL_MS);
    // Quay lại tab thì cập nhật ngay thay vì đợi hết chu kỳ
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [enabled, router]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((v) => !v)}
      title={enabled ? "Đang tự cập nhật mỗi 10s — bấm để tắt" : "Bấm để bật tự cập nhật"}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        enabled
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-white/[0.1] text-gray-500 hover:text-gray-300"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {enabled && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${
              isRefreshing ? "" : "animate-ping"
            }`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            enabled ? "bg-primary" : "bg-gray-600"
          }`}
        />
      </span>
      {enabled ? "Live" : "Tạm dừng"}
    </button>
  );
};

export default AutoRefresh;
