/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      colors: {
        garden: {
          dark:   '#1A3C2B',
          mid:    '#2D5A3D',
          light:  '#4A8C5C',
          text:   '#2C3C33',
          muted:  '#7A8C82',
          faint:  '#AABCB2',
        },
      },
      animation: {
        'spin-slow': 'spin 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}
