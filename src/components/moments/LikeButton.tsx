"use client";

import { useRef, useState } from "react";
import { LikeButton as LyketLikeButton } from "@lyket/react";
import { motion } from "framer-motion";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

type LikeButtonProps = {
  momentId: string;
};

const COOLDOWN_MS = 800;

const LikeButton = ({ momentId }: LikeButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const lastPressRef = useRef(0);

  return (
    <LyketLikeButton id={momentId} namespace="portfolio-moments">
      {({ isLoading, userLiked, totalLikes, handlePress, isCounterVisible }) => {
        const disabled = isLoading || isPending;

        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          const now = Date.now();
          if (disabled || now - lastPressRef.current < COOLDOWN_MS) return;

          lastPressRef.current = now;
          setIsPending(true);
          handlePress(e);
          setTimeout(() => setIsPending(false), COOLDOWN_MS);
        };

        return (
          <motion.button
            type="button"
            onClick={onClick}
            disabled={disabled}
            whileTap={disabled ? undefined : { scale: 0.88 }}
            whileHover={disabled ? undefined : { scale: 1.05 }}
            className="group relative inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 shadow-[0_0_12px_rgba(67,208,76,0.15)] transition-all duration-200 hover:border-primary/70 hover:bg-primary/25 hover:shadow-[0_0_20px_rgba(67,208,76,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!userLiked && !disabled && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-primary/50"
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            )}

            <motion.span
              animate={
                userLiked
                  ? { scale: [1, 1.3, 1] }
                  : { scale: [1, 1.1, 1] }
              }
              transition={
                userLiked
                  ? { duration: 0.4 }
                  : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }
              className="relative flex items-center"
            >
              {userLiked ? (
                <IconHeartFilled
                  size={17}
                  className="text-primary drop-shadow-[0_0_8px_rgba(67,208,76,0.9)]"
                />
              ) : (
                <IconHeart
                  size={17}
                  className="text-primary drop-shadow-[0_0_4px_rgba(67,208,76,0.5)]"
                />
              )}
            </motion.span>

            {isCounterVisible && (
              <span className="text-xs font-bold tabular-nums text-primary">
                {totalLikes}
              </span>
            )}

            {!userLiked && (
              <span className="text-[11px] font-medium text-gray-400 transition-colors group-hover:text-primary">
                Thả tim
              </span>
            )}
          </motion.button>
        );
      }}
    </LyketLikeButton>
  );
};

export default LikeButton;
