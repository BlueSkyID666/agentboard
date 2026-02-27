import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { SEED_AGENTS } from '../data/agents'

const AgentContext = createContext()

const STORAGE_KEYS = {
  agents: 'agentboard_agents',
  upvotes: 'agentboard_upvotes',
  bookmarks: 'agentboard_bookmarks',
}

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEYS.agents, null)
    if (stored && stored.length > 0) return stored
    return SEED_AGENTS
  })
  const [upvotes, setUpvotes] = useState(() => loadFromStorage(STORAGE_KEYS.upvotes, {}))
  const [bookmarks, setBookmarks] = useState(() => loadFromStorage(STORAGE_KEYS.bookmarks, []))

  useEffect(() => saveToStorage(STORAGE_KEYS.agents, agents), [agents])
  useEffect(() => saveToStorage(STORAGE_KEYS.upvotes, upvotes), [upvotes])
  useEffect(() => saveToStorage(STORAGE_KEYS.bookmarks, bookmarks), [bookmarks])

  const toggleUpvote = useCallback((agentId) => {
    setUpvotes(prev => {
      const next = { ...prev }
      next[agentId] = !prev[agentId]
      return next
    })
    setAgents(prev => prev.map(a => {
      if (a.id !== agentId) return a
      const isUpvoted = upvotes[agentId]
      return { ...a, upvotes: a.upvotes + (isUpvoted ? -1 : 1) }
    }))
  }, [upvotes])

  const toggleBookmark = useCallback((agentId) => {
    setBookmarks(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    )
  }, [])

  const addAgent = useCallback((agent) => {
    const newAgent = {
      ...agent,
      id: agent.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      upvotes: 0,
      stars: 0,
      featured: false,
      techStack: agent.techStack ? agent.techStack.split(',').map(s => s.trim()) : [],
    }
    setAgents(prev => [newAgent, ...prev])
    return newAgent
  }, [])

  const stats = {
    totalAgents: agents.length,
    totalUpvotes: agents.reduce((sum, a) => sum + a.upvotes, 0),
    totalBookmarks: bookmarks.length,
    categories: [...new Set(agents.map(a => a.category))].length,
  }

  return (
    <AgentContext.Provider value={{ agents, upvotes, bookmarks, stats, toggleUpvote, toggleBookmark, addAgent }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgents() {
  const ctx = useContext(AgentContext)
  if (!ctx) throw new Error('useAgents must be used within AgentProvider')
  return ctx
}
