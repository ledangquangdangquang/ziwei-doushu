import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trỏ sang token trong tokens.css (design.md) — không giữ mã hex riêng
        bg: {
          0: "var(--color-paper)",
          1: "var(--color-paper-2)",
          2: "var(--color-paper-3)",
          inv: "var(--color-ink)",
        },
        tx: {
          0: "var(--color-ink)",
          1: "var(--color-ink)",
          2: "var(--color-ink-2)",
          3: "var(--color-muted)",
          inv: "var(--color-paper)",
        },
        ac: {
          DEFAULT: "var(--color-accent)",
          dim: "var(--color-accent)",
        },
        lu:   "var(--color-loc)",
        quan: "var(--color-quyen)",
        ke:   "var(--color-khoa)",
        ji:   "var(--color-ky)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        xs: "var(--sh-xs)",
        sm: "var(--sh-sm)",
        md: "var(--sh-md)",
        lg: "var(--sh-lg)",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        pill: "999px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
