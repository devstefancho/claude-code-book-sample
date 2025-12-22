import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        todo: {
          light: "#dbeafe",
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
        "in-progress": {
          light: "#fef3c7",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        done: {
          light: "#d1fae5",
          DEFAULT: "#10b981",
          dark: "#047857",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
