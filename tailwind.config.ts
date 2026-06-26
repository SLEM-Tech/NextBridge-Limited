import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Updated to heroui path
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        // Editorial display face — every existing `font-serif` usage
        // across the app upgrades to the brand display font.
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },

      backgroundImage: {
        "vibrant-multi":
          "linear-gradient(90.76deg, #00FFF0 1.79%, #F47AFF 49.28%, #FFF500 93.9%)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        /* ========== NEXTBRIDGE LIMITED Brand Foundation ==========
           All tokens resolve to CSS variables defined in
           styles/globals.css (:root). Editing the palette there
           re-skins every page that uses these semantic classes. */
        brand: {
          navy: "var(--brand-dark)",
          blue: "var(--brand)", // Primary action accent (cyan)
          light: "var(--brand-light)", // Tinted hover/bg
          ink: "var(--brand-ink)", // Dark contrast band
          deep: "var(--deep)", // Darkest full-bleed band
          border: "var(--border)", // Hairline dividers on dark
        },

        background: "var(--background)", // Main site background
        surface: "var(--surface)", // Product cards
        panel: "var(--panel)", // Soft sectioned areas
        deep: "var(--deep)", // Darkest full-bleed band
        "brand-border": "var(--border)", // Hairline dividers on dark
        "ink-soft": "var(--ink-soft)", // Muted body copy
        dark: "var(--ink)", // High-contrast text/footers

        primary: {
          100: "var(--brand)", // Main button / link blue
          200: "var(--brand-ink)", // Dark contrast band
          300: "var(--brand-dark)", // Deep brand blue
          400: "var(--brand-dark)",
          DEFAULT: "var(--brand)",
        },

        // Tech-focused Grays
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        // Standard E-commerce feedback colors
        success: {
          light: "#E6F9F0",
          DEFAULT: "var(--success)",
          dark: "#059669",
        },
        danger: {
          light: "#FEF2F2",
          DEFAULT: "var(--danger)",
          dark: "#DC2626",
        },

        // Accents from the design
        accent: "var(--brand)",
        price: "var(--brand-dark)", // Brand blue for price text
        whatsapp: "#25D366",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    screens: {
      xs: "400px",
      xmd: "800px",
      slg: "999px",
      ...require("tailwindcss/defaultTheme").screens,
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#34d3ce",
              foreground: "#07121a",
            },
            focus: "#21b5b0",
          },
        },
      },
    }),
  ],
};
export default config;
