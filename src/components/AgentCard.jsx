import { ArrowUp, Bookmark, BookmarkCheck, Github, ExternalLink, Star } from 'lucide-react'
import { useAgents } from '../context/AgentContext'
import { CATEGORIES } from '../data/agents'

export default function AgentCard({ agent, onSelect }) {
  const { upvotes, bookmarks, toggleUpvote, toggleBookmark } = useAgents()
  const isUpvoted = !!upvotes[agent.id]
  const isBookmarked = bookmarks.includes(agent.id)
  const categoryLabel = CATEGORIES.find(c => c.id === agent.category)?.label || agent.category

  return (
    <article
      className="card-hover bg-surface-900 border border-white/5 rounded-2xl p-5 flex flex-col"
      role="article"
      aria-label={`${agent.name} — ${agent.tagline}`}
    >
      <div className="flex items-start justify-between mb-3">
        <button
          onClick={() => onSelect(agent)}
          className="flex items-center gap-3 text-left group min-w-0"
          aria-label={`View details for ${agent.name}`}
        >
          <span className="text-3xl flex-shrink-0" role="img" aria-label={`${agent.name} logo`}>{agent.logo}</span>
          <div className="min-w-0">
            <h3 className="text-white font-semibold group-hover:text-primary-300 transition-colors truncate">{agent.name}</h3>
            <span className="text-xs text-primary-400 font-medium">{categoryLabel}</span>
          </div>
        </button>
        {agent.featured && (
          <span className="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary-600/20 text-primary-300 rounded-full border border-primary-500/20">
            Featured
          </span>
        )}
      </div>

      <button onClick={() => onSelect(agent)} className="text-left flex-1 mb-4">
        <p className="text-sm text-surface-200 leading-relaxed line-clamp-2">{agent.tagline}</p>
      </button>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.techStack.slice(0, 3).map(tech => (
          <span key={tech} className="px-2 py-0.5 text-[11px] font-medium bg-white/5 text-surface-200 rounded-md">{tech}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleUpvote(agent.id)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isUpvoted
                ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                : 'bg-white/5 text-surface-200 hover:bg-white/10 border border-transparent'
            }`}
            aria-label={`${isUpvoted ? 'Remove upvote from' : 'Upvote'} ${agent.name}. ${agent.upvotes} upvotes.`}
            aria-pressed={isUpvoted}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            {agent.upvotes}
          </button>
          <button
            onClick={() => toggleBookmark(agent.id)}
            className={`p-1.5 rounded-lg transition-all ${
              isBookmarked
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-surface-200 hover:text-white hover:bg-white/5'
            }`}
            aria-label={`${isBookmarked ? 'Remove bookmark from' : 'Bookmark'} ${agent.name}`}
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {agent.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-surface-200">
              <Star className="w-3 h-3" />
              {agent.stars >= 1000 ? `${(agent.stars / 1000).toFixed(agent.stars >= 10000 ? 0 : 1)}k` : agent.stars}
            </span>
          )}
          {agent.github && (
            <a href={agent.github} target="_blank" rel="noopener noreferrer" className="text-surface-200 hover:text-white transition-colors" aria-label={`${agent.name} GitHub`}>
              <Github className="w-4 h-4" />
            </a>
          )}
          {agent.website && (
            <a href={agent.website} target="_blank" rel="noopener noreferrer" className="text-surface-200 hover:text-white transition-colors" aria-label={`${agent.name} website`}>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
