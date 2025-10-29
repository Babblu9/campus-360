"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Menu, LogOut, User } from "lucide-react"
import Image from "next/image"

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogoClick = () => {
    const role = user?.role || ''
    const dashboardPath = `/dashboard/${role}`
    router.push(dashboardPath)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      student: "Student",
      faculty: "Faculty",
      placement: "Placement Officer",
      admin: "Administrator",
    }
    return labels[role] || role
  }

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image 
                src="/placeholder-logo.png" 
                alt="Campus360" 
                width={32}
                height={32}
                className="object-contain"
                priority
              />
              <span className="font-semibold text-foreground hidden sm:inline">Campus360</span>
            </button>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{getRoleLabel(user?.role || "")}</p>
            </div>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
