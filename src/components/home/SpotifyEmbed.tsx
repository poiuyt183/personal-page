"use client";

import { useEffect, useRef, useState } from "react";

const PLAYLIST_SRC =
  "https://open.spotify.com/embed/playlist/08Iatn2s0qCdXwr4q9aBDa?utm_source=generator&theme=0";

const SpotifyEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl border border-white/5 bg-black/20 shadow-lg"
    >
      {shouldLoad ? (
        <iframe
          src={PLAYLIST_SRC}
          width="100%"
          height="352"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="h-[152px] border-0 sm:h-[352px]"
          title="Spotify playlist — Now playing"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="flex h-[152px] w-full flex-col items-center justify-center gap-3 text-gray-400 transition-colors hover:bg-white/5 hover:text-primary sm:h-[352px]"
          aria-label="Load Spotify playlist player"
        >
          <svg
            className="h-10 w-10 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-sm font-medium">Tap to load playlist</span>
        </button>
      )}
    </div>
  );
};

export default SpotifyEmbed;
