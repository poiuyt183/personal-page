import React from "react";

const Articles = ({
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
    {/* Pen on paper — writing/articles */}
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M4 4h10v4h4v12H4V4Z"
    />
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M14 4l4 4"
    />
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M7 9h6M7 12h8M7 15h5"
    />
  </svg>
);

export default Articles;
