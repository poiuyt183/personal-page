"use client";

import Typewriter from "typewriter-effect";

const ROLES = [
  "Front-End Development",
  "React & Next.js",
  "TypeScript",
  "UI Engineering",
];

const Writer = () => {
  return (
    <div className="flex items-center justify-center gap-2 lg:justify-start">
      <span className="text-xl font-bold text-gray-500 sm:text-2xl">&gt;</span>
      <div className="min-h-[2.25rem] bg-gradient-to-r from-secondary to-primary bg-clip-text text-xl font-bold text-transparent sm:min-h-[2.5rem] sm:text-2xl lg:min-h-[2.75rem] lg:text-3xl">
        <Typewriter
          options={{
            strings: ROLES,
            autoStart: true,
            loop: true,
            cursor: "_",
            cursorClassName: "text-gray-400 font-normal",
            delay: 45,
            deleteSpeed: 25,
          }}
        />
      </div>
    </div>
  );
};

export default Writer;
