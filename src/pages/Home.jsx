import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Users, TrendingUp, Layers } from 'lucide-react'
import { useAgents } from '../context/AgentContext'
import AgentCard from '../components/AgentCard'
import AgentModal from '../components/AgentModal'

export default function Home() {
  const { agents, stats } = useAgents()
  const [selectedAgent, setSelectedAgent] = useState(null)
  const featured = agents.filter(a => a.featured).slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Community-Driven AI Agent Discovery
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in">
              Discover the best{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
                AI agents
              </span>{' '}
              built by the community
            </h1>
            <p className="text-lg sm:text-xl text-surface-200 leading-relaxed mb-8 animate-fade-in-delay">
              AgentBoard is the open directory for AI agents, skills, and tools.
              Browse what others have built, share your own, and help the agentic AI community grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay">
              <Link
                to="/discover"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-colors"
              >
                Browse Agents <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-colors"
              >
                Submit Your Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" aria-label="Community statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Layers, label: 'Agents Listed', value: stats.totalAgents },
            { icon: TrendingUp, label: 'Total Upvotes', value: stats.totalUpvotes.toLocaleString() },
            { icon: Users, label: 'Categories', value: stats.categories },
            { icon: Sparkles, label: 'Bookmarked', value: stats.totalBookmarks },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-surface-900 border border-white/5 rounded-2xl p-5 text-center card-hover">
              <Icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-surface-200 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-label="Featured agents">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Agents</h2>
            <p className="text-surface-200 text-sm mt-1">Hand-picked highlights from the community</p>
          </div>
          <Link to="/discover" className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((agent, i) => (
            <div key={agent.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <AgentCard agent={agent} onSelect={setSelectedAgent} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-primary-900/40 to-primary-800/20 border border-primary-500/20 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Built an AI agent?</h2>
          <p className="text-surface-200 mb-6 max-w-lg mx-auto">
            Share it with the community. Get feedback, upvotes, and help others discover your work.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-colors"
          >
            Submit Your Agent <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {selectedAgent && <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
    </>
  )
}
