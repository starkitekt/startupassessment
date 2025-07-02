import { ReactNode } from "react"
 
export function BleedContainer({ children }: { children: ReactNode }) {
  return <div className="-mx-4 md:-mx-8">{children}</div>
} 