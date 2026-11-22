import React from 'react'
import { ArrowRight, LogIn, UserPlus } from 'lucide-react'

export default function LandingPage({ onNavigate }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 py-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-sm select-none">
          SkillVistaar
        </h1>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('signup')}
            className="btn-primary btn-lg shadow-glow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register on Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="btn-secondary btn-lg"
          >
            <LogIn className="w-4 h-4" />
            <span>Portal Sign In</span>
          </button>
        </div>
      </div>
    </main>
  )
}
