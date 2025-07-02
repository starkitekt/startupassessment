import { Table } from "@/components/ui/table"
import { StatusBadge } from "@/components/molecules/StatusBadge"

export function PortfolioTable({ companies }: { companies: any[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sector</th>
          <th>Stage</th>
          <th>MRR (INR)</th>
          <th>Health</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.sector}</td>
            <td>{company.stage}</td>
            <td>{company.mrr}</td>
            <td>{company.health}</td>
            <td><StatusBadge status={company.status} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
} 