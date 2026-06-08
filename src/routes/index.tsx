import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
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
import { SITE_URL, seo } from "@/utils/seo";

const WHITESPACE_RE = /\s+/;

const NAV_ITEMS = [
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
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

function PortfolioPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground">
      <nav className="fixed top-0 right-0 left-0 z-50 border-border/40 border-b bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden items-center gap-6 md:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <ThemeSwitcher />
              <a
                className={buttonVariants({
                  className: "hidden rounded-full sm:inline-flex",
                })}
                href="#contact"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_55%)] opacity-20" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge
            className="mb-6 border-primary/80 bg-primary px-4 py-2 font-medium text-primary-foreground text-sm"
            variant="outline"
          >
            {PORTFOLIO.availability}
          </Badge>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-black text-5xl tracking-tighter md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {PORTFOLIO.name}
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-semibold text-primary text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {PORTFOLIO.role}
          </motion.p>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-10 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {PORTFOLIO.tagline}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              className={buttonVariants({
                className:
                  "h-12 rounded-full px-8 font-semibold shadow-lg shadow-primary/25",
              })}
              href="#projects"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              className={buttonVariants({
                variant: "outline",
                className: "h-12 rounded-full px-8",
              })}
              href="#contact"
            >
              Contact Me
            </a>
            <a
              className={buttonVariants({
                variant: "outline",
                className: "h-12 rounded-full px-8",
              })}
              download
              href={PORTFOLIO.resume}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{PORTFOLIO.location}</span>
          </div>
        </div>
      </section>

      <Section className="py-12 md:py-16" id="skills" variant="subtle">
        <TechStackMarquee className="opacity-90" items={TECH_STACK} />
      </Section>

      <Section id="about">
        <div className="mx-auto max-w-4xl">
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
              <h2 className="mb-5 font-bold text-3xl tracking-tight md:text-4xl">
                About Me
              </h2>
              <p className="text-balance text-lg text-muted-foreground leading-relaxed md:text-xl">
                {PORTFOLIO.about}
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section id="education">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
            Education & Certifications
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Academic background and credentials that shaped my engineering
            journey
          </p>
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
            <div className="mb-8 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-2">
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
              {PORTFOLIO.certifications.map((cert, idx) => {
                const separator = " — ";
                const sepIndex = cert.indexOf(separator);
                const issuer = sepIndex === -1 ? null : cert.slice(0, sepIndex);
                const title =
                  sepIndex === -1
                    ? cert
                    : cert.slice(sepIndex + separator.length);

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    key={cert}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Card className="group h-full border-border/40 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/70 hover:shadow-md hover:shadow-primary/5">
                      <div className="flex gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <BadgeCheck className="size-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          {issuer ? (
                            <p className="font-semibold text-[11px] text-muted-foreground uppercase tracking-wide">
                              {issuer}
                            </p>
                          ) : null}
                          <p className="font-medium text-sm leading-snug">
                            {title}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" variant="muted">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
            Work Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Professional roles building backend systems and full-stack products
          </p>
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
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" variant="muted">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Selected work showing how I build digital products
          </p>
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
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
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
          <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
            Let&apos;s Collaborate
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
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
