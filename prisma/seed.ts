/*
  Prisma seed script for Campus360 (TypeScript)
  Usage (example):
    1) install deps: pnpm add -D prisma @prisma/client ts-node typescript
    2) set DATABASE_URL in env
    3) run: pnpm prisma generate
    4) run: ts-node prisma/seed.ts

  This script creates a small set of demo data: departments, users, courses, classes, sections, enrollments, attendance sessions & records, resumes, recruiters, jobs, and applications.
*/

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Departments
  const cse = await prisma.department.upsert({
    where: { code: 'CSE' },
    update: {},
    create: { code: 'CSE', name: 'Computer Science & Engineering' }
  })

  const ece = await prisma.department.upsert({
    where: { code: 'ECE' },
    update: {},
    create: { code: 'ECE', name: 'Electronics & Communication' }
  })

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@campus.local' },
    update: {},
    create: {
      email: 'admin@campus.local',
      name: 'Site Admin',
      role: 'ADMIN',
      isActive: true,
      passwordHash: 'dev-password-hash' // replace with real bcrypt in production
    }
  })

  // Faculty
  const prof = await prisma.user.create({
    data: {
      email: 'prof.jones@campus.local',
      name: 'Prof. Sarah Jones',
      role: 'FACULTY',
      departmentId: cse.id
    }
  })

  // Students (small set)
  const students = [] as any[]
  for (let i = 1; i <= 10; i++) {
    const s = await prisma.user.create({
      data: {
        email: `student${i}@campus.local`,
        name: `Student ${i}`,
        role: 'STUDENT',
        departmentId: cse.id
      }
    })
    students.push(s)
  }

  // Courses & class
  const course = await prisma.course.create({
    data: { code: 'CSE101', title: 'Intro to Programming', credits: 3, departmentId: cse.id }
  })

  const klass = await prisma.class.create({
    data: {
      courseId: course.id,
      term: 'Fall',
      year: 2025,
      facultyId: prof.id,
      location: 'Block A - 201',
      schedule: { days: ['Mon', 'Wed'], start: '09:00', end: '10:30' }
    }
  })

  const section = await prisma.section.create({ data: { classId: klass.id, name: 'A', capacity: 60 } })

  // Enroll students
  for (const s of students) {
    await prisma.enrollment.create({ data: { studentId: s.id, sectionId: section.id } })
  }

  // Create an attendance session and mark some students present
  const session = await prisma.attendanceSession.create({
    data: {
      classId: klass.id,
      sectionId: section.id,
      method: 'QR',
      qrToken: randomUUID(),
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      createdById: prof.id
    }
  })

  // Random presence
  for (let i = 0; i < students.length; i++) {
    const status = i % 3 === 0 ? 'ABSENT' : 'PRESENT'
    await prisma.attendanceRecord.create({
      data: {
        attendanceSessionId: session.id,
        studentId: students[i].id,
        status: status as any,
        method: 'QR',
        recordedById: prof.id
      }
    })
  }

  // Resumes (one per student)
  for (const s of students) {
    await prisma.resume.create({
      data: {
        studentId: s.id,
        filename: `${s.name.replace(' ', '_')}_resume.pdf`,
        s3Key: `resumes/${s.id}/resume.pdf`,
        mimeType: 'application/pdf',
        sizeBytes: 12345
      }
    })
  }

  // Recruiter & job
  const recruiter = await prisma.recruiter.create({ data: { name: 'Acme Corp', contactEmail: 'hr@acme.example' } })
  const job = await prisma.job.create({
    data: {
      recruiterId: recruiter.id,
      title: 'Junior Software Engineer',
      description: 'Entry-level software role',
      minCgpa: 6.5,
      eligibleBatches: [2025],
      positions: 3,
      lastDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  })

  // Some applications
  for (let i = 0; i < 5; i++) {
    await prisma.application.create({
      data: {
        jobId: job.id,
        studentId: students[i].id,
        resumeId: undefined,
        status: 'APPLIED'
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
