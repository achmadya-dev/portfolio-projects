import type { VariantProps } from "class-variance-authority";

import { Badge, type badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./brand-logo";
import { getTechIconSrc } from "./tech-icons";

type TechBadgeProps = {
  label: string;
  className?: string;
} & VariantProps<typeof badgeVariants>;

export function TechBadge({
  label,
  className,
  variant = "secondary",
}: TechBadgeProps) {
  const iconSrc = getTechIconSrc(label);

  return (
    <Badge className={cn("gap-1.5", className)} variant={variant}>
      {iconSrc ? (
        <BrandLogo
          className="size-3.5 rounded-sm p-px"
          imageClassName="size-full"
          src={iconSrc}
        />
      ) : null}
      {label}
    </Badge>
  );
}
