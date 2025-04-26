import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tertiary: "var(--tertiary)",
        "blue-uala": "var(--blue-uala)",
        "blue-uala-ligther": "var(--blue-uala-ligther)",
        "blue-uala-dark": "var(--blue-uala-dark)",
      },
    },
  },
  plugins: [animate],
};

export default config;
