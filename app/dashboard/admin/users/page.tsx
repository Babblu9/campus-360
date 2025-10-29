"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MetricCard } from "@/components/metric-card"
import { Users, GraduationCap, UserCog } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
  lastLogin: string
}

export default function AdminUsersPage() {
  const [showAddUser, setShowAddUser] = useState(false)

  const users: User[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "student",
      department: "Computer Science",
      status: "active",
      lastLogin: "2025-10-29 10:30:00",
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      role: "faculty",
      department: "Electronics",
      status: "active",
      lastLogin: "2025-10-29 09:15:00",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "admin",
      department: "Administration",
      status: "active",
      lastLogin: "2025-10-29 11:45:00",
    },
    {
      id: 4,
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      role: "placement",
      department: "Placement Cell",
      status: "inactive",
      lastLogin: "2025-10-28 16:20:00",
    },
  ]

  const userStats = [
    {
      title: "Total Students",
      value: "3,450",
      subtitle: "+120 this semester",
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
    {
      title: "Active Faculty",
      value: "245",
      subtitle: "92% active now",
      icon: <Users className="w-8 h-8 text-primary" />,
    },
    {
      title: "System Admins",
      value: "12",
      subtitle: "3 online",
      icon: <UserCog className="w-8 h-8 text-primary" />,
    },
  ]

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage system users and access control</p>
          </div>
          <Button onClick={() => setShowAddUser(true)}>Add User</Button>
        </div>

        {/* User Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          {userStats.map((stat, index) => (
            <MetricCard key={index} {...stat} />
          ))}
        </div>

        {/* Users Table */}
        <DataTable<User>
          title="System Users"
          columns={[
            { key: "name", label: "Name", sortable: true },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (value) => {
                const strValue = String(value)
                return (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      strValue === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : strValue === "faculty"
                        ? "bg-blue-100 text-blue-800"
                        : strValue === "placement"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {strValue.charAt(0).toUpperCase() + strValue.slice(1)}
                  </span>
                )
              },
            },
            { key: "department", label: "Department" },
            {
              key: "status",
              label: "Status",
              render: (value) => {
                const strValue = String(value)
                return (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      strValue === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {strValue.charAt(0).toUpperCase() + strValue.slice(1)}
                  </span>
                )
              },
            },
            { key: "lastLogin", label: "Last Login", sortable: true },
          ]}
          data={users}
        />

        {/* Add User Dialog */}
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <div className="space-y-6 p-6">
            <div>
              <h2 className="text-lg font-semibold">Add New User</h2>
              <p className="text-sm text-muted-foreground">Create a new user account in the system.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input placeholder="Enter last name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="Enter email address" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
                <option value="placement">Placement Officer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select department</option>
                <option value="cs">Computer Science</option>
                <option value="ec">Electronics</option>
                <option value="me">Mechanical</option>
                <option value="admin">Administration</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddUser(false)}>Create User</Button>
            </div>
          </div>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}