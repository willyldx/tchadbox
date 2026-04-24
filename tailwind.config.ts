import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  }
} satisfies Config
