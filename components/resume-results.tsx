"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface ResumeResult {
  skills: string[]
  education: string
  gpa: string
  internships: Array<{
    company: string
    matchScore: number
  }>
}

interface ResumeResultsProps {
  data: ResumeResult
}

export function ResumeResults({ data }: ResumeResultsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <div>
          <p className="font-semibold text-green-900">Resume Parsed Successfully</p>
          <p className="text-sm text-green-700">Your resume has been analyzed and matched with opportunities</p>
        </div>
      </div>

      {/* Education & GPA */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Education & Profile</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Education</p>
            <p className="font-medium text-foreground">{data.education}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">GPA</p>
            <p className="font-medium text-foreground">{data.gpa}</p>
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Extracted Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Recommended Internships */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Internships</h3>
        <div className="space-y-3">
          {data.internships.map((internship, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">{internship.company}</p>
                <span className="text-sm font-semibold text-primary">
                  {Math.round(internship.matchScore * 100)}% Match
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${internship.matchScore * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
