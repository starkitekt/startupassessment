# Startup Incubator Portal - Design System

## Overview
This design system provides a comprehensive foundation for building consistent, accessible, and scalable user interfaces across the startup incubator platform. It defines visual standards, interaction patterns, and implementation guidelines.

## 1. Design Principles

### Core Principles
- **Clarity**: Information should be clear and easy to understand
- **Consistency**: Similar elements should behave similarly
- **Accessibility**: Usable by everyone, regardless of ability
- **Efficiency**: Enable users to complete tasks quickly
- **Trust**: Convey professionalism and reliability

### Visual Principles
- **Hierarchy**: Clear information architecture
- **Balance**: Harmonious composition of elements
- **Contrast**: Sufficient differentiation between elements
- **Alignment**: Organized and structured layouts

## 2. Color System

### Primary Colors
- **Primary Blue**: `hsl(210, 100%, 50%)` - Main brand color for primary actions
- **Primary Blue Dark**: `hsl(210, 100%, 35%)` - Hover states and emphasis
- **Primary Blue Light**: `hsl(210, 100%, 65%)` - Subtle backgrounds and accents

### Secondary Colors
- **Secondary Gray**: `hsl(240, 4.8%, 95.9%)` - Secondary actions and backgrounds
- **Secondary Gray Dark**: `hsl(240, 5.9%, 10%)` - Secondary text

### Semantic Colors
- **Success**: `hsl(140, 60%, 40%)` - Success states and positive actions
- **Warning**: `hsl(45, 100%, 50%)` - Warning states and caution
- **Error**: `hsl(0, 72.2%, 50.6%)` - Error states and destructive actions
- **Info**: `hsl(210, 100%, 50%)` - Informational content

### Neutral Colors
- **Background**: `hsl(0, 0%, 100%)` / `hsl(240, 10%, 3.9%)` (dark)
- **Foreground**: `hsl(240, 10%, 3.9%)` / `hsl(0, 0%, 98%)` (dark)
- **Muted**: `hsl(240, 4.8%, 95.9%)` / `hsl(240, 3.7%, 15.9%)` (dark)
- **Border**: `hsl(240, 5.9%, 90%)` / `hsl(240, 3.7%, 15.9%)` (dark)

### Chart Colors
- **Chart 1**: `hsl(210, 100%, 50%)` - Primary data series
- **Chart 2**: `hsl(210, 90%, 65%)` - Secondary data series
- **Chart 3**: `hsl(240, 5%, 60%)` - Tertiary data series
- **Chart 4**: `hsl(180, 70%, 40%)` - Additional data series
- **Chart 5**: `hsl(270, 70%, 55%)` - Additional data series

## 3. Typography

### Font Families
- **Headers**: Neue Montreal - Clean, modern sans-serif for headings
- **Body**: Geist - Readable sans-serif for body text and UI elements
- **Monospace**: IBM Plex Mono - For code, numbers, and data

### Type Scale
- **Display**: 48px/60px (3rem/3.75rem) - Hero headings
- **H1**: 36px/44px (2.25rem/2.75rem) - Page titles
- **H2**: 30px/36px (1.875rem/2.25rem) - Section headings
- **H3**: 24px/32px (1.5rem/2rem) - Subsection headings
- **H4**: 20px/28px (1.25rem/1.75rem) - Component headings
- **H5**: 18px/28px (1.125rem/1.75rem) - Small headings
- **H6**: 16px/24px (1rem/1.5rem) - Micro headings
- **Body Large**: 18px/28px (1.125rem/1.75rem) - Large body text
- **Body**: 16px/24px (1rem/1.5rem) - Default body text
- **Body Small**: 14px/20px (0.875rem/1.25rem) - Small body text
- **Caption**: 12px/16px (0.75rem/1rem) - Captions and labels

### Font Weights
- **Light**: 300 - Subtle text
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

## 4. Spacing System

### Base Unit: 4px (0.25rem)

### Spacing Scale
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)
- **4xl**: 80px (5rem)
- **5xl**: 96px (6rem)

### Layout Spacing
- **Container Max Width**: 1400px
- **Container Padding**: 32px (2rem)
- **Section Spacing**: 96px (6rem)
- **Component Spacing**: 32px (2rem)
- **Element Spacing**: 16px (1rem)

## 5. Grid System

### Breakpoints
- **sm**: 640px - Small devices
- **md**: 768px - Medium devices
- **lg**: 1024px - Large devices
- **xl**: 1280px - Extra large devices
- **2xl**: 1536px - 2X large devices

### Grid Structure
- **Columns**: 12-column grid system
- **Gutters**: 24px (1.5rem)
- **Margins**: 24px (1.5rem) on mobile, 48px (3rem) on desktop

## 6. Component Specifications

### Buttons
- **Height**: 40px (2.5rem) default, 36px (2.25rem) small, 44px (2.75rem) large
- **Padding**: 16px (1rem) horizontal, 8px (0.5rem) vertical
- **Border Radius**: 6px (0.375rem)
- **Font Weight**: 500 (medium)

### Input Fields
- **Height**: 40px (2.5rem)
- **Padding**: 12px (0.75rem) horizontal, 8px (0.5rem) vertical
- **Border**: 1px solid border color
- **Border Radius**: 6px (0.375rem)
- **Focus Ring**: 2px primary color

### Cards
- **Padding**: 24px (1.5rem)
- **Border Radius**: 8px (0.5rem)
- **Shadow**: 0 1px 3px rgba(0, 0, 0, 0.1)
- **Border**: 1px solid border color

### Tables
- **Row Height**: 48px (3rem)
- **Cell Padding**: 16px (1rem) horizontal, 12px (0.75rem) vertical
- **Header Font Weight**: 600 (semibold)
- **Border**: 1px solid border color

## 7. Accessibility Standards

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

### Focus States
- **Focus Ring**: 2px solid primary color
- **Focus Offset**: 2px from element
- **Keyboard Navigation**: All interactive elements must be keyboard accessible

### Text Requirements
- **Minimum Font Size**: 14px (0.875rem)
- **Line Height**: Minimum 1.4 for body text
- **Text Spacing**: Adequate spacing between lines and paragraphs

## 8. Animation & Motion

### Timing Functions
- **Ease Out**: cubic-bezier(0, 0, 0.2, 1) - Entering animations
- **Ease In**: cubic-bezier(0.4, 0, 1, 1) - Exiting animations
- **Ease In Out**: cubic-bezier(0.4, 0, 0.2, 1) - Transitioning animations

### Duration
- **Fast**: 150ms - Small state changes
- **Medium**: 300ms - Component transitions
- **Slow**: 500ms - Page transitions

### Easing Principles
- **Functional**: Animations should serve a purpose
- **Subtle**: Not distracting from content
- **Consistent**: Same timing across similar interactions

## 9. Implementation Guidelines

### CSS Custom Properties
All design tokens are implemented as CSS custom properties in `app/globals.css` for easy theming and maintenance.

### Tailwind Configuration
Design system values are configured in `tailwind.config.ts` for consistent usage across components.

### Component Library
Reusable components are built using shadcn/ui as the foundation, with custom styling applied through the design system.

### Documentation
Each component includes usage guidelines, code examples, and accessibility considerations.
\`\`\`

Now let's create a comprehensive design tokens file:
