import { cn } from "@/lib/utils";

type BrandLogoProps = {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  height?: number;
  width?: number;
};

export function BrandLogo({
  src,
  alt = "",
  className,
  imageClassName,
  height,
  width,
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden bg-white",
        className
      )}
    >
      <img
        alt={alt}
        aria-hidden={alt === ""}
        className={cn("max-h-full max-w-full object-contain", imageClassName)}
        height={height}
        src={src}
        width={width}
      />
    </span>
  );
}
