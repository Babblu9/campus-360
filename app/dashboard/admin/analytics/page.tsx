"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { DataTable } from "@/components/data-table"
import { ChartCard } from "@/components/chart-card"
import { AlertCard } from "@/components/alert-card"
import { GraduationCap, Users, Award, TrendingUp } from "lucide-react"

interface DepartmentStats {
  id: number
  department: string
  students: number
  faculty: number
  placements: number
  avgGrade: string
}

export default function AdminAnalyticsPage() {
  const overallStats = [
    {
      title: "Total Students",
      value: "4,235",
      subtitle: "+350 from last year",
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
    {
      title: "Faculty Members",
      value: "245",
      subtitle: "98% attendance rate",
      icon: <Users className="w-8 h-8 text-primary" />,
    },
    {
      title: "Placement Rate",
      value: "92%",
      subtitle: "+5% from last year",
      icon: <Award className="w-8 h-8 text-primary" />,
    },
    {
      title: "Average GPA",
      value: "3.8",
      subtitle: "Top 15% nationally",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
  ]

  const departmentStats: DepartmentStats[] = [
    {
      id: 1,
      department: "Computer Science",
      students: 850,
      faculty: 45,
      placements: 95,
      avgGrade: "A",
    },
    {
      id: 2,
      department: "Electronics",
      students: 720,
      faculty: 38,
      placements: 88,
      avgGrade: "A-",
    },
    {
      id: 3,
      department: "Mechanical",
      students: 680,
      faculty: 42,
      placements: 82,
      avgGrade: "B+",
    },
    {
      id: 4,
      department: "Civil",
      students: 590,
      faculty: 35,
      placements: 78,
      avgGrade: "B+",
    },
  ]

  const enrollmentData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        name: "Computer Science",
        data: [650, 730, 790, 820, 850],
      },
      {
        name: "Electronics",
        data: [550, 590, 640, 680, 720],
      },
      {
        name: "Mechanical",
        data: [600, 580, 620, 650, 680],
      },
      {
        name: "Civil",
        data: [480, 510, 540, 570, 590],
      },
    ],
  }

  const placementData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        name: "Average Package (LPA)",
        data: [6.2, 6.8, 7.5, 8.2, 9.1],
      },
      {
        name: "Highest Package (LPA)",
        data: [18, 22, 25, 32, 45],
      },
    ],
  }

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive analytics and insights of the institution
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {overallStats.map((stat, index) => (
            <MetricCard key={index} {...stat} />
          ))}
        </div>

        {/* Alerts */}
        <div className="grid gap-4 md:grid-cols-2">
          <AlertCard
            title="High Performer Alert"
            description="Computer Science department shows exceptional performance with 95% placement rate"
            level="success"
          />
          <AlertCard
            title="Attention Required"
            description="Civil department shows 5% decrease in average GPA compared to last semester"
            level="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Student Enrollment Trends"
            subtitle="Department-wise enrollment over the years"
          >
            <div className="h-[300px]">
              {/* Add actual chart component here once integrated */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Chart placeholder: Student enrollment trends
              </div>
            </div>
          </ChartCard>
          <ChartCard
            title="Placement Statistics"
            subtitle="Package trends over the years"
          >
            <div className="h-[300px]">
              {/* Add actual chart component here once integrated */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Chart placeholder: Placement statistics
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Department Stats Table */}
        <DataTable<DepartmentStats>
          title="Department Performance"
          columns={[
            { key: "department", label: "Department", sortable: true },
            { key: "students", label: "Students", sortable: true },
            { key: "faculty", label: "Faculty", sortable: true },
            {
              key: "placements",
              label: "Placement %",
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    Number(value) >= 90
                      ? "bg-green-100 text-green-800"
                      : Number(value) >= 80
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {value}%
                </span>
              ),
            },
            {
              key: "avgGrade",
              label: "Avg. Grade",
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    String(value).startsWith("A")
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={departmentStats}
        />
      </div>
    </DashboardLayout>
  )
}