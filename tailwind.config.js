/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hex: {
          black: '#0a0a0a',
          darker: '#050505',
          blood: '#8b0000',
          crimson: '#dc143c',
          ash: '#1a1a1a',
          smoke: '#2a2a2a',
          bone: '#e8e6e3',
          muted: '#888888',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
