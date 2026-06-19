import Link from "next/link";
import Image from "next/image";

interface Post {
  date?: string;
  excerpt?: string;
  title?: string;
  coverImage?: { url?: string };
  slug?: string;
}

const formatDate = (raw?: string) => {
  if (!raw) return "";
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const ArticleCard = ({ date, excerpt, title, coverImage, slug }: Post) => {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.04]"
    >
      {/* Cover image */}
      <div className="relative h-52 w-full overflow-hidden bg-white/[0.05]">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={coverImage?.url || "https://media.graphassets.com/4P0wxxBTtqKU9nI7Zc80"}
          alt={title || "Article cover"}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Left accent + content */}
      <div className="flex flex-1 flex-col border-l-[3px] border-transparent p-5 transition-all duration-300 group-hover:border-primary">
        {/* Date */}
        <time className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-500">
          {formatDate(date)}
        </time>

        {/* Title */}
        <h2 className="mb-2 text-lg font-bold leading-snug text-gray-100 transition-colors duration-200 group-hover:text-primary">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">
          {excerpt}
        </p>

        {/* Read more */}
        <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors duration-200 group-hover:text-primary">
          Read article
          <svg
            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M14 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
