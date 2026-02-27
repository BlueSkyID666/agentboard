import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useAgents } from '../context/AgentContext'
import { CATEGORIES } from '../data/agents'
import AgentCard from '../components/AgentCard'
import AgentModal from '../components/AgentModal'

const SORT_OPTIONS = [
  { id: 'upvotes', label: 'Most Upvoted' },
  { id: 'stars', label: 'Most Stars' },
  { id: 'name', label: 'Alphabetical' },
  { id: 'newest', label: 'Newest First' },
]

export default function Discover() {
  const { agents } = useAgents()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('upvotes')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = agents
    if (category !== 'all') result = result.filter(a => a.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.creator.toLowerCase().includes(q) ||
        a.techStack.some(t => t.toLowerCase().includes(q))
      )
    }
    result = [...result].sort((a, b) => {
      if (sort === 'upvotes') return b.upvotes - a.upvotes
      if (sort === 'stars') return b.stars - a.stars
      if (sort === 'name') return a.name.localeCompare(b.name)
      return 0 // newest = insertion order (community submissions first)
    })
    return result
  }, [agents, search, category, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Discover Agents</h1>
        <p className="text-surface-200">Browse {agents.length} AI agents, skills, and tools from the community.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200 pointer-events-none" />
          <input
            type="search"
            placeholder="Search agents, creators, tech..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-900 border border-white/10 text-white placeholder-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
            aria-label="Search agents"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-900 border border-white/10 text-surface-200 text-sm"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="hidden sm:block px-4 py-2.5 rounded-xl bg-surface-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
          aria-label="Sort agents"
        >
          {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </div>

      {/* Category Tabs */}
      <div className={`mb-8 ${showFilters ? 'block' : 'hidden'} sm:block`}>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              role="tab"
              aria-selected={category === cat.id}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                category === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/5 text-surface-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="sm:hidden mt-3">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            aria-label="Sort agents"
          >
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-surface-200 text-lg mb-2">No agents found</p>
          <p className="text-surface-700 text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((agent, i) => (
            <div key={agent.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.03}s` }}>
              <AgentCard agent={agent} onSelect={setSelectedAgent} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center text-sm text-surface-700">
        Showing {filtered.length} of {agents.length} agents
      </div>

      {selectedAgent && <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
    </div>
  )
}
