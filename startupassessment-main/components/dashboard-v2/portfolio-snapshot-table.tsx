"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, ListFilter, MoreHorizontal, Eye, Edit3, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface StartupSnapshot {
  id: string
  name: string
  logoUrl: string
  sector: string
  stage: string
  healthScore: number
  mrr: number
}

interface PortfolioSnapshotTableProps {
  data: StartupSnapshot[]
  onViewAllPortfolio: () => void
}

export function PortfolioSnapshotTable({ data, onViewAllPortfolio }: PortfolioSnapshotTableProps) {
  const { formatCurrency, selectedCurrency } = useGlobalSettings()
  const { toast } = useToast()
  const router = useRouter()

  const viewStartupDetails = (startupId: string) => router.push(`/portfolio/${startupId}`)

  return (
    <Card className="lg:col-span-2 border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-primary" /> Portfolio Snapshot
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Quick overview of recent or key startups.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAllPortfolio}>
          <ListFilter className="mr-2 h-4 w-4" /> View All Portfolio
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Startup</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">MRR ({selectedCurrency.code})</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 4).map((startup) => (
              <TableRow key={startup.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          startup.logoUrl || `/placeholder.svg?height=32&width=32&text=${startup.name.substring(0, 1)}`
                        }
                        alt={startup.name}
                      />
                      <AvatarFallback>{startup.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{startup.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{startup.sector}</Badge>
                </TableCell>
                <TableCell>{startup.stage}</TableCell>
                <TableCell className="text-right text-numerical">{formatCurrency(startup.mrr)}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      startup.healthScore > 80 ? "default" : startup.healthScore > 60 ? "outline" : "destructive"
                    }
                    className={cn(
                      startup.healthScore > 80 && "bg-charting-positive text-charting-positive-foreground",
                      startup.healthScore <= 60 && "bg-charting-negative text-charting-negative-foreground",
                    )}
                  >
                    {startup.healthScore}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          viewStartupDetails(startup.id)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/portfolio/${startup.id}/edit`)
                        }}
                      >
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Startup
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 hover:!text-red-600 dark:hover:!text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          toast({
                            title: `Simulated Deletion: ${startup.name}`,
                            description: "This is a UI demonstration.",
                            variant: "destructive",
                          })
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
