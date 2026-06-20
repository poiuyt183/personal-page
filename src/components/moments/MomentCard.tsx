"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";
import { motion } from "framer-motion";
import { IconPin } from "@tabler/icons-react";
import LikeButton from "./LikeButton";
import MediaRenderer from "./MediaRenderer";
import { parseMomentTags, type Moment } from "@/types/moment";

type MomentCardProps = {
  moment: Moment;
  index?: number;
  isLast?: boolean;
};

const formatRelativeDate = (raw: string): string => {
  const diff = Date.now() - new Date(raw).getTime();
  const m = Math.floor(diff / 60_000);
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);

  if (m < 1) return "Vừa xong";
  if (m < 60) return `${m} phút trước`;
  if (h < 24) return `${h} giờ trước`;
  if (d < 7) return `${d} ngày trước`;

  return new Date(raw).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Avatar = () => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-bold text-primary select-none">
    K
  </div>
);

const MomentCard = ({ moment, index = 0, isLast = false }: MomentCardProps) => {
  const tags = parseMomentTags(moment.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3"
    >
      {/* ── Left col: avatar + thread line ── */}
      <div className="flex flex-col items-center">
        <Avatar />
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-white/[0.12] to-white/[0.04]" />
        )}
      </div>

      {/* ── Right col: content ── */}
      <article className={`min-w-0 flex-1 ${isLast ? "pb-4" : "pb-10"}`}>
        {/* Header row */}
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-gray-100">Kira</span>

          {moment.pinned && (
            <span className="flex items-center gap-0.5 rounded-full border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary">
              <IconPin size={8} strokeWidth={2.5} />
              Ghim
            </span>
          )}

          <span className="text-gray-700">·</span>

          <time className="text-xs text-gray-500">
            {formatRelativeDate(moment.createdAt)}
          </time>
        </div>

        {/* Title */}
        {moment.title && (
          <h2 className="mb-2 text-sm font-semibold leading-snug text-gray-100">
            {moment.title}
          </h2>
        )}

        {/* Rich text body */}
        {moment.content?.raw && (
          <div className="mb-3 space-y-1 text-sm leading-relaxed text-gray-300">
            <RichText
              content={moment.content.raw}
              renderers={{
                p: ({ children }) => (
                  <p className="mb-2 text-sm leading-relaxed text-gray-300 last:mb-0">{children}</p>
                ),
                h1: ({ children }) => (
                  <h3 className="mb-1 text-base font-bold text-gray-100">{children}</h3>
                ),
                h2: ({ children }) => (
                  <h4 className="mb-1 text-sm font-bold text-gray-100">{children}</h4>
                ),
                h3: ({ children }) => (
                  <h5 className="mb-1 text-sm font-semibold text-gray-200">{children}</h5>
                ),
                a: ({ children, href, openInNewTab }) => (
                  <a
                    href={href}
                    target={openInNewTab ? "_blank" : "_self"}
                    rel={openInNewTab ? "noreferrer" : undefined}
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    {children}
                  </a>
                ),
                bold: ({ children }) => (
                  <strong className="font-semibold text-gray-200">{children}</strong>
                ),
                italic: ({ children }) => <em className="italic text-gray-400">{children}</em>,
                ul: ({ children }) => (
                  <ul className="ml-4 list-disc space-y-0.5 text-gray-300">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="ml-4 list-decimal space-y-0.5 text-gray-300">{children}</ol>
                ),
                li: ({ children }) => <li className="text-sm">{children}</li>,
              }}
            />
          </div>
        )}

        {/* Media */}
        {moment.media.length > 0 && (
          <div className="mb-3 overflow-hidden rounded-xl border border-white/[0.08]">
            <MediaRenderer media={moment.media} type={moment.mediaType} />
          </div>
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-primary/60 hover:text-primary cursor-default transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LikeButton momentId={moment.id} />
        </div>
      </article>
    </motion.div>
  );
};

export default MomentCard;
