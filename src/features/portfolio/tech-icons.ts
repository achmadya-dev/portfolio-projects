/** Maps display labels in profile data → local SVG filename (without extension). */
export const techIconSlugs: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  PHP: "php",
  Java: "java",
  "C++": "cplusplus",
  Python: "python",
  Express: "express",
  Elysia: "elysia",
  Laravel: "laravel",
  "Node.js": "nodedotjs",
  RabbitMQ: "rabbitmq",
  REST: "rest",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  Tailwind: "tailwindcss",
  Electron: "electron",
  Vite: "vite",
  Selenium: "selenium",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  "Drizzle ORM": "drizzle",
  "AWS (essentials)": "amazonaws",
  Bootstrap: "bootstrap",
  jQuery: "jquery",
  "Firebase Cloud Messaging": "firebase",
  MSSQL: "microsoft",
  SQLite: "sqlite",
  Excel: "excel",
};

export function getTechIconSrc(label: string): string | null {
  const slug = techIconSlugs[label];
  return slug ? `/assets/portfolio/tech/${slug}.svg` : null;
}
