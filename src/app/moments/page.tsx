import type { Metadata } from "next";
import MomentFeed from "@/components/moments/MomentFeed";
import { GET_MOMENTS } from "@/lib/queries";
import { graphQLClient } from "@/query/graphql";
import type { Moment } from "@/types/moment";

export const metadata: Metadata = {
  title: "Poiuyt | Moments",
};

export const revalidate = 60;

const getMoments = async (): Promise<Moment[]> => {
  const { moments } = await graphQLClient.request<{ moments: Moment[] }>(
    GET_MOMENTS,
    { visibility: "public" },
  );
  return moments;
};

const sortMoments = (moments: Moment[]): Moment[] =>
  [...moments].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

const MomentsPage = async () => {
  const moments = sortMoments(await getMoments());

  return (
    <div className="min-h-screen w-full text-gray-300">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] px-6 py-20 md:px-14 lg:px-20">
        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-secondary/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {moments.length} khoảnh khắc
          </div>

          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
            Khoảnh khắc
          </h1>
          <p className="max-w-md text-base leading-relaxed text-gray-500">
            Những mảnh ghép nhỏ của cuộc sống — suy nghĩ, hình ảnh, kỷ niệm.
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-secondary/60 via-primary/60 to-transparent" />

      {/* ── Feed ── */}
      <div className="px-6 py-10 md:px-14 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <MomentFeed moments={moments} />
        </div>
      </div>
    </div>
  );
};

export default MomentsPage;
