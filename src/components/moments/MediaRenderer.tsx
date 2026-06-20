"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { MediaType, Moment } from "@/types/moment";

type MediaRendererProps = {
  media: Moment["media"];
  type: MediaType;
};

const MediaRenderer = ({ media }: MediaRendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!media.length) return null;

  const currentItem = media[activeIndex];
  const isVideo = currentItem.mimeType.startsWith("video/");
  const hasMultiple = media.length > 1;

  const go = (delta: number) => {
    setDirection(delta);
    setActiveIndex((prev) => (prev + delta + media.length) % media.length);
  };

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const aspectRatio =
    currentItem.width && currentItem.height
      ? currentItem.width / currentItem.height
      : undefined;

  return (
    <div className="relative w-full overflow-hidden bg-black/20">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -32 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={aspectRatio ? { aspectRatio } : undefined}
          className="w-full"
        >
          {isVideo ? (
            <video
              src={currentItem.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full"
            />
          ) : (
            <Image
              src={currentItem.url}
              width={currentItem.width}
              height={currentItem.height}
              alt="Moment media"
              className="h-auto w-full"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <>
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-1 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
          >
            <IconChevronLeft size={15} strokeWidth={2.5} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Ảnh tiếp theo"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-1 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
          >
            <IconChevronRight size={15} strokeWidth={2.5} />
          </button>

          {/* Pill dot indicators */}
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ảnh ${index + 1} / ${media.length}`}
                className={`h-1.5 rounded-full transition-all duration-250 ${
                  activeIndex === index
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Counter badge */}
          <div className="absolute right-2.5 top-2.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] tabular-nums text-white/60 backdrop-blur-sm">
            {activeIndex + 1} / {media.length}
          </div>
        </>
      )}
    </div>
  );
};

export default MediaRenderer;
