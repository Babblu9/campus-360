import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect root to the login page to avoid Next.js 404 when no root page exists.
  redirect('/login')
}
