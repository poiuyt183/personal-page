"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onLogout = async () => {
    if (isPending) return;
    setIsPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-40"
    >
      <IconLogout size={14} />
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
