import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        manga: {
          ink: '#0F0F0F',
          paper: '#F8F8F8',
          white: '#FFFFFF',
          red: '#E63946',
          'red-dark': '#C1121F',
          'red-light': '#FF6B6B',
          gray: '#6B7280',
          'gray-light': '#E5E7EB',
        },
      },
      fontFamily: {
        heading: ['Exo 2', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        manga: '4px 4px 0px #0F0F0F',
        'manga-hover': '6px 6px 0px #0F0F0F',
        'manga-sm': '2px 2px 0px #0F0F0F',
        'manga-red': '4px 4px 0px #E63946',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'halftone-pulse': 'halftonePulse 3s ease-in-out infinite',
      },
      keyframes: {
        halftonePulse: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.06' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
