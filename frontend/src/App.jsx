import React from 'react'
import { Code2 } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      {/* Minimal Top Navbar */}
      <header className="h-18 px-6 sm:px-12 flex items-center justify-between border-b border-surface-900 bg-surface-950/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-glow-sm">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            SkillVistaar
          </span>
        </div>

        <nav className="flex items-center space-x-3">
          <button className="btn-secondary btn-sm">
            Sign In
          </button>
          <button className="btn-primary btn-sm">
            Get Started
          </button>
        </nav>
      </header>

      {/* Clean Minimal Hero Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-sm">
            SkillVistaar
          </h1>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="h-16 px-6 sm:px-12 flex items-center justify-center border-t border-surface-900 text-xs text-surface-500">
        <p>© {new Date().getFullYear()} SkillVistaar. All rights reserved.</p>
      </footer>
    </div>
  )
}
