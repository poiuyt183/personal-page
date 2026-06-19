# Project Guide - Poiuyt Portfolio

## 📋 Overview

**Project Name:** Poiuyt  
**Type:** Personal Portfolio Website  
**URL:** https://khuyentv.tech  
**Description:** A modern, interactive personal portfolio built with Next.js 14 featuring a responsive design with smooth animations, an article blog system, about section with skills/timeline, and contact page.

---

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 14.1.4** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development

### Styling
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Browser compatibility

### Animations & UI
- **Framer Motion 12.4.7** - Smooth animations and transitions
- **Typewriter Effect 2.21.0** - Text animation effect
- **Tabler Icons React 3.2.0** - Icon library

### Data & GraphQL
- **Apollo Client 3.9.11** - GraphQL client
- **GraphQL Request 6.1.0** - GraphQL HTTP client
- **GraphQL CodeGen 5.0.2** - Type generation from GraphQL
- **Grafbase 0.67.2** - GraphQL backend

### Data Fetching
- **Axios 1.6.8** - HTTP client
- **React Query 3.39.3** - Server state management

### Image Processing
- **Sharp 0.33.5** - Image optimization
- **React Code Block 1.0.0** - Code display component

### Development Tools
- **ESLint** - Code linting
- **Prettier 3.2.5** - Code formatter
- **Prettier Plugin Tailwind** - Tailwind class sorting

---

## 📁 Project Structure

```
/src
  /app                          # Next.js App Router
    layout.tsx                  # Root layout with MainLayout
    page.tsx                    # Home/Landing page
    globals.css                 # Global styles
    loading.tsx                 # Root loading UI
    /about
      page.tsx                  # About page
    /articles
      page.tsx                  # Articles listing page
      loading.tsx               # Articles loading UI
      /[slug]
        page.tsx                # Individual article page (dynamic)
    /contact
      page.tsx                  # Contact page
    /styles
      /animation                # CSS animation files
        fadein.css
        fadeout.css
        pan.css
      /common
        html.css                # Common HTML styles

  /components                   # React components
    Button.tsx                  # Reusable button component
    /about
      Intro.tsx                 # About intro section
      IntroCard.tsx             # Card component for intro
      SkillCard.tsx             # Skill display card
      Skills.tsx                # Skills container
      TimelineCard.tsx          # Timeline event card
      TimelineItem.tsx          # Individual timeline item
      TimelineSection.tsx       # Timeline container
    /animation
      Fadein.tsx                # Fade-in animation wrapper
      Fadeout.tsx               # Fade-out animation wrapper
      Pan.tsx                   # Pan/motion animation wrapper
    /articles
      ArticleCard.tsx           # Article preview card
      ListArticles.tsx          # Articles list container
    /home
      AvtImage.tsx              # Avatar image component
      Writer.tsx                # Typewriter effect component
    /icons
      index.ts                  # Icon exports
      About.tsx, Articles.tsx    # Icon components
      Facebook.tsx, Insta.tsx
      LinkedIn.tsx, X.tsx
      Mail.tsx, Home.tsx
    /layout
      MainLayout.tsx            # Main page layout wrapper (client component)
      Navigation.tsx            # Navigation component
      DownButton.tsx            # Scroll-down button
      SideBar.tsx               # Sidebar component

  /query
    graphql.ts                  # GraphQL queries and operations

  /types
    index.ts                    # TypeScript type definitions

  /utils
    index.ts                    # Utility functions
```

### Public Assets
```
/public/static
  /about                        # About page static assets
  /articles                     # Article-related images
  /contact                      # Contact page assets
  /home                         # Home page assets
```

---

## 🎯 Key Features

### 1. **Responsive Design**
- Mobile-first approach using Tailwind CSS
- Optimized for all screen sizes (mobile, tablet, desktop)
- Uses Next.js responsive image optimization with Sharp

### 2. **Smooth Animations**
- Fade-in/fade-out animations
- Pan (motion) effects using Framer Motion
- Typewriter text effect on home page
- CSS-based animations for lightweight performance

### 3. **Multi-Page Structure**
- Home/Landing page with hero section
- About page with skills and timeline
- Articles/Blog system with dynamic routing
- Contact page

### 4. **Dynamic Content**
- Articles system using Next.js dynamic routes `[slug]`
- GraphQL backend for data fetching
- Grafbase integration for real-time data

### 5. **Client & Server Components**
- Mixed approach: MainLayout uses "use client" directive
- Server components for optimal performance
- Layout shift prevention with loading states

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- pnpm (package manager - specified in lock file)

### Installation
```bash
# Install dependencies
pnpm install
```

