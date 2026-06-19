import ListArticles from "@/components/articles/ListArticles";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Poiuyt | Articles",
  icons: { icon: "/favicon.png" },
};

export const revalidate = 60;

const ArticleSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse border border-white/[0.07] bg-white/[0.03]">
        <div className="h-52 w-full bg-white/[0.07]" />
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/3 bg-white/[0.07]" />
          <div className="h-5 w-4/5 bg-white/[0.07]" />
          <div className="h-5 w-3/5 bg-white/[0.07]" />
          <div className="h-3 w-full bg-white/[0.05]" />
          <div className="h-3 w-4/5 bg-white/[0.05]" />
        </div>
      </div>
    ))}
  </div>
);

const ArticlesPage = () => {
  return (
    <div className="min-h-screen w-full text-gray-300">
      {/* Header */}
      <div className="border-b border-white/[0.07] px-6 py-16 md:px-14 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            Writing
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
            Articles
          </h1>
          <p className="max-w-xl text-base text-gray-400">
            A few handcrafted articles about my thoughts, experiments, and things I find interesting.
          </p>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-secondary via-primary to-transparent" />

      {/* Article grid */}
      <div className="px-6 py-12 md:px-14 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Suspense fallback={<ArticleSkeleton />}>
            <ListArticles />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
