# Coach Hub — Ideation & Innovation Gateway

[![Build & Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-1A1A1A?style=flat-square&logo=github)](./.github/workflows/deploy.yml)
[![React 19](https://img.shields.io/badge/React-19-FF85B3?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-FFD21F?style=flat-square&logo=typescript&logoColor=1A1A1A)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

A responsive, full-viewport (`100dvh`) slanted 50/50 split-screen gateway connecting **Ideation Coach** and **Innovation Coach**.

## Key Features

- **Slanted 50/50 Split Architecture**: Diagonal CSS `clip-path` divider (`54%` top to `46%` bottom on desktop; slanted horizontal seam on mobile) that dynamically shifts to `55/45` on hover or keyboard focus with a `0.4s` easing curve.
- **Duotone Editorial Palette**:
  - **Left Panel (Ideation Coach)**: Vibrant magenta-pink (`#FF85B3`) with crisp white typography and direct launch link to `https://ideation-coach.vercel.app/`.
  - **Right Panel (Innovation Coach)**: Bold warm amber (`#FFD21F`) with deep charcoal (`#1A1A1A`) typography, warm orange-red (`#D93800`) accents, and direct launch link to `https://innovation-coach.vercel.app/`.
- **Dynamic Central Lightbulb**: Transparent watercolor lightbulb (`image_cd629b00.png`) centered on the slanted seam with a duotone glow halo that glides synchronously with the moving divider line, flanked by non-overlapping outer-aligned text blocks.
- **Minimalist Editorial Chrome**:
  - Top-left `COACH HUB` wordmark reset control and bottom-right interactive `01 / 02` panel indicator.

## Architecture

```mermaid
flowchart TD
    A[App.tsx - 100dvh Viewport] --> B[useSplitHover Hook]
    A --> C[TopBar - COACH HUB]
    A --> I[CentralIllustration - image_cd629b00.png]
    B --> D[splitGeometry.ts - Slanted Polygons]
    B --> E[SplitPanel Left - Ideation Coach]
    B --> F[SplitPanel Right - Innovation Coach]
    B --> G[SlantedDivider SVG]
    B --> H[CornerAccents - 01 / 02]
```

## Local Setup

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript type-check
npm run lint

# Run Vitest unit & integration test suite
npm test

# Build production bundle
npm run build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs type-checking, automated Vitest tests, and builds the static bundle with `VITE_BASE_PATH` configured for GitHub Pages.
