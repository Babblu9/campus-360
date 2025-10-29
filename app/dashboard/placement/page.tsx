"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { ChartCard } from "@/components/chart-card"
import { AlertCard } from "@/components/alert-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAuth } from "@/lib/auth-context"
import { Briefcase, TrendingUp, Users } from "lucide-react"

export default function PlacementDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Mock data
  const internshipStatus = [
    { name: "Placed", value: 45, fill: "var(--color-chart-1)" },
    { name: "Pending", value: 30, fill: "var(--color-chart-2)" },
    { name: "Rejected", value: 15, fill: "var(--color-chart-3)" },
  ]

  const recruiterData = [
    { company: "TCS", offers: 12, conversions: 8 },
    { company: "Accenture", offers: 10, conversions: 7 },
    { company: "Infosys", offers: 15, conversions: 11 },
    { company: "Wipro", offers: 8, conversions: 5 },
    { company: "Cognizant", offers: 9, conversions: 6 },
  ]

  const placementData = [
    {
      id: 1,
      studentName: "Raj Kumar",
      company: "TCS",
      position: "Software Engineer",
      salary: "6.5 LPA",
      status: "Placed",
    },
    {
      id: 2,
      studentName: "Priya Singh",
      company: "Accenture",
      position: "Data Analyst",
      salary: "5.8 LPA",
      status: "Placed",
    },
    {
      id: 3,
      studentName: "Amit Patel",
      company: "Infosys",
      position: "Full Stack Dev",
      salary: "7.2 LPA",
      status: "Placed",
    },
    {
      id: 4,
      studentName: "Neha Sharma",
      company: "Wipro",
      position: "QA Engineer",
      salary: "5.5 LPA",
      status: "Placed",
    },
    {
      id: 5,
      studentName: "Vikram Singh",
      company: "Pending",
      position: "Multiple Offers",
      salary: "TBD",
      status: "Pending",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout requiredRole="placement">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout requiredRole="placement">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Placement Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track internships and manage recruiter relationships</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Placements"
            value="45"
            subtitle="This semester"
            trend={{ value: 12, isPositive: true }}
            icon={<Briefcase className="w-8 h-8" />}
          />
          <MetricCard
            title="Avg Package"
            value="6.5 LPA"
            subtitle="Highest: 8.2 LPA"
            trend={{ value: 5, isPositive: true }}
            icon={<TrendingUp className="w-8 h-8" />}
          />
          <MetricCard
            title="Active Recruiters"
            value="12"
            subtitle="On campus"
            trend={{ value: 3, isPositive: true }}
            icon={<Users className="w-8 h-8" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="73%"
            subtitle="Offers to placements"
            trend={{ value: 8, isPositive: true }}
            icon={<TrendingUp className="w-8 h-8" />}
          />
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <AlertCard
            title="High Conversion Rate"
            description="Conversion rate improved to 73% this month. Great progress!"
            level="success"
            action={{ label: "View Details", onClick: () => {} }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Internship Status */}
          <ChartCard title="Internship Status" subtitle="Current distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={internshipStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {internshipStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Top Recruiters */}
          <ChartCard title="Top Recruiters" subtitle="By offers and conversions">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recruiterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="offers" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="conversions" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Placement Records */}
        <DataTable
          title="Placement Records"
          columns={[
            { key: "studentName", label: "Student Name", sortable: true },
            { key: "company", label: "Company", sortable: true },
            { key: "position", label: "Position", sortable: true },
            { key: "salary", label: "Salary", sortable: true },
            {
              key: "status",
              label: "Status",
              render: (value) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    value === "Placed"
                      ? "bg-green-100 text-green-700"
                      : value === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={placementData}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Add Recruiter
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Export Report
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Schedule Drive
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
