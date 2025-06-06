"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { PortfolioCompanies } from "@/components/portfolio/portfolio-companies"
import { PortfolioInvestments } from "@/components/portfolio/portfolio-investments"
import { PortfolioReports } from "@/components/portfolio/portfolio-reports"

export default function PortfolioPage() {
  return (
    <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Portfolio Management</h1>
        <p className="text-muted-foreground">
          Comprehensive portfolio management, tracking, and analytics for your startup investments.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PortfolioOverview />
        </TabsContent>

        <TabsContent value="companies">
          <PortfolioCompanies />
        </TabsContent>

        <TabsContent value="investments">
          <PortfolioInvestments />
        </TabsContent>

        <TabsContent value="reports">
          <PortfolioReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
