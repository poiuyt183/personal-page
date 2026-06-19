import Link from "next/link";
import FadeIn from "./animation/Fadein";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  newTab?: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  href,
  newTab,
  className = "",
  onClick,
}: ButtonProps) => {
  const isLink = Boolean(href);
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  const inner = (
    <>
      <span
        className="absolute bottom-0 left-1.5 right-0 top-1.5 bg-gradient-to-br from-secondary to-primary"
        aria-hidden
      />
      <span className="relative block bg-white px-4 py-3 text-center text-sm font-medium text-black transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5 sm:px-5 sm:py-3.5 sm:text-base">
        {children}
      </span>
    </>
  );

  const wrapperClass =
    "group relative block w-full min-w-0 pb-1.5 pr-1.5";

  return (
    <FadeIn className={`block min-w-0 ${className}`}>
      {isLink ? (
        <Link href={href!} target={target} rel={rel} className={wrapperClass}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={wrapperClass}>
          {inner}
        </button>
      )}
    </FadeIn>
  );
};

export default Button;
