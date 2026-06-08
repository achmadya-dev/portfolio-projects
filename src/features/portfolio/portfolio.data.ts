import type { SimpleIcon } from "simple-icons";
import { siGithub } from "simple-icons";

export type PortfolioProject = {
  id: string;
  title: string;
  role?: string;
  period?: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
  github?: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo: string;
  bullets: string[];
  tech: string[];
  link?: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  logo: string;
};

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: SimpleIcon | "mail" | "globe" | "linkedin" | "phone";
};

export const PORTFOLIO = {
  name: "Achmadya Ridwan Ilyawan",
  shortName: "Achmadya",
  role: "Backend & Full Stack Developer",
  tagline: "Specialized in Backend & SQL Database",
  about:
    "Software developer with 2+ years of experience in full-stack development. Passionate about clean code, API design, and building scalable web solutions. Currently working as a Backend Developer at Knitto Group.",
  email: "achmadya.dev@gmail.com",
  phone: "+62 821-1603-0304",
  location: "Bandung, West Java, Indonesia",
  availability: "Available",
  resume:
    "/assets/portfolio/Resume Achmadya Ridwan Ilyawan - Backend Developer.pdf",
  resumeFilename: "Resume Achmadya Ridwan Ilyawan - Backend Developer.pdf",
  avatar: "/assets/portfolio/profile.jpg",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/achmadya-dev",
      icon: siGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/achmadya/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:achmadya.dev@gmail.com",
      icon: "mail",
    },
    {
      label: "Phone",
      href: "tel:+6282116030304",
      icon: "phone",
    },
  ] satisfies SocialLink[],
  experience: [
    {
      id: "knitto",
      company: "Knitto Group",
      role: "Backend Developer — Contract",
      period: "Oct 2024 — Present",
      location: "Bandung City, West Java",
      logo: "/assets/portfolio/companies/knitto.png",
      bullets: [
        "Developed and maintained enterprise apps: Color Management Integration (Dosorama & X-Rite), Manufacturing Execution System (MES), and other factory-support applications.",
        "Conducted R&D to improve factory operations through automation and integration.",
        "Built internal backend service packages for cross-application reusability.",
      ],
      tech: ["TypeScript", "Express", "MySQL", "PostgreSQL", "C++", "RabbitMQ"],
    },
    {
      id: "dios",
      company: "PT. Pilar Timur Teknologi (Digital Oasis)",
      role: "Full Stack Developer — Internship",
      period: "Jun 2023 — Sep 2023",
      location: "Bandung City, West Java",
      logo: "/assets/portfolio/companies/dios.png",
      bullets: [
        "Mega Master Engine — H2H credit server with PPOB: APIs, UI, schema design, bank scraping, and refactoring.",
        "Dios Employee — Employee management system: APIs, UI, schema design, and refactoring.",
      ],
      tech: [
        "JavaScript",
        "TypeScript",
        "Java",
        "Electron",
        "React",
        "Tailwind",
        "MySQL",
        "Selenium",
      ],
    },
  ] satisfies WorkExperience[],
  projects: [
    {
      id: "mcp-databases",
      title: "MCP Databases",
      role: "Developer — Volunteer",
      period: "May 2026 — Present",
      description:
        "A project that aims to create a MCP (Model Context Protocol) for databases.",
      image: "/assets/portfolio/projects/mcp-databases.png",
      tags: [
        "TypeScript",
        "Node.js",
        "MySQL",
        "PostgreSQL",
        "MSSQL",
        "SQLite",
        "Excel",
      ],
      github: "https://github.com/achmadya-dev/mcp-mysql-query",
    },
    {
      id: "polban-risk",
      title: "Polban Risk",
      role: "Full Stack Developer — Freelance",
      period: "Jan 2024 — Jun 2024",
      description:
        "Web application to identify, assess, and manage risks at Politeknik Negeri Bandung — full lifecycle from design to deployment.",
      image: "/assets/portfolio/projects/polban-risk.png",
      tags: ["Laravel", "PHP", "MySQL"],
    },
    {
      id: "himakom",
      title: "Himakom Polban",
      role: "Full Stack Developer — Volunteer",
      period: "Jun 2023 — Sep 2023",
      description:
        "Member Management Web and API for streamlined administration and event broadcasting.",
      image: "/assets/portfolio/projects/himakom.png",
      tags: ["Laravel", "Bootstrap", "jQuery", "Firebase Cloud Messaging"],
    },
  ] as PortfolioProject[],
  education: [
    {
      school: "Politeknik Negeri Bandung",
      degree: "Associate Degree in Informatics Engineering",
      period: "2021 — Aug 2024",
      location: "West Bandung Regency, West Java",
      logo: "/assets/portfolio/education/polban.png",
    },
  ] satisfies Education[],
  skillGroups: [
    {
      label: "Languages & runtimes",
      items: ["TypeScript", "JavaScript", "PHP", "Java", "C++", "Python"],
    },
    {
      label: "Backend & APIs",
      items: ["Express", "Elysia", "Laravel", "Node.js", "RabbitMQ", "REST"],
    },
    {
      label: "Frontend & tools",
      items: ["React", "Tailwind CSS", "Electron", "Vite", "Selenium"],
    },
    {
      label: "Data & cloud",
      items: ["MySQL", "PostgreSQL", "Drizzle ORM", "AWS (essentials)"],
    },
  ] satisfies SkillGroup[],
  certifications: [
    "Knitto x DQ Lab — Build GenAI Chatbot",
    "Boot.dev — Python, RAG, and Data Structures",
    "Dicoding — SOLID, JavaScript, Back-End, AWS Cloud",
    "LinkedIn Learning — Advanced Express, React.js Essential",
    "Arutala Lab — Software Testing",
    "Progate — Fundamental Python",
  ],
};
