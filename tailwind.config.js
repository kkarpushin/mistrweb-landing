/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Tektur', 'Inter Tight', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0A0A0B',
        coal: '#111113',
        steel: '#18181B',
        iron: '#232327',
        orange: {
          DEFAULT: '#FF6B1F',
          deep: '#E5550B',
          soft: '#FF9659',
        },
        hivis: '#FFD23F',
        ok: '#3DDC84',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
