"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { AlertCard } from "@/components/alert-card"
import { Button } from "@/components/ui/button"

export default function AdminLogsPage() {
  const systemLogs = [
    {
      id: 1,
      timestamp: "2025-10-29 14:30:22",
      level: "ERROR",
      component: "Authentication",
      message: "Failed login attempt from IP 192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2025-10-29 14:15:10",
      level: "INFO",
      component: "Database",
      message: "Backup completed successfully",
    },
    {
      id: 3,
      timestamp: "2025-10-29 14:00:05",
      level: "WARNING",
      component: "Storage",
      message: "Storage capacity reaching 85%",
    },
    {
      id: 4,
      timestamp: "2025-10-29 13:45:30",
      level: "INFO",
      component: "User Management",
      message: "New faculty account created",
    },
    {
      id: 5,
      timestamp: "2025-10-29 13:30:15",
      level: "ERROR",
      component: "API",
      message: "Internal server error in attendance module",
    },
  ]

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">System Logs</h1>
            <p className="text-sm text-muted-foreground">Monitor system activities and errors</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Clear Logs</Button>
            <Button>Download Logs</Button>
          </div>
        </div>

        {/* Critical Alerts */}
        <AlertCard
          title="System Alert"
          description="2 critical errors detected in the last hour. Review logs for details."
          level="warning"
          action={{ label: "View Details", onClick: () => {} }}
        />

        {/* Logs Table */}
        <DataTable
          title="Recent System Logs"
          columns={[
            { key: "timestamp", label: "Timestamp", sortable: true },
            {
              key: "level",
              label: "Level",
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    value === "ERROR"
                      ? "bg-red-100 text-red-800"
                      : value === "WARNING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {value}
                </span>
              ),
            },
            { key: "component", label: "Component", sortable: true },
            { key: "message", label: "Message" },
          ]}
          data={systemLogs}
        />

        {/* Log Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Error Rate</div>
            <div className="text-2xl font-bold text-red-600">2.3%</div>
            <div className="text-xs text-muted-foreground">Last 24 hours</div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Log Volume</div>
            <div className="text-2xl font-bold">1.2 GB</div>
            <div className="text-xs text-muted-foreground">Total size</div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="text-sm font-medium text-muted-foreground mb-1">Response Time</div>
            <div className="text-2xl font-bold">125ms</div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}