"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const { loginWithGoogle, login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setError("")
      const mockToken = "mock_google_token_" + Date.now()
      const user = await loginWithGoogle(mockToken)
      if (user?.role) router.push(`/dashboard/${user.role}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login with Google")
    }
  }

  const handleGoogleLoginAs = async (demoEmail: string) => {
    try {
      setError("")
      const mockToken = "mock_google_token_" + Date.now()
      const user = await loginWithGoogle(mockToken, demoEmail)
      if (user?.role) router.push(`/dashboard/${user.role}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login with Google")
    }
  }

  const handleEmailLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    try {
      setError("")
      if (!email || !password) return setError("Please enter email and password")
      const user = await login(email, password)
      if (user?.role) router.push(`/dashboard/${user.role}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="flex flex-col justify-center px-6 md:px-12">
          <div className="mb-6 text-center md:text-left">
            <div className="inline-flex items-center justify-center mb-3">
              <Image src="/placeholder-logo.png" alt="Campus360" width={56} height={56} className="object-contain" priority />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Campus360</h1>
            <p className="text-sm text-muted-foreground mt-1">AI-driven student progress tracking for engineering colleges</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your.email@college.edu" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <div className="text-sm text-destructive p-2 bg-destructive/10 rounded">{error}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign in'}</Button>

              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="accent-indigo-600" />
                  <label htmlFor="remember" className="text-sm">Remember me</label>
                </div>
                <a className="text-sm text-indigo-600 hover:underline" href="#">Forgot password?</a>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleGoogleLogin} className="flex-1 inline-flex items-center justify-center gap-2 border rounded px-3 py-2 hover:bg-slate-50">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                    <span className="text-sm">Sign in with Google</span>
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => handleGoogleLoginAs('student@college.edu')} className="py-2 rounded border text-sm">Demo Student</button>
                  <button type="button" onClick={() => handleGoogleLoginAs('faculty@college.edu')} className="py-2 rounded border text-sm">Demo Faculty</button>
                </div>
              </div>
            </form>

            <div className="mt-4 text-xs text-muted-foreground">
              <strong>Demo credentials:</strong> student/faculty/placement/admin — password: <code>password123</code>
            </div>
          </Card>
        </div>

        {/* Right: Marketing */}
        <div className="hidden md:flex items-center justify-center bg-indigo-700 text-white rounded-lg p-8">
          <div className="max-w-lg text-center">
            <h2 className="text-2xl font-semibold mb-3">Campus360 — institutional insights</h2>
            <p className="text-sm text-indigo-200 mb-6">Get real-time analytics on attendance, placements, and student progress with a single platform tailored for colleges.</p>
            <img src="https://i.imgur.com/YgRtV6Q.png" alt="Preview" className="rounded-lg shadow-lg mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
