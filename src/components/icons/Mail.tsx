import React from "react";

const Mail = ({
  color,
  className = "",
  strokeWidth = "1.5",
}: {
  color?: string;
  className?: string;
  strokeWidth?: string;
}) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
    />
    {/* Bold V chevron */}
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M2 5l10 8L22 5"
    />
  </svg>
);

export default Mail;
