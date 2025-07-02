# Design System Overview - Startup Incubator Portal

This document outlines the foundational elements of our design system. It aims to ensure consistency, improve efficiency, and maintain a high-quality user experience across the platform.

## 1. Principles

*   **User-Centric**: Design for the needs and workflows of Incubator Managers, Founders, Mentors, and Financial Officers.
*   **Accessible**: Strive for WCAG 2.1 AA compliance to ensure usability for everyone.
*   **Consistent**: Provide a predictable and coherent experience across all modules.
*   **Efficient**: Enable rapid development and updates through reusable components and clear guidelines.
*   **Government Compliant**: Reflect the professionalism and trustworthiness expected of a government-affiliated platform.

## 2. Brand & Visual Identity

### 2.1. Colors

Our color palette is defined in \`app/globals.css\` and utilized through Tailwind CSS utility classes and CSS variables.

*   **Primary**: JPMC Blue (e.g., \`hsl(var(--primary))\`, \`bg-primary\`) - Used for key actions, active states, and branding accents.
    *   Light: \`hsl(210 100% 35%)\`
    *   Dark: \`hsl(210 100% 75%)\`
*   **Secondary**: (e.g., \`hsl(var(--secondary))\`, \`bg-secondary\`) - Used for less prominent actions, backgrounds for secondary content.
*   **Accent**: (e.g., \`hsl(var(--accent))\`, \`bg-accent\`) - Used for hover states, subtle highlights.
*   **Destructive**: (e.g., \`hsl(var(--destructive))\`, \`bg-destructive\`) - Used for actions that delete data or have negative consequences.
*   **Background & Foreground**: (\`hsl(var(--background))\`, \`hsl(var(--foreground))\`) - Standard text and background colors, adapting to light/dark mode.
*   **Card & Popover**: Specific background/foreground for card and popover elements.
*   **Border & Input**: Colors for borders and input fields.
*   **Ring**: Focus ring color.
*   **Charting Palette**: A dedicated set of colors for charts (\`charting-primary\`, \`charting-secondary\`, etc.) defined in \`tailwind.config.ts\` and \`globals.css\`.

Refer to \`tailwind.config.ts\` for the full HSL definitions and \`globals.css\` for the CSS variable setup.

### 2.2. Typography

We use two primary font families, configured in \`app/layout.tsx\` and \`tailwind.config.ts\`.

*   **Primary Font (Geist)**: Used for all general UI text, headings, labels, and body content.
    *   Class: \`font-geist\` (applied to \`body\`)
    *   Usage: Headings, paragraphs, labels, button text.
*   **Monospace Font (IBM Plex Mono)**: Used for numerical data, code snippets, or tabular data where alignment is critical.
    *   Class: \`font-ibm-plex-mono\` (custom utility class \`.text-numerical\`)
    *   Usage: Financial figures, IDs, progress percentages in tables.

**Hierarchy (Conceptual - apply via Tailwind utility classes):**

*   **Display**: \`text-4xl font-bold\`, \`text-5xl font-extrabold\` (for page titles or hero sections)
*   **Heading 1 (h1)**: \`text-3xl font-bold\` (e.g., \`DashboardContent\` page title)
*   **Heading 2 (h2)**: \`text-2xl font-semibold\` (e.g., Card titles like "Application Trends")
*   **Heading 3 (h3)**: \`text-xl font-semibold\` (e.g., Section titles within forms)
*   **Body Large**: \`text-lg\`
*   **Body Medium (Default)**: \`text-base\` (implicitly) or \`text-md\`
*   **Body Small**: \`text-sm\` (e.g., card descriptions, input field helper text)
*   **Caption**: \`text-xs\` (e.g., timestamps, small meta information)

Line heights and letter spacing should generally follow Tailwind's defaults, adjusted as needed for readability.

### 2.3. Iconography

We use **Lucide React** as our primary icon library.
*   **Import**: \`import { ImageIcon as IconName } from 'lucide-react'\`
*   **Sizing**: Typically \`h-4 w-4\` or \`h-5 w-5\` depending on context. Icons in buttons often use \`mr-2\` for spacing.
*   **Color**: Icons generally inherit text color (\`currentColor\`) or use \`text-muted-foreground\` for subtle appearances.
*   **Consistency**: Use icons purposefully to enhance clarity and provide visual cues, but avoid overusing them.

### 2.4. Spacing & Layout

*   Utilize Tailwind CSS spacing scale (multiples of 4px generally).
*   Maintain consistent padding within components like Cards, Buttons.
*   Use CSS Grid and Flexbox for layout.
*   Container class in \`app/layout.tsx\` provides max-width and centering.

## 3. UI Component Library

Our UI component library is primarily built upon **shadcn/ui**. These components are pre-styled, accessible, and themeable.
*   **Location**: Components are typically imported from \`@/components/ui/\`.
*   **Customization**: While shadcn/ui provides the base, custom components are built by composing these primitives or extending them.
*   **Examples**: Button, Card, Input, Select, DropdownMenu, Avatar, Badge, Table, Progress, Tooltip, Toaster, etc.

**Do NOT rebuild components that shadcn/ui already provides unless significant customization is absolutely necessary.**

## 4. Pattern System (Examples)

Patterns are reusable solutions to common design problems.

### 4.1. Form Section

*   **Description**: A standard way to group related form fields.
*   **Elements**:
    *   Section Heading (e.g., \`<h3 className="text-lg font-semibold flex items-center"><Icon /> Section Title</h3>\`)
    *   Optional description text.
    *   Fields grouped within a bordered container (e.g., \`<section className="space-y-4 p-4 border rounded-md">\`).
*   **Example**: See "Corporate Details" or "Financial Details" sections in \`app/startups/applications/new/page.tsx\`.

### 4.2. Page Header with Actions

*   **Description**: Standard layout for page titles, descriptions, and primary action buttons.
*   **Elements**:
    *   Main title (\`h1\`) and subtitle/description (\`p.text-muted-foreground\`).
    *   A flex container to align title block to the left and action buttons to the right (on larger screens).
*   **Example**: See the header section in \`app/dashboard/page.tsx\` or \`app/mentors/page.tsx\`.

### 4.3. Data Table with Filters

*   **Description**: Displaying tabular data with search and filter capabilities.
*   **Elements**:
    *   Filter bar (often in a \`Card\`) containing search input and select dropdowns for filtering.
    *   Data table (\`Table\` component from shadcn/ui) with sortable headers (future enhancement).
    *   Pagination (future enhancement).
*   **Example**: See \`PortfolioContent\` or \`MentorsContent\` components.

## 5. Accessibility (A11y)

*   Follow WCAG 2.1 AA guidelines.
*   Use semantic HTML.
*   Ensure keyboard navigability for all interactive elements.
*   Provide sufficient color contrast.
*   Include \`alt\` text for images.
*   Use ARIA attributes where necessary.
*   Test with screen readers and accessibility tools.

## 6. Light & Dark Modes

*   Theming is handled by \`ThemeProvider\` and CSS variables in \`globals.css\`.
*   Ensure all custom styles and components correctly adapt.
*   Test components in both modes.

## 7. Contribution & Evolution

This design system is a living document. As the application evolves, new components and patterns will be added, and existing ones may be refined. Contributions and suggestions are welcome.
Regularly review and update based on user feedback and changing requirements.
