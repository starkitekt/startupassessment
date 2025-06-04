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
        geist: ["var(--font-geist)", "system-ui", "sans-serif"], // Use CSS variable
        "ibm-plex-mono": ["IBM Plex Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", // Ring color for focus states
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        // JPMC specific colors (can be used for branding accents)
        "jpmc-brand-blue": "hsl(210, 100%, 35%)", // Original JPMC Blue
        "jpmc-brand-darkblue": "hsl(210, 100%, 25%)",
        jpmc: {
          blue: "hsl(var(--primary))", // Maintained for consistency
          darkblue: "hsl(210, 100%, 25%)", // Darker shade
          lightblue: "hsl(210, 100%, 95%)", // Lighter shade for backgrounds
          gray: "#6b7280",
          lightgray: "#f8fafc",
        },
        // Chart-specific color palette
        charting: {
          // For McKinsey-style, professional charts
          blue: {
            deep: "hsl(var(--chart-blue-deep))",
            primary: "hsl(var(--chart-blue-primary))",
            secondary: "hsl(var(--chart-blue-secondary))",
            tertiary: "hsl(var(--chart-blue-tertiary))",
          },
          gray: {
            dark: "hsl(var(--chart-gray-dark))",
            medium: "hsl(var(--chart-gray-medium))",
            light: "hsl(var(--chart-gray-light))",
            extralight: "hsl(var(--chart-gray-extralight))",
          },
          accent: {
            amber: "hsl(var(--chart-accent-amber))",
            teal: "hsl(var(--chart-accent-teal))",
            purple: "hsl(var(--chart-accent-purple))",
          },
          positive: "hsl(var(--chart-positive))",
          negative: "hsl(var(--chart-negative))",
          warning: "hsl(var(--chart-warning))",
        },
        // Ensure JPMC colors also use HSL vars if they are meant to be themeable
        // For example:
        "jpmc-brand-blue": "hsl(var(--chart-blue-primary))",
        "jpmc-brand-darkblue": "hsl(var(--chart-blue-deep))",
        jpmc: {
          blue: "hsl(var(--primary))", // This is already good
          darkblue: "hsl(var(--chart-blue-deep))",
          lightblue: "hsl(var(--chart-gray-extralight))", // Or a light blue var
          gray: "hsl(var(--chart-gray-medium))",
          lightgray: "hsl(var(--chart-gray-extralight))",
        },
      },
      borderRadius: {
        // Apple-like rounded corners
        xl: "calc(var(--radius) + 4px)", // For larger elements like modals
        lg: "var(--radius)", // Default for cards, buttons
        md: "calc(var(--radius) - 4px)", // Slightly less for smaller elements
        sm: "calc(var(--radius) - 8px)", // For very small elements like tags
      },
      fontSize: {
        // Define a clear typographic scale
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }], // 48px
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
