"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

type AlertLevel = "info" | "warning" | "success"

interface AlertCardProps {
  title: string
  description: string
  level?: AlertLevel
  action?: {
    label: string
    onClick: () => void
  }
}

export function AlertCard({ title, description, level = "info", action }: AlertCardProps) {
  const levelConfig: Record<AlertLevel, { bg: string; border: string; icon: React.ReactNode; text: string }> = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
      text: "text-blue-900",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      text: "text-yellow-900",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "text-green-900",
    },
  }

  const config = levelConfig[level]

  return (
    <Card className={`p-4 border ${config.bg} ${config.border}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${config.text}`}>{title}</h4>
          <p className={`text-sm mt-1 ${config.text} opacity-90`}>{description}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`text-sm font-medium mt-3 underline hover:no-underline ${config.text}`}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
