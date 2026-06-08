import type { TechStackItem } from "@/features/landing/tech-stack-marquee";
import { PORTFOLIO } from "@/features/portfolio/portfolio.data";
import { getTechIconSrc } from "@/features/portfolio/tech-icons";

const uniqueSkills = [
  ...new Set(PORTFOLIO.skillGroups.flatMap((group) => group.items)),
];

export const TECH_STACK: TechStackItem[] = uniqueSkills.map((label) => {
  const imageSrc = getTechIconSrc(label);

  if (imageSrc) {
    return { label, kind: "image", imageSrc };
  }

  return {
    label,
    kind: "fallback",
    fallbackText: label.slice(0, 2),
  };
});
