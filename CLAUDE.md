# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Moon River - a modern Next.js 15 coffee shop website built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint checks
```

### Component Management
The project uses shadcn/ui with New York style. Components can be added via:
```bash
npx shadcn add [component-name]
```

MagicUI registry is configured for additional components:
```bash
npx shadcn@latest add "magicui.design/r/[component-name]"
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style) + MagicUI
- **Theming**: next-themes with system/light/dark modes
- **Fonts**: Geist Sans/Mono (system), TanNimbus (custom heading)

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - React components
  - `/ui/` - shadcn/ui primitives and reusable components
  - Site-specific components (site-header, theme-provider, etc.)
- `/src/lib/` - Utilities and helper functions
- `/public/` - Static assets including fonts and media

### Key Architectural Decisions
1. **Client Components**: The site header uses client-side rendering for scroll-based visibility and theme toggle functionality
2. **Theme System**: Dark/light mode support via next-themes with class-based switching
3. **Component Library**: shadcn/ui components are customizable primitives stored in the codebase
4. **Path Aliases**: `@/` maps to `./src/` for clean imports

### Important Files
- `components.json` - shadcn/ui configuration
- `src/components/site-header.tsx` - Main navigation with scroll behavior
- `src/app/layout.tsx` - Root layout with theme provider
- `src/lib/utils.ts` - Utility functions including `cn()` for className merging
- Prioritize using shadcn components. You have access to the shadcn MCP server which will allow you to browse/search, install items, and work with namespaces.