import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import {
  Server,
  Database,
  Layers,
  ArrowUpRight,
  Plus,
  Sparkles,
  RefreshCw,
  Code2,
  ShieldCheck,
  Send,
  Palette,
  Check
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
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col font-sans">
      <div className="flex flex-1 min-h-screen">
        {/* Unified Sidebar */}
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
          {/* Unified Navbar */}
          <Navbar
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            health={health}
            onRefreshHealth={checkHealth}
          />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="heading-xl">SkillVistaar Platform</h1>
                  <span className="badge-brand">v1.1.0</span>
                </div>
                <p className="subtext mt-1">
                  Unified enterprise design system with React, Tailwind CSS, Python FastAPI, and PostgreSQL.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('styleguide')}
                  className="btn-secondary btn-sm"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Color & Button Guide</span>
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  className="btn-primary btn-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert DB Record</span>
                </button>
              </div>
            </div>

            {/* Metric / Health Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Frontend Card */}
              <div className="card-interactive p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-surface-400">Frontend App</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="heading-md">React 18 + Vite</div>
                  <div className="text-xs text-surface-400 flex items-center space-x-1.5 mt-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 font-medium">Unified Design System</span>
                  </div>
                </div>
              </div>

              {/* Backend API Card */}
              <div className="card-interactive p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-surface-400">Backend API</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-brand-400 flex items-center justify-center">
                    <Server className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="heading-md">FastAPI Engine</div>
                  <div className="text-xs text-surface-400 flex items-center space-x-1.5 mt-1.5">
                    <span className={`w-2 h-2 rounded-full ${health.backend ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className={health.backend ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                      {health.backend ? 'Status: Online' : 'Connecting...'}
                    </span>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Card */}
              <div className="card-interactive p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-surface-400">PostgreSQL</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="heading-md">Managed DB</div>
                  <div className="text-xs text-surface-400 flex items-center space-x-1.5 mt-1.5">
                    <span className={`w-2 h-2 rounded-full ${health.database ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className={health.database ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                      {health.database ? 'Connected & Synced' : 'Checking Connection'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Render Cloud Card */}
              <div className="card-interactive p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-surface-400">Cloud Deployment</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="heading-md">Render Blueprint</div>
                  <div className="text-xs text-surface-400 flex items-center space-x-1.5 mt-1.5">
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
                <div className="lg:col-span-2 card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="heading-lg">Platform Workspace</h2>
                      <p className="subtext">
                        A blank, production-ready canvas with unified design tokens and persistent PostgreSQL storage.
                      </p>
                    </div>
                    <span className="badge-neutral font-mono">
                      render.yaml
                    </span>
                  </div>

                  <div className="p-8 rounded-xl bg-surface-950 border border-surface-800 space-y-4 text-center my-4">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="heading-md">Unified Professional Styling Ready</h3>
                    <p className="subtext max-w-md mx-auto">
                      All buttons, surface containers, color palettes, badges, and form controls are centralized in <code className="text-brand-300 font-mono text-xs">index.css</code> and <code className="text-brand-300 font-mono text-xs">tailwind.config.js</code>.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setActiveTab('styleguide')}
                        className="btn-primary btn-sm"
                      >
                        <Palette className="w-3.5 h-3.5" />
                        <span>View Style Guide</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('database')}
                        className="btn-secondary btn-sm"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Inspect PostgreSQL</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Info Sidebar Column */}
                <div className="space-y-4">
                  <div className="card p-5 space-y-3">
                    <h3 className="heading-md">Platform Links</h3>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/SkillVistaar/SkillSonu"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-surface-950 hover:bg-surface-800 text-surface-300 hover:text-white border border-surface-800 transition-colors group text-xs"
                      >
                        <span>GitHub Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-surface-400 group-hover:text-white" />
                      </a>
                      <a
                        href="https://dashboard.render.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-surface-950 hover:bg-surface-800 text-surface-300 hover:text-white border border-surface-800 transition-colors group text-xs"
                      >
                        <span>Render Dashboard</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-surface-400 group-hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Style Guide & Unified Design System */}
            {activeTab === 'styleguide' && (
              <div className="space-y-6">
                {/* Unified Buttons Section */}
                <div className="card p-6 space-y-5">
                  <div>
                    <h2 className="heading-lg">Unified Button System</h2>
                    <p className="subtext">
                      Standardized button classes with hover states, active compressions, focus rings, and size scales.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2.5">
                        Style Variants
                      </h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <button className="btn-primary btn-md">
                          <span>Primary Button</span>
                        </button>
                        <button className="btn-secondary btn-md">
                          <span>Secondary Button</span>
                        </button>
                        <button className="btn-outline btn-md">
                          <span>Outline Button</span>
                        </button>
                        <button className="btn-ghost btn-md">
                          <span>Ghost Button</span>
                        </button>
                        <button className="btn-danger btn-md">
                          <span>Danger Action</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2.5">
                        Size Scales
                      </h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <button className="btn-primary btn-sm">Small (.btn-sm)</button>
                        <button className="btn-primary btn-md">Medium (.btn-md)</button>
                        <button className="btn-primary btn-lg">Large (.btn-lg)</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unified Badges & Color Tokens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Badges */}
                  <div className="card p-6 space-y-4">
                    <h2 className="heading-lg">Unified Badges</h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-brand">Brand Badge</span>
                      <span className="badge-success">Success / Live</span>
                      <span className="badge-warning">Warning / Pending</span>
                      <span className="badge-danger">Danger / Offline</span>
                      <span className="badge-neutral">Neutral System</span>
                    </div>
                  </div>

                  {/* Palette Tokens */}
                  <div className="card p-6 space-y-4">
                    <h2 className="heading-lg">Unified Palette Tokens</h2>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2.5 rounded bg-brand-500 text-white font-semibold">brand-500</div>
                      <div className="p-2.5 rounded bg-brand-600 text-white font-semibold">brand-600</div>
                      <div className="p-2.5 rounded bg-surface-800 text-surface-200">surface-800</div>
                      <div className="p-2.5 rounded bg-surface-900 text-surface-200 border border-surface-800">surface-900</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: PostgreSQL Database Explorer */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                {/* Insert Form */}
                <div className="card p-6">
                  <h2 className="heading-lg mb-1">Insert New Record (PostgreSQL)</h2>
                  <p className="subtext mb-4">
                    Test live database insertion through the FastAPI <code className="text-brand-400 font-mono">POST /api/items</code> endpoint.
                  </p>

                  <form onSubmit={handleAddItem} className="space-y-3 max-w-xl">
                    <div>
                      <input
                        type="text"
                        placeholder="Title (e.g. Production Task)"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="input"
                      />
                    </div>
                    {itemError && (
                      <div className="badge-danger text-xs p-2 rounded-lg block">
                        {itemError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={creatingItem}
                      className="btn-primary btn-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{creatingItem ? 'Saving to Database...' : 'Save Record'}</span>
                    </button>
                  </form>
                </div>

                {/* Items Table */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="heading-md">Table: <code className="text-brand-400 font-mono">starter_items</code></h3>
                      <p className="subtext">Total records stored in PostgreSQL: {items.length}</p>
                    </div>
                    <button
                      onClick={fetchItems}
                      className="btn-secondary btn-icon-sm"
                      title="Reload Table"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-surface-800 text-surface-400">
                          <th className="py-2.5 px-3 font-semibold">ID</th>
                          <th className="py-2.5 px-3 font-semibold">Title</th>
                          <th className="py-2.5 px-3 font-semibold">Description</th>
                          <th className="py-2.5 px-3 font-semibold">Created At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-800/60 text-surface-300">
                        {items.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-6 text-surface-400">
                              No records in table yet. Add one above!
                            </td>
                          </tr>
                        ) : (
                          items.map(item => (
                            <tr key={item.id} className="hover:bg-surface-850/60 transition-colors">
                              <td className="py-2.5 px-3 font-mono text-brand-400">{item.id}</td>
                              <td className="py-2.5 px-3 font-medium text-white">{item.title}</td>
                              <td className="py-2.5 px-3 text-surface-400">{item.description || '-'}</td>
                              <td className="py-2.5 px-3 font-mono text-surface-400">
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
                <div className="card p-6">
                  <h2 className="heading-lg mb-1">FastAPI Endpoints</h2>
                  <p className="subtext mb-4">
                    The backend exposes interactive Swagger documentation at <code className="text-brand-400 font-mono">/docs</code>.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="badge-success font-mono font-bold">GET</span>
                        <code className="text-surface-200 font-mono">/api/health</code>
                        <span className="subtext hidden sm:inline">- Healthcheck and DB status</span>
                      </div>
                      <span className="badge-success">Ready</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="badge-success font-mono font-bold">GET</span>
                        <code className="text-surface-200 font-mono">/api/items</code>
                        <span className="subtext hidden sm:inline">- Fetch all items from PostgreSQL</span>
                      </div>
                      <span className="badge-success">Ready</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="badge-brand font-mono font-bold">POST</span>
                        <code className="text-surface-200 font-mono">/api/items</code>
                        <span className="subtext hidden sm:inline">- Create a new record in PostgreSQL</span>
                      </div>
                      <span className="badge-brand">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {!['dashboard', 'database', 'api', 'styleguide'].includes(activeTab) && (
              <div className="card p-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="heading-md capitalize">{activeTab} Section</h3>
                <p className="subtext max-w-sm mx-auto">
                  This section is ready for you to add your custom business logic and components.
                </p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="btn-secondary btn-sm"
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
