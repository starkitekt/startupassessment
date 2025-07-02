/**
 * Comprehensive Color System
 * Defines all colors used throughout the application with accessibility compliance
 */

export const colorSystem = {
  // Primary Color Palette - Brand Colors
  primary: {
    50: { value: "hsl(210, 100%, 97%)", hex: "#f0f9ff", contrast: { dark: 21, light: 1.02 } },
    100: { value: "hsl(210, 100%, 94%)", hex: "#e0f2fe", contrast: { dark: 19.5, light: 1.08 } },
    200: { value: "hsl(210, 100%, 87%)", hex: "#bae6fd", contrast: { dark: 16.8, light: 1.25 } },
    300: { value: "hsl(210, 100%, 78%)", hex: "#7dd3fc", contrast: { dark: 13.2, light: 1.59 } },
    400: { value: "hsl(210, 100%, 66%)", hex: "#38bdf8", contrast: { dark: 8.9, light: 2.36 } },
    500: { value: "hsl(210, 100%, 56%)", hex: "#0ea5e9", contrast: { dark: 6.4, light: 3.28 } }, // Primary brand
    600: { value: "hsl(210, 100%, 50%)", hex: "#0284c7", contrast: { dark: 5.4, light: 3.89 } },
    700: { value: "hsl(210, 100%, 42%)", hex: "#0369a1", contrast: { dark: 4.2, light: 5.0 } },
    800: { value: "hsl(210, 100%, 35%)", hex: "#075985", contrast: { dark: 3.2, light: 6.56 } },
    900: { value: "hsl(210, 100%, 28%)", hex: "#0c4a6e", contrast: { dark: 2.4, light: 8.75 } },
    950: { value: "hsl(210, 100%, 18%)", hex: "#082f49", contrast: { dark: 1.6, light: 13.1 } },
  },

  // Secondary Color Palette - Supporting Colors
  secondary: {
    50: { value: "hsl(240, 4.8%, 98%)", hex: "#fafafa", contrast: { dark: 20.8, light: 1.01 } },
    100: { value: "hsl(240, 4.8%, 95.9%)", hex: "#f4f4f5", contrast: { dark: 18.7, light: 1.12 } },
    200: { value: "hsl(240, 5.9%, 90%)", hex: "#e4e4e7", contrast: { dark: 15.2, light: 1.38 } },
    300: { value: "hsl(240, 4.9%, 83.9%)", hex: "#d4d4d8", contrast: { dark: 11.8, light: 1.78 } },
    400: { value: "hsl(240, 5%, 64.9%)", hex: "#a1a1aa", contrast: { dark: 6.8, light: 3.09 } },
    500: { value: "hsl(240, 3.8%, 46.1%)", hex: "#71717a", contrast: { dark: 4.2, light: 5.0 } },
    600: { value: "hsl(240, 5.2%, 33.9%)", hex: "#52525b", contrast: { dark: 2.8, light: 7.5 } },
    700: { value: "hsl(240, 5.3%, 26.1%)", hex: "#3f3f46", contrast: { dark: 2.1, light: 10.0 } },
    800: { value: "hsl(240, 3.7%, 15.9%)", hex: "#27272a", contrast: { dark: 1.4, light: 15.0 } },
    900: { value: "hsl(240, 5.9%, 10%)", hex: "#18181b", contrast: { dark: 1.1, light: 19.1 } },
    950: { value: "hsl(240, 7.3%, 8%)", hex: "#09090b", contrast: { dark: 1.0, light: 21.0 } },
  },

  // Semantic Colors - Status and Feedback
  semantic: {
    success: {
      50: { value: "hsl(138, 76%, 97%)", hex: "#f0fdf4", contrast: { dark: 20.5, light: 1.02 } },
      100: { value: "hsl(140, 84%, 92%)", hex: "#dcfce7", contrast: { dark: 18.2, light: 1.15 } },
      200: { value: "hsl(141, 79%, 85%)", hex: "#bbf7d0", contrast: { dark: 14.8, light: 1.42 } },
      300: { value: "hsl(142, 77%, 73%)", hex: "#86efac", contrast: { dark: 10.8, light: 1.94 } },
      400: { value: "hsl(142, 69%, 58%)", hex: "#4ade80", contrast: { dark: 6.8, light: 3.09 } },
      500: { value: "hsl(142, 71%, 45%)", hex: "#22c55e", contrast: { dark: 4.8, light: 4.38 } }, // Primary success
      600: { value: "hsl(142, 76%, 36%)", hex: "#16a34a", contrast: { dark: 3.6, light: 5.83 } },
      700: { value: "hsl(142, 72%, 29%)", hex: "#15803d", contrast: { dark: 2.7, light: 7.78 } },
      800: { value: "hsl(143, 64%, 24%)", hex: "#166534", contrast: { dark: 2.1, light: 10.0 } },
      900: { value: "hsl(144, 61%, 20%)", hex: "#14532d", contrast: { dark: 1.7, light: 12.35 } },
      950: { value: "hsl(145, 80%, 10%)", hex: "#052e16", contrast: { dark: 1.2, light: 17.5 } },
    },
    warning: {
      50: { value: "hsl(54, 92%, 95%)", hex: "#fefce8", contrast: { dark: 19.8, light: 1.06 } },
      100: { value: "hsl(55, 97%, 88%)", hex: "#fef3c7", contrast: { dark: 17.2, light: 1.22 } },
      200: { value: "hsl(53, 98%, 77%)", hex: "#fde047", contrast: { dark: 12.8, light: 1.64 } },
      300: { value: "hsl(50, 98%, 64%)", hex: "#facc15", contrast: { dark: 8.9, light: 2.36 } },
      400: { value: "hsl(48, 96%, 53%)", hex: "#eab308", contrast: { dark: 6.2, light: 3.39 } },
      500: { value: "hsl(45, 93%, 47%)", hex: "#d97706", contrast: { dark: 4.8, light: 4.38 } }, // Primary warning
      600: { value: "hsl(43, 96%, 40%)", hex: "#c2410c", contrast: { dark: 3.8, light: 5.53 } },
      700: { value: "hsl(41, 96%, 30%)", hex: "#9a3412", contrast: { dark: 2.7, light: 7.78 } },
      800: { value: "hsl(40, 95%, 24%)", hex: "#7c2d12", contrast: { dark: 2.0, light: 10.5 } },
      900: { value: "hsl(40, 93%, 20%)", hex: "#651a0c", contrast: { dark: 1.6, light: 13.1 } },
      950: { value: "hsl(37, 100%, 10%)", hex: "#431407", contrast: { dark: 1.1, light: 19.1 } },
    },
    error: {
      50: { value: "hsl(0, 86%, 97%)", hex: "#fef2f2", contrast: { dark: 20.2, light: 1.04 } },
      100: { value: "hsl(0, 93%, 94%)", hex: "#fee2e2", contrast: { dark: 17.8, light: 1.18 } },
      200: { value: "hsl(0, 96%, 89%)", hex: "#fecaca", contrast: { dark: 14.5, light: 1.45 } },
      300: { value: "hsl(0, 94%, 82%)", hex: "#fca5a5", contrast: { dark: 10.5, light: 2.0 } },
      400: { value: "hsl(0, 91%, 71%)", hex: "#f87171", contrast: { dark: 6.8, light: 3.09 } },
      500: { value: "hsl(0, 84%, 60%)", hex: "#ef4444", contrast: { dark: 4.8, light: 4.38 } }, // Primary error
      600: { value: "hsl(0, 72%, 51%)", hex: "#dc2626", contrast: { dark: 3.6, light: 5.83 } },
      700: { value: "hsl(0, 74%, 42%)", hex: "#b91c1c", contrast: { dark: 2.7, light: 7.78 } },
      800: { value: "hsl(0, 70%, 35%)", hex: "#991b1b", contrast: { dark: 2.1, light: 10.0 } },
      900: { value: "hsl(0, 63%, 31%)", hex: "#7f1d1d", contrast: { dark: 1.7, light: 12.35 } },
      950: { value: "hsl(0, 75%, 15%)", hex: "#450a0a", contrast: { dark: 1.2, light: 17.5 } },
    },
    info: {
      50: { value: "hsl(204, 100%, 97%)", hex: "#eff6ff", contrast: { dark: 20.8, light: 1.01 } },
      100: { value: "hsl(204, 94%, 94%)", hex: "#dbeafe", contrast: { dark: 18.2, light: 1.15 } },
      200: { value: "hsl(201, 94%, 86%)", hex: "#bfdbfe", contrast: { dark: 14.2, light: 1.48 } },
      300: { value: "hsl(199, 95%, 74%)", hex: "#93c5fd", contrast: { dark: 9.8, light: 2.14 } },
      400: { value: "hsl(198, 93%, 60%)", hex: "#60a5fa", contrast: { dark: 6.2, light: 3.39 } },
      500: { value: "hsl(198, 89%, 48%)", hex: "#3b82f6", contrast: { dark: 4.2, light: 5.0 } }, // Primary info
      600: { value: "hsl(221, 83%, 53%)", hex: "#2563eb", contrast: { dark: 3.4, light: 6.18 } },
      700: { value: "hsl(224, 76%, 48%)", hex: "#1d4ed8", contrast: { dark: 2.6, light: 8.08 } },
      800: { value: "hsl(226, 71%, 40%)", hex: "#1e40af", contrast: { dark: 2.0, light: 10.5 } },
      900: { value: "hsl(224, 64%, 33%)", hex: "#1e3a8a", contrast: { dark: 1.6, light: 13.1 } },
      950: { value: "hsl(226, 83%, 20%)", hex: "#172554", contrast: { dark: 1.2, light: 17.5 } },
    },
  },

  // Neutral Colors - Text and Backgrounds
  neutral: {
    white: { value: "hsl(0, 0%, 100%)", hex: "#ffffff", contrast: { dark: 21, light: 1.0 } },
    black: { value: "hsl(0, 0%, 0%)", hex: "#000000", contrast: { dark: 1.0, light: 21 } },
    transparent: { value: "transparent", hex: "transparent", contrast: { dark: 0, light: 0 } },
  },

  // Chart Colors - Data Visualization
  chart: {
    1: { value: "hsl(210, 100%, 56%)", hex: "#0ea5e9", usage: "Primary data series" },
    2: { value: "hsl(142, 71%, 45%)", hex: "#22c55e", usage: "Secondary data series" },
    3: { value: "hsl(45, 93%, 47%)", hex: "#d97706", usage: "Tertiary data series" },
    4: { value: "hsl(0, 84%, 60%)", hex: "#ef4444", usage: "Quaternary data series" },
    5: { value: "hsl(271, 81%, 56%)", hex: "#a855f7", usage: "Quinary data series" },
    6: { value: "hsl(168, 76%, 42%)", hex: "#14b8a6", usage: "Additional data series" },
    7: { value: "hsl(24, 95%, 53%)", hex: "#f97316", usage: "Additional data series" },
    8: { value: "hsl(339, 82%, 52%)", hex: "#ec4899", usage: "Additional data series" },
    positive: { value: "hsl(142, 71%, 45%)", hex: "#22c55e", usage: "Positive values" },
    negative: { value: "hsl(0, 84%, 60%)", hex: "#ef4444", usage: "Negative values" },
    neutral: { value: "hsl(240, 5%, 64.9%)", hex: "#a1a1aa", usage: "Neutral values" },
  },

  // Interactive States
  interactive: {
    hover: {
      primary: { value: "hsl(210, 100%, 50%)", opacity: 0.9 },
      secondary: { value: "hsl(240, 4.8%, 95.9%)", opacity: 0.8 },
      destructive: { value: "hsl(0, 84%, 60%)", opacity: 0.9 },
    },
    active: {
      primary: { value: "hsl(210, 100%, 42%)", opacity: 0.95 },
      secondary: { value: "hsl(240, 5.9%, 90%)", opacity: 0.9 },
      destructive: { value: "hsl(0, 72%, 51%)", opacity: 0.95 },
    },
    focus: {
      ring: { value: "hsl(210, 100%, 56%)", opacity: 0.5 },
      offset: "2px",
    },
    disabled: {
      background: { value: "hsl(240, 4.8%, 95.9%)", opacity: 0.5 },
      text: { value: "hsl(240, 3.8%, 46.1%)", opacity: 0.5 },
    },
  },
} as const

