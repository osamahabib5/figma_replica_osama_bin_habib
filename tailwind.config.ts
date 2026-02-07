import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Figma-like panel colors (match left panel screenshot)
          'figma-bg': '#0b0c0d',
          'figma-bg-secondary': '#111213',
          'figma-bg-hover': '#161718',
          'figma-bg-selected': '#1a1c1d',
          'figma-border': '#232425',
          'figma-text-primary': '#e6eef6',
          'figma-text-secondary': '#98a0a6',
          'figma-text-disabled': '#6f7578',
          'figma-accent': '#18a0ff',
          'figma-accent-hover': '#0f87e6',
      },
      spacing: {
        'indent-0': '0px',
        'indent-1': '16px',
        'indent-2': '32px',
        'indent-3': '48px',
        'indent-4': '64px',
        'indent-5': '80px',
      },
      fontSize: {
        'figma-xs': ['11px', { lineHeight: '16px' }],
        'figma-sm': ['12px', { lineHeight: '16px' }],
        'figma-base': ['13px', { lineHeight: '20px' }],
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'chevron-rotate': 'rotate 150ms ease-in-out',
      },
      keyframes: {
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(90deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
