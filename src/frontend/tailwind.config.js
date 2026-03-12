import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // ONEartHeaven custom palette
        cosmos: {
          deep: "oklch(var(--cosmos-deep))",
          mid: "oklch(var(--cosmos-mid))",
          surface: "oklch(var(--cosmos-surface))",
        },
        gold: {
          DEFAULT: "oklch(var(--gold))",
          bright: "oklch(var(--gold-bright))",
          dim: "oklch(var(--gold-dim))",
        },
        teal: {
          DEFAULT: "oklch(var(--teal))",
          bright: "oklch(var(--teal-bright))",
        },
        pearl: "oklch(var(--pearl))",
      },
      fontFamily: {
        // Display font — Bricolage Grotesque: expressive grotesque for heroes + headings
        display: ['"Bricolage Grotesque"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        // Body font — Plus Jakarta Sans: polished geometric sans for UI text
        body: ['"Plus Jakarta Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        // Mono — for code/data displays
        mono: ['"JetBrains Mono"', 'monospace'],
        // Convenience aliases used in utility classes
        sans: ['"Plus Jakarta Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Hero scale
        'hero-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'hero-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        'hero-md': ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        // Section scale
        'section-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-md': ['clamp(1.25rem, 2.5vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        // Card scale
        'card-title': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        gold: "0 0 24px oklch(0.72 0.16 75 / 0.35)",
        cosmos: "0 20px 60px oklch(0.05 0.03 260 / 0.5)",
        "inner-gold": "inset 0 0 20px oklch(0.72 0.16 75 / 0.08)",
      },
      backgroundImage: {
        // Registered as Tailwind utilities for use via bg-gold-gradient, etc.
        "gold-gradient": "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.82 0.18 85))",
        "cosmos-gradient": "linear-gradient(160deg, oklch(0.08 0.03 260) 0%, oklch(0.12 0.05 240) 50%, oklch(0.1 0.04 260) 100%)",
        "teal-gradient": "linear-gradient(135deg, oklch(0.55 0.12 195), oklch(0.65 0.16 190))",
        "gold-teal-gradient": "linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.72 0.16 75) 40%, oklch(0.65 0.16 190) 100%)",
        // Hero variants registered for component use
        "hero-navy": "linear-gradient(160deg, oklch(0.08 0.03 260) 0%, oklch(0.12 0.05 240) 50%, oklch(0.10 0.04 260) 100%)",
        "hero-teal": "linear-gradient(160deg, oklch(0.08 0.03 260) 0%, oklch(0.12 0.06 200) 50%, oklch(0.10 0.04 225) 100%)",
        "hero-green": "linear-gradient(160deg, oklch(0.07 0.04 250) 0%, oklch(0.10 0.05 190) 50%, oklch(0.08 0.04 200) 100%)",
        "hero-indigo": "linear-gradient(160deg, oklch(0.08 0.04 270) 0%, oklch(0.12 0.07 265) 50%, oklch(0.10 0.05 260) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 12px oklch(0.72 0.16 75 / 0.2)" },
          "50%": { boxShadow: "0 0 32px oklch(0.72 0.16 75 / 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "count-up": "count-up 0.6s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
