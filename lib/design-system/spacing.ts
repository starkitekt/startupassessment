/**
 * Comprehensive Spacing and Layout System
 * Defines all spacing, grid, and layout specifications
 */

export const spacingSystem = {
  // Base Spacing Unit (4px grid system)
  baseUnit: 4, // 4px base unit for consistent spacing

  // Spacing Scale
  spacing: {
    0: { value: "0px", rem: "0rem", usage: "No spacing" },
    px: { value: "1px", rem: "0.0625rem", usage: "Hairline borders" },
    0.5: { value: "2px", rem: "0.125rem", usage: "Fine adjustments" },
    1: { value: "4px", rem: "0.25rem", usage: "Minimal spacing" },
    1.5: { value: "6px", rem: "0.375rem", usage: "Tight spacing" },
    2: { value: "8px", rem: "0.5rem", usage: "Small spacing" },
    2.5: { value: "10px", rem: "0.625rem", usage: "Small-medium spacing" },
    3: { value: "12px", rem: "0.75rem", usage: "Medium spacing" },
    3.5: { value: "14px", rem: "0.875rem", usage: "Medium-large spacing" },
    4: { value: "16px", rem: "1rem", usage: "Default spacing" },
    5: { value: "20px", rem: "1.25rem", usage: "Large spacing" },
    6: { value: "24px", rem: "1.5rem", usage: "Extra large spacing" },
    7: { value: "28px", rem: "1.75rem", usage: "Section spacing" },
    8: { value: "32px", rem: "2rem", usage: "Component spacing" },
    9: { value: "36px", rem: "2.25rem", usage: "Large component spacing" },
    10: { value: "40px", rem: "2.5rem", usage: "Section padding" },
    11: { value: "44px", rem: "2.75rem", usage: "Large section padding" },
    12: { value: "48px", rem: "3rem", usage: "Page section spacing" },
    14: { value: "56px", rem: "3.5rem", usage: "Large page spacing" },
    16: { value: "64px", rem: "4rem", usage: "Major section spacing" },
    20: { value: "80px", rem: "5rem", usage: "Hero section spacing" },
    24: { value: "96px", rem: "6rem", usage: "Page-level spacing" },
    28: { value: "112px", rem: "7rem", usage: "Large page spacing" },
    32: { value: "128px", rem: "8rem", usage: "Maximum spacing" },
    36: { value: "144px", rem: "9rem", usage: "Extra large spacing" },
    40: { value: "160px", rem: "10rem", usage: "Hero spacing" },
    44: { value: "176px", rem: "11rem", usage: "Landing page spacing" },
    48: { value: "192px", rem: "12rem", usage: "Maximum page spacing" },
    52: { value: "208px", rem: "13rem", usage: "Ultra large spacing" },
    56: { value: "224px", rem: "14rem", usage: "Maximum hero spacing" },
    60: { value: "240px", rem: "15rem", usage: "Ultra maximum spacing" },
    64: { value: "256px", rem: "16rem", usage: "Extreme spacing" },
    72: { value: "288px", rem: "18rem", usage: "Ultra extreme spacing" },
    80: { value: "320px", rem: "20rem", usage: "Maximum extreme spacing" },
    96: { value: "384px", rem: "24rem", usage: "Ultra maximum extreme spacing" },
  },

  // Grid System
  grid: {
    // Container Specifications
    container: {
      maxWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      padding: {
        mobile: "16px", // 1rem
        tablet: "24px", // 1.5rem
        desktop: "32px", // 2rem
        large: "48px", // 3rem
      },
      margin: "0 auto",
    },

    // Column System (12-column grid)
    columns: {
      total: 12,
      gap: {
        mobile: "16px", // 1rem
        tablet: "24px", // 1.5rem
        desktop: "32px", // 2rem
      },
      widths: {
        1: "8.333333%",
        2: "16.666667%",
        3: "25%",
        4: "33.333333%",
        5: "41.666667%",
        6: "50%",
        7: "58.333333%",
        8: "66.666667%",
        9: "75%",
        10: "83.333333%",
        11: "91.666667%",
        12: "100%",
      },
    },

    // Breakpoints
    breakpoints: {
      xs: { min: "0px", max: "639px", container: "100%" },
      sm: { min: "640px", max: "767px", container: "640px" },
      md: { min: "768px", max: "1023px", container: "768px" },
      lg: { min: "1024px", max: "1279px", container: "1024px" },
      xl: { min: "1280px", max: "1535px", container: "1280px" },
      "2xl": { min: "1536px", max: "∞", container: "1536px" },
    },
  },

  // Layout Patterns
  layouts: {
    // Page Layout
    page: {
      header: {
        height: "64px", // 4rem
        padding: "0 24px", // 0 1.5rem
        borderBottom: "1px solid",
        background: "background",
      },
      sidebar: {
        width: "256px", // 16rem
        minWidth: "200px", // 12.5rem
        maxWidth: "320px", // 20rem
        padding: "24px", // 1.5rem
        borderRight: "1px solid",
      },
      main: {
        padding: "32px", // 2rem
        minHeight: "calc(100vh - 64px)",
        background: "background",
      },
      footer: {
        height: "auto",
        padding: "48px 24px", // 3rem 1.5rem
        borderTop: "1px solid",
        background: "muted",
      },
    },

    // Component Layout
    component: {
      card: {
        padding: {
          sm: "16px", // 1rem
          md: "24px", // 1.5rem
          lg: "32px", // 2rem
        },
        gap: "16px", // 1rem
        borderRadius: "8px", // 0.5rem
      },
      modal: {
        padding: "32px", // 2rem
        gap: "24px", // 1.5rem
        maxWidth: "512px", // 32rem
        borderRadius: "12px", // 0.75rem
      },
      form: {
        gap: "24px", // 1.5rem
        fieldGap: "16px", // 1rem
        labelGap: "8px", // 0.5rem
      },
      table: {
        cellPadding: "12px 16px", // 0.75rem 1rem
        headerPadding: "16px", // 1rem
        rowGap: "0px",
        borderSpacing: "0px",
      },
    },

    // Section Layout
    section: {
      hero: {
        padding: "96px 0", // 6rem 0
        textAlign: "center",
        gap: "32px", // 2rem
      },
      content: {
        padding: "64px 0", // 4rem 0
        gap: "48px", // 3rem
      },
      feature: {
        padding: "48px 0", // 3rem 0
        gap: "32px", // 2rem
      },
      testimonial: {
        padding: "64px 0", // 4rem 0
        gap: "40px", // 2.5rem
      },
    },
  },

  // Component Spacing
  components: {
    button: {
      padding: {
        sm: "6px 12px", // 0.375rem 0.75rem
        md: "8px 16px", // 0.5rem 1rem
        lg: "12px 24px", // 0.75rem 1.5rem
      },
      gap: "8px", // 0.5rem (between icon and text)
      height: {
        sm: "32px", // 2rem
        md: "40px", // 2.5rem
        lg: "48px", // 3rem
      },
    },
    input: {
      padding: "8px 12px", // 0.5rem 0.75rem
      height: "40px", // 2.5rem
      gap: "8px", // 0.5rem (between elements)
    },
    select: {
      padding: "8px 12px", // 0.5rem 0.75rem
      height: "40px", // 2.5rem
      optionPadding: "8px 12px", // 0.5rem 0.75rem
    },
    checkbox: {
      size: "16px", // 1rem
      gap: "8px", // 0.5rem (between checkbox and label)
    },
    radio: {
      size: "16px", // 1rem
      gap: "8px", // 0.5rem (between radio and label)
    },
    badge: {
      padding: "4px 8px", // 0.25rem 0.5rem
      gap: "4px", // 0.25rem (between icon and text)
      height: "24px", // 1.5rem
    },
    avatar: {
      sizes: {
        xs: "24px", // 1.5rem
        sm: "32px", // 2rem
        md: "40px", // 2.5rem
        lg: "48px", // 3rem
        xl: "64px", // 4rem
        "2xl": "80px", // 5rem
      },
    },
    tooltip: {
      padding: "8px 12px", // 0.5rem 0.75rem
      gap: "4px", // 0.25rem
      offset: "8px", // 0.5rem
    },
    dropdown: {
      padding: "8px 0", // 0.5rem 0
      itemPadding: "8px 16px", // 0.5rem 1rem
      gap: "4px", // 0.25rem
      minWidth: "160px", // 10rem
    },
  },

  // Responsive Spacing
  responsive: {
    mobile: {
      container: "16px", // 1rem
      section: "32px", // 2rem
      component: "16px", // 1rem
      element: "8px", // 0.5rem
    },
    tablet: {
      container: "24px", // 1.5rem
      section: "48px", // 3rem
      component: "24px", // 1.5rem
      element: "12px", // 0.75rem
    },
    desktop: {
      container: "32px", // 2rem
      section: "64px", // 4rem
      component: "32px", // 2rem
      element: "16px", // 1rem
    },
    large: {
      container: "48px", // 3rem
      section: "96px", // 6rem
      component: "48px", // 3rem
      element: "24px", // 1.5rem
    },
  },
} as const

