import { Facebook, Insta, LinkedIn, X } from "@/components/icons";

const socialLinks = [
  {
    href: "https://www.facebook.com/Poiuyt18",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://twitter.com/khuyen_van24041",
    label: "X (Twitter)",
    Icon: X,
  },
  {
    href: "https://www.instagram.com/Poiuyt18/",
    label: "Instagram",
    Icon: Insta,
  },
  {
    href: "https://www.linkedin.com/in/Poiuyt",
    label: "LinkedIn",
    Icon: LinkedIn,
  },
] as const;

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-5 lg:justify-start">
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="rounded-full p-1.5 text-gray-400 transition-all duration-200 hover:scale-110 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
