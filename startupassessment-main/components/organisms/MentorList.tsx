import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MentorList({ mentors }: { mentors: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mentors.map((mentor) => (
        <Card key={mentor.id}>
          <CardHeader>
            <CardTitle>{mentor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">{mentor.expertise}</div>
            <div className="text-xs">{mentor.email}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 