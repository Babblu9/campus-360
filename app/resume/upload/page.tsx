"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ResumeUpload } from "@/components/resume-upload"
import { ResumeResults } from "@/components/resume-results"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ParsedResume {
  skills: string[]
  education: string
  gpa: string
  internships: Array<{
    company: string
    matchScore: number
  }>
}

export default function ResumeUploadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null)

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    try {
      // Simulate API call to parse resume
      // TODO: Replace with actual API call
      // const formData = new FormData()
      // formData.append("resume", file)
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/parse`, {
      //   method: "POST",
      //   body: formData,
      // })
      // const data = await response.json()

      // Mock parsed data
      setTimeout(() => {
        setParsedData({
          skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Machine Learning", "Data Analysis"],
          education: "B.Tech in Computer Science",
          gpa: "8.2/10",
          internships: [
            { company: "TCS", matchScore: 0.89 },
            { company: "Accenture", matchScore: 0.78 },
            { company: "Infosys", matchScore: 0.92 },
          ],
        })
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Upload error:", error)
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upload Resume</h1>
            <p className="text-muted-foreground mt-1">AI-powered resume parsing and internship matching</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Content */}
        {!parsedData ? (
          <ResumeUpload onUpload={handleUpload} isLoading={isLoading} />
        ) : (
          <div className="space-y-6">
            <ResumeResults data={parsedData} />
            <div className="flex gap-3">
              <Button onClick={() => setParsedData(null)} variant="outline" className="flex-1 h-12 bg-transparent">
                Upload Another
              </Button>
              <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Apply to Internships
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
