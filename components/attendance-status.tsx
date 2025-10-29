"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

interface AttendanceRecord {
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  timestamp: string
  status: "success" | "error" | "pending"
}

interface AttendanceStatusProps {
  records: AttendanceRecord[]
}

export function AttendanceStatus({ records }: AttendanceStatusProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Scans</h3>

      <div className="space-y-3">
        {records.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No scans yet. Start scanning QR codes.</p>
        ) : (
          records.map((record, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {record.status === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
                {record.status === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
                {record.status === "pending" && <Clock className="w-5 h-5 text-yellow-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{record.studentName}</p>
                <p className="text-sm text-muted-foreground">{record.courseName}</p>
                <p className="text-xs text-muted-foreground mt-1">{record.timestamp}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                  record.status === "success"
                    ? "bg-green-100 text-green-700"
                    : record.status === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {record.status === "success" ? "Marked" : record.status === "error" ? "Failed" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
