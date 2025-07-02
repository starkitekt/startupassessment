# Component Usage Guide

This guide provides detailed instructions on how to use the design system components effectively.

## Getting Started

Import components from the design system:

\`\`\`tsx
import { Button, Input, Card, Badge } from '@/components/design-system'
\`\`\`

## Button Component

### Basic Usage
\`\`\`tsx
<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
\`\`\`

### With Icons
\`\`\`tsx
import { Download, Settings } from 'lucide-react'

<Button leftIcon={<Download />}>Download</Button>
<Button rightIcon={<Settings />}>Settings</Button>
\`\`\`

### Loading State
\`\`\`tsx
<Button loading>Processing...</Button>
\`\`\`

### Full Width
\`\`\`tsx
<Button fullWidth>Full Width Button</Button>
\`\`\`

## Input Component

### Basic Input
\`\`\`tsx
<Input 
  label="Email" 
  placeholder="Enter your email" 
  type="email"
/>
\`\`\`

### With Validation
\`\`\`tsx
<Input 
  label="Password" 
  type="password"
  error="Password is required"
  required
/>
\`\`\`

### With Icons and Addons
\`\`\`tsx
import { Search, Mail } from 'lucide-react'

<Input 
  label="Search" 
  leftIcon={<Search />}
  placeholder="Search..."
/>

<Input 
  label="Website" 
  leftAddon="https://"
  placeholder="example.com"
/>
\`\`\`

## Card Component

### Basic Card
\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
\`\`\`

### Interactive Card
\`\`\`tsx
<Card interactive onClick={() => console.log('Clicked')}>
  <CardContent>
    <p>This card is clickable</p>
  </CardContent>
</Card>
\`\`\`

### Elevated Card
\`\`\`tsx
<Card variant="elevated">
  <CardContent>
    <p>This card has enhanced shadow</p>
  </CardContent>
</Card>
\`\`\`

## Badge Component

### Basic Badges
\`\`\`tsx
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
\`\`\`

### With Icons
\`\`\`tsx
import { User, Settings } from 'lucide-react'

<Badge leftIcon={<User />}>User</Badge>
<Badge rightIcon={<Settings />}>Settings</Badge>
\`\`\`

### Removable Badge
\`\`\`tsx
<Badge removable onRemove={() => console.log('Removed')}>
  Removable
</Badge>
\`\`\`

## Best Practices

### Accessibility
- Always provide proper labels for form inputs
- Use semantic HTML elements
- Ensure sufficient color contrast
- Test with keyboard navigation

### Performance
- Import only the components you need
- Use the `asChild` prop for custom implementations
- Leverage the design tokens for consistent styling

### Consistency
- Follow the established color palette
- Use the spacing system for layouts
- Maintain typography hierarchy
- Apply consistent interaction patterns

## Customization

### Extending Components
\`\`\`tsx
import { Button, buttonVariants } from '@/components/design-system'
import { cn } from '@/lib/utils'

const CustomButton = ({ className, ...props }) => {
  return (
    <Button 
      className={cn("custom-styles", className)}
      {...props}
    />
  )
}
\`\`\`

### Using Design Tokens
\`\`\`tsx
import { designTokens } from '@/components/design-system'

const customStyles = {
  color: designTokens.colors.primary[500],
  fontSize: designTokens.typography.fontSize.lg[0],
  padding: designTokens.spacing.md,
}
\`\`\`

## Migration Guide

### From shadcn/ui Components
Most components are drop-in replacements with enhanced features:

\`\`\`tsx
// Before
import { Button } from '@/components/ui/button'

// After
import { Button } from '@/components/design-system'
\`\`\`

### New Props and Features
- `loading` prop for buttons
- `leftIcon` and `rightIcon` for buttons and badges
- Enhanced input validation states
- Interactive card variants
- Removable badges

## Troubleshooting

### Common Issues
1. **Styling not applied**: Ensure Tailwind CSS is properly configured
2. **Icons not showing**: Import icons from `lucide-react`
3. **TypeScript errors**: Check prop types and required properties

### Getting Help
- Check the design system showcase at `/design-system`
- Review component documentation
- Test components in isolation
