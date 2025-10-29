"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function PlacementReportsPage() {
  const placementTrends = [
    { year: "2021", placed: 82, companies: 15, avgPackage: 12 },
    { year: "2022", placed: 88, companies: 18, avgPackage: 14 },
    { year: "2023", placed: 92, companies: 20, avgPackage: 16 },
    { year: "2024", placed: 95, companies: 22, avgPackage: 18 },
    { year: "2025", placed: 89, companies: 25, avgPackage: 19 },
  ]

  const departmentPlacements = [
    { dept: "Computer Science", total: 120, placed: 98, package: "22 LPA" },
    { dept: "Information Tech", total: 60, placed: 45, package: "18 LPA" },
    { dept: "Electronics", total: 90, placed: 72, package: "16 LPA" },
    { dept: "Mechanical", total: 60, placed: 42, package: "14 LPA" },
  ]

  return (
    <DashboardLayout requiredRole="placement">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Placement Reports</h1>
            <p className="text-sm text-muted-foreground">Analytics and placement statistics</p>
          </div>
          <Button variant="outline">Download Report</Button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement Trends */}
          <ChartCard title="Placement Trends" subtitle="Year-wise statistics">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="placed"
                  name="Students Placed"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
                <Line
                  type="monotone"
                  dataKey="companies"
                  name="Companies"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-accent)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Package Trends */}
          <ChartCard title="Package Trends" subtitle="Average package by year (in LPA)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="avgPackage"
                  name="Average Package (LPA)"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Department-wise Stats */}
        <DataTable
          title="Department Statistics"
          columns={[
            { key: "dept", label: "Department", sortable: true },
            { key: "total", label: "Total Students", sortable: true },
            { key: "placed", label: "Placed", sortable: true },
            {
              key: "placed",
              label: "Placement %",
              render: (value, row) => `${Math.round((value / row.total) * 100)}%`,
            },
            { key: "package", label: "Avg Package" },
          ]}
          data={departmentPlacements}
        />
      </div>
    </DashboardLayout>
  )
}