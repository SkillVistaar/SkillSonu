import React from 'react'
import {
  LayoutDashboard,
  Database,
  Server,
  Layers,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Code2,
  X,
  ExternalLink
} from 'lucide-react'

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  health
}) {
  const navigation = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'analytics', name: 'Analytics', icon: BarChart3, badge: 'New', badgeClass: 'badge-brand' },
        { id: 'projects', name: 'Projects', icon: Layers, badge: null },
      ]
    },
    {
      group: 'Platform & Data',
      items: [
        {
          id: 'database',
          name: 'PostgreSQL DB',
          icon: Database,
          badge: health.database ? 'Active' : 'Offline',
          badgeClass: health.database ? 'badge-success' : 'badge-warning'
        },
        { id: 'api', name: 'API Services', icon: Server, badge: 'FastAPI', badgeClass: 'badge-neutral' },
        { id: 'console', name: 'Logs & Console', icon: Terminal, badge: null },
      ]
    },
    {
      group: 'Settings',
      items: [
        { id: 'settings', name: 'Settings', icon: Settings, badge: null },
        { id: 'docs', name: 'Documentation', icon: HelpCircle, badge: null, external: 'https://render.com/docs' },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-surface-900 border-r border-surface-800 transition-all duration-300 ease-in-out lg:static ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-surface-800">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-sm shadow-brand-500/30 flex-shrink-0">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-surface-100 tracking-tight truncate">
                  SkillVistaar
                </span>
                <span className="text-[11px] text-surface-400 truncate">
                  Platform Suite
                </span>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden btn-ghost btn-icon-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace pill */}
        {!isCollapsed && (
          <div className="px-3 pt-4 pb-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-950 border border-surface-800 text-xs">
              <div className="flex items-center space-x-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                <span className="text-surface-200 font-medium truncate">SkillSonu Production</span>
              </div>
              <span className="badge-neutral text-[10px] uppercase font-mono py-0.5">
                Live
              </span>
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6 scrollbar-thin scrollbar-thumb-surface-800">
          {navigation.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2">
                  {section.group}
                </h3>
              )}
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.external) {
                        window.open(item.external, '_blank')
                      } else {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      }
                    }}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-sm'
                        : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800/70 border border-transparent'
                    } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-brand-400' : 'text-surface-400 group-hover:text-surface-200'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className={item.badgeClass || 'badge-neutral'}>
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && item.external && (
                      <ExternalLink className="w-3.5 h-3.5 text-surface-400 opacity-60 group-hover:opacity-100" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Bottom Health & Collapse Bar */}
        <div className="p-3 border-t border-surface-800 space-y-2">
          {!isCollapsed && (
            <div className="p-3 rounded-lg bg-surface-950 border border-surface-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Infrastructure</span>
                </span>
                <span className="badge-success text-[10px] py-0.5">Render Ready</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                <div className="bg-surface-900 border border-surface-800 rounded p-1.5">
                  <span className="block text-[9px] text-surface-400 uppercase">API</span>
                  <span className={health.backend ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {health.backend ? 'Healthy' : 'Checking'}
                  </span>
                </div>
                <div className="bg-surface-900 border border-surface-800 rounded p-1.5">
                  <span className="block text-[9px] text-surface-400 uppercase">Database</span>
                  <span className={health.database ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {health.database ? 'Connected' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full btn-ghost btn-sm text-surface-400 hover:text-surface-100"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center space-x-2">
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse navigation</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