### Development
```bash
# Start development server (http://localhost:3000)
pnpm dev
```

### Production Build
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Linting
```bash
# Run ESLint
pnpm lint
```

---

## 🔧 Important Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint checks |

---

## 🏗 Architecture & Design Patterns

### Layout System
- **MainLayout Component**: Wraps all pages with navigation, sidebar, and layout styling
- Uses fixed positioning for navigation bar
- Gradient background from custom color palette

### Animation Pattern
- **Wrapper Components** (`Fadein.tsx`, `Fadeout.tsx`, `Pan.tsx`): Reusable animation wrappers using Framer Motion
- CSS-based animations in `/styles/animation/` for lightweight effects

### Color Scheme
- **Primary Color**: Custom accent color (used in gradients)
- **Secondary Color**: Secondary highlight color
- **Background**: Dark theme with gradient overlays (`from-[#18181b] to-[#222225]`)

### Data Flow
1. GraphQL queries in `/query/graphql.ts`
2. Apollo Client for state management
3. React Query for server state
4. Type-safe queries with GraphQL CodeGen

### Routing
- Next.js App Router (located in `/app`)
- Dynamic routes using `[slug]` for articles
- Loading states with `loading.tsx` files

---

## 📦 Key Dependencies & Purpose

| Package | Purpose |
|---------|---------|
| `framer-motion` | Advanced animations and transitions |
| `@apollo/client` | GraphQL client for data fetching |
| `typewriter-effect` | Text animation effect |
| `tailwindcss` | Utility-first styling |
| `@tabler/icons-react` | Icon components |
| `react-query` | Server state management |
| `grafbase` | GraphQL backend |
| `sharp` | Image optimization |

---

## 🎨 Styling Guidelines

### Tailwind Configuration
- Uses custom color palette (primary, secondary)
- Responsive breakpoints: `md`, `lg`, `xl`
- Custom CSS animations in separate files

### CSS Files
- `globals.css` - Global styles and resets
- `animation/*.css` - Animation keyframes
- `common/html.css` - HTML-wide styles

### Class Naming
- BEM-like structure mixed with Tailwind utilities
- Z-index management for layering (e.g., `z-45`, `z-[500]`)

---

## 🔗 Routing Map

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `page.tsx` | Home/landing page |
| `/about` | `about/page.tsx` | About, skills, timeline |
| `/articles` | `articles/page.tsx` | Articles list |
| `/articles/[slug]` | `articles/[slug]/page.tsx` | Individual article |
| `/contact` | `contact/page.tsx` | Contact information |

---

## 📝 Configuration Files

### `next.config.mjs`
- Next.js configuration
- Image optimization settings
- Output optimization

### `tsconfig.json`
- TypeScript strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- React JSX preservation mode

### `tailwind.config.ts`
- Custom theme configuration
- Responsive breakpoints
- Animation settings

### `postcss.config.js`
- Tailwind CSS processor
- Autoprefixer for browser compatibility

---

## 🚀 Deployment

- **Hosting**: Next.js optimized deployment (Vercel recommended)
- **Build Output**: Static and dynamic pages
- **Environment**: Supports both development and production builds

---

## 📚 Development Notes

### Best Practices
1. Use `@/` path alias for imports instead of relative paths
2. Keep animations in dedicated wrapper components
3. Use TypeScript for all new code
4. Follow Tailwind utility-first approach

### Performance Considerations
- Sharp for image optimization
- Framer Motion for GPU-accelerated animations
- CSS animations for lightweight effects
- Code splitting with dynamic imports

### Adding New Features
1. Create page in `/app` directory
2. Create components in `/components` directory
3. Add GraphQL queries in `/query/graphql.ts`
4. Use animation wrappers for UI transitions
5. Style with Tailwind classes + custom CSS if needed

---

## 🔄 GraphQL Integration

- **Backend**: Grafbase (GraphQL backend)
- **Client**: Apollo Client with React hooks
- **Code Generation**: GraphQL CodeGen for type safety
- **Queries**: Stored in `/query/graphql.ts`

---

## ✅ Development Checklist

- [ ] Node.js v18+ installed
- [ ] pnpm installed
- [ ] Dependencies installed: `pnpm install`
- [ ] Environment variables configured (if any)
- [ ] Development server running: `pnpm dev`
- [ ] GraphQL backend accessible

---

## 📞 Contact Information

**Developer**: Poiuyt  
**Website**: https://khuyentv.tech  
**Social Links** (from footer/sidebar):
- Facebook
- Instagram
- LinkedIn
- X (Twitter)
- Email

---

**Last Updated**: 2026-06-19  
**Project Version**: 0.1.0
