"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "student" | "faculty" | "placement" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  // Accept an optional email so demo/google sign-in can specify which mock user to use
  loginWithGoogle: (token: string, email?: string) => Promise<User>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: Record<string, User & { password: string }> = {
  "student@college.edu": {
    id: "1",
    email: "student@college.edu",
    name: "John Student",
    role: "student",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
  },
  "faculty@college.edu": {
    id: "2",
    email: "faculty@college.edu",
    name: "Dr. Jane Faculty",
    role: "faculty",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=faculty",
  },
  "placement@college.edu": {
    id: "3",
    email: "placement@college.edu",
    name: "Mike Placement",
    role: "placement",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=placement",
  },
  "admin@college.edu": {
    id: "4",
    email: "admin@college.edu",
    name: "Admin User",
    role: "admin",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("campus360_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("campus360_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const mockUser = MOCK_USERS[email]
      if (!mockUser || mockUser.password !== password) {
        throw new Error("Invalid email or password")
      }

      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: mockUser.avatar,
      }

      setUser(userData)
      localStorage.setItem("campus360_user", JSON.stringify(userData))
      localStorage.setItem("campus360_token", `token_${mockUser.id}`)
      return userData
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (token: string, email?: string) => {
    setIsLoading(true)
    try {
      // In production, this would validate the token with Google's servers
      // For demo purposes, allow passing an email to pick which MOCK_USER to sign in as.
      const mockUser = (email && MOCK_USERS[email]) || MOCK_USERS["student@college.edu"]

      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: mockUser.avatar,
      }

      setUser(userData)
      localStorage.setItem("campus360_user", JSON.stringify(userData))
      localStorage.setItem("campus360_token", `token_${mockUser.id}`)
      return userData
    } catch (error) {
      throw new Error("Google login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("campus360_user")
    localStorage.removeItem("campus360_token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
