"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/metric-card"
import { Building2, Users, Briefcase, TrendingUp } from "lucide-react"

export default function PlacementRecruitersPage() {
  const recruiters = [
    {
      id: 1,
      company: "Microsoft",
      role: "Software Engineer",
      openings: 15,
      package: "₹18-24 LPA",
      status: "Ongoing",
      deadline: "Nov 15, 2025",
    },
    {
      id: 2,
      company: "Google",
      role: "Product Manager",
      openings: 5,
      package: "₹25-32 LPA",
      status: "Upcoming",
      deadline: "Dec 1, 2025",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Full Stack Developer",
      openings: 20,
      package: "₹16-22 LPA",
      status: "Ongoing",
      deadline: "Nov 20, 2025",
    },
  ]

  return (
    <DashboardLayout requiredRole="placement">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recruiters</h1>
            <p className="text-sm text-muted-foreground">Manage campus recruitment drives</p>
          </div>
          <Button>Add Recruiter</Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Companies"
            value="12"
            subtitle="This season"
            icon={<Building2 className="w-8 h-8" />}
          />
          <MetricCard
            title="Total Openings"
            value="156"
            subtitle="Across all roles"
            icon={<Briefcase className="w-8 h-8" />}
          />
          <MetricCard
            title="Students Placed"
            value="89"
            trend={{ value: 12, isPositive: true }}
            subtitle="Out of 120"
            icon={<Users className="w-8 h-8" />}
          />
          <MetricCard
            title="Avg Package"
            value="18.5 LPA"
            trend={{ value: 2.1, isPositive: true }}
            subtitle="This season"
            icon={<TrendingUp className="w-8 h-8" />}
          />
        </div>

        <DataTable
          title="Active Recruitment Drives"
          columns={[
            { key: "company", label: "Company", sortable: true },
            { key: "role", label: "Role", sortable: true },
            { key: "openings", label: "Openings", sortable: true },
            { key: "package", label: "Package" },
            { key: "deadline", label: "Deadline" },
            {
              key: "status",
              label: "Status",
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    value === "Ongoing"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={recruiters}
        />
      </div>
    </DashboardLayout>
  )
}