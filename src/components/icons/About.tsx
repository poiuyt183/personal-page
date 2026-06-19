import React from "react";

const About = ({
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
    {/* ID card icon — more fitting for an About/profile page */}
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
    />
    <circle
      cx="8"
      cy="12"
      r="2.5"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
    />
    <path
      stroke={color ?? "currentColor"}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={strokeWidth}
      d="M13 9h6M13 12h5M13 15h4"
    />
  </svg>
);

export default About;
