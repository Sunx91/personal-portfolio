# Personal Portfolio

A modern, responsive personal portfolio website built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for utility-first styling
- 🌙 **Dark mode** support (respects system preference)
- 📱 **Fully responsive** layout
- ♿ **Accessible** markup and keyboard-navigable
- 🚀 **Sections**: Hero, About, Skills, Projects, Contact, Footer

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx      # Responsive navigation with mobile menu
│   ├── Hero.tsx        # Landing section with CTA buttons
│   ├── About.tsx       # Bio and personal details
│   ├── Skills.tsx      # Skills grouped by category
│   ├── Projects.tsx    # Featured project cards
│   ├── Contact.tsx     # Contact form and social links
│   └── Footer.tsx      # Footer with copyright
├── globals.css         # Global styles
├── layout.tsx          # Root layout with metadata
└── page.tsx            # Home page (assembles all sections)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Customization

1. **Personal Info** — Update your name, bio, and contact details in `app/components/About.tsx`
2. **Hero** — Edit your title and description in `app/components/Hero.tsx`
3. **Skills** — Modify the skills list in `app/components/Skills.tsx`
4. **Projects** — Add your real projects to `app/components/Projects.tsx`
5. **Contact** — Update social links in `app/components/Contact.tsx`
6. **Metadata** — Update the site title and description in `app/layout.tsx`
7. **Resume** — Place your `resume.pdf` in the `public/` directory

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT
