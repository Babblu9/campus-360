"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { ChartCard } from "@/components/chart-card"
import { AlertCard } from "@/components/alert-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAuth } from "@/lib/auth-context"
import { Users, TrendingDown, AlertTriangle } from "lucide-react"

export default function FacultyDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Mock data
  const courseAverages = [
    { course: "DSA", average: 78 },
    { course: "DBMS", average: 72 },
    { course: "Web Dev", average: 85 },
    { course: "ML", average: 68 },
  ]

  const attendanceTrend = [
    { week: "Week 1", attendance: 92 },
    { week: "Week 2", attendance: 88 },
    { week: "Week 3", attendance: 85 },
    { week: "Week 4", attendance: 80 },
  ]

  const atRiskStudents = [
    { id: 1, name: "Raj Kumar", email: "raj@college.edu", attendance: 65, gpa: 5.2, riskLevel: "High" },
    { id: 2, name: "Priya Singh", email: "priya@college.edu", attendance: 72, gpa: 6.1, riskLevel: "Medium" },
    { id: 3, name: "Amit Patel", email: "amit@college.edu", attendance: 58, gpa: 4.8, riskLevel: "High" },
    { id: 4, name: "Neha Sharma", email: "neha@college.edu", attendance: 75, gpa: 6.5, riskLevel: "Low" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout requiredRole="faculty">
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
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your classes and monitor student progress</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Students"
            value="120"
            subtitle="Across all classes"
            icon={<Users className="w-8 h-8" />}
          />
          <MetricCard
            title="Avg Attendance"
            value="81%"
            subtitle="This semester"
            trend={{ value: -4, isPositive: false }}
            icon={<TrendingDown className="w-8 h-8" />}
          />
          <MetricCard
            title="Class Average"
            value="75.8"
            subtitle="Out of 100"
            trend={{ value: 2, isPositive: true }}
            icon={<Users className="w-8 h-8" />}
          />
          <MetricCard
            title="At-Risk Students"
            value="8"
            subtitle="Require intervention"
            trend={{ value: 1, isPositive: false }}
            icon={<AlertTriangle className="w-8 h-8" />}
          />
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <AlertCard
            title="Low Attendance Alert"
            description="5 students have attendance below 75%. Consider reaching out to them."
            level="warning"
            action={{ label: "View Students", onClick: () => {} }}
          />
          <AlertCard
            title="Class Performance"
            description="Average class score dropped by 4% this week. Review recent assessments."
            level="info"
            action={{ label: "View Details", onClick: () => {} }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Averages */}
          <ChartCard title="Course Averages" subtitle="Current semester">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseAverages}>
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
                <Bar dataKey="average" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Attendance Trend */}
          <ChartCard title="Attendance Trend" subtitle="Last 4 weeks">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
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
                  dataKey="attendance"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-accent)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* At-Risk Students Table */}
        <DataTable
          title="At-Risk Students"
          columns={[
            { key: "name", label: "Name", sortable: true },
            { key: "email", label: "Email", sortable: true },
            {
              key: "attendance",
              label: "Attendance",
              sortable: true,
              render: (value) => `${value}%`,
            },
            {
              key: "gpa",
              label: "GPA",
              sortable: true,
              render: (value) => value.toFixed(2),
            },
            {
              key: "riskLevel",
              label: "Risk Level",
              render: (value) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    value === "High"
                      ? "bg-red-100 text-red-700"
                      : value === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={atRiskStudents}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Mark Attendance
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Export Report
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Send Notifications
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
