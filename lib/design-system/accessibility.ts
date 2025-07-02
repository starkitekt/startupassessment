"use client"

/**
 * Comprehensive Accessibility Specifications
 * WCAG 2.1 AA compliance guidelines and implementation details
 */

export const accessibilitySpecifications = {
  // WCAG 2.1 Guidelines Implementation
  wcag: {
    // Perceivable
    perceivable: {
      colorContrast: {
        normalText: {
          minimum: 4.5, // AA standard
          enhanced: 7.0, // AAA standard
          implementation: "All text must meet minimum contrast ratios",
        },
        largeText: {
          minimum: 3.0, // AA standard (18pt+ or 14pt+ bold)
          enhanced: 4.5, // AAA standard
          implementation: "Large text has lower contrast requirements",
        },
        uiComponents: {
          minimum: 3.0, // AA standard
          implementation: "Interactive elements must meet contrast requirements",
        },
        testing: [
          "Use automated tools like axe-core or Lighthouse",
          "Manual testing with color contrast analyzers",
          "Test with different color blindness simulations",
        ],
      },
      colorUsage: {
        principle: "Never use color alone to convey information",
        implementation: [
          "Use icons alongside color coding",
          "Provide text labels for status indicators",
          "Use patterns or shapes in addition to color",
          "Ensure information is available through multiple senses",
        ],
        examples: {
          good: "Error message with red color AND error icon AND descriptive text",
          bad: "Form field with only red border to indicate error",
        },
      },
      textAlternatives: {
        images: {
          decorative: 'Use alt="" for decorative images',
          informative: "Provide descriptive alt text for informative images",
          complex: "Provide detailed descriptions for complex images",
        },
        icons: {
          decorative: "Use aria-hidden='true' for decorative icons",
          functional: "Provide accessible names for functional icons",
          implementation: "Use aria-label or screen reader only text",
        },
      },
    },

    // Operable
    operable: {
      keyboardNavigation: {
        principle: "All functionality must be keyboard accessible",
        requirements: [
          "Tab order must be logical and predictable",
          "Focus indicators must be clearly visible",
          "No keyboard traps (user can navigate away)",
          "Provide keyboard shortcuts for complex interactions",
        ],
        implementation: {
          tabIndex: {
            0: "Include in natural tab order",
            "-1": "Programmatically focusable only",
            positive: "Avoid positive tabindex values",
          },
          focusManagement: [
            "Move focus to opened modals/dialogs",
            "Return focus to trigger element when closing",
            "Manage focus in dynamic content",
            "Provide skip links for main content",
          ],
        },
      },
      focusIndicators: {
        visibility: {
          minimum: "2px solid outline with sufficient contrast",
          offset: "2px offset from element",
          color: "High contrast color (usually primary brand color)",
        },
        implementation: {
          css: "outline: 2px solid hsl(210, 100%, 56%); outline-offset: 2px;",
          customization: "Match brand colors while maintaining contrast",
          consistency: "Use same focus style across all interactive elements",
        },
      },
      timing: {
        principle: "Give users enough time to read and use content",
        implementation: [
          "Provide controls to extend time limits",
          "Warn users before time expires",
          "Allow users to turn off time limits",
          "Pause auto-updating content",
        ],
      },
    },

    // Understandable
    understandable: {
      readability: {
        language: {
          page: "Set lang attribute on <html> element",
          sections: "Identify language changes in content",
          implementation: '<html lang="en">',
        },
        textContent: {
          readingLevel: "Write at appropriate reading level for audience",
          structure: "Use clear headings and logical structure",
          instructions: "Provide clear, concise instructions",
        },
      },
      predictability: {
        navigation: [
          "Use consistent navigation across pages",
          "Maintain consistent component behavior",
          "Don't change context without user initiation",
        ],
        identification: [
          "Use consistent labeling for similar functions",
          "Maintain consistent visual design patterns",
          "Provide consistent interaction patterns",
        ],
      },
      inputAssistance: {
        errorIdentification: [
          "Clearly identify form errors",
          "Provide specific error messages",
          "Use multiple methods to indicate errors",
        ],
        errorSuggestion: [
          "Provide suggestions for fixing errors",
          "Offer examples of correct input format",
          "Guide users toward successful completion",
        ],
        errorPrevention: [
          "Validate input in real-time when helpful",
          "Provide confirmation for important actions",
          "Allow users to review before submitting",
        ],
      },
    },

    // Robust
    robust: {
      compatibility: {
        html: [
          "Use valid, semantic HTML",
          "Ensure proper nesting of elements",
          "Use appropriate HTML elements for content",
        ],
        aria: [
          "Use ARIA attributes correctly",
          "Don't override semantic HTML with ARIA",
          "Test with multiple assistive technologies",
        ],
      },
    },
  },

  // Component-Specific Accessibility
  components: {
    buttons: {
      requirements: [
        "Use <button> element for interactive buttons",
        "Provide accessible names (text content or aria-label)",
        "Include focus indicators",
        "Indicate disabled state to screen readers",
      ],
      ariaAttributes: {
        "aria-label": "When button text isn't descriptive enough",
        "aria-describedby": "For additional button description",
        "aria-pressed": "For toggle buttons",
        "aria-expanded": "For buttons that control collapsible content",
        "aria-haspopup": "For buttons that open menus/dialogs",
      },
      implementation: `
        <button 
          type="button"
          aria-label="Close dialog"
          aria-describedby="close-help"
        >
          <CloseIcon aria-hidden="true" />
        </button>
        <div id="close-help" className="sr-only">
          Closes the dialog and returns to the previous page
        </div>
      `,
    },

    forms: {
      requirements: [
        "Associate labels with form controls",
        "Provide clear error messages",
        "Group related form controls",
        "Indicate required fields",
      ],
      ariaAttributes: {
        "aria-label": "When no visible label is present",
        "aria-labelledby": "When label is separate from control",
        "aria-describedby": "For help text and error messages",
        "aria-required": "For required fields",
        "aria-invalid": "For fields with validation errors",
      },
      implementation: `
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email Address
            <span className="required" aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            aria-describedby="email-help email-error"
            aria-required="true"
            aria-invalid={hasError ? "true" : "false"}
          />
          <div id="email-help" className="help-text">
            We'll never share your email address
          </div>
          {hasError && (
            <div id="email-error" className="error-text" role="alert">
              Please enter a valid email address
            </div>
          )}
        </div>
      `,
    },

    navigation: {
      requirements: [
        "Use semantic navigation elements",
        "Provide skip links for main content",
        "Indicate current page/section",
        "Use proper heading hierarchy",
      ],
      ariaAttributes: {
        "aria-current": "For current page/step indicators",
        "aria-label": "For navigation landmarks",
        "aria-expanded": "For collapsible navigation items",
        role: "navigation for nav elements",
      },
      implementation: `
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <a href="/dashboard" aria-current="page">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/portfolio">Portfolio</a>
            </li>
          </ul>
        </nav>
      `,
    },

    modals: {
      requirements: [
        "Trap focus within modal",
        "Return focus to trigger element",
        "Provide accessible close methods",
        "Use proper ARIA attributes",
      ],
      ariaAttributes: {
        role: "dialog or alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "Reference to modal title",
        "aria-describedby": "Reference to modal description",
      },
      implementation: `
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <h2 id="modal-title">Confirm Action</h2>
          <p id="modal-description">
            Are you sure you want to delete this item?
          </p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      `,
    },

    tables: {
      requirements: [
        "Use proper table markup",
        "Provide table captions",
        "Use header cells appropriately",
        "Associate data cells with headers",
      ],
      ariaAttributes: {
        "aria-label": "For table description",
        "aria-describedby": "For additional table information",
        scope: "For header cell associations",
      },
      implementation: `
        <table aria-label="Startup portfolio data">
          <caption>
            Portfolio companies with funding status and stage
          </caption>
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Stage</th>
              <th scope="col">Funding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TechCorp</td>
              <td>Series A</td>
              <td>$2M</td>
            </tr>
          </tbody>
        </table>
      `,
    },
  },

  // Testing Guidelines
  testing: {
    automated: {
      tools: [
        "axe-core - Comprehensive accessibility testing",
        "Lighthouse - Built into Chrome DevTools",
        "WAVE - Web accessibility evaluation tool",
        "Pa11y - Command line accessibility testing",
      ],
      integration: [
        "Include accessibility tests in CI/CD pipeline",
        "Run tests on every pull request",
        "Set up automated monitoring for production",
        "Use accessibility linting rules",
      ],
    },

    manual: {
      keyboardTesting: [
        "Navigate entire application using only keyboard",
        "Verify all interactive elements are reachable",
        "Check focus indicators are visible",
        "Test custom keyboard shortcuts",
      ],
      screenReaderTesting: [
        "Test with NVDA (Windows) or VoiceOver (Mac)",
        "Verify content is announced correctly",
        "Check heading navigation works properly",
        "Test form completion workflow",
      ],
      colorTesting: [
        "Use color blindness simulators",
        "Test in high contrast mode",
        "Verify information isn't color-dependent",
        "Check contrast ratios manually",
      ],
    },

    userTesting: {
      participants: [
        "Include users with disabilities in testing",
        "Test with actual assistive technology users",
        "Gather feedback on usability and accessibility",
        "Iterate based on real user experiences",
      ],
      scenarios: [
        "Complete key user workflows",
        "Test error handling and recovery",
        "Verify complex interactions work properly",
        "Check mobile accessibility",
      ],
    },
  },

  // Implementation Checklist
  checklist: {
    development: [
      "Use semantic HTML elements",
      "Provide proper ARIA attributes",
      "Ensure keyboard navigation works",
      "Include focus indicators",
      "Test with screen readers",
      "Validate HTML markup",
      "Check color contrast ratios",
      "Provide text alternatives",
    ],
    design: [
      "Design with accessibility in mind",
      "Use sufficient color contrast",
      "Don't rely on color alone",
      "Design clear focus indicators",
      "Consider cognitive load",
      "Plan for different screen sizes",
      "Design error states clearly",
      "Consider motion sensitivity",
    ],
    content: [
      "Write clear, concise copy",
      "Use descriptive link text",
      "Provide helpful error messages",
      "Structure content logically",
      "Use appropriate heading levels",
      "Write meaningful alt text",
      "Avoid jargon and complex language",
      "Provide instructions clearly",
    ],
  },
} as const

// Screen Reader Only Utility Class
export const screenReaderOnly = {
  className: "sr-only",
  styles: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0",
  },
  usage: "For content that should only be available to screen readers",
}
