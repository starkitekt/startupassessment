import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Header font - Neue Montreal
        "neue-montreal": ["var(--font-neue-montreal)", "system-ui", "sans-serif"],
        // Description/body font - Geist
        geist: ["var(--font-geist)", "system-ui", "sans-serif"],
        // Number font - IBM Plex Mono
        "ibm-plex-mono": ["var(--font-ibm-plex-mono)", "monospace"],
        // Default sans fallback
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      letterSpacing: {
        // Custom kerning values
        header: "-0.05em", // -5% kerning for headers
        description: "-0.03em", // -3% kerning for descriptions
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(210, 100%, 95%)",
          100: "hsl(210, 100%, 90%)",
          200: "hsl(210, 100%, 80%)",
          300: "hsl(210, 100%, 70%)",
          400: "hsl(210, 100%, 60%)",
          500: "hsl(210, 100%, 50%)",
          600: "hsl(210, 100%, 45%)",
          700: "hsl(210, 100%, 35%)",
          800: "hsl(210, 100%, 25%)",
          900: "hsl(210, 100%, 15%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(240, 4.8%, 98%)",
          100: "hsl(240, 4.8%, 95.9%)",
          200: "hsl(240, 4.8%, 90%)",
          300: "hsl(240, 4.8%, 80%)",
          400: "hsl(240, 4.8%, 70%)",
          500: "hsl(240, 4.8%, 60%)",
          600: "hsl(240, 5.9%, 50%)",
          700: "hsl(240, 5.9%, 40%)",
          800: "hsl(240, 5.9%, 20%)",
          900: "hsl(240, 5.9%, 10%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors
        "jpmc-brand-blue": "hsl(210, 100%, 45%)",
        "jpmc-brand-darkblue": "hsl(210, 100%, 35%)",
        // Chart colors
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
          positive: "hsl(var(--chart-positive))",
          negative: "hsl(var(--chart-negative))",
        },
        // Semantic colors
        success: {
          50: "hsl(140, 60%, 95%)",
          100: "hsl(140, 60%, 90%)",
          500: "hsl(140, 60%, 50%)",
          600: "hsl(140, 60%, 40%)",
          700: "hsl(140, 60%, 30%)",
        },
        warning: {
          50: "hsl(45, 100%, 95%)",
          100: "hsl(45, 100%, 90%)",
          500: "hsl(45, 100%, 50%)",
          600: "hsl(45, 100%, 40%)",
          700: "hsl(45, 100%, 30%)",
        },
        info: {
          50: "hsl(210, 100%, 95%)",
          100: "hsl(210, 100%, 90%)",
          500: "hsl(210, 100%, 50%)",
          600: "hsl(210, 100%, 40%)",
          700: "hsl(210, 100%, 30%)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // Responsive typography scale
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        // Mobile-specific sizes
        "xs-mobile": ["0.6875rem", { lineHeight: "0.875rem" }],
        "sm-mobile": ["0.8125rem", { lineHeight: "1.125rem" }],
        "base-mobile": ["0.9375rem", { lineHeight: "1.375rem" }],
      },
      spacing: {
        // Design system spacing scale
        "0.5": "0.125rem", // 2px
        "1.5": "0.375rem", // 6px
        "2.5": "0.625rem", // 10px
        "3.5": "0.875rem", // 14px
        "4.5": "1.125rem", // 18px
        "5.5": "1.375rem", // 22px
        "6.5": "1.625rem", // 26px
        "7.5": "1.875rem", // 30px
        "8.5": "2.125rem", // 34px
        "9.5": "2.375rem", // 38px
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
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
        "flyout-fade-in": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "flyout-fade-out": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-10px)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flyout-in": "flyout-fade-in 0.2s ease-out forwards",
        "flyout-out": "flyout-fade-out 0.3s ease-in forwards",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
      },
      boxShadow: {
        // Design system shadows
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
