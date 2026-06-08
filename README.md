# Portfolio Website

Website portofolio pribadi yang dibangun dengan TanStack Start, React 19, dan Tailwind CSS v4.

## Quick Start

```bash
bun install
bun dev
```

Buka http://localhost:3000

## Kustomisasi

**Konten** — edit `src/features/portfolio/portfolio.data.ts`:
- Nama, role, bio, proyek, email, link sosial

**Asset gambar (opsional)** — simpan di `public/` lalu set path di `portfolio.data.ts`:

```ts
avatar: "/images/profile/avatar.jpg",
projects: [{ ..., image: "/images/projects/my-app.png" }],
```

Tanpa gambar, situs tetap berjalan (gradient hero + inisial nama).

Update SEO di `src/utils/seo.ts` (`SITE_URL`, `DEFAULT_SITE_NAME`).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Dev server |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run docker:build` | Build Docker image |
| `bun run check` | Lint check |
| `bun run fix` | Auto-fix lint |

## Struktur

```
src/
  routes/           # Halaman (/)
  features/
    portfolio/      # Data & komponen portofolio
    landing/        # Section & tech stack marquee
  components/ui/    # UI primitives
```

## License

MIT
