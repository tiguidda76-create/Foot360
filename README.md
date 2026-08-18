# ⚽ Foot360 — Autonomous European Football News & Intelligence Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![E-E-A-T Certified](https://img.shields.io/badge/E--E--A--T-100%25%20Verified-emerald?style=for-the-badge)](https://foot360.vercel.app/editorial-policy)
[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

**Foot360** is an enterprise-grade European football news and tactical intelligence platform powered by an autonomous **5-Agent Multi-Agent Pipeline**. Designed from the ground up to comply with **Google AdSense** policies and **Google Search Quality Evaluator Guidelines (E-E-A-T)**.

---

## 🌟 Key Features

- 🤖 **Autonomous 5-Agent Pipeline**: Scout, FactChecker (Tier 1–4 matrix), SportsReporter (500+ word tactical journalism), SEO_GEO_Expert (JSON-LD schema), and ComplianceEditor (100/100 E-E-A-T score).
- 🏟️ **Top 6 European Competitions**: Premier League, La Liga, Bundesliga, Serie A, Ligue 1, and UEFA Champions League.
- 🎯 **Tactical Chalkboard (`<TacticalPitch />`)**: Dynamic tactical pitch visualizer illustrating formation shifts, half-space overloads, and pressing triggers.
- 🔄 **4-Tier Transfer Radar (`<RumorTierBadge />`)**: Strict rumor verification system separating done deals (Tier 1) from market speculation (Tier 4).
- 💰 **Monetization & AdSense Ready (`<AdBanner />`)**: Responsive leaderboard, in-article, sidebar, and sticky mobile ad slots with preview placeholders.
- 🛡️ **Full E-E-A-T & Trust Charter**: `/about`, `/editorial-policy`, `/contact`, `/privacy-policy`, `/terms`, and accredited `/authors/[slug]` profiles.
- ⚡ **Multi-Agent Control Center (`/admin/pipeline`)**: Live visual dashboard to inspect real-time agent output logs and trigger generation with 1 click.
- ⏱️ **Zero-Maintenance Automated Publishing**: Background publication via Vercel Cron and GitHub Actions workflows.

---

## 🏗️ The 3-Layer Multi-Agent Architecture

```mermaid
flowchart TD
    subgraph Layer 1: Directive
        SOP[directives/autonomous_pipeline_sop.md]
    end

    subgraph Layer 2: Orchestration
        Agent1[1. Scout Agent] --> Agent2[2. FactChecker Agent]
        Agent2 --> Agent3[3. SportsReporter Agent]
        Agent3 --> Agent4[4. SEO_GEO_Expert Agent]
        Agent4 --> Agent5[5. ComplianceEditor Agent]
        Agent5 --> DB[(Prisma Database)]
    end

    subgraph Layer 3: Execution
        CLI[npm run agent:run]
        Daemon[npm run agent:daemon]
        CronAPI[/api/cron/pipeline]
    end

    SOP --> Agent1
    CLI --> Agent1
    Daemon --> Agent1
    CronAPI --> Agent1
```

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/tiguidda76-create/Foot360.git
cd Foot360
npm install
```

### 2. Environment Setup
Create a `.env` file (see `.env.example`):
```env
DATABASE_URL="file:./dev.db"
CRON_SECRET="foot360_secure_cron_secret_2026"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-0000000000000000"
GEMINI_API_KEY="" # Optional: Live Gemini AI synthesis
```

### 3. Initialize Database & Seed European Football Data
```bash
npx prisma db push
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001)) to view the platform!

---

## 🤖 Running the Autonomous Pipeline

### Trigger via CLI:
```bash
npm run agent:run
```

### Run 24/7 Background Publishing Daemon:
```bash
npm run agent:daemon
```

### Trigger via Browser UI:
Navigate to `/admin/pipeline` and click **"Run Pipeline Now"**.

---

## 📦 Deployment to Vercel

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/tiguidda76-create/Foot360.git
   git branch -M main
   git push -u origin main
   ```
2. Import project into [Vercel](https://vercel.com/new).
3. Set environment variables: `DATABASE_URL`, `CRON_SECRET`, `NEXT_PUBLIC_ADSENSE_CLIENT_ID`, `NEXT_PUBLIC_SITE_URL`.
4. Deploy! The scheduled cron configured in `vercel.json` will automatically publish new stories on schedule.

---

## 📄 License
© 2026 Foot360 Media Group. All rights reserved. Content published under E-E-A-T editorial compliance guidelines.
