import type { Metadata } from "next";
import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";
import { graphQLClient } from "@/query/graphql";
import "@/app/styles/common/html.css";

export const metadata: Metadata = {
  title: "Poiuyt | Articles",
};

const getSingleBlog = async (slug: string): Promise<Post> => {
  const query = gql`
    query MyQuery($slug: String!) {
      post(where: { slug: $slug }) {
        id
        date
        coverImage { url }
        title
        slug
        content { html }
      }
    }
  `;
  const response = await graphQLClient
    .request<{ post: Post }>(query, { slug })
    .then(({ post }) => post);
  return response;
};

const formatDate = (raw: string) => {
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getSingleBlog(params.slug);

  return (
    <div className="min-h-screen w-full text-gray-300">
      {/* Back link */}
      <div className="border-b border-white/[0.07] px-6 py-4 md:px-14 lg:px-20">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:text-primary"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M10 18l-6-6 6-6" />
          </svg>
          All articles
        </Link>
      </div>

      {/* Cover image */}
      <div className="relative h-64 w-full overflow-hidden bg-white/[0.05] md:h-[420px]">
        <Image
          fill
          priority
          sizes="100vw"
          className="object-cover"
          src={post.coverImage?.url || "https://media.graphassets.com/4P0wxxBTtqKU9nI7Zc80"}
          alt={post.title || "Article cover"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent" />
      </div>

      {/* Article header */}
      <div className="border-b border-white/[0.07] px-6 py-10 md:px-14 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <time className="mb-4 block text-xs font-medium uppercase tracking-widest text-gray-500">
            {formatDate(post.date)}
          </time>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-100 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>By</span>
            <span className="font-semibold text-primary">Kira</span>
          </div>
        </div>
      </div>

      {/* Gradient rule */}
      <div className="h-px w-full bg-gradient-to-r from-secondary via-primary to-transparent" />

      {/* Article body */}
      <div className="px-6 py-12 md:px-14 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div
            className="html space-y-5 text-base leading-relaxed text-gray-300 md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.content?.html }}
          />

          {/* Footer rule */}
          <div className="mt-16 h-px bg-gradient-to-r from-primary to-secondary" />

          {/* Back button */}
          <div className="mt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-400 transition-all hover:border-primary/40 hover:text-primary"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M10 18l-6-6 6-6" />
              </svg>
              Back to articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
