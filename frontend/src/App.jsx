import React, { useState, useEffect } from 'react'
import {
  Code2,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  LogIn
} from 'lucide-react'

export default function App() {
  // Navigation view: 'landing' or 'login'
  const [view, setView] = useState(() => {
    return window.location.hash === '#login' ? 'login' : 'landing'
  })

  // Login form state
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Listen to browser hash changes (support back button)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setView('login')
      } else {
        setView('landing')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (newView) => {
    setView(newView)
    if (newView === 'login') {
      window.location.hash = 'login'
    } else {
      window.location.hash = ''
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white relative overflow-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================
          TOP NAVIGATION BAR (Shared with dynamic actions)
          ======================================================== */}
      <header className="h-18 px-6 sm:px-12 flex items-center justify-between border-b border-surface-900 bg-surface-950/80 backdrop-blur sticky top-0 z-20">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
              SkillVistaar
            </span>
            {view === 'login' && (
              <span className="text-[10px] text-surface-400 -mt-0.5">
                Unified National Skill Portal
              </span>
            )}
          </div>
        </button>

        <nav className="flex items-center space-x-3">
          {view === 'landing' ? (
            <button
              onClick={() => navigateTo('login')}
              className="btn-primary btn-md shadow-sm shadow-brand-500/25"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('landing')}
              className="btn-secondary btn-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}
        </nav>
      </header>

      {/* ========================================================
          VIEW 1: CLEAN MINIMAL LANDING PAGE
          ======================================================== */}
      {view === 'landing' && (
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-sm select-none">
              SkillVistaar
            </h1>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('login')}
                className="btn-primary btn-lg shadow-glow-sm"
              >
                <span>Login to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================
          VIEW 2: UNIFIED NATIONAL SKILL PORTAL SIGN IN
          ======================================================== */}
      {view === 'login' && (
        <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="card p-6 sm:p-8 space-y-6 shadow-2xl border border-surface-800/90 relative animate-in fade-in zoom-in-95 duration-200">
              {/* Header info */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                  <span>Unified National Skill Portal Sign In</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Sign In to SkillVistaar
                </h2>
                <p className="subtext text-xs">
                  Enter your registered credentials to access your skill account
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-surface-950 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="heading-md text-emerald-400">Authentication Verified</h3>
                  <p className="subtext">
                    Welcome back! Connecting to your SkillVistaar portal dashboard...
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary btn-sm mt-2"
                  >
                    Sign In with Another Account
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Identifier input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      Email, Mobile Number, or Username <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter email, phone, or username"
                        className="input pl-9"
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-medium text-surface-200">
                        Password <span className="text-rose-400">*</span>
                      </label>
                      <a
                        href="#forgot-password"
                        className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="input pl-9 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-200 transition-colors"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 text-xs text-surface-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-brand-600 focus:ring-brand-500 focus:ring-offset-surface-950"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full btn-lg justify-center mt-2"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}

              {/* Registration link */}
              <div className="pt-4 border-t border-surface-800/80 text-center text-xs text-surface-300">
                <span>Don't have a SkillVistaar account? </span>
                <a
                  href="https://skillvistaar-a.onrender.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center space-x-1 underline underline-offset-4 decoration-brand-400/50 hover:decoration-brand-300 transition-colors"
                >
                  <span>Create New Account</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Security badge at bottom */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] text-surface-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protected by SkillVistaar 256-bit SSL Portal Security</span>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================
          CLEAN FOOTER
          ======================================================== */}
      <footer className="h-14 px-6 border-t border-surface-900 flex items-center justify-center text-xs text-surface-500">
        <p>© {new Date().getFullYear()} SkillVistaar. All rights reserved.</p>
      </footer>
    </div>
  )
}
