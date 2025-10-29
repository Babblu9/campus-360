"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { QRScanner } from "@/components/qr-scanner"
import { AttendanceStatus } from "@/components/attendance-status"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface AttendanceRecord {
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  timestamp: string
  status: "success" | "error" | "pending"
}

export default function AttendanceScanPage() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(true)
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  const handleScan = async (qrData: string) => {
    try {
      // Parse QR data (format: student_id:course_id)
      const [studentId, courseId] = qrData.split(":")

      // Add to records with pending status
      const newRecord: AttendanceRecord = {
        studentId,
        studentName: `Student ${studentId}`,
        courseId,
        courseName: `Course ${courseId}`,
        timestamp: new Date().toLocaleTimeString(),
        status: "pending",
      }

      setRecords((prev) => [newRecord, ...prev])

      // Simulate API call
      setTimeout(() => {
        setRecords((prev) => prev.map((record, index) => (index === 0 ? { ...record, status: "success" } : record)))
      }, 1000)

      // TODO: Replace with actual API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendance/mark`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ student_id: studentId, course_id: courseId, timestamp: new Date().toISOString() }),
      // })
    } catch (error) {
      console.error("Scan error:", error)
    }
  }

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
            <p className="text-muted-foreground mt-1">Scan QR code to mark your attendance</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Instructions */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            Position the QR code within the frame to scan. Your attendance will be marked automatically.
          </p>
        </Card>

        {/* Scanner */}
        <QRScanner onScan={handleScan} isScanning={isScanning} />

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsScanning(!isScanning)}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isScanning ? "Stop Scanning" : "Start Scanning"}
          </Button>
          <Button variant="outline" onClick={() => setRecords([])} className="flex-1 h-12 bg-transparent">
            Clear Records
          </Button>
        </div>

        {/* Status */}
        <AttendanceStatus records={records} />

        {/* Summary */}
        {records.length > 0 && (
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-900">Attendance Marked</p>
                <p className="text-sm text-green-700 mt-1">
                  {records.filter((r) => r.status === "success").length} out of {records.length} scans successful
                </p>
              </div>
              <Button variant="outline" className="bg-transparent">
                View Details
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
