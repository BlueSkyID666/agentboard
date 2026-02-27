import { useEffect, useRef } from 'react'
import { X, ArrowUp, Bookmark, BookmarkCheck, Github, ExternalLink, Star, User } from 'lucide-react'
import { useAgents } from '../context/AgentContext'
import { CATEGORIES } from '../data/agents'

export default function AgentModal({ agent, onClose }) {
  const { upvotes, bookmarks, toggleUpvote, toggleBookmark } = useAgents()
  const overlayRef = useRef()
  const isUpvoted = !!upvotes[agent.id]
  const isBookmarked = bookmarks.includes(agent.id)
  const categoryLabel = CATEGORIES.find(c => c.id === agent.category)?.label || agent.category

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${agent.name} details`}
    >
      <div className="bg-surface-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl" role="img" aria-label={`${agent.name} logo`}>{agent.logo}</span>
              <div>
                <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
                <span className="text-sm text-primary-400 font-medium">{categoryLabel}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-surface-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-lg text-primary-200 font-medium mb-4">{agent.tagline}</p>
          <p className="text-surface-200 leading-relaxed mb-6">{agent.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-surface-200 uppercase tracking-wider mb-2">
                <User className="w-3.5 h-3.5" /> Creator
              </div>
              <p className="text-white font-medium">{agent.creator}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-surface-200 uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5" /> GitHub Stars
              </div>
              <p className="text-white font-medium">{agent.stars > 0 ? agent.stars.toLocaleString() : 'N/A'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs text-surface-200 uppercase tracking-wider mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {agent.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 text-sm font-medium bg-primary-600/10 text-primary-300 rounded-lg border border-primary-500/20">{tech}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
            <button
              onClick={() => toggleUpvote(agent.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isUpvoted
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/5 text-surface-200 hover:bg-white/10'
              }`}
              aria-pressed={isUpvoted}
            >
              <ArrowUp className="w-4 h-4" />
              {isUpvoted ? 'Upvoted' : 'Upvote'} · {agent.upvotes}
            </button>
            <button
              onClick={() => toggleBookmark(agent.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-white/5 text-surface-200 hover:bg-white/10'
              }`}
              aria-pressed={isBookmarked}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            {agent.github && (
              <a href={agent.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-surface-200 hover:bg-white/10 transition-all">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {agent.website && (
              <a href={agent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-surface-200 hover:bg-white/10 transition-all">
                <ExternalLink className="w-4 h-4" /> Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
