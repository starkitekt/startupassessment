# Project Context: Startup Incubator Portal (v0 Startup Assessment)

## 1. Project Overview

This project is a web application designed as a **Startup Incubator Portal**. It aims to provide a comprehensive platform for managing various aspects of a startup incubation program, including tracking startups, managing mentors, handling assessments and applications, facilitating requests, and providing analytics. The application is built for different user roles such as Incubator Managers, Mentors, and Startup Founders.

## 2. Core Technologies & Libraries

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **Component Library:** shadcn/ui (built on Radix UI and Tailwind CSS)
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **Forms:** React Hook Form
*   **Schema Validation:** Zod
*   **State Management (Global):** React Context API (`GlobalSettingsContext`)
*   **Theming:** `next-themes` for light/dark mode.

## 3. Key Modules & Features (Current State - v31, based on v24)

### 3.1. Dashboard (`app/page.tsx`, `components/dashboard-v2-content.tsx`)
*   Displays key metrics (Total Startups, Active Applications, Funding Disbursed, Success Rate).
*   Features charts for Application Trends and Sector Distribution.
*   Shows recent applications and quick actions.
*   Includes a system health overview.

### 3.2. Portfolio Management
*   **Portfolio Overview (`app/portfolio/page.tsx`, `components/portfolio-content.tsx`):**
    *   Displays a table of startups with details like sector, stage, funding, MRR.
    *   Includes filtering by sector, stage, and a search bar.
    *   Features charts for portfolio overview (e.g., by sector, stage).
    *   "Add New Startup" button.
*   **Add New Startup (`app/portfolio/new/page.tsx`):**
    *   Form for adding new startups with fields for name, logo, sector, stage, description, funding, MRR, etc.
    *   Uses `useGlobalSettings` for currency display.
*   **Startup Detail Page (`app/portfolio/[startupId]/page.tsx`):** (Placeholder, structure exists)
*   **Edit Startup Page (`app/portfolio/[startupId]/edit/page.tsx`):** (Placeholder, structure exists)

### 3.3. Mentor Management
*   **Mentors Overview (`app/mentors/page.tsx`, `components/mentors-content.tsx`):**
    *   Displays a list/grid of mentors with details like expertise, availability.
    *   Includes filtering and search.
    *   "Add New Mentor" button.
    *   Modal for providing feedback on mentors (`ProvideMentorFeedbackModal`).
*   **Add New Mentor (`app/mentors/new/page.tsx`):**
    *   Form for adding new mentors with fields for name, title, email, expertise, bio.
*   **Mentor Detail Page (`app/mentors/[mentorId]/page.tsx`):** (Placeholder, structure exists)

### 3.4. Assessment & Application Management
*   **Assessments Overview (`app/assessments/page.tsx`, `components/assessment-content.tsx`):**
    *   Lists assessments/applications with status, stage, reviewer.
    *   Filtering and search capabilities.
    *   "New Assessment" button.
*   **New Assessment/Application (`app/assessments/new/page.tsx` & `app/startups/applications/new/page.tsx`):**
    *   Detailed multi-section form for startup applications.
    *   Includes corporate details, financial details, document uploads, legal declarations.
    *   Uses Zod for complex validation (file size, types, regex for CIN/PAN/GSTIN).
    *   "Load Dummy Data" feature for training/testing.
*   **Assessment Detail Page (`app/assessments/[assessmentId]/page.tsx`):** (Placeholder, structure exists)

### 3.5. Requests Management (`app/requests/page.tsx`, `components/requests-content.tsx`)
*   Manages various types of requests (e.g., funding, resources, mentorship).
*   Displays requests in a table with status, priority, assignee.
*   Filtering by status, type, priority.
*   Modal for creating/editing requests (`RequestFormModal`).
*   Role-based actions (e.g., only managers can approve certain requests).

### 3.6. Task Management (`app/tasks/page.tsx`)
*   Simple task list with pending and completed sections.
*   Allows marking tasks as complete.
*   Fields: title, due date, priority, status, assignee, related entity.
*   Placeholder for more advanced features.

### 3.7. Analytics & Reporting
*   **Analytics Page (`app/analytics/page.tsx`, `components/analytics-content.tsx`):**
    *   Advanced analytics dashboard with multiple charts (KPIs, trends, distributions).
    *   Date range picker for filtering data.
    *   Focus on financial metrics, cohort analysis, mentor engagement.
*   **Reports Page (`app/reports/page.tsx`, `components/reports-content.tsx`):** (Placeholder, content to be created)

