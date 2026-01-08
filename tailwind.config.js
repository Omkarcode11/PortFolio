/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', '-apple-system', 'sans-serif'],
        heading: ['var(--font-outfit)', 'Inter', 'sans-serif'],
      },
      colors: {
        'brand-cyan': '#06b6d4',
        'brand-blue': '#3b82f6',
        'brand-violet': '#8b5cf6',
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
