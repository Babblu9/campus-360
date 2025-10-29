import type React from "react"
import { Card } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="w-full overflow-x-auto">{children}</div>
    </Card>
  )
}
