import Image from "next/image";

interface AvtImageProps {
  variant?: "hero" | "circle";
}

const AvtImage = ({ variant = "circle" }: AvtImageProps) => {
  if (variant === "hero") {
    return (
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#18181b] to-transparent"
          aria-hidden
        />
        <Image
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 45vw"
          src="/static/home/avt.jpg"
          alt="Kira portrait"
          priority
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto lg:mx-0">
      <div
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-secondary to-primary opacity-60 blur-sm"
        aria-hidden
      />
      <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-[#222225] sm:h-44 sm:w-44 lg:h-48 lg:w-48">
        <Image
          width={192}
          height={192}
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
          src="/static/home/avt.jpg"
          alt="Kira portrait"
          priority
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AvtImage;