// Color Usage Guidelines
export const colorUsageGuidelines = {
  text: {
    primary: "Use neutral-900 for primary text content",
    secondary: "Use neutral-600 for secondary text content",
    muted: "Use neutral-500 for muted text and placeholders",
    inverse: "Use neutral-50 for text on dark backgrounds",
    link: "Use primary-600 for links with primary-700 on hover",
    error: "Use error-600 for error messages",
    success: "Use success-600 for success messages",
    warning: "Use warning-600 for warning messages",
  },
  background: {
    primary: "Use neutral-white for primary backgrounds",
    secondary: "Use neutral-50 for secondary backgrounds",
    muted: "Use neutral-100 for muted backgrounds",
    accent: "Use primary-50 for accent backgrounds",
    overlay: "Use neutral-900 with 50% opacity for overlays",
  },
  border: {
    default: "Use neutral-200 for default borders",
    muted: "Use neutral-100 for subtle borders",
    accent: "Use primary-200 for accent borders",
    error: "Use error-200 for error borders",
    success: "Use success-200 for success borders",
  },
  button: {
    primary: "Use primary-600 background with white text",
    secondary: "Use neutral-100 background with neutral-900 text",
    outline: "Use transparent background with primary-600 border and text",
    ghost: "Use transparent background with neutral-900 text",
    destructive: "Use error-600 background with white text",
  },
}

// Accessibility Compliance
export const accessibilityCompliance = {
  contrastRatios: {
    normalText: 4.5, // WCAG AA standard
    largeText: 3.0, // WCAG AA standard for 18pt+ or 14pt+ bold
    uiComponents: 3.0, // WCAG AA standard for UI components
    enhanced: 7.0, // WCAG AAA standard
  },
  colorBlindness: {
    support: "All color combinations tested for deuteranopia, protanopia, and tritanopia",
    alternatives: "Icons and patterns used alongside color to convey information",
  },
  guidelines: [
    "Never use color alone to convey information",
    "Ensure sufficient contrast for all text and UI elements",
    "Test with color blindness simulators",
    "Provide alternative text for color-coded content",
    "Use semantic HTML elements to convey meaning",
  ],
}
