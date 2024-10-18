import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',  // Enables 'class' based dark mode support
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",   // Uses the CSS variable for background color
        foreground: "var(--foreground)",   // Uses the CSS variable for foreground color
      },
    },
  },
  plugins: [],
};

export default config;
