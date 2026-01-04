# 🎨 Modern Portfolio Website

A premium, high-performance portfolio website built with **Next.js 16**, **TypeScript**, and **Framer Motion**. Features a modern design system with glassmorphism effects, smooth animations, dark mode, and full responsiveness.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### 🎨 Design & UI/UX
-   **Premium Design**: Modern UI with glassmorphism effects, gradients, and smooth animations
-   **Rich Visual Hierarchy**: Carefully crafted typography, spacing, and color system
-   **Dark/Light Mode**: Seamless theme switching with system preference detection
-   **Fully Responsive**: Optimized for Desktop, Tablet, and Mobile devices
-   **Micro-interactions**: Smooth hover effects, transitions, and animations throughout
-   **Loading States**: Beautiful loading animations and skeleton screens

### 🚀 Performance & SEO
-   **High Performance**: Built with Next.js 16 (Turbopack) for blazing-fast builds
-   **SEO Optimized**: Meta tags, sitemap, semantic HTML, and Open Graph support
-   **Static Generation**: ISR (Incremental Static Regeneration) for optimal performance
-   **Image Optimization**: Next.js Image component for optimized assets

### 📝 Content Management
-   **Easy Content Updates**: Update content via JSON and Markdown files
-   **Admin Dashboard**: Secure admin interface for content management
-   **MongoDB Integration**: Dynamic content storage and retrieval
-   **Markdown Support**: Write articles in Markdown with syntax highlighting

### 🎭 Animations
-   **Framer Motion**: Production-ready animations with spring physics
-   **Scroll Animations**: Viewport-triggered animations for better UX
-   **Page Transitions**: Smooth transitions between pages
-   **Staggered Animations**: Coordinated multi-element animations

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12.2](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js 4.24](https://next-auth.js.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown)

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── pages/            # Next.js pages and API routes
│   │   ├── index.tsx     # Home page
│   │   ├── about.tsx     # About page
│   │   ├── projects.tsx  # Projects page
│   │   ├── articles/     # Articles/blog pages
│   │   └── api/          # API routes
│   ├── content/          # Content files (JSON & Markdown)
│   │   ├── projects.json
│   │   ├── resume.json
│   │   └── articles/
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── lib/              # Utility functions
│   ├── models/           # MongoDB schemas
│   └── hooks/            # Custom React hooks
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Content Management

### Method 1: JSON/Markdown Files

#### Adding a New Project
Open `src/content/projects.json` and add a new entry:
```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "description": "Description of the project...",
  "tags": ["React", "Node.js", "TypeScript"],
  "link": "https://example.com",
  "github": "https://github.com/username/repo",
  "image": "/images/projects/project-image.jpg"
}
```

#### Adding a New Article
Create a new `.md` file in `src/content/articles/`:
```markdown
---
title: "My New Post"
date: "2024-05-20"
description: "Short summary of the article..."
tags: ["Tech", "Development"]
---

# Hello World

Write your article content here using Markdown syntax...
```

### Method 2: Admin Dashboard

1. **Access the Admin Dashboard**
   - **Keyboard Shortcut**: Press `Ctrl + Alt + A` on any page
   - **Direct URL**: Navigate to `/admin/login`

2. **Login**
   - Use credentials from `.env.local`
   - Default: `admin` / `admin` (change in production!)

3. **Manage Content**
   - Add/Edit projects
   - Write articles
   - Update resume information
   - Manage skills and experience

## 🎨 Design System

The portfolio uses a custom design system with:

- **Color Palette**: Primary (Indigo), Secondary (Sky Blue), Accent (Purple)
- **Typography**: Custom font scales with optimal line heights
- **Spacing**: Consistent spacing system (4px base unit)
- **Shadows**: 5-level shadow system for depth
- **Animations**: Smooth transitions (300ms standard)
- **Responsive Breakpoints**: Mobile (640px), Tablet (768px), Desktop (1024px+)

See `DESIGN_SYSTEM.md` and `UI_UX_IMPROVEMENTS.md` for detailed documentation.

## 📄 Pages Overview

- **Home (`/`)**: Hero section, featured projects, tech stack, latest articles
- **About (`/about`)**: Professional summary, experience timeline, education, certifications
- **Projects (`/projects`)**: Grid layout showcasing all projects with filtering
- **Articles (`/articles`)**: Blog listing with markdown support
- **Admin (`/admin/dashboard`)**: Secure content management interface

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB database (local or MongoDB Atlas)
2. Update `MONGODB_URI` in `.env.local`
3. The app will automatically create collections on first run

### Authentication

- Uses NextAuth.js for session management
- Admin authentication via credentials
- Change default credentials in production!

### SEO Configuration

- Update metadata in `src/pages/_document.tsx`
- Configure sitemap in `src/pages/sitemap.xml.tsx`
- Add robots.txt in `public/robots.txt`

## 🌟 Key Features in Detail

### Premium UI/UX
- Glassmorphism effects with backdrop blur
- Gradient backgrounds and text effects
- Smooth animations and transitions
- Interactive hover states
- Loading states and skeletons

### Dark Mode
- System preference detection
- Manual toggle with smooth transitions
- Persistent theme preference
- Optimized colors for both modes

### Performance
- Static generation with ISR
- Image optimization
- Code splitting
- Lazy loading
- Optimized animations

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- WCAG AA compliant colors

## 📸 Screenshots

_Add screenshots of your portfolio here_

## 🤝 Contributing

This is a personal portfolio project. However, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and all rights are reserved.

## 👤 Author

**Omkar Sonawane**

- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- All the amazing open-source libraries that made this possible

---

⭐ If you found this project helpful, please consider giving it a star!
