import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import {
  Server,
  Database,
  Layers,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Code2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Live healthcheck state
  const [health, setHealth] = useState({
    loading: true,
    status: 'checking',
    backend: false,
    database: false,
    message: 'Connecting to backend...',
    environment: 'production'
  })

  // PostgreSQL starter items state
  const [items, setItems] = useState([])
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDesc, setNewItemDesc] = useState('')
  const [creatingItem, setCreatingItem] = useState(false)
  const [itemError, setItemError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || ''

  // Fetch backend health status
  const checkHealth = async () => {
    setHealth(prev => ({ ...prev, loading: true }))
    try {
      const res = await fetch(`${apiUrl}/api/health`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setHealth({
        loading: false,
        status: data.status,
        backend: true,
        database: data.database === 'connected',
        message: data.database_message || 'System operational',
        environment: data.environment || 'production'
      })
    } catch (err) {
      setHealth({
        loading: false,
        status: 'disconnected',
        backend: false,
        database: false,
        message: err.message || 'Cannot reach backend',
        environment: 'offline'
      })
    }
  }

  // Fetch PostgreSQL items
  const fetchItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/items`)
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (err) {
      console.error('Failed to load items:', err)
    }
  }

  // Add item to PostgreSQL
  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!newItemTitle.trim()) return
    setCreatingItem(true)
    setItemError(null)

    try {
      const res = await fetch(`${apiUrl}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newItemTitle,
          description: newItemDesc || 'Created from Platform UI'
        })
      })
      if (!res.ok) throw new Error('Failed to create item in PostgreSQL')
      const created = await res.json()
      setItems(prev => [created, ...prev])
      setNewItemTitle('')
      setNewItemDesc('')
    } catch (err) {
      setItemError(err.message)
    } finally {
      setCreatingItem(false)
    }
  }

  useEffect(() => {
    checkHealth()
    fetchItems()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      <div className="flex flex-1 min-h-screen">
        {/* Professional Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          health={health}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Top Navbar */}
          <Navbar
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            health={health}
            onRefreshHealth={checkHealth}
          />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-850">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                  <span>Welcome to SkillVistaar Platform</span>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-medium px-2 py-0.5 rounded-full">
                    v1.0.0
                  </span>
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Full-stack architecture running React, Tailwind, FastAPI, and PostgreSQL on Render.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('database')}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-600/30 transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert DB Record</span>
                </button>
              </div>
            </div>

            {/* Metric / Health Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Frontend Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Frontend App</span>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-bold text-white">React 18 + Vite</div>
                  <div className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 font-medium">Tailwind CSS Active</span>
                  </div>
                </div>
              </div>

              {/* Backend API Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Backend API</span>
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Server className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-bold text-white">FastAPI Engine</div>
                  <div className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${health.backend ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className={health.backend ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                      {health.backend ? 'Status: Online' : 'Connecting...'}
                    </span>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">PostgreSQL</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-bold text-white">Managed DB</div>
                  <div className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${health.database ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className={health.database ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                      {health.database ? 'Connected & Synced' : 'Checking Connection'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Render Cloud Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Cloud Deployment</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-bold text-white">Render Blueprint</div>
                  <div className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 font-medium">Automatic CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab 1: Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Interactive Card */}
                <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Full-Stack Canvas</h2>
                      <p className="text-xs text-slate-400">
                        Blank slate ready for your custom features, routes, and data models.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-slate-300 font-mono">
                      render.yaml
                    </span>
                  </div>

                  <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-4 text-center my-4">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Your Professional Foundation is Live</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Use the navigation on the left to switch between views, inspect PostgreSQL tables, or test the FastAPI endpoints.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => setActiveTab('database')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                      >
                        Explore Database
                      </button>
                      <button
                        onClick={() => setActiveTab('api')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                      >
                        Inspect API
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Info Sidebar Column */}
                <div className="space-y-4">
                  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">Quick Links</h3>
                    <div className="space-y-2 text-xs">
                      <a
                        href="https://github.com/SkillVistaar/SkillSonu"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/70 text-slate-300 hover:text-white border border-slate-800/60 transition-colors group"
                      >
                        <span>GitHub Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                      </a>
                      <a
                        href="https://dashboard.render.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/70 text-slate-300 hover:text-white border border-slate-800/60 transition-colors group"
                      >
                        <span>Render Dashboard</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: PostgreSQL Database Explorer */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                {/* Insert Form */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-base font-semibold text-white mb-1">Insert New Record (PostgreSQL)</h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Test live database insertion through the FastAPI <code className="text-indigo-400 font-mono">POST /api/items</code> endpoint.
                  </p>

                  <form onSubmit={handleAddItem} className="space-y-3 max-w-xl">
                    <div>
                      <input
                        type="text"
                        placeholder="Title (e.g. My First Project)"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    {itemError && (
                      <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg">
                        {itemError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={creatingItem}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{creatingItem ? 'Saving to Database...' : 'Save Record'}</span>
                    </button>
                  </form>
                </div>

                {/* Items Table */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Table: <code className="text-indigo-400 font-mono">starter_items</code></h3>
                      <p className="text-xs text-slate-400">Total records stored in PostgreSQL: {items.length}</p>
                    </div>
                    <button
                      onClick={fetchItems}
                      className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Reload Table"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2.5 px-3 font-semibold">ID</th>
                          <th className="py-2.5 px-3 font-semibold">Title</th>
                          <th className="py-2.5 px-3 font-semibold">Description</th>
                          <th className="py-2.5 px-3 font-semibold">Created At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {items.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-6 text-slate-400">
                              No records in table yet. Add one above!
                            </td>
                          </tr>
                        ) : (
                          items.map(item => (
                            <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                              <td className="py-2.5 px-3 font-mono text-indigo-400">{item.id}</td>
                              <td className="py-2.5 px-3 font-medium text-white">{item.title}</td>
                              <td className="py-2.5 px-3 text-slate-400">{item.description || '-'}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-400">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Just now'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: API Services View */}
            {activeTab === 'api' && (
              <div className="space-y-4">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-base font-semibold text-white mb-1">FastAPI Endpoints</h2>
                  <p className="text-xs text-slate-400 mb-4">
                    The backend exposes interactive Swagger documentation at <code className="text-indigo-400 font-mono">/docs</code>.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">GET</span>
                        <code className="text-slate-200 font-mono">/api/health</code>
                        <span className="text-slate-400 hidden sm:inline">- Healthcheck and DB status</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">Ready</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">GET</span>
                        <code className="text-slate-200 font-mono">/api/items</code>
                        <span className="text-slate-400 hidden sm:inline">- Fetch all items from PostgreSQL</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">Ready</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-bold">POST</span>
                        <code className="text-slate-200 font-mono">/api/items</code>
                        <span className="text-slate-400 hidden sm:inline">- Create a new record in PostgreSQL</span>
                      </div>
                      <span className="text-[11px] text-indigo-400 font-medium">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {!['dashboard', 'database', 'api'].includes(activeTab) && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white capitalize">{activeTab} Section</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  This section is ready for you to add your custom business logic and components.
                </p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
