import React from "react";

const Home = ({
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
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M3 11.5 12 3l9 8.5V21H15v-5h-6v5H3V11.5Z"
    />
  </svg>
);

export default Home;
