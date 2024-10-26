import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: 'var(transparent)',
        primary: "var(--primary)",
        'primary-light': 'var(--primary-light)',
        secondary: 'var(--secondary)',
        'light-blue': 'var(--light-blue)',
        gray: 'var(--gray)',
        white: 'var(--white)',
        black: 'var(--black)',
        'border-color': "var(--border-color)"
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        banner : '70px',
      },
      backgroundImage: {
        'hero-pattern': "url('../public/banner.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
export default config;
