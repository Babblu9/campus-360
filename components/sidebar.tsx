"use client"

import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, QrCode, FileText, BarChart3, Settings, Users } from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  const getNavItems = () => {
    const baseItems = [{ label: "Dashboard", href: `/dashboard/${user?.role}`, icon: LayoutDashboard }]

    const roleItems: Record<string, typeof baseItems> = {
      student: [
        ...baseItems,
        { label: "Attendance", href: "/attendance/scan", icon: QrCode },
        { label: "Resume", href: "/resume/upload", icon: FileText },
      ],
      faculty: [
        ...baseItems,
        { label: "Class", href: "/dashboard/faculty/class", icon: Users },
        { label: "Reports", href: "/dashboard/faculty/reports", icon: BarChart3 },
      ],
      placement: [
        ...baseItems,
        { label: "Recruiters", href: "/dashboard/placement/recruiters", icon: Users },
        { label: "Reports", href: "/dashboard/placement/reports", icon: BarChart3 },
      ],
      admin: [
        ...baseItems,
        { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
        { label: "Logs", href: "/dashboard/admin/logs", icon: Settings },
        { label: "Users", href: "/dashboard/admin/users", icon: Users },
      ],
    }

    return roleItems[user?.role || "student"] || baseItems
  }

  const navItems = getNavItems()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <aside
      className={`fixed lg:static left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="p-6 space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-sidebar-primary-foreground">C</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">Campus360</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
