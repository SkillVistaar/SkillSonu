import React from 'react'
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  Server,
  Database,
  Github
} from 'lucide-react'

export default function Navbar({
  setSidebarOpen,
  activeTab,
  health,
  onRefreshHealth
}) {
  const getTabTitle = (id) => {
    switch (id) {
      case 'dashboard': return 'Dashboard & Overview'
      case 'analytics': return 'Platform Analytics'
      case 'projects': return 'Projects'
      case 'database': return 'PostgreSQL Database Explorer'
      case 'api': return 'API Endpoints & Swagger'
      case 'console': return 'Logs & System Console'
      case 'settings': return 'Platform Settings'
      default: return 'Overview'
    }
  }

  return (
    <header className="h-16 border-b border-surface-800 bg-surface-900/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden btn-ghost btn-icon-sm"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-medium">
          <span className="text-surface-400 hover:text-surface-300 transition-colors">SkillVistaar</span>
          <span className="text-surface-400">/</span>
          <span className="text-surface-100 font-semibold truncate max-w-[150px] sm:max-w-none">
            {getTabTitle(activeTab)}
          </span>
        </nav>
      </div>

      {/* Center: Command / Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search API endpoints, database, docs..."
            className="input input-sm pl-9 pr-14"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-surface-400 bg-surface-800 border border-surface-700 rounded shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions, Health Status & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Backend & DB Health Badge */}
        <div className="hidden sm:flex items-center space-x-3 bg-surface-950 border border-surface-800 rounded-full px-3 py-1.5 text-xs">
          <div className="flex items-center space-x-1.5" title="FastAPI Backend Status">
            <Server className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-surface-400">API:</span>
            <span className={health.backend ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
              {health.backend ? 'Online' : 'Checking'}
            </span>
          </div>

          <div className="w-px h-3 bg-surface-800" />

          <div className="flex items-center space-x-1.5" title="PostgreSQL Database Connection">
            <Database className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-surface-400">DB:</span>
            <span className={health.database ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
              {health.database ? 'Connected' : 'Pending'}
            </span>
          </div>

          <button
            onClick={onRefreshHealth}
            disabled={health.loading}
            className="btn-ghost btn-icon-sm p-1 ml-0.5"
            title="Refresh System Status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${health.loading ? 'animate-spin text-brand-400' : ''}`} />
          </button>
        </div>

        {/* GitHub Repo Button */}
        <a
          href="https://github.com/SkillVistaar/SkillSonu"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-icon-md"
          title="View GitHub Repository"
        >
          <Github className="w-4 h-4 text-surface-400 hover:text-surface-200" />
        </a>

        {/* Notifications Icon */}
        <button
          className="btn-ghost btn-icon-md relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-surface-400 hover:text-surface-200" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-surface-900" />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-2 pl-2 border-l border-surface-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-700 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
            SK
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-medium text-surface-200 leading-tight">Sonu Kumar</span>
            <span className="text-[10px] text-surface-400 leading-tight">Admin / Lead</span>
          </div>
        </div>
      </div>
    </header>
  )
}
