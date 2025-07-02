/**
 * Comprehensive Typography System
 * Defines all typography styles with detailed specifications
 */

export const typographySystem = {
  // Font Families with Fallbacks
  fontFamilies: {
    display: {
      name: "Neue Montreal",
      stack: ["Neue Montreal", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      usage: "Headlines, display text, and brand elements",
      characteristics: "Modern, clean, geometric sans-serif with excellent readability",
      weights: [300, 400, 500, 600, 700, 800],
      styles: ["normal", "italic"],
    },
    body: {
      name: "Geist",
      stack: ["Geist", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      usage: "Body text, UI elements, and general content",
      characteristics: "Optimized for reading, excellent legibility at all sizes",
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
    mono: {
      name: "IBM Plex Mono",
      stack: ["IBM Plex Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      usage: "Code, numbers, data, and technical content",
      characteristics: "Monospaced font with excellent readability for code",
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  },

  // Type Scale with Responsive Sizing
  typeScale: {
    // Display Sizes - Hero and Large Headlines
    display: {
      "2xl": {
        desktop: { fontSize: "4.5rem", lineHeight: "1", letterSpacing: "-0.05em" }, // 72px
        tablet: { fontSize: "3.75rem", lineHeight: "1.1", letterSpacing: "-0.04em" }, // 60px
        mobile: { fontSize: "3rem", lineHeight: "1.1", letterSpacing: "-0.03em" }, // 48px
        fontWeight: 800,
        fontFamily: "display",
        usage: "Hero headlines, landing page titles",
      },
      xl: {
        desktop: { fontSize: "3.75rem", lineHeight: "1.1", letterSpacing: "-0.04em" }, // 60px
        tablet: { fontSize: "3rem", lineHeight: "1.1", letterSpacing: "-0.03em" }, // 48px
        mobile: { fontSize: "2.5rem", lineHeight: "1.2", letterSpacing: "-0.02em" }, // 40px
        fontWeight: 700,
        fontFamily: "display",
        usage: "Section heroes, major headings",
      },
      lg: {
        desktop: { fontSize: "3rem", lineHeight: "1.1", letterSpacing: "-0.03em" }, // 48px
        tablet: { fontSize: "2.5rem", lineHeight: "1.2", letterSpacing: "-0.02em" }, // 40px
        mobile: { fontSize: "2rem", lineHeight: "1.25", letterSpacing: "-0.01em" }, // 32px
        fontWeight: 700,
        fontFamily: "display",
        usage: "Page titles, major sections",
      },
    },

    // Heading Sizes - H1 through H6
    heading: {
      h1: {
        desktop: { fontSize: "2.25rem", lineHeight: "1.2", letterSpacing: "-0.02em" }, // 36px
        tablet: { fontSize: "2rem", lineHeight: "1.25", letterSpacing: "-0.01em" }, // 32px
        mobile: { fontSize: "1.75rem", lineHeight: "1.3", letterSpacing: "0em" }, // 28px
        fontWeight: 600,
        fontFamily: "display",
        usage: "Main page headings",
      },
      h2: {
        desktop: { fontSize: "1.875rem", lineHeight: "1.3", letterSpacing: "-0.01em" }, // 30px
        tablet: { fontSize: "1.75rem", lineHeight: "1.3", letterSpacing: "0em" }, // 28px
        mobile: { fontSize: "1.5rem", lineHeight: "1.35", letterSpacing: "0em" }, // 24px
        fontWeight: 600,
        fontFamily: "display",
        usage: "Section headings",
      },
      h3: {
        desktop: { fontSize: "1.5rem", lineHeight: "1.35", letterSpacing: "0em" }, // 24px
        tablet: { fontSize: "1.375rem", lineHeight: "1.4", letterSpacing: "0em" }, // 22px
        mobile: { fontSize: "1.25rem", lineHeight: "1.4", letterSpacing: "0em" }, // 20px
        fontWeight: 600,
        fontFamily: "display",
        usage: "Subsection headings",
      },
      h4: {
        desktop: { fontSize: "1.25rem", lineHeight: "1.4", letterSpacing: "0em" }, // 20px
        tablet: { fontSize: "1.125rem", lineHeight: "1.45", letterSpacing: "0em" }, // 18px
        mobile: { fontSize: "1.125rem", lineHeight: "1.45", letterSpacing: "0em" }, // 18px
        fontWeight: 600,
        fontFamily: "body",
        usage: "Component headings",
      },
      h5: {
        desktop: { fontSize: "1.125rem", lineHeight: "1.45", letterSpacing: "0em" }, // 18px
        tablet: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0em" }, // 16px
        mobile: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0em" }, // 16px
        fontWeight: 600,
        fontFamily: "body",
        usage: "Small headings",
      },
      h6: {
        desktop: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0em" }, // 16px
        tablet: { fontSize: "0.875rem", lineHeight: "1.55", letterSpacing: "0em" }, // 14px
        mobile: { fontSize: "0.875rem", lineHeight: "1.55", letterSpacing: "0em" }, // 14px
        fontWeight: 600,
        fontFamily: "body",
        usage: "Micro headings, labels",
      },
    },

    // Body Text Sizes
    body: {
      xl: {
        desktop: { fontSize: "1.25rem", lineHeight: "1.6", letterSpacing: "0em" }, // 20px
        tablet: { fontSize: "1.125rem", lineHeight: "1.65", letterSpacing: "0em" }, // 18px
        mobile: { fontSize: "1.125rem", lineHeight: "1.65", letterSpacing: "0em" }, // 18px
        fontWeight: 400,
        fontFamily: "body",
        usage: "Lead paragraphs, important content",
      },
      lg: {
        desktop: { fontSize: "1.125rem", lineHeight: "1.65", letterSpacing: "0em" }, // 18px
        tablet: { fontSize: "1rem", lineHeight: "1.7", letterSpacing: "0em" }, // 16px
        mobile: { fontSize: "1rem", lineHeight: "1.7", letterSpacing: "0em" }, // 16px
        fontWeight: 400,
        fontFamily: "body",
        usage: "Large body text, descriptions",
      },
      base: {
        desktop: { fontSize: "1rem", lineHeight: "1.7", letterSpacing: "0em" }, // 16px
        tablet: { fontSize: "1rem", lineHeight: "1.7", letterSpacing: "0em" }, // 16px
        mobile: { fontSize: "0.9375rem", lineHeight: "1.7", letterSpacing: "0em" }, // 15px
        fontWeight: 400,
        fontFamily: "body",
        usage: "Default body text, paragraphs",
      },
      sm: {
        desktop: { fontSize: "0.875rem", lineHeight: "1.7", letterSpacing: "0em" }, // 14px
        tablet: { fontSize: "0.875rem", lineHeight: "1.7", letterSpacing: "0em" }, // 14px
        mobile: { fontSize: "0.8125rem", lineHeight: "1.7", letterSpacing: "0em" }, // 13px
        fontWeight: 400,
        fontFamily: "body",
        usage: "Small text, captions, metadata",
      },
      xs: {
        desktop: { fontSize: "0.75rem", lineHeight: "1.6", letterSpacing: "0.01em" }, // 12px
        tablet: { fontSize: "0.75rem", lineHeight: "1.6", letterSpacing: "0.01em" }, // 12px
        mobile: { fontSize: "0.6875rem", lineHeight: "1.6", letterSpacing: "0.01em" }, // 11px
        fontWeight: 400,
        fontFamily: "body",
        usage: "Fine print, legal text, micro copy",
      },
    },

    // UI Text Sizes - Buttons, Labels, etc.
    ui: {
      button: {
        lg: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 500 }, // 16px
        base: { fontSize: "0.875rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 500 }, // 14px
        sm: { fontSize: "0.8125rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 500 }, // 13px
        fontFamily: "body",
        usage: "Button text",
      },
      label: {
        base: { fontSize: "0.875rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 500 }, // 14px
        sm: { fontSize: "0.75rem", lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: 500 }, // 12px
        fontFamily: "body",
        usage: "Form labels, UI labels",
      },
      input: {
        base: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 400 }, // 16px
        sm: { fontSize: "0.875rem", lineHeight: "1.5", letterSpacing: "0em", fontWeight: 400 }, // 14px
        fontFamily: "body",
        usage: "Input field text",
      },
    },

    // Code and Data Text
    code: {
      lg: { fontSize: "1rem", lineHeight: "1.6", letterSpacing: "0em", fontWeight: 400 }, // 16px
      base: { fontSize: "0.875rem", lineHeight: "1.6", letterSpacing: "0em", fontWeight: 400 }, // 14px
      sm: { fontSize: "0.75rem", lineHeight: "1.6", letterSpacing: "0em", fontWeight: 400 }, // 12px
      fontFamily: "mono",
      usage: "Code blocks, inline code, data tables",
    },
  },

  // Font Weights
  fontWeights: {
    light: { value: 300, usage: "Subtle text, large headings" },
    normal: { value: 400, usage: "Body text, default weight" },
    medium: { value: 500, usage: "Emphasized text, UI elements" },
    semibold: { value: 600, usage: "Headings, important text" },
    bold: { value: 700, usage: "Strong emphasis, titles" },
    extrabold: { value: 800, usage: "Display headings, hero text" },
  },

  // Letter Spacing
  letterSpacing: {
    tighter: { value: "-0.05em", usage: "Large headings, display text" },
    tight: { value: "-0.025em", usage: "Headings" },
    normal: { value: "0em", usage: "Body text, default" },
    wide: { value: "0.025em", usage: "Small text, all caps" },
    wider: { value: "0.05em", usage: "Tracking, labels" },
    widest: { value: "0.1em", usage: "Buttons, badges" },
  },

  // Line Heights
  lineHeights: {
    none: { value: 1, usage: "Display text, tight layouts" },
    tight: { value: 1.25, usage: "Headings" },
    snug: { value: 1.375, usage: "Large text" },
    normal: { value: 1.5, usage: "UI elements" },
    relaxed: { value: 1.625, usage: "Body text" },
    loose: { value: 2, usage: "Spacious layouts" },
  },

  // Text Alignment
  textAlign: {
    left: { usage: "Default alignment, body text" },
    center: { usage: "Headings, hero text, cards" },
    right: { usage: "Numbers, metadata" },
    justify: { usage: "Long form content (use sparingly)" },
  },

  // Text Decoration
  textDecoration: {
    none: { usage: "Default state" },
    underline: { usage: "Links, emphasis" },
    lineThrough: { usage: "Deleted content, strikethrough" },
  },

  // Text Transform
  textTransform: {
    none: { usage: "Default state" },
    uppercase: { usage: "Labels, badges, buttons" },
    lowercase: { usage: "Email addresses, URLs" },
    capitalize: { usage: "Titles, proper nouns" },
  },
} as const

// Typography Usage Guidelines
export const typographyUsageGuidelines = {
  hierarchy: {
    principle: "Establish clear visual hierarchy through size, weight, and spacing",
    rules: [
      "Use only one H1 per page",
      "Don't skip heading levels (H1 → H2 → H3)",
      "Maintain consistent spacing between elements",
      "Use font weight to create emphasis within the same size",
    ],
  },
  readability: {
    principle: "Optimize for reading comfort and accessibility",
    rules: [
      "Maintain 45-75 characters per line for optimal reading",
      "Use sufficient line height (1.5-1.7) for body text",
      "Ensure adequate contrast between text and background",
      "Avoid using all caps for long text",
    ],
  },
  consistency: {
    principle: "Use consistent typography patterns throughout the application",
    rules: [
      "Define and stick to a limited set of font sizes",
      "Use the same font weight for similar elements",
      "Maintain consistent spacing between text elements",
      "Apply the same styling to similar content types",
    ],
  },
  accessibility: {
    principle: "Ensure typography is accessible to all users",
    rules: [
      "Minimum font size of 14px for body text",
      "Sufficient color contrast (4.5:1 for normal text)",
      "Avoid using color alone to convey information",
      "Provide adequate spacing for touch targets",
    ],
  },
}

// Responsive Typography Breakpoints
export const typographyBreakpoints = {
  mobile: { maxWidth: "767px", scaleFactor: 0.875 },
  tablet: { minWidth: "768px", maxWidth: "1023px", scaleFactor: 0.9375 },
  desktop: { minWidth: "1024px", scaleFactor: 1 },
  large: { minWidth: "1440px", scaleFactor: 1.125 },
}