### 3.8. User Settings (`app/settings/page.tsx`)
*   Tabbed interface for:
    *   **Profile:** Update personal information, profile picture.
    *   **Notifications:** Manage email and in-app notification preferences.
    *   **Appearance:** Theme selection (light, dark, system).
    *   **Security:** Password change, 2FA setup (placeholder).

### 3.9. Knowledge Base (`app/knowledge-base/page.tsx`)
*   FAQ section using accordions.
*   Search functionality for articles/FAQs.
*   Placeholder for guides and resources.

### 3.10. Support (`app/support/page.tsx`)
*   Contact form for submitting support tickets.
*   Links to Knowledge Base and FAQs.

## 4. Global State & Configuration

*   **`GlobalSettingsContext` (`contexts/global-settings-context.tsx`):**
    *   Manages selected country, currency, available countries/currencies, and exchange rates.
    *   Provides a `formatCurrency` function.
    *   Fetches exchange rates from a mock API.
    *   Base currency is INR.
*   **`ClientLayout` (`app/clientLayout.tsx`):**
    *   Wraps the main content, providing `GlobalSettingsProvider` and `ThemeProvider`.
    *   Includes `TopNavigation` and `Breadcrumbs`.
    *   Displays an informational banner for loading states (user role, exchange rates).

## 5. User Roles & Permissions

*   **`useUserRole` hook (`hooks/use-user-role.ts`):**
    *   Simulates fetching user role based on a mock user ID.
    *   Defines roles: `IncubatorManager`, `Mentor`, `StartupFounder`, `FinancialOfficer`, `Reviewer`.
    *   Provides functions to check permissions (e.g., `canViewAnalytics`, `canManageUsers`).
*   Permissions are used to conditionally render UI elements or restrict actions.

## 6. Forms & Data Validation

*   **React Hook Form:** Used for managing form state, submission, and validation.
*   **Zod:** Used for schema definition and validation, integrated with React Hook Form via `zodResolver`.
*   Complex validation rules are implemented (e.g., date ranges, regex for official IDs, file size/type limits).

## 7. Design System & UI (JPMC Theme - Pre-Apple UI Revert)

*   **Theme:** Custom JPMC-inspired theme with specific blues (`jpmc-blue`, `jpmc-darkblue`, `jpmc-lightblue`) and charting colors (`charting-primary`, `charting-positive`, `charting-negative`, etc.).
*   **Typography:**
    *   Primary Font: Geist
    *   Monospace Font: IBM Plex Mono (for numerical data, class `.text-numerical`)
*   **Layout:**
    *   `TopNavigation` component for main navigation.
    *   `Breadcrumbs` for page hierarchy.
    *   Content pages generally use a `space-y-6` or `space-y-8` for vertical rhythm.
    *   Cards are a primary container for content sections.
*   **Iconography:** Lucide React.
*   **Responsiveness:** Implemented through Tailwind CSS utility classes.
*   **Accessibility:** Relies on shadcn/ui's accessible component primitives.

## 8. Current Development Focus & Active Work Items (Summary from Previous Context)

*   **Portfolio Page:** Detailed table, filtering, side panel for startup details.
*   **Reports Page:** Develop charts and export functionality.
*   **Role-Based Access:** Refine logic for conditionally showing/hiding UI elements.
*   **Chart Interactions:** Enhance tooltips, add more interactive features.
*   **Skeleton Loaders:** Implement for data-heavy components.
*   **'Add New Mentor' Form:** Design and implement.
*   **Date Range Picker:** Develop the actual `DatePickerWithRange` component.
*   **Backend Logic:** Connect UI to a backend API (currently all mock data).
*   **'Add New Startup' Form:** Flesh out the existing form with more fields/validation.
*   **Assessment Detail Page:** Develop dynamic page for `assessments/[assessmentId]`.
*   **Mentor Detail Page:** Build out `[mentorId]` page.
*   **Advanced Table Sorting:** Add client-side sorting.
*   **'Content-Aware' Links:** Make links more contextual.
*   **Knowledge Base Content:** Create articles and guides.
*   **Mentor Feedback System Design:** Detail data models and UI.
*   **Tooltips:** Add more tooltips for improved user understanding.
*   **Real Startup Data:** Source data for ~50 startup profiles.

## 9. Deployment Information (from README.md)

*   **Live URL:** [https://vercel.com/abhisheks-projects-0aa722f8/v0-startup-assessment](https://vercel.com/abhisheks-projects-0aa722f8/v0-startup-assessment)
*   **v0 Project Link:** [https://v0.dev/chat/projects/6SuWjob81AH](https://v0.dev/chat/projects/6SuWjob81AH)
*   Deployment is handled via Vercel, synced with a GitHub repository.

This context file should provide a good snapshot of the project's current state and help maintain consistency in future development.
