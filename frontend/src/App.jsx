import React, { useEffect, useState } from 'react'
import { Database, Server, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

export default function App() {
  const [health, setHealth] = useState({
    loading: true,
    status: 'checking',
    backend: false,
    database: false,
    message: 'Connecting to backend...'
  })

  const apiUrl = import.meta.env.VITE_API_URL || ''

  const checkHealth = async () => {
    setHealth(prev => ({ ...prev, loading: true }))
    try {
      const response = await fetch(`${apiUrl}/api/health`)
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }
      const data = await response.json()
      setHealth({
        loading: false,
        status: data.status,
        backend: true,
        database: data.database === 'connected',
        message: data.message || 'System operational'
      })
    } catch (err) {
      setHealth({
        loading: false,
        status: 'disconnected',
        backend: false,
        database: false,
        message: err.message || 'Failed to connect to backend'
      })
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Minimal Navigation */}
      <header className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between backdrop-blur bg-slate-950/70 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            P
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">Platform</span>
        </div>

        {/* Live System Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-4 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
            <div className="flex items-center space-x-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>Backend:</span>
              {health.backend ? (
                <span className="text-emerald-400 font-medium">Ready</span>
              ) : (
                <span className="text-amber-400 font-medium">{health.loading ? 'Checking...' : 'Offline'}</span>
              )}
            </div>

            <div className="w-px h-3 bg-slate-800" />

            <div className="flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>PostgreSQL:</span>
              {health.database ? (
                <span className="text-emerald-400 font-medium">Connected</span>
              ) : (
                <span className="text-amber-400 font-medium">{health.loading ? 'Checking...' : 'Pending'}</span>
              )}
            </div>
          </div>

          <button
            onClick={checkHealth}
            disabled={health.loading}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition-colors disabled:opacity-50"
            title="Refresh Status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${health.loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </header>

      {/* Blank Canvas Landing Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            <span>React + Tailwind CSS + Python + PostgreSQL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Blank Landing Page
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto font-normal">
            Your full-stack scaffold is initialized and ready. Customize this landing page or build your platform features on top of this foundation.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Deploy Ready (Render Blueprint)</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>FastAPI & SQLAlchemy</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Ready to deploy on Render via <code className="text-slate-400">render.yaml</code></p>
      </footer>
    </div>
  )
}
