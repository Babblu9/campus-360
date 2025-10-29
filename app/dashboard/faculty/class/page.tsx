"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"

export default function FacultyClassPage() {
  const classes = [
    { id: 1, name: "Data Structures", code: "CS201", students: 45, room: "B-101" },
    { id: 2, name: "Database Systems", code: "CS202", students: 38, room: "A-204" },
    { id: 3, name: "Web Development", code: "CS203", students: 50, room: "C-303" },
  ]

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Classes</h1>
            <p className="text-sm text-muted-foreground">Manage your classes and view students</p>
          </div>
          <div>
            <Button className="h-10">Create Class</Button>
          </div>
        </div>

        <DataTable
          title="Classes"
          columns={[
            { key: "name", label: "Class name", sortable: true },
            { key: "code", label: "Code" },
            { key: "students", label: "Students", sortable: true },
            { key: "room", label: "Room" },
          ]}
          data={classes}
        />
      </div>
    </DashboardLayout>
  )
}
