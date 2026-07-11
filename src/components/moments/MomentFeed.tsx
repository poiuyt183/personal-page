"use client";

import { useMemo, useState } from "react";
import MomentCard from "./MomentCard";
import LikesProvider from "./LikesProvider";
import { parseMomentTags, type Moment } from "@/types/moment";

type MomentFeedProps = {
  moments: Moment[];
};

const MomentFeed = ({ moments }: MomentFeedProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagsWithCount = useMemo(() => {
    const map: Record<string, number> = {};
    moments.forEach((m) => {
      parseMomentTags(m.tags).forEach((tag) => {
        map[tag] = (map[tag] ?? 0) + 1;
      });
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [moments]);

  const filteredMoments = useMemo(() => {
    if (!selectedTag) return moments;
    return moments.filter((m) => parseMomentTags(m.tags).includes(selectedTag));
  }, [moments, selectedTag]);

  if (!moments.length) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-2xl">
          🌱
        </div>
        <p className="text-sm font-medium text-gray-400">Chưa có khoảnh khắc nào.</p>
        <p className="mt-1 text-xs text-gray-600">Hãy quay lại sau nhé!</p>
      </div>
    );
  }

  return (
    // Provider fetch trạng thái like cho TOÀN BỘ moment trong 1 request,
    // dùng danh sách đầy đủ (không phải filtered) để giữ state khi đổi tag
    <LikesProvider momentIds={moments.map((m) => m.id)}>
    <div className="space-y-5">
      {/* ── Tag filter ── */}
      {tagsWithCount.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-1">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
              selectedTag === null
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-white/10 bg-transparent text-gray-500 hover:border-white/20 hover:text-gray-300"
            }`}
          >
            Tất cả
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none ${
                selectedTag === null
                  ? "bg-primary/20 text-primary"
                  : "bg-white/10 text-gray-600"
              }`}
            >
              {moments.length}
            </span>
          </button>

          {tagsWithCount.map(([tag, count]) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                selectedTag === tag
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-white/10 bg-transparent text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              #{tag}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none ${
                  selectedTag === tag
                    ? "bg-primary/20 text-primary"
                    : "bg-white/10 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Separator ── */}
      <div className="h-px bg-white/[0.05]" />

      {/* ── Timeline feed ── */}
      {filteredMoments.length > 0 ? (
        <div className="pt-2">
          {filteredMoments.map((moment, index) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              index={index}
              isLast={index === filteredMoments.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-gray-500">
            Không có khoảnh khắc nào với tag{" "}
            <span className="text-primary">#{selectedTag}</span>.
          </p>
        </div>
      )}
    </div>
    </LikesProvider>
  );
};

export default MomentFeed;
