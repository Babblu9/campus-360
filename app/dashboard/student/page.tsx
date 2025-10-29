"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { ChartCard } from "@/components/chart-card"
import { AlertCard } from "@/components/alert-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAuth } from "@/lib/auth-context"
import { BookOpen, TrendingUp, Users } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API calls
  const attendanceData = [
    { month: "Aug", attendance: 92 },
    { month: "Sep", attendance: 88 },
    { month: "Oct", attendance: 95 },
    { month: "Nov", attendance: 91 },
  ]

  const projectProgress = [
    { name: "Web Dev", value: 85 },
    { name: "ML Project", value: 60 },
    { name: "Database", value: 75 },
    { name: "Mobile App", value: 45 },
  ]

  const internships = [
    { id: 1, company: "TCS", role: "Software Engineer", matchScore: 0.89, status: "Applied" },
    { id: 2, company: "Accenture", role: "Data Analyst", matchScore: 0.78, status: "Shortlisted" },
    { id: 3, company: "Infosys", role: "Full Stack Dev", matchScore: 0.92, status: "Interview" },
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout requiredRole="student">
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
    <DashboardLayout requiredRole="student">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-muted-foreground mt-1">Here's your academic progress overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Attendance"
            value="91%"
            subtitle="This semester"
            trend={{ value: 3, isPositive: true }}
            icon={<BookOpen className="w-8 h-8" />}
          />
          <MetricCard
            title="CGPA"
            value="8.2"
            subtitle="Out of 10"
            trend={{ value: 0.5, isPositive: true }}
            icon={<TrendingUp className="w-8 h-8" />}
          />
          <MetricCard
            title="Projects"
            value="4"
            subtitle="In progress"
            trend={{ value: 2, isPositive: true }}
            icon={<BookOpen className="w-8 h-8" />}
          />
          <MetricCard
            title="Internships"
            value="3"
            subtitle="Opportunities"
            trend={{ value: 1, isPositive: true }}
            icon={<Users className="w-8 h-8" />}
          />
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <AlertCard
            title="Missing Classes"
            description="You've missed 2 classes in Database Systems. Attend the next session to maintain attendance."
            level="warning"
            action={{ label: "View Schedule", onClick: () => {} }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trend */}
          <ChartCard title="Attendance Trend" subtitle="Last 4 months">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
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
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Project Progress */}
          <ChartCard title="Project Progress" subtitle="Current semester">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgress}>
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
                <Bar dataKey="value" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Internship Opportunities */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recommended Internships</h3>
            <p className="text-sm text-muted-foreground mt-1">Based on your profile and skills</p>
          </div>

          <div className="space-y-3">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{internship.company}</h4>
                    <p className="text-sm text-muted-foreground">{internship.role}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      internship.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : internship.status === "Shortlisted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {internship.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Match Score:</span>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${internship.matchScore * 100}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {Math.round(internship.matchScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Upload Resume
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            Mark Attendance
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            View Grades
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
