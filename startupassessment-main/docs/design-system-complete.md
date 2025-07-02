# Complete Design System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Components](#components)
7. [Accessibility](#accessibility)
8. [Motion & Animation](#motion--animation)
9. [Icons & Illustrations](#icons--illustrations)
10. [Implementation Guide](#implementation-guide)
11. [Maintenance & Updates](#maintenance--updates)
12. [New Layout & Utility Components (2024 Update)](#new-layout--utility-components-2024-update)

## Overview

The Startup Incubator Portal Design System is a comprehensive collection of reusable components, design tokens, and guidelines that ensure consistency, accessibility, and efficiency across the entire application.

### Goals
- **Consistency**: Unified visual language across all interfaces
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design
- **Efficiency**: Accelerated development through reusable components
- **Scalability**: Flexible system that grows with the product
- **Quality**: High-quality user experiences through tested patterns

### Architecture
\`\`\`
Design System
├── Design Tokens (colors, typography, spacing)
├── Component Library (buttons, inputs, cards, etc.)
├── Layout System (grid, containers, spacing)
├── Accessibility Guidelines (WCAG compliance)
├── Documentation (usage, examples, best practices)
└── Testing Framework (automated and manual testing)
\`\`\`

## Design Principles

### 1. Clarity
- Information should be easy to understand and act upon
- Use clear visual hierarchy to guide user attention
- Provide immediate feedback for user actions
- Eliminate ambiguity in interface elements

### 2. Consistency
- Similar elements should behave similarly across the application
- Maintain consistent spacing, colors, and typography
- Use established patterns for common interactions
- Apply consistent naming conventions

### 3. Accessibility
- Design for users of all abilities and assistive technologies
- Ensure sufficient color contrast and readable text sizes
- Provide keyboard navigation for all interactive elements
- Include proper semantic markup and ARIA attributes

### 4. Efficiency
- Enable users to complete tasks quickly and easily
- Reduce cognitive load through familiar patterns
- Provide shortcuts and accelerators for power users
- Minimize the number of steps required for common actions

### 5. Trust
- Convey professionalism and reliability through design
- Provide clear feedback and error handling
- Maintain data security and privacy
- Use consistent branding and visual identity

## Color System

### Primary Palette
Our primary color palette is built around a professional blue that conveys trust and reliability while maintaining excellent accessibility.

\`\`\`typescript
primary: {
  50: "#f0f9ff",   // Lightest - backgrounds, subtle accents
  100: "#e0f2fe",  // Very light - hover states, backgrounds
  200: "#bae6fd",  // Light - borders, disabled states
  300: "#7dd3fc",  // Medium light - secondary elements
  400: "#38bdf8",  // Medium - interactive elements
  500: "#0ea5e9",  // Base primary - main brand color
  600: "#0284c7",  // Medium dark - hover states
  700: "#0369a1",  // Dark - active states, emphasis
  800: "#075985",  // Very dark - text on light backgrounds
  900: "#0c4a6e",  // Darkest - high contrast text
}
\`\`\`

### Semantic Colors
Status and feedback colors that communicate meaning clearly:

- **Success**: Green palette for positive actions and confirmations
- **Warning**: Amber palette for cautions and important notices
- **Error**: Red palette for errors and destructive actions
- **Info**: Blue palette for informational content

### Usage Guidelines
- Use primary colors for main actions and brand elements
- Apply semantic colors consistently for status communication
- Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Never use color alone to convey information

## Typography

### Font Stack
\`\`\`css
/* Display/Heading Font */
font-family: "Neue Montreal", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Body/UI Font */
font-family: "Geist", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Monospace Font */
font-family: "IBM Plex Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
\`\`\`

### Type Scale
Our type scale is designed to create clear hierarchy while maintaining readability across all devices:

| Element | Desktop | Tablet | Mobile | Usage |
|---------|---------|--------|--------|-------|
| Display XL | 60px | 48px | 40px | Hero headlines |
| Display L | 48px | 40px | 32px | Section heroes |
| H1 | 36px | 32px | 28px | Page titles |
| H2 | 30px | 28px | 24px | Section headings |
| H3 | 24px | 22px | 20px | Subsection headings |
| H4 | 20px | 18px | 18px | Component headings |
| Body Large | 18px | 16px | 16px | Lead paragraphs |
| Body | 16px | 16px | 15px | Default body text |
| Body Small | 14px | 14px | 13px | Secondary text |
| Caption | 12px | 12px | 11px | Fine print, labels |

### Typography Guidelines
- Maintain consistent line heights (1.5-1.7 for body text)
- Use appropriate font weights to create hierarchy
- Ensure adequate spacing between text elements
- Test readability across different screen sizes

## Spacing & Layout

### Spacing Scale
Based on a 4px grid system for mathematical consistency:

\`\`\`typescript
spacing: {
  1: "4px",    // Minimal spacing
  2: "8px",    // Small spacing
  3: "12px",   // Medium spacing
  4: "16px",   // Default spacing
  6: "24px",   // Large spacing
  8: "32px",   // Component spacing
  12: "48px",  // Section spacing
  16: "64px",  // Major section spacing
  24: "96px",  // Page-level spacing
}
\`\`\`

### Grid System
12-column responsive grid with consistent gutters:

- **Mobile**: 16px gutters, full-width container
- **Tablet**: 24px gutters, 768px max container
- **Desktop**: 32px gutters, 1280px max container
- **Large**: 48px gutters, 1536px max container

### Layout Patterns
- **Header**: 64px height, sticky positioning
- **Sidebar**: 256px width, collapsible on mobile
- **Main Content**: Flexible width with max constraints
- **Cards**: 24px padding, 8px border radius
- **Forms**: 24px field spacing, 8px label spacing

## Components

### Button System
Comprehensive button variants for all use cases:

#### Primary Buttons
- **Usage**: Main actions, form submissions, primary CTAs
- **Styling**: Solid background, white text, subtle shadow
- **States**: Default, hover, active, focus, disabled, loading

#### Secondary Buttons
- **Usage**: Supporting actions, alternative options
- **Styling**: Light background, dark text, border
- **States**: All primary states plus outline variant

#### Specialized Buttons
- **Destructive**: For dangerous actions (delete, remove)
- **Ghost**: For subtle actions in dense interfaces
- **Icon**: For toolbar actions and compact layouts

### Form Components
Accessible and user-friendly form elements:

#### Input Fields
- **Text Input**: Standard text entry with validation states
- **Email/Password**: Specialized inputs with appropriate keyboards
- **Number**: Numeric input with increment/decrement controls
- **Search**: Search-specific styling and behavior

#### Selection Components
- **Select Dropdown**: Single selection from options list
- **Multi-select**: Multiple selection with tags/chips
- **Radio Buttons**: Single selection from visible options
- **Checkboxes**: Multiple selection with clear states

#### Validation System
- **Real-time Validation**: Immediate feedback for user input
- **Error States**: Clear error indication with helpful messages
- **Success States**: Positive confirmation of valid input
- **Helper Text**: Guidance and examples for complex fields

### Data Display
Components for presenting information clearly:

#### Tables
- **Responsive Design**: Adapts to different screen sizes
- **Sorting**: Click-to-sort with clear indicators
- **Filtering**: Built-in filtering capabilities
- **Pagination**: Efficient navigation through large datasets

#### Cards
- **Content Cards**: For displaying grouped information
- **Interactive Cards**: Clickable cards with hover states
- **Status Cards**: Cards with semantic color coding
- **Media Cards**: Cards with images and rich content

### Navigation Components
Intuitive navigation patterns:

#### Primary Navigation
- **Top Navigation**: Main site navigation with dropdowns
- **Breadcrumbs**: Hierarchical navigation trail
- **Pagination**: Page-by-page navigation for content
- **Tabs**: Section switching within pages

#### Secondary Navigation
- **Sidebar Navigation**: Persistent navigation for applications
- **Context Menus**: Right-click and action menus
- **Dropdown Menus**: Hierarchical menu structures
- **Mobile Navigation**: Responsive navigation patterns

## Accessibility

### WCAG 2.1 AA Compliance
Our design system meets or exceeds WCAG 2.1 AA standards:

#### Color and Contrast
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)
- **UI Components**: 3:1 minimum contrast ratio
- **Color Independence**: Information never conveyed by color alone

#### Keyboard Navigation
- **Tab Order**: Logical and predictable navigation sequence
- **Focus Indicators**: Clearly visible focus states (2px outline)
- **Keyboard Shortcuts**: Efficient navigation for power users
- **Focus Management**: Proper focus handling in dynamic content

#### Screen Reader Support
- **Semantic HTML**: Proper use of HTML elements for meaning
- **ARIA Attributes**: Appropriate ARIA labels and descriptions
- **Alternative Text**: Descriptive alt text for all images
- **Status Announcements**: Important changes announced to screen readers

### Testing Strategy
- **Automated Testing**: axe-core integration in CI/CD pipeline
- **Manual Testing**: Regular keyboard and screen reader testing
- **User Testing**: Testing with actual users with disabilities
- **Continuous Monitoring**: Ongoing accessibility monitoring

## Motion & Animation

### Animation Principles
- **Purposeful**: Animations should serve a functional purpose
- **Subtle**: Animations should enhance, not distract from content
- **Consistent**: Use consistent timing and easing across the application
- **Respectful**: Respect user preferences for reduced motion

### Timing and Easing
\`\`\`css
/* Duration */
--duration-fast: 150ms;    /* Small state changes */
--duration-medium: 300ms;  /* Component transitions */
--duration-slow: 500ms;    /* Page transitions */

/* Easing Functions */
--ease-out: cubic-bezier(0, 0, 0.2, 1);      /* Entering animations */
--ease-in: cubic-bezier(0.4, 0, 1, 1);       /* Exiting animations */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Transitioning animations */
\`\`\`

### Common Animations
- **Fade In/Out**: For showing/hiding content
- **Slide In/Out**: For panels and drawers
- **Scale**: For emphasis and feedback
- **Loading States**: For async operations

## Icons & Illustrations

### Icon System
- **Library**: Lucide React for consistent, high-quality icons
- **Sizing**: 16px, 20px, 24px standard sizes
- **Usage**: Functional icons with proper accessibility labels
- **Style**: Consistent stroke width and corner radius

### Illustration Guidelines
- **Style**: Clean, modern illustrations that match brand aesthetic
- **Color**: Use brand colors consistently in illustrations
- **Context**: Illustrations should support and clarify content
- **Accessibility**: Provide alternative text for informative illustrations

## Implementation Guide

### Getting Started
1. **Install Dependencies**: Add design system package to your project
2. **Import Styles**: Include CSS variables and base styles
3. **Use Components**: Import and use components from the library
4. **Follow Guidelines**: Adhere to spacing, color, and typography guidelines

### Code Examples

#### Using Design Tokens
\`\`\`typescript
import { designTokens } from '@/lib/design-system'

const customStyles = {
  color: designTokens.colors.primary[600],
  fontSize: designTokens.typography.typeScale.body.base.fontSize,
  padding: designTokens.spacing.spacing[4].value,
}
\`\`\`

#### Component Usage
\`\`\`tsx
import { Button, Input, Card } from '@/components/design-system'

function MyForm() {
  return (
    <Card padding="md">
      <Input 
        label="Email Address"
        type="email"
        required
        helperText="We'll never share your email"
      />
      <Button variant="primary" size="md">
        Submit
      </Button>
    </Card>
  )
}
\`\`\`

### Best Practices
- **Consistency**: Use design system components instead of custom implementations
- **Accessibility**: Always include proper ARIA attributes and labels
- **Performance**: Import only the components you need
- **Testing**: Test components with keyboard navigation and screen readers

## Maintenance & Updates

### Version Control
- **Semantic Versioning**: Major.Minor.Patch version numbering
- **Change Documentation**: Detailed changelog for each release
- **Migration Guides**: Clear instructions for breaking changes
- **Deprecation Notices**: Advance warning for component changes

### Contribution Guidelines
- **Design Review**: All changes reviewed by design team
- **Code Review**: Technical review for implementation quality
- **Testing**: Comprehensive testing including accessibility
- **Documentation**: Updated documentation for all changes

### Governance
- **Design System Team**: Dedicated team for maintenance and evolution
- **Stakeholder Input**: Regular feedback from product teams
- **User Research**: Ongoing research to validate design decisions
- **Performance Monitoring**: Regular performance and accessibility audits

---

## Quick Reference

### Color Variables
\`\`\`css
/* Primary Colors */
--color-primary-500: hsl(210, 100%, 56%);
--color-primary-600: hsl(210, 100%, 50%);
--color-primary-700: hsl(210, 100%, 42%);

/* Semantic Colors */
--color-success-500: hsl(142, 71%, 45%);
--color-warning-500: hsl(45, 93%, 47%);
--color-error-500: hsl(0, 84%, 60%);
\`\`\`

### Typography Classes
\`\`\`css
.text-display-xl { font-size: 3.75rem; line-height: 1; }
.text-h1 { font-size: 2.25rem; line-height: 1.2; }
.text-body { font-size: 1rem; line-height: 1.7; }
.text-caption { font-size: 0.75rem; line-height: 1.6; }
\`\`\`

### Spacing Classes
\`\`\`css
.p-4 { padding: 1rem; }
.m-6 { margin: 1.5rem; }
.gap-4 { gap: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
\`\`\`

This comprehensive design system provides the foundation for building consistent, accessible, and scalable user interfaces across the entire Startup Incubator Portal application.
\`\`\`

## New Layout & Utility Components (2024 Update)

### Section
A wrapper for consistent vertical spacing between sections.

```tsx
import { Section } from "@/components/section"

<Section>
  <h2>Section Title</h2>
  <p>Section content...</p>
</Section>
```

- Use for all major content blocks within a page.
- Applies `space-y-6` by default for vertical rhythm.

---

### BleedContainer
A utility for full-width/bleed sections that extend beyond the main page padding.

```tsx
import { BleedContainer } from "@/components/bleed-container"

<BleedContainer>
  <div className="bg-primary text-white p-8">Bleed content</div>
</BleedContainer>
```

- Use for charts, banners, or sections that should visually break out of the main container.

---

### EmptyState
A standardized empty state for no data scenarios.

```tsx
import { EmptyState } from "@/components/ui/empty-state"

<EmptyState message="No results found." />
```

- Use in tables, lists, or dashboards when there is no data to display.
- Accepts an optional `icon` prop for custom icons.

---

### StandardizedPageLayout
A layout wrapper for all main pages, ensuring consistent header, spacing, and actions.

```tsx
import { StandardizedPageLayout } from "@/components/standardized-page-layout"

<StandardizedPageLayout
  title="Page Title"
  description="Optional description."
  actions={<Button>Action</Button>}
>
  <Section>...</Section>
</StandardizedPageLayout>
```

- Use for all top-level pages.
- Handles page title, description, actions, and main content spacing.

---

**Guidelines:**
- Always use these wrappers for new pages and when refactoring old ones.
- Never use hardcoded pixel values for spacing; use design tokens or utility classes.
- Document any new layout or utility component here for team reference.
