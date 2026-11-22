import React, { useState, useEffect } from 'react'
import { Code2, ArrowLeft } from 'lucide-react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  // Navigation view: 'landing' | 'login' | 'signup'
  const [view, setView] = useState(() => {
    const hash = window.location.hash
    if (hash === '#signup') return 'signup'
    if (hash === '#login') return 'login'
    return 'landing'
  })

  // Synchronize with URL hash for back/forward navigation and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#signup') setView('signup')
      else if (hash === '#login') setView('login')
      else setView('landing')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (newView) => {
    setView(newView)
    if (newView === 'signup') {
      window.location.hash = 'signup'
    } else if (newView === 'login') {
      window.location.hash = 'login'
    } else {
      window.location.hash = ''
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white relative overflow-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Shared Header Navigation */}
      <header className="h-18 px-6 sm:px-12 flex items-center justify-between border-b border-surface-900 bg-surface-950/80 backdrop-blur sticky top-0 z-30">
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
            {view !== 'landing' && (
              <span className="text-[10px] text-surface-400 -mt-0.5">
                Unified National Skill Portal
              </span>
            )}
          </div>
        </button>

        <nav className="flex items-center space-x-3">
          {view === 'landing' && (
            <>
              <button
                onClick={() => navigateTo('login')}
                className="btn-secondary btn-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo('signup')}
                className="btn-primary btn-sm shadow-sm shadow-brand-500/25"
              >
                Create Account
              </button>
            </>
          )}

          {view === 'login' && (
            <>
              <button
                onClick={() => navigateTo('signup')}
                className="btn-primary btn-sm"
              >
                Create Account
              </button>
              <button
                onClick={() => navigateTo('landing')}
                className="btn-ghost btn-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </>
          )}

          {view === 'signup' && (
            <>
              <button
                onClick={() => navigateTo('login')}
                className="btn-secondary btn-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo('landing')}
                className="btn-ghost btn-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Render Dynamic Separate Pages */}
      {view === 'landing' && <LandingPage onNavigate={navigateTo} />}
      {view === 'login' && <LoginPage onNavigate={navigateTo} />}
      {view === 'signup' && <SignupPage onNavigate={navigateTo} />}

      {/* Shared Footer */}
      <footer className="h-14 px-6 border-t border-surface-900 flex items-center justify-center text-xs text-surface-500">
        <p>© {new Date().getFullYear()} SkillVistaar. All rights reserved.</p>
      </footer>
    </div>
  )
}
