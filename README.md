# Justin Pham — Portfolio

A single-page portfolio built with React, Tailwind CSS, and Framer Motion. Features interactive canvas-based particle animations, parallax depth effects, animated SVG project illustrations, and a warm editorial design system.

**[View Live Site](https://justinp42.github.io/portfolio/)**

## Preview

The site is organized into scroll-based sections:

- **Hero** — Animated particle canvas with aurora mesh, character scramble title effect, floating tech tags, parallax headshot monument, and cursor spotlight
- **About** — Bio, education details, and a grouped skills toolkit
- **Projects** — Three featured projects with animated SVG illustrations and count-up metrics
- **Contact** — EmailJS-powered contact form with direct links
- **Footer** — Social links and back-to-top navigation

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | React 18 |
| Styling | Tailwind CSS 3.3 |
| Animation | Framer Motion 10 |
| Contact Form | @emailjs/browser |
| Deployment | GitHub Pages (gh-pages) |
| Build | Create React App |

## Design System

**Typography**
- Bricolage Grotesque — headings
- Source Serif 4 — body text
- JetBrains Mono — code, labels, UI accents

**Color Palette**
| Name | Hex | Usage |
|------|-----|-------|
| Sage | `#A8BBA4` | Primary accent |
| Sage Dark | `#6B7F68` | Hover states |
| Sage Mist | `#E8F0E6` | Subtle backgrounds |
| Espresso | `#2C2318` | Headings, dark text |
| Warm Dark | `#4A3F35` | Body text |
| Clay | `#8C7E72` | Labels, secondary text |
| Warm Linen | `#FAF6F1` | Page background |
| Cream | `#FFF9F2` | Card backgrounds |
| Straw | `#E8DFD4` | Borders |

## Project Structure

```
portfolio/
├── public/
│   └── index.html              # Font imports, meta tags, favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Fixed nav with scroll tracking & mobile menu
│   │   ├── Hero.jsx             # Canvas particles, parallax, scramble text
│   │   ├── About.jsx            # Bio, education, skill groups
│   │   ├── Projects.jsx         # Project cards with SVG illustrations
│   │   ├── Contact.jsx          # EmailJS form with status feedback
│   │   ├── Footer.jsx           # Links, back-to-top, copyright
│   │   └── svg/
│   │       ├── MnemoIllustration.jsx       # Head silhouette with flowing ideas
│   │       ├── GeneticAlgoIllustration.jsx  # Vertex cover graph visualization
│   │       └── Ext2Illustration.jsx         # File system tree diagram
│   ├── data/
│   │   ├── projects.js          # Project content, metrics, and tech stacks
│   │   └── experience.js        # Skill groups organized by domain
│   ├── hooks/
│   │   ├── useCountUp.js        # Viewport-triggered number animation
│   │   └── useMousePosition.js  # Normalized mouse tracking for parallax
│   ├── App.js                   # Root layout (section ordering)
│   ├── index.js                 # React 18 entry point
│   └── index.css                # Tailwind directives, component classes, utilities
├── tailwind.config.js           # Custom colors, fonts, theme extensions
├── postcss.config.js            # Tailwind + Autoprefixer
├── package.json
└── CLAUDE.md
```

## Key Features

**Interactive Hero**
- HTML5 Canvas with 70 physics-simulated particles that respond to mouse proximity and scroll
- Aurora mesh blobs with orbital animation
- 9-layer spring parallax system on headshot, tech tags, and decorative elements
- Character scramble effect on name with per-character stagger
- Cursor-following spotlight with radial gradient

**Animated SVG Illustrations**
- Each project has a custom SVG illustration built as a React component
- Animations triggered on scroll using Framer Motion's `useInView`
- Path drawing, spring physics, staggered reveals, and pulsing effects

**Scroll-Driven Animations**
- Section entrance animations via `useInView` triggers
- Count-up metrics using `requestAnimationFrame` with easeOutCubic easing
- Active section detection in navbar via scroll position tracking

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Production build
npm run build
```

### Contact Form Setup

The contact form uses [EmailJS](https://www.emailjs.com/). To enable it, create a `.env` file:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these variables, the form logs submissions to the console as a fallback.

## Deployment

Deployed to GitHub Pages at [justinp42.github.io/portfolio](https://justinp42.github.io/portfolio/).

```bash
npm run deploy
```

This runs the build and pushes to the `gh-pages` branch automatically.

## License

MIT
