import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: ['light'],
  },
  theme: {
    extend: {
      colors: {
        // primary: '#1b1b1b',
        // background: '#F9FAFC',
        // indigo: '#7743DB', // '#C3ACD0',
      },
      // backgroundImage: {
      // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      // 'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
}
export default config