// Spacing Usage Guidelines
export const spacingUsageGuidelines = {
  principles: {
    consistency: "Use the 4px base unit system for all spacing decisions",
    hierarchy: "Larger spacing creates stronger visual separation",
    rhythm: "Maintain consistent vertical rhythm throughout the design",
    breathing: "Provide adequate white space for visual comfort",
  },
  rules: {
    padding: [
      "Use consistent padding within similar components",
      "Increase padding for larger components",
      "Maintain aspect ratios when scaling padding",
    ],
    margin: [
      "Use margin for spacing between components",
      "Prefer margin-bottom for vertical spacing",
      "Avoid margin-top to prevent collapsing margins",
    ],
    gap: [
      "Use gap for spacing within flex/grid containers",
      "Maintain consistent gaps within similar layouts",
      "Scale gaps proportionally with component size",
    ],
  },
  responsive: {
    mobile: "Reduce spacing by 25-50% on mobile devices",
    tablet: "Use moderate spacing adjustments for tablet",
    desktop: "Use full spacing values for desktop and larger",
    scaling: "Scale spacing proportionally with screen size",
  },
}

// Layout Best Practices
export const layoutBestPractices = {
  grid: {
    usage: "Use CSS Grid for two-dimensional layouts",
    fallback: "Provide flexbox fallbacks for older browsers",
    responsive: "Design mobile-first, then enhance for larger screens",
  },
  flexbox: {
    usage: "Use Flexbox for one-dimensional layouts",
    alignment: "Use justify-content and align-items for alignment",
    wrapping: "Consider flex-wrap for responsive behavior",
  },
  container: {
    maxWidth: "Limit content width for optimal reading experience",
    centering: "Center containers with margin: 0 auto",
    padding: "Add horizontal padding to prevent edge touching",
  },
  whitespace: {
    importance: "White space is as important as content",
    grouping: "Use spacing to group related elements",
    separation: "Use larger spacing to separate unrelated content",
  },
}
