# Developer Portfolio

A premium, high-performance portfolio website built with Next.js, Framer Motion, and a custom design system.

## Features

-   **Premium Design**: Custom Modern UI with Glassmorphism and animations.
-   **Dark/Light Mode**: Automatic theme switching based on system preference or user toggle.
-   **Easy Content Management**: Update content via JSON and Markdown files without touching code.
-   **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.
-   **SEO Friendly**: Built with Next.js best practices.

## How to Manage Content

### 1. Adding a New Project
Open `src/content/projects.json` and add a new entry:
```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "description": "Description of the project...",
  "tags": ["React", "Node.js"],
  "link": "https://...",
  "github": "https://...",
  "image": "https://..."
}
```
The project will automatically appear on the Home and Projects pages.

### 2. Adding a New Article
Create a new `.md` file in `src/content/articles/` (e.g., `my-new-post.md`):
```markdown
---
title: "My New Post"
date: "2024-05-20"
description: "Short summary..."
tags: ["Tech", "Life"]
---

# Hello World

Write your article content here...
```
It will automatically be listed on the Articles page.

### 4. Admin Access
You can access the admin dashboard to manage content without editing JSON files:
- **Shortcut**: Press `Ctrl + Alt + A` on any page to show the login modal.
- **Direct Link**: Go to `/admin/login`.
- **Default Credentials**: Check `.env.local` (Default: `admin` / `admin`).

Once logged in, you can directly add projects, write articles, and update your resume summary/skills from the UI.

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
