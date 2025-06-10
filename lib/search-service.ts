// Types for search functionality
export interface SearchResult {
  id: string
  title: string
  description?: string
  type: "startup" | "application" | "report" | "mentor" | "task" | "event" | "document" | "funding"
  url: string
  icon?: string
}

// Mock data for search results
const mockSearchData: SearchResult[] = [
  {
    id: "startup-1",
    title: "TechNova",
    description: "AI-powered fraud detection platform",
    type: "startup",
    url: "/portfolio/technova",
  },
  {
    id: "startup-2",
    title: "HealthAI",
    description: "Healthcare analytics platform",
    type: "startup",
    url: "/portfolio/healthai",
  },
  {
    id: "app-1",
    title: "Funding Application #F-2023-089",
    description: "TechNova Series A funding request",
    type: "application",
    url: "/funding/applications/089",
  },
  {
    id: "app-2",
    title: "Funding Application #F-2023-092",
    description: "HealthAI seed funding request",
    type: "application",
    url: "/funding/applications/092",
  },
  {
    id: "report-1",
    title: "Q3 Performance Report",
    description: "Portfolio performance analysis for Q3 2023",
    type: "report",
    url: "/reports/q3-2023",
  },
  {
    id: "report-2",
    title: "Annual Impact Assessment",
    description: "Social impact evaluation for 2023",
    type: "report",
    url: "/reports/impact-2023",
  },
  {
    id: "mentor-1",
    title: "Sarah Johnson",
    description: "FinTech specialist with 15+ years experience",
    type: "mentor",
    url: "/mentors/sarah-johnson",
  },
  {
    id: "task-1",
    title: "Complete Due Diligence",
    description: "TechNova investment review",
    type: "task",
    url: "/tasks/due-diligence-technova",
  },
  {
    id: "event-1",
    title: "Pitch Day",
    description: "Spring 2023 Cohort presentations",
    type: "event",
    url: "/calendar/pitch-day-2023",
  },
  {
    id: "document-1",
    title: "Investment Term Sheet",
    description: "Standard term sheet template",
    type: "document",
    url: "/documents/term-sheet-template",
  },
  {
    id: "funding-1",
    title: "Series A Fund",
    description: "$10M allocation for tech startups",
    type: "funding",
    url: "/funding/series-a-fund",
  },
]

// Search function that filters results based on query
export async function searchContent(query: string): Promise<SearchResult[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query || query.trim().length < 2) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()

  return mockSearchData.filter((item) => {
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      (item.description && item.description.toLowerCase().includes(normalizedQuery))
    )
  })
}

// Function to get search result icon based on type
export function getSearchResultIcon(type: string): string {
  switch (type) {
    case "startup":
      return "Building"
    case "application":
      return "FileText"
    case "report":
      return "BarChart"
    case "mentor":
      return "Users"
    case "task":
      return "CheckSquare"
    case "event":
      return "Calendar"
    case "document":
      return "File"
    case "funding":
      return "DollarSign"
    default:
      return "Search"
  }
}

// Function to get type label for display
export function getTypeLabel(type: string): string {
  switch (type) {
    case "startup":
      return "Startup"
    case "application":
      return "Application"
    case "report":
      return "Report"
    case "mentor":
      return "Mentor"
    case "task":
      return "Task"
    case "event":
      return "Event"
    case "document":
      return "Document"
    case "funding":
      return "Funding"
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}
