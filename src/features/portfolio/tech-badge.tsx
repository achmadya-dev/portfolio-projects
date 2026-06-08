import type { VariantProps } from "class-variance-authority";

import { Badge, type badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        <img
          alt=""
          aria-hidden
          className="size-3.5 shrink-0 object-contain"
          height={14}
          src={iconSrc}
          width={14}
        />
      ) : null}
      {label}
    </Badge>
  );
}
