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
-   **Core Web Vitals**: Zero CLS (Cumulative Layout Shift), optimized LCP and INP
-   **SEO Optimized**: Comprehensive meta tags, JSON-LD schema markup, sitemap, and Open Graph
-   **Static Generation**: ISR (Incremental Static Regeneration) for optimal performance
-   **Image Optimization**: Next.js Image component with lazy loading and blur placeholders
-   **Mobile-First**: Optimized for touch interactions and mobile performance

### 📝 Content Management
-   **Easy Content Updates**: Update content via JSON and Markdown files
-   **Admin Dashboard**: Secure admin interface for content management
-   **MongoDB Integration**: Dynamic content storage and retrieval with Mongoose ODM
-   **RESTful API**: Full CRUD operations for projects, articles, and resume
-   **API Documentation**: Interactive Swagger/OpenAPI documentation at `/api-docs`
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

### Method 1: Admin Dashboard (Recommended)

1. **Access the Admin Dashboard**
   - Navigate to `/admin/login`
   - Login with credentials from `.env.local`

2. **Manage Content**
   - Add/Edit/Delete projects
   - Create and publish articles
   - Update resume information
   - All changes are saved to MongoDB

### Method 2: API Endpoints

Use the RESTful API to manage content programmatically:

```bash
# Projects
GET    /api/projects          # Get all projects
POST   /api/projects          # Create project (auth required)
GET    /api/projects/:id      # Get project by ID
PUT    /api/projects/:id      # Update project (auth required)
DELETE /api/projects/:id      # Delete project (auth required)

# Articles
GET    /api/articles          # Get all articles
POST   /api/articles          # Create article (auth required)
GET    /api/articles/:id      # Get article by ID
PUT    /api/articles/:id      # Update article (auth required)
DELETE /api/articles/:id      # Delete article (auth required)

# Resume
GET    /api/resume            # Get resume data
PUT    /api/resume            # Update resume (auth required)
```

**API Documentation**: Visit `/api-docs` for interactive Swagger documentation (requires authentication).

**Postman Collection**: Import `Portfolio_API.postman_collection.json` for easy testing.

### Method 3: JSON/Markdown Files

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
- Smooth animations with Framer Motion
- Interactive hover states and micro-interactions
- Loading states and skeleton screens
- Mobile-first responsive design

### Dark Mode
- System preference detection
- Manual toggle with smooth transitions
- Persistent theme preference
- Optimized colors for both modes
- No flash of unstyled content (FOUC)

### Performance & Optimization
- **Core Web Vitals Compliant**:
  - CLS: 0 (Perfect score)
  - LCP: < 2.5s
  - INP: < 200ms
- Static generation with ISR (Incremental Static Regeneration)
- Next.js Image optimization with blur placeholders
- Code splitting and lazy loading
- Optimized bundle size
- Server-side rendering (SSR) where needed

### SEO & Discoverability
- Comprehensive meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data (Schema.org)
- Dynamic sitemap.xml generation
- Robots.txt configuration
- Semantic HTML5 markup
- Optimized for AI search engines (ChatGPT, Perplexity, Google AI)

### Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader optimized
- `prefers-reduced-motion` support
- 44x44px minimum touch targets
- Skip to main content link

## 📚 Documentation

Additional documentation files included in this repository:

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with examples
- **[SWAGGER_SETUP.md](./SWAGGER_SETUP.md)** - Guide for API documentation setup
- **[CLS_FIX_ANALYSIS.md](./CLS_FIX_ANALYSIS.md)** - Technical analysis of CLS optimization
- **[MOBILE_UX_REVIEW.md](./MOBILE_UX_REVIEW.md)** - Mobile optimization guidelines
- **[Portfolio_API.postman_collection.json](./Portfolio_API.postman_collection.json)** - Postman collection for API testing

## 🐛 Troubleshooting

### Build Errors

**Issue**: `createdAt.toISOString is not a function`
```bash
# Solution: Clear Next.js cache and rebuild
Remove-Item -Recurse -Force .next
npm run build
```

**Issue**: MongoDB connection errors
```bash
# Verify your MONGODB_URI in .env.local
# Ensure MongoDB is running (local) or accessible (Atlas)
```

### Development Issues

**Issue**: Changes not reflecting
```bash
# Clear cache and restart dev server
Remove-Item -Recurse -Force .next
npm run dev
```

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
