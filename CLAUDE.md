# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Eaden Ai Creator** — AI media showcase and high-end art gallery website. Non-payment portfolio site designed to drive client inquiries. Brand tagline: "감각을 설계하는 AI 미디어, 몰입에서 이완으로"

## Architecture

This repo has two parallel backend implementations and one static frontend:

```
/homepage/        — Static HTML/CSS/JS frontend (served as Vercel output directory)
/api/             — Vercel Serverless Functions (production backend, Supabase-backed)
/backend/         — Local Express.js server (local dev only, file-based JSON storage)
/supabase/        — Supabase migration SQL files
```

### The Two-Backend Split (Critical)

**Production (Vercel):** `/api/*.js` handlers are Vercel Functions. They use Supabase (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_ANON_KEY`) for persistence.

**Local dev:** `/backend/server.js` is a standalone Express app on port 4000. It reads/writes `backend/data/submissions.json` for contacts and `backend/data/content.json` for portfolio content. It does NOT use Supabase.

When modifying contact form logic or portfolio data, changes typically need to happen in **both** `/api/` and `/backend/routes/` to stay in sync.

### API Routes

| Endpoint | Handler | Purpose |
|---|---|---|
| `POST /api/contact` | `api/contact.js` | Submit contact inquiry → Supabase `contacts` table |
| `GET /api/content` | `api/content.js` | Returns site info + all portfolio items from Supabase |
| `GET /api/portfolio/media[?id=]` | `api/portfolio/media.js` | AI Media portfolio from `portfolio_media` table |
| `GET /api/portfolio/images[?id=]` | `api/portfolio/images.js` | AI Image portfolio from `portfolio_images` table |
| `GET /api/admin` | `api/admin.js` | All contact submissions (Bearer token auth via `ADMIN_PASSWORD`) |
| `DELETE /api/delete-contact` | `api/delete-contact.js` | Delete contacts by id array (Bearer token auth) |

### Frontend

`/homepage/index.html` is a single-file SPA — all sections (Home, About, Services, Contact) live in one HTML file with inline CSS and JS. No build step. The design system uses CSS custom properties defined in `:root`.

**Design tokens (do not change without design intent):**
- `--surface: #001427` (Deep Navy background)
- `--primary: #e8caa1` (Cream/Gold accent)
- `--transition-healing: 2.5s cubic-bezier(0.4, 0, 0.2, 1)` (main fade transitions)
- Fonts: NanumSquare (Korean body), Manrope (English), Noto Serif (accents)

`/homepage/admin.html` — admin dashboard for viewing contact submissions (uses `ADMIN_PASSWORD` Bearer auth against `/api/admin`).

## Development Commands

**Local backend:**
```bash
cd backend
npm install
npm run dev        # nodemon on port 4000
# or
npm start          # node server.js
```

**Frontend:** Open `homepage/index.html` directly via browser or VS Code Live Server (port 5500). The backend CORS allowlist includes `localhost:5500` and `127.0.0.1:5500`.

**Deploy to Vercel:** Push to main — Vercel builds from root, serves `homepage/` as static output, and deploys `/api/` as serverless functions.

## Environment Variables

For local backend (`backend/.env`):
```
FRONTEND_ORIGIN=http://localhost:5500
SMTP_HOST=smtp.gmail.com
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=
```

For Vercel (production):
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
ADMIN_PASSWORD=
```

## Supabase Schema

Tables (see `supabase/migrations/20260418000001_init.sql`):
- `contacts` — inquiry submissions (`inquiry_type`, `name`, `contact`, `message`, `created_at`)
- `portfolio_media` — AI Media items with `sort_order`
- `portfolio_images` — AI Image items with `sort_order`

## Contact Form Validation

Allowed `inquiry_type` values (enforced in both backends):
- `영상 제작 문의`, `아트 프린트 구매`, `사진 복원 의뢰`, `기타 파트너십`

Rules: name ≥ 2 chars, message ≥ 10 chars, all fields required.

## CORS Rules

The Express backend explicitly allows: `localhost:3000`, `localhost:5500`, `127.0.0.1:5500`, and `null` (file:// protocol). The Vercel API handlers use `Access-Control-Allow-Origin: *`. Do not restrict the Vercel handlers — the frontend is static and has no fixed origin in prod.
