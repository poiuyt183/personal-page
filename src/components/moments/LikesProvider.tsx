"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type LikeState = { count: number; liked: boolean };

type LikesContextValue = {
  /** null = đang tải lần đầu */
  states: Record<string, LikeState> | null;
  pendingIds: Set<string>;
  toggle: (momentId: string) => void;
};

const LikesContext = createContext<LikesContextValue | null>(null);

export const useLikes = () => {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes phải dùng bên trong LikesProvider");
  return ctx;
};

const COOLDOWN_MS = 800;

type LikesProviderProps = {
  momentIds: string[];
  children: React.ReactNode;
};

const LikesProvider = ({ momentIds, children }: LikesProviderProps) => {
  const [states, setStates] = useState<Record<string, LikeState> | null>(null);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const lastPressRef = useRef<Record<string, number>>({});
  const idsKey = momentIds.join(",");

  useEffect(() => {
    if (!idsKey) return;
    let cancelled = false;

    fetch(`/api/likes?ids=${encodeURIComponent(idsKey)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, LikeState> | null) => {
        if (!cancelled && data) setStates(data);
      })
      .catch(() => {
        // Feed vẫn hiển thị bình thường, nút like ở trạng thái chờ
      });

    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  const toggle = useCallback((momentId: string) => {
    const now = Date.now();
    if (now - (lastPressRef.current[momentId] ?? 0) < COOLDOWN_MS) return;
    lastPressRef.current[momentId] = now;

    // Optimistic: cập nhật UI ngay, rollback nếu server lỗi
    let previous: LikeState | undefined;
    setStates((current) => {
      if (!current?.[momentId]) return current;
      previous = current[momentId];
      const next = previous.liked
        ? { count: Math.max(previous.count - 1, 0), liked: false }
        : { count: previous.count + 1, liked: true };
      return { ...current, [momentId]: next };
    });

    setPendingIds((s) => new Set(s).add(momentId));

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ momentId }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((state: LikeState) => {
        // Đồng bộ với số thật từ server (có thể lệch nếu người khác vừa like)
        setStates((current) =>
          current ? { ...current, [momentId]: state } : current,
        );
      })
      .catch(() => {
        if (previous) {
          setStates((current) =>
            current ? { ...current, [momentId]: previous! } : current,
          );
        }
      })
      .finally(() => {
        setPendingIds((s) => {
          const next = new Set(s);
          next.delete(momentId);
          return next;
        });
      });
  }, []);

  return (
    <LikesContext.Provider value={{ states, pendingIds, toggle }}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesProvider;
