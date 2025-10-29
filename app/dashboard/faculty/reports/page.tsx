"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function FacultyReportsPage() {
  // Mock data for reports
  const performanceData = [
    { course: "Data Structures", avg: 78, pass: 92 },
    { course: "Database Systems", avg: 72, pass: 85 },
    { course: "Web Development", avg: 85, pass: 95 },
    { course: "Machine Learning", avg: 68, pass: 78 },
  ]

  const attendanceTrend = [
    { month: "Aug", attendance: 92 },
    { month: "Sep", attendance: 88 },
    { month: "Oct", attendance: 85 },
    { month: "Nov", attendance: 89 },
  ]

  const studentsAtRisk = [
    { id: 1, name: "John Doe", course: "Data Structures", attendance: "65%", grade: "C-", status: "At Risk" },
    { id: 2, name: "Jane Smith", course: "Database Systems", attendance: "72%", grade: "D+", status: "At Risk" },
    { id: 3, name: "Bob Wilson", course: "Web Development", attendance: "58%", grade: "F", status: "Critical" },
  ]

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">View performance metrics and student progress</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Performance */}
          <ChartCard title="Course Performance" subtitle="Average scores and pass rates">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="course" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="avg" name="Average Score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pass" name="Pass Rate %" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Attendance Trend */}
          <ChartCard title="Attendance Trend" subtitle="Monthly average attendance">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
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
        </div>

        {/* Students at Risk Table */}
        <DataTable
          title="Students at Risk"
          columns={[
            { key: "name", label: "Student Name", sortable: true },
            { key: "course", label: "Course", sortable: true },
            { key: "attendance", label: "Attendance" },
            { key: "grade", label: "Current Grade" },
            {
              key: "status",
              label: "Status",
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    value === "Critical"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={studentsAtRisk}
        />
      </div>
    </DashboardLayout>
  )
}