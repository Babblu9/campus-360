"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
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
import { TrendingDown, Clock, CheckCircle, Users } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Mock data
  const dropoutTrend = [
    { month: "Jan", dropout: 2.1 },
    { month: "Feb", dropout: 2.3 },
    { month: "Mar", dropout: 2.0 },
    { month: "Apr", dropout: 1.8 },
    { month: "May", dropout: 1.5 },
    { month: "Jun", dropout: 1.2 },
  ]

    interface DepartmentMetric {
    id: number
    dept: string
    students: number
    placement: number
    avgCGPA: number
  }

  const departmentMetrics: DepartmentMetric[] = [
    {
      id: 1,
      dept: "Computer Science",
      students: 850,
      placement: 95,
      avgCGPA: 8.9,
    },
    {
      id: 2,
      dept: "Electronics",
      students: 720,
      placement: 88,
      avgCGPA: 8.5,
    },
    {
      id: 3,
      dept: "Mechanical",
      students: 680,
      placement: 82,
      avgCGPA: 8.2,
    },
    {
      id: 4,
      dept: "Civil",
      students: 590,
      placement: 78,
      avgCGPA: 8.0,
    },
  ]

  const systemLogs = [
    { id: 1, action: "User Login", user: "admin@college.edu", timestamp: "2025-10-29 14:32", status: "Success" },
    { id: 2, action: "Data Export", user: "faculty@college.edu", timestamp: "2025-10-29 13:15", status: "Success" },
    { id: 3, action: "User Creation", user: "admin@college.edu", timestamp: "2025-10-29 12:45", status: "Success" },
    {
      id: 4,
      action: "Report Generation",
      user: "placement@college.edu",
      timestamp: "2025-10-29 11:20",
      status: "Success",
    },
    { id: 5, action: "Database Sync", user: "system", timestamp: "2025-10-29 10:00", status: "Success" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout requiredRole="admin">
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
    <DashboardLayout requiredRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Institution-wide analytics and system management</p>
        </div>

        {/* Key KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Dropout Risk"
            value="1.2%"
            subtitle="This month"
            trend={{ value: 3, isPositive: true }}
            icon={<TrendingDown className="w-8 h-8" />}
          />
          <MetricCard
            title="Mean Time-to-Hire"
            value="45 days"
            subtitle="Average"
            trend={{ value: 8, isPositive: true }}
            icon={<Clock className="w-8 h-8" />}
          />
          <MetricCard
            title="Project Completion"
            value="87%"
            subtitle="On schedule"
            trend={{ value: 5, isPositive: true }}
            icon={<CheckCircle className="w-8 h-8" />}
          />
          <MetricCard
            title="Total Users"
            value="2,450"
            subtitle="Active accounts"
            trend={{ value: 12, isPositive: true }}
            icon={<Users className="w-8 h-8" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dropout Trend */}
          <ChartCard title="Dropout Risk Trend" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dropoutTrend}>
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
                <Line
                  type="monotone"
                  dataKey="dropout"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Department Metrics */}
          <ChartCard title="Department Performance" subtitle="By placement rate">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" dataKey="dept" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="placement" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="avgCGPA" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Department Overview */}
        <DataTable
          title="Department Overview"
          columns={[
            { key: "dept", label: "Department", sortable: true },
            { key: "students", label: "Total Students", sortable: true },
            {
              key: "placement",
              label: "Placement Rate",
              sortable: true,
              render: (value) => `${value}%`,
            },
            {
              key: "avgCGPA",
              label: "Avg CGPA",
              sortable: true,
              render: (value) => typeof value === 'number' ? value.toFixed(2) : value,
            },
          ]}
          data={departmentMetrics}
        />

        {/* System Logs */}
        <DataTable
          title="System Audit Logs"
          columns={[
            { key: "action", label: "Action", sortable: true },
            { key: "user", label: "User", sortable: true },
            { key: "timestamp", label: "Timestamp", sortable: true },
            {
              key: "status",
              label: "Status",
              render: (value) => (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{value}</span>
              ),
            },
          ]}
          data={systemLogs}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 bg-transparent">
            Sync LMS Data
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Generate Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
