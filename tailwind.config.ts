import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bolt-bg': 'var(--bolt-background)',
        'bolt-text': 'var(--bolt-text)',
        'bolt-primary': 'var(--bolt-primary)',
        'bolt-secondary': 'var(--bolt-secondary)',
        aether: {
          primary: '#6366f1',
          secondary: '#818cf8',
          accent: '#4f46e5',
          background: 'var(--aether-background)',
          text: 'var(--aether-text)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': { backgroundSize: '400% 400%', backgroundPosition: 'center top' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'center center' },
        },
      },
      borderRadius: {
        'aether': '0.5rem',
        'aether-lg': '1rem',
        'aether-full': '9999px',
      },
      spacing: {
        'aether-1': '0.25rem',
        'aether-2': '0.5rem',
        'aether-3': '0.75rem',
        'aether-4': '1rem',
      },
      boxShadow: {
        'aether': '0 2px 8px 2px rgba(99, 102, 241, 0.1)',
        'aether-lg': '0 4px 12px 4px rgba(99, 102, 241, 0.15)',
      },
    }
  },
  plugins: []
} satisfies Config;
