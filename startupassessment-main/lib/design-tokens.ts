// Design System Tokens
// This file contains all design system values as TypeScript constants
// for use in components and utilities

export const designTokens = {
  // Colors
  colors: {
    primary: {
      50: "hsl(210, 100%, 95%)",
      100: "hsl(210, 100%, 90%)",
      200: "hsl(210, 100%, 80%)",
      300: "hsl(210, 100%, 70%)",
      400: "hsl(210, 100%, 60%)",
      500: "hsl(210, 100%, 50%)", // Default primary
      600: "hsl(210, 100%, 45%)",
      700: "hsl(210, 100%, 35%)",
      800: "hsl(210, 100%, 25%)",
      900: "hsl(210, 100%, 15%)",
    },
    secondary: {
      50: "hsl(240, 4.8%, 98%)",
      100: "hsl(240, 4.8%, 95.9%)", // Default secondary
      200: "hsl(240, 4.8%, 90%)",
      300: "hsl(240, 4.8%, 80%)",
      400: "hsl(240, 4.8%, 70%)",
      500: "hsl(240, 4.8%, 60%)",
      600: "hsl(240, 5.9%, 50%)",
      700: "hsl(240, 5.9%, 40%)",
      800: "hsl(240, 5.9%, 20%)",
      900: "hsl(240, 5.9%, 10%)",
    },
    semantic: {
      success: {
        light: "hsl(140, 60%, 50%)",
        default: "hsl(140, 60%, 40%)",
        dark: "hsl(140, 60%, 30%)",
      },
      warning: {
        light: "hsl(45, 100%, 60%)",
        default: "hsl(45, 100%, 50%)",
        dark: "hsl(45, 100%, 40%)",
      },
      error: {
        light: "hsl(0, 72.2%, 60%)",
        default: "hsl(0, 72.2%, 50.6%)",
        dark: "hsl(0, 72.2%, 40%)",
      },
      info: {
        light: "hsl(210, 100%, 60%)",
        default: "hsl(210, 100%, 50%)",
        dark: "hsl(210, 100%, 40%)",
      },
    },
    chart: {
      1: "hsl(210, 100%, 50%)",
      2: "hsl(210, 90%, 65%)",
      3: "hsl(240, 5%, 60%)",
      4: "hsl(180, 70%, 40%)",
      5: "hsl(270, 70%, 55%)",
      positive: "hsl(140, 60%, 40%)",
      negative: "hsl(0, 70%, 50%)",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      header: ["Neue Montreal", "system-ui", "sans-serif"],
      body: ["Geist", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },
    fontSize: {
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
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      header: "-0.05em",
      description: "-0.03em",
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "5rem", // 80px
    "5xl": "6rem", // 96px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },

  // Shadows
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  // Animation
  animation: {
    duration: {
      fast: "150ms",
      medium: "300ms",
      slow: "500ms",
    },
    easing: {
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Component Specifications
  components: {
    button: {
      height: {
        sm: "2.25rem", // 36px
        md: "2.5rem", // 40px
        lg: "2.75rem", // 44px
      },
      padding: {
        sm: "0.5rem 0.75rem",
        md: "0.5rem 1rem",
        lg: "0.625rem 1.25rem",
      },
    },
    input: {
      height: "2.5rem", // 40px
      padding: "0.5rem 0.75rem",
    },
    card: {
      padding: "1.5rem", // 24px
      borderRadius: "0.5rem", // 8px
    },
    table: {
      rowHeight: "3rem", // 48px
      cellPadding: "0.75rem 1rem",
    },
  },
} as const

// Type definitions for design tokens
export type DesignTokens = typeof designTokens
export type ColorScale = keyof typeof designTokens.colors.primary
export type SemanticColor = keyof typeof designTokens.colors.semantic
export type FontSize = keyof typeof designTokens.typography.fontSize
export type Spacing = keyof typeof designTokens.spacing
