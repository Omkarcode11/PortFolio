# UI/UX Redesign Plan & Design System

## 1. Design Philosophy
**"Modern Minimalist Technical"**
We aim for a balance between clean, minimalist design and rich, technical details that appeal to engineers and recruiters. 
- **Keywords**: Precision, Depth, Fluidity, Professional.
- **Visual Style**: Glassmorphism (subtle), Deep gradients, Sharp typography, Micro-interactions.

## 2. Typography
We will move from system fonts to a curated pairing:
- **Headings**: `Outfit` (Modern, geometric, bold) or `Cal Sans` (if available, otherwise `Outfit` is great).
- **Body**: `Inter` (Standard for legibility and technical feel) or `Plus Jakarta Sans`.

**Selection**:
- **Primary (Headings)**: `Outfit`
- **Secondary (Body)**: `Plus Jakarta Sans`

## 3. Color System (Refined)
The existing colors are good, but we will adjust for higher contrast and "premium" depth.

### Dark Mode (Primary)
- **Background**: `#0a0a0a` (Deep rich black) instead of Slate
- **Surface**: `#171717` (Subtle gray)
- **Primary Accent**: `#6366f1` (Indigo) -> Keep this, it's strong.
- **Secondary Accent**: `#8b5cf6` (Violet) -> Keep.
- **Text**: `#ededed` (High contrast white-ish)

### Light Mode
- **Background**: `#ffffff`
- **Surface**: `#f8fafc` (Slate 50)
- **Text**: `#0f172a` (Slate 900)

## 4. Spacing & Layout
- **Grid**: 4-column (mobile), 8-column (tablet), 12-column (desktop).
- **Container**: Max-width `1200px` (standard) -> `1400px` (modern wide).

## 5. UI Components & Improvements

### A. Navigation
- Sticky, high-blur glassmorphism.
- Pill-shaped active states for links.
- "Contact Me" as a primary CTA button.

### B. Hero Section
- **Current**: Text centered.
- **Proposed**: Left-aligned text, Right-aligned interactive 3D/Mesh element or huge gradient text.
- **Addition**: "Social Proof" pills (e.g., "Open to work", "Github Stats").

### C. Project Cards
- Move titles *inside* the image overlay or make the card a "bento box" style (very trendy).
- Hover: Card lifts, shadow deepens, image zooms slightly.
- Tech stack: displayed as minimal icons on the card footer.

### D. Buttons
- **Primary**: Gradient background, refined border-radius (`rounded-full` vs `rounded-xl`).
- **Glow Effect**: Subtle shadow glow matching the button color.

### E. Animations
- **Page Load**: Staggered fade-up (Framer Motion).
- **Scroll**: Elements reveal as you scroll.
- **Interactive**: Magnetic buttons (buttons that slightly move towards cursor).

## 6. Implementation Plan
1.  **Configure Fonts**: Add `next/font` with `Outfit` and `Plus Jakarta Sans`.
2.  **Update Variables**: Refine `globals.css` with new color values.
3.  **Refactor Layout**: Update `Navbar` and `Footer` visual style.
4.  **Redesign Hero**: Rewrite `index.tsx` hero section.
5.  **Enhance Cards**: improving the project display.
