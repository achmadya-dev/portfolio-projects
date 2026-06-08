import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/features/landing/landing-section";
import { TECH_STACK } from "@/features/landing/tech-stack.data";
import { TechStackMarquee } from "@/features/landing/tech-stack-marquee";
import { PORTFOLIO } from "@/features/portfolio/portfolio.data";
import { SocialIcon } from "@/features/portfolio/social-icon";
import { TechBadge } from "@/features/portfolio/tech-badge";
import { SITE_URL, seo } from "@/utils/seo";

const WHITESPACE_RE = /\s+/;

const NAV_ITEMS = [
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Side Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `${PORTFOLIO.name} — ${PORTFOLIO.role}`;
    const description = PORTFOLIO.tagline;

    const { meta, links } = seo({
      title,
      description,
      keywords:
        "backend developer, full stack, typescript, react, mysql, postgresql, bandung, portfolio",
      url: "/",
      canonicalUrl: "/",
      image: PORTFOLIO.avatar,
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: PORTFOLIO.name,
      jobTitle: PORTFOLIO.role,
      url: SITE_URL,
      email: PORTFOLIO.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: PORTFOLIO.location,
      },
    };

    return {
      meta,
      links: [
        ...links,
        {
          rel: "icon",
          href: "/assets/portfolio/title.png",
          type: "image/png",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: PortfolioPage,
});

function getInitials(name: string) {
  return name
    .split(WHITESPACE_RE)
    .map((part) => part.at(0) ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function downloadResume(url: string, filename: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to download resume");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}

function PortfolioPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground">
      <nav className="fixed top-0 right-0 left-0 z-50 border-border/40 border-b bg-background/80 backdrop-blur-xl">
        <div className="container relative mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <a
            className="font-semibold text-foreground text-sm tracking-tight transition-opacity hover:opacity-80"
            href="#top"
          >
            {PORTFOLIO.shortName}
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                className="rounded-full px-3.5 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <a
              className={buttonVariants({
                className: "hidden rounded-full sm:inline-flex",
                size: "sm",
              })}
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      <section
        className="relative overflow-hidden border-border/40 border-b pt-28 pb-16 md:pt-32 md:pb-20"
        id="top"
      >
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/8 via-background to-background" />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              className="mb-5 rounded-full border-primary/30 bg-primary/10 px-3 py-1 font-medium text-primary text-xs"
              variant="outline"
            >
              {PORTFOLIO.availability}
            </Badge>

            <h1 className="mb-3 font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
              {PORTFOLIO.name}
            </h1>

            <p className="mb-2 font-medium text-lg text-primary md:text-xl">
              {PORTFOLIO.role}
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
              {PORTFOLIO.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                className={buttonVariants({
                  className: "rounded-full px-6",
                })}
                href="#projects"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full px-6",
                })}
                href="#contact"
              >
                Contact Me
              </a>
              <a
                className={buttonVariants({
                  variant: "ghost",
                  className: "rounded-full px-6",
                })}
                href={PORTFOLIO.resume}
                onClick={(event) => {
                  event.preventDefault();
                  downloadResume(
                    PORTFOLIO.resume,
                    PORTFOLIO.resumeFilename
                  ).catch(() => undefined);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 shrink-0" />
              {PORTFOLIO.location}
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="py-12 md:py-16" id="skills" variant="subtle">
        <TechStackMarquee className="opacity-90" items={TECH_STACK} />
      </Section>

      <Section id="about">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              About Me
            </h2>
            <div
              aria-hidden
              className="mx-auto mt-4 h-1 w-10 rounded-full bg-primary"
            />
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="relative shrink-0">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl"
                />
                {PORTFOLIO.avatar ? (
                  <img
                    alt={PORTFOLIO.name}
                    className="relative size-48 rounded-2xl border border-primary/20 object-cover shadow-primary/10 shadow-xl lg:size-56"
                    height={224}
                    src={PORTFOLIO.avatar}
                    width={224}
                  />
                ) : (
                  <div
                    aria-hidden
                    className="relative flex size-48 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 font-bold text-4xl text-primary shadow-primary/10 shadow-xl lg:size-56"
                  >
                    {getInitials(PORTFOLIO.name)}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <p className="text-balance text-lg text-muted-foreground leading-relaxed md:text-xl">
                {PORTFOLIO.about}
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section id="education">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Education & Certifications
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-10 rounded-full bg-primary"
          />
        </div>

        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-6">
            {PORTFOLIO.education.map((entry, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                key={entry.school}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm">
                  <div className="grid items-center gap-8 p-6 md:grid-cols-[auto_1fr] md:p-8">
                    <div className="flex justify-center md:justify-start">
                      <div className="relative">
                        <div
                          aria-hidden
                          className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl"
                        />
                        <div className="relative flex size-28 items-center justify-center rounded-2xl border border-primary/20 bg-background p-4 shadow-lg shadow-primary/10">
                          <img
                            alt={entry.school}
                            className="max-h-full max-w-full object-contain"
                            height={80}
                            src={entry.logo}
                            width={80}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="mb-3 inline-flex items-center gap-2 font-semibold text-primary text-xs uppercase tracking-wider">
                        <GraduationCap className="size-4" />
                        Education
                      </div>
                      <h3 className="mb-2 font-bold text-2xl tracking-tight">
                        {entry.school}
                      </h3>
                      <p className="mb-4 font-medium text-lg text-primary">
                        {entry.degree}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Badge
                          className="gap-1.5 rounded-full px-3 py-1 font-normal"
                          variant="secondary"
                        >
                          <Calendar className="size-3.5" />
                          {entry.period}
                        </Badge>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <MapPin className="size-3.5 shrink-0 text-primary" />
                          {entry.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            <div className="mb-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xl tracking-tight">
                    Certifications
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {PORTFOLIO.certifications.length} credentials earned
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.certifications.map((cert, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  key={`${cert.issuer}-${cert.title}`}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card className="group h-full border-border/40 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/70 hover:shadow-md hover:shadow-primary/5">
                    <div className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-background p-1.5">
                        <img
                          alt=""
                          aria-hidden
                          className="size-full object-contain"
                          height={40}
                          src={cert.logo}
                          width={40}
                        />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="font-semibold text-[11px] text-muted-foreground uppercase tracking-wide">
                          {cert.issuer}
                        </p>
                        <p className="font-medium text-sm leading-snug">
                          {cert.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" variant="muted">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Work Experience
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-10 rounded-full bg-primary"
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-10">
          {PORTFOLIO.experience.map((job, idx) => (
            <motion.article
              className="relative border-primary/30 border-l-2 pl-6"
              initial={{ opacity: 0, x: -16 }}
              key={job.id}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="absolute top-2 -left-[5px] size-2 rounded-full bg-primary" />
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <img
                  alt=""
                  className="size-8 rounded-md border border-border/60 bg-background object-contain p-1"
                  height={32}
                  src={job.logo}
                  width={32}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg">{job.company}</h3>
                  <p className="text-primary text-sm">{job.role}</p>
                </div>
                <span className="text-muted-foreground text-sm">
                  {job.period}
                </span>
              </div>
              <p className="mb-4 text-muted-foreground text-sm">
                {job.location}
              </p>
              <ul className="mb-4 space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    className="flex gap-2 text-muted-foreground text-sm leading-relaxed"
                    key={bullet.slice(0, 48)}
                  >
                    <Briefcase
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.tech.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" variant="muted">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Side Projects
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-10 rounded-full bg-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.projects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              key={project.id}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-colors hover:border-primary/40">
                {project.image ? (
                  <div className="aspect-video overflow-hidden border-border/40 border-b">
                    <img
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      height={450}
                      src={project.image}
                      width={800}
                    />
                  </div>
                ) : null}
                <CardHeader>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    {project.period ? (
                      <Badge className="font-normal" variant="outline">
                        {project.period}
                      </Badge>
                    ) : null}
                  </div>
                  {project.role ? (
                    <p className="mb-2 text-primary text-sm">{project.role}</p>
                  ) : null}
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} />
                  ))}
                </CardContent>
                <CardFooter className="mt-auto gap-2">
                  {project.href ? (
                    <a
                      className={buttonVariants({
                        size: "sm",
                        variant: "outline",
                      })}
                      href={project.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Live Demo
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                      href={project.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Code2 className="mr-1 h-3 w-3" />
                      Code
                    </a>
                  ) : null}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Let&apos;s Collaborate
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-10 rounded-full bg-primary"
          />
          <p className="mt-8 mb-8 text-lg text-muted-foreground">
            Have a project idea or want to discuss? Reach out via email or
            social media below.
          </p>

          <a
            className={buttonVariants({
              size: "lg",
              className: "mb-10 rounded-full px-8",
            })}
            href={`mailto:${PORTFOLIO.email}`}
          >
            {PORTFOLIO.email}
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            {PORTFOLIO.socials.map((social) => (
              <a
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full",
                })}
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon className="mr-2 h-4 w-4" icon={social.icon} />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <footer className="border-border/40 border-t bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {PORTFOLIO.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
