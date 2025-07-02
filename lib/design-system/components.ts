/**
 * Comprehensive Component Specifications
 * Defines all component styles, states, and behaviors
 */

export const componentSpecifications = {
  // Button Components
  button: {
    // Base Specifications
    base: {
      fontFamily: "body",
      fontWeight: 500,
      borderRadius: "6px",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      textDecoration: "none",
      userSelect: "none",
      whiteSpace: "nowrap",
    },

    // Size Variants
    sizes: {
      xs: {
        height: "28px",
        padding: "4px 8px",
        fontSize: "12px",
        lineHeight: "16px",
        iconSize: "12px",
        borderRadius: "4px",
      },
      sm: {
        height: "32px",
        padding: "6px 12px",
        fontSize: "13px",
        lineHeight: "16px",
        iconSize: "14px",
        borderRadius: "5px",
      },
      md: {
        height: "40px",
        padding: "8px 16px",
        fontSize: "14px",
        lineHeight: "20px",
        iconSize: "16px",
        borderRadius: "6px",
      },
      lg: {
        height: "48px",
        padding: "12px 24px",
        fontSize: "16px",
        lineHeight: "24px",
        iconSize: "18px",
        borderRadius: "8px",
      },
      xl: {
        height: "56px",
        padding: "16px 32px",
        fontSize: "18px",
        lineHeight: "28px",
        iconSize: "20px",
        borderRadius: "10px",
      },
    },

    // Style Variants
    variants: {
      primary: {
        default: {
          backgroundColor: "hsl(210, 100%, 56%)",
          color: "white",
          border: "1px solid hsl(210, 100%, 56%)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        },
        hover: {
          backgroundColor: "hsl(210, 100%, 50%)",
          border: "1px solid hsl(210, 100%, 50%)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-1px)",
        },
        active: {
          backgroundColor: "hsl(210, 100%, 42%)",
          border: "1px solid hsl(210, 100%, 42%)",
          transform: "translateY(0px)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        },
        focus: {
          outline: "2px solid hsl(210, 100%, 56%)",
          outlineOffset: "2px",
        },
        disabled: {
          backgroundColor: "hsl(240, 4.8%, 95.9%)",
          color: "hsl(240, 3.8%, 46.1%)",
          border: "1px solid hsl(240, 5.9%, 90%)",
          cursor: "not-allowed",
          opacity: 0.6,
        },
      },
      secondary: {
        default: {
          backgroundColor: "hsl(240, 4.8%, 95.9%)",
          color: "hsl(240, 5.9%, 10%)",
          border: "1px solid hsl(240, 5.9%, 90%)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        },
        hover: {
          backgroundColor: "hsl(240, 5.9%, 90%)",
          border: "1px solid hsl(240, 5.9%, 83.9%)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        active: {
          backgroundColor: "hsl(240, 4.9%, 83.9%)",
          border: "1px solid hsl(240, 5%, 64.9%)",
        },
        focus: {
          outline: "2px solid hsl(210, 100%, 56%)",
          outlineOffset: "2px",
        },
        disabled: {
          backgroundColor: "hsl(240, 4.8%, 98%)",
          color: "hsl(240, 3.8%, 46.1%)",
          border: "1px solid hsl(240, 4.8%, 95.9%)",
          cursor: "not-allowed",
          opacity: 0.6,
        },
      },
      outline: {
        default: {
          backgroundColor: "transparent",
          color: "hsl(210, 100%, 56%)",
          border: "1px solid hsl(210, 100%, 56%)",
        },
        hover: {
          backgroundColor: "hsl(210, 100%, 56%)",
          color: "white",
          border: "1px solid hsl(210, 100%, 56%)",
        },
        active: {
          backgroundColor: "hsl(210, 100%, 50%)",
          color: "white",
          border: "1px solid hsl(210, 100%, 50%)",
        },
        focus: {
          outline: "2px solid hsl(210, 100%, 56%)",
          outlineOffset: "2px",
        },
        disabled: {
          backgroundColor: "transparent",
          color: "hsl(240, 3.8%, 46.1%)",
          border: "1px solid hsl(240, 5.9%, 90%)",
          cursor: "not-allowed",
          opacity: 0.6,
        },
      },
      ghost: {
        default: {
          backgroundColor: "transparent",
          color: "hsl(240, 5.9%, 10%)",
          border: "1px solid transparent",
        },
        hover: {
          backgroundColor: "hsl(240, 4.8%, 95.9%)",
          color: "hsl(240, 5.9%, 10%)",
        },
        active: {
          backgroundColor: "hsl(240, 5.9%, 90%)",
          color: "hsl(240, 5.9%, 10%)",
        },
        focus: {
          outline: "2px solid hsl(210, 100%, 56%)",
          outlineOffset: "2px",
        },
        disabled: {
          backgroundColor: "transparent",
          color: "hsl(240, 3.8%, 46.1%)",
          cursor: "not-allowed",
          opacity: 0.6,
        },
      },
      destructive: {
        default: {
          backgroundColor: "hsl(0, 84%, 60%)",
          color: "white",
          border: "1px solid hsl(0, 84%, 60%)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        },
        hover: {
          backgroundColor: "hsl(0, 72%, 51%)",
          border: "1px solid hsl(0, 72%, 51%)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        active: {
          backgroundColor: "hsl(0, 74%, 42%)",
          border: "1px solid hsl(0, 74%, 42%)",
        },
        focus: {
          outline: "2px solid hsl(0, 84%, 60%)",
          outlineOffset: "2px",
        },
        disabled: {
          backgroundColor: "hsl(240, 4.8%, 95.9%)",
          color: "hsl(240, 3.8%, 46.1%)",
          border: "1px solid hsl(240, 5.9%, 90%)",
          cursor: "not-allowed",
          opacity: 0.6,
        },
      },
    },

    // Special States
    states: {
      loading: {
        cursor: "wait",
        opacity: 0.8,
        pointerEvents: "none",
      },
      iconOnly: {
        padding: "0",
        aspectRatio: "1",
      },
      fullWidth: {
        width: "100%",
      },
    },
  },

  // Input Components
  input: {
    // Base Specifications
    base: {
      fontFamily: "body",
      fontSize: "14px",
      lineHeight: "20px",
      borderRadius: "6px",
      transition: "all 0.2s ease-in-out",
      backgroundColor: "white",
      border: "1px solid hsl(240, 5.9%, 90%)",
      outline: "none",
    },

    // Size Variants
    sizes: {
      sm: {
        height: "32px",
        padding: "6px 10px",
        fontSize: "13px",
        lineHeight: "16px",
      },
      md: {
        height: "40px",
        padding: "8px 12px",
        fontSize: "14px",
        lineHeight: "20px",
      },
      lg: {
        height: "48px",
        padding: "12px 16px",
        fontSize: "16px",
        lineHeight: "24px",
      },
    },

    // State Variants
    states: {
      default: {
        border: "1px solid hsl(240, 5.9%, 90%)",
        color: "hsl(240, 5.9%, 10%)",
        backgroundColor: "white",
        placeholder: "hsl(240, 3.8%, 46.1%)",
      },
      hover: {
        border: "1px solid hsl(240, 5%, 64.9%)",
      },
      focus: {
        border: "1px solid hsl(210, 100%, 56%)",
        boxShadow: "0 0 0 2px hsl(210, 100%, 56%, 0.2)",
      },
      error: {
        border: "1px solid hsl(0, 84%, 60%)",
        boxShadow: "0 0 0 2px hsl(0, 84%, 60%, 0.2)",
        color: "hsl(0, 84%, 60%)",
      },
      success: {
        border: "1px solid hsl(142, 71%, 45%)",
        boxShadow: "0 0 0 2px hsl(142, 71%, 45%, 0.2)",
        color: "hsl(142, 71%, 45%)",
      },
      disabled: {
        backgroundColor: "hsl(240, 4.8%, 95.9%)",
        color: "hsl(240, 3.8%, 46.1%)",
        border: "1px solid hsl(240, 5.9%, 90%)",
        cursor: "not-allowed",
        opacity: 0.6,
      },
      readonly: {
        backgroundColor: "hsl(240, 4.8%, 98%)",
        cursor: "default",
      },
    },

    // Input Types
    types: {
      text: { inputMode: "text" },
      email: { inputMode: "email", type: "email" },
      password: { type: "password" },
      number: { inputMode: "numeric", type: "number" },
      tel: { inputMode: "tel", type: "tel" },
      url: { inputMode: "url", type: "url" },
      search: { inputMode: "search", type: "search" },
      date: { type: "date" },
      time: { type: "time" },
      datetime: { type: "datetime-local" },
    },
  },

  // Card Components
  card: {
    // Base Specifications
    base: {
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid hsl(240, 5.9%, 90%)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-in-out",
      overflow: "hidden",
    },

    // Variants
    variants: {
      default: {
        backgroundColor: "white",
        border: "1px solid hsl(240, 5.9%, 90%)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      elevated: {
        backgroundColor: "white",
        border: "1px solid hsl(240, 5.9%, 90%)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        hover: {
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
      },
      outlined: {
        backgroundColor: "white",
        border: "2px solid hsl(240, 5.9%, 90%)",
        boxShadow: "none",
      },
      ghost: {
        backgroundColor: "transparent",
        border: "1px solid transparent",
        boxShadow: "none",
      },
    },

    // Padding Variants
    padding: {
      none: { padding: "0" },
      sm: { padding: "16px" },
      md: { padding: "24px" },
      lg: { padding: "32px" },
      xl: { padding: "40px" },
    },

    // Interactive States
    interactive: {
      default: {
        cursor: "pointer",
        hover: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-1px)",
        },
        active: {
          transform: "translateY(0px)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        focus: {
          outline: "2px solid hsl(210, 100%, 56%)",
          outlineOffset: "2px",
        },
      },
    },

    // Card Sections
    sections: {
      header: {
        padding: "24px 24px 16px 24px",
        borderBottom: "1px solid hsl(240, 5.9%, 90%)",
      },
      content: {
        padding: "24px",
      },
      footer: {
        padding: "16px 24px 24px 24px",
        borderTop: "1px solid hsl(240, 5.9%, 90%)",
        backgroundColor: "hsl(240, 4.8%, 98%)",
      },
    },
  },

  // Badge Components
  badge: {
    // Base Specifications
    base: {
      fontFamily: "body",
      fontWeight: 500,
      borderRadius: "12px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      whiteSpace: "nowrap",
      textTransform: "none",
      border: "1px solid transparent",
      transition: "all 0.2s ease-in-out",
    },

    // Size Variants
    sizes: {
      xs: {
        height: "20px",
        padding: "2px 6px",
        fontSize: "11px",
        lineHeight: "16px",
        iconSize: "10px",
      },
      sm: {
        height: "24px",
        padding: "4px 8px",
        fontSize: "12px",
        lineHeight: "16px",
        iconSize: "12px",
      },
      md: {
        height: "28px",
        padding: "6px 10px",
        fontSize: "13px",
        lineHeight: "16px",
        iconSize: "14px",
      },
      lg: {
        height: "32px",
        padding: "8px 12px",
        fontSize: "14px",
        lineHeight: "20px",
        iconSize: "16px",
      },
    },

    // Style Variants
    variants: {
      default: {
        backgroundColor: "hsl(210, 100%, 56%)",
        color: "white",
        border: "1px solid hsl(210, 100%, 56%)",
      },
      secondary: {
        backgroundColor: "hsl(240, 4.8%, 95.9%)",
        color: "hsl(240, 5.9%, 10%)",
        border: "1px solid hsl(240, 5.9%, 90%)",
      },
      success: {
        backgroundColor: "hsl(142, 71%, 45%)",
        color: "white",
        border: "1px solid hsl(142, 71%, 45%)",
      },
      warning: {
        backgroundColor: "hsl(45, 93%, 47%)",
        color: "white",
        border: "1px solid hsl(45, 93%, 47%)",
      },
      error: {
        backgroundColor: "hsl(0, 84%, 60%)",
        color: "white",
        border: "1px solid hsl(0, 84%, 60%)",
      },
      info: {
        backgroundColor: "hsl(198, 89%, 48%)",
        color: "white",
        border: "1px solid hsl(198, 89%, 48%)",
      },
      outline: {
        backgroundColor: "transparent",
        color: "hsl(240, 5.9%, 10%)",
        border: "1px solid hsl(240, 5.9%, 90%)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "hsl(240, 5.9%, 10%)",
        border: "1px solid transparent",
      },
    },

    // Shape Variants
    shapes: {
      rounded: {
        borderRadius: "12px",
      },
      square: {
        borderRadius: "4px",
      },
      pill: {
        borderRadius: "999px",
      },
    },
  },
} as const

// Component Usage Guidelines
export const componentUsageGuidelines = {
  buttons: {
    primary: "Use for the main action on a page or section",
    secondary: "Use for secondary actions that support the primary action",
    outline: "Use for actions that need less emphasis than secondary",
    ghost: "Use for subtle actions or in tight spaces",
    destructive: "Use for dangerous or irreversible actions",
    sizing: "Choose size based on importance and available space",
    icons: "Use icons to clarify action meaning, not for decoration",
    loading: "Show loading state for async operations",
  },
  inputs: {
    labeling: "Always provide clear, descriptive labels",
    validation: "Show validation states clearly with color and text",
    placeholder: "Use placeholder text for examples, not instructions",
    sizing: "Match input size to form importance and density",
    grouping: "Group related inputs logically",
    accessibility: "Ensure proper ARIA attributes and keyboard navigation",
  },
  cards: {
    content: "Group related information logically",
    hierarchy: "Use consistent padding and spacing within cards",
    actions: "Place primary actions prominently",
    interactive: "Make interactive cards clearly clickable",
    elevation: "Use elevation to show importance or state",
  },
  navigation: {
    hierarchy: "Show clear navigation hierarchy",
    current: "Indicate current page/section clearly",
    responsive: "Adapt navigation for different screen sizes",
    accessibility: "Ensure keyboard navigation works properly",
    consistency: "Use consistent navigation patterns",
  },
  feedback: {
    timing: "Show feedback immediately after user actions",
    clarity: "Use clear, actionable language",
    persistence: "Keep important messages visible until dismissed",
    positioning: "Place feedback near relevant content",
    accessibility: "Announce important feedback to screen readers",
  },
}
