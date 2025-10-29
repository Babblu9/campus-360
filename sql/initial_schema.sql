# install deps
pnpm add -D prisma ts-node typescript @types/node
pnpm add @prisma/client

# generate client
pnpm prisma generate

# set DATABASE_URL in .env (example)
export DATABASE_URL="postgresql://user:password@localhost:5432/campus360?schema=public"

# run seed (TypeScript)
node -r ts-node/register prisma/seed.ts-- Initial PostgreSQL schema for Campus360
-- Run this as a migration or apply via psql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('ADMIN','FACULTY','STUDENT','PLACEMENT')),
  avatar_url text,
  department_id uuid,
  is_active boolean NOT NULL DEFAULT true,
  provider text,
  provider_id text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);

-- departments
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  title text NOT NULL,
  credits integer,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- classes
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  term text,
  year integer,
  faculty_id uuid REFERENCES users(id),
  location text,
  schedule jsonb,
  created_at timestamptz DEFAULT now()
);

-- sections
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  name text,
  capacity integer,
  created_at timestamptz DEFAULT now()
);

-- enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  section_id uuid REFERENCES sections(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  status text DEFAULT 'ENROLLED'
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_enrollment_student_section ON enrollments(student_id, section_id);

-- attendance sessions
CREATE TABLE IF NOT EXISTS attendance_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id),
  section_id uuid REFERENCES sections(id),
  method text,
  qr_token text,
  started_at timestamptz,
  expires_at timestamptz,
  metadata jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- attendance records
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_session_id uuid REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL,
  method text,
  recorded_at timestamptz DEFAULT now(),
  recorded_by uuid REFERENCES users(id),
  device_info jsonb,
  UNIQUE (attendance_session_id, student_id)
);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_session ON attendance_records(attendance_session_id);

-- resumes
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  filename text,
  s3_key text,
  mime_type text,
  size_bytes bigint,
  status text DEFAULT 'PENDING',
  uploaded_at timestamptz DEFAULT now(),
  parsed_at timestamptz,
  metadata jsonb
);

CREATE TABLE IF NOT EXISTS resume_parses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE,
  parse_result jsonb,
  raw_text text,
  created_at timestamptz DEFAULT now()
);

-- recruiters, jobs, applications
CREATE TABLE IF NOT EXISTS recruiters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_email text,
  website text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id uuid REFERENCES recruiters(id),
  title text NOT NULL,
  description text,
  min_cgpa numeric(3,2),
  eligible_batches int[],
  positions int,
  last_date timestamptz,
  location text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  resume_id uuid REFERENCES resumes(id),
  status text DEFAULT 'APPLIED',
  applied_at timestamptz DEFAULT now(),
  metadata jsonb
);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);

-- audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY,
  user_id uuid,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  ip_address text,
  user_agent text,
  payload jsonb,
  level text DEFAULT 'INFO',
  created_at timestamptz DEFAULT now()
);

-- events
CREATE TABLE IF NOT EXISTS events (
  id bigserial PRIMARY KEY,
  name text,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Index suggestions and maintenance notes
-- Consider partitioning attendance_records by recorded_at for very large datasets
