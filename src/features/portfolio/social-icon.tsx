import { Globe, Mail, Phone, UserRound } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

import type { SocialLink } from "@/features/portfolio/portfolio.data";

type SocialIconProps = {
  icon: SocialLink["icon"];
  className?: string;
};

export function SocialIcon({ icon, className }: SocialIconProps) {
  if (icon === "mail") {
    return <Mail aria-hidden className={className} />;
  }

  if (icon === "globe") {
    return <Globe aria-hidden className={className} />;
  }

  if (icon === "linkedin") {
    return <UserRound aria-hidden className={className} />;
  }

  if (icon === "phone") {
    return <Phone aria-hidden className={className} />;
  }

  return <SimpleIconSvg className={className} icon={icon} />;
}

function SimpleIconSvg({
  icon,
  className,
}: {
  icon: SimpleIcon;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
