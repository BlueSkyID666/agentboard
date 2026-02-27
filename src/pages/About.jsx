import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Globe, Users, Lightbulb, Github } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          About AgentBoard
        </h1>
        <p className="text-lg text-surface-200 max-w-2xl mx-auto leading-relaxed">
          A community-driven platform for discovering, sharing, and celebrating
          the AI agents, skills, and tools that are shaping the future of autonomous AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          {
            icon: Globe,
            title: 'Open Discovery',
            desc: 'Find the best AI agents across every category — from dev tools to research assistants to creative automation.',
          },
          {
            icon: Users,
            title: 'Community First',
            desc: 'Built by and for the agentic AI community. Every listing is contributed by builders like you.',
          },
          {
            icon: Lightbulb,
            title: 'Learn & Inspire',
            desc: 'Explore tech stacks, architectures, and approaches. Get inspired by what others are building.',
          },
          {
            icon: Heart,
            title: 'Support Builders',
            desc: 'Upvote your favorites, bookmark tools to try, and help great projects get the visibility they deserve.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-surface-900 border border-white/5 rounded-2xl p-6 card-hover">
            <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-surface-200 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-900 border border-white/5 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Why AgentBoard?</h2>
        <div className="space-y-4 text-surface-200 leading-relaxed">
          <p>
            The agentic AI space is exploding. Every week, new frameworks, agents, and tools emerge —
            but discovering them is fragmented across Twitter threads, GitHub trending, and word of mouth.
          </p>
          <p>
            AgentBoard brings it all together in one place. Think of it as Product Hunt meets Awesome Lists,
            specifically for the AI agent ecosystem. A living, community-curated directory where builders
            can showcase their work and users can find the right tools.
          </p>
          <p>
            Whether you're building autonomous agents with CrewAI, orchestrating workflows with LangGraph,
            or creating personal AI assistants with OpenClaw — there's a place for you here.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-900/40 to-primary-800/20 border border-primary-500/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Join the Community</h2>
        <p className="text-surface-200 mb-6 max-w-lg mx-auto">
          AgentBoard is open source. Contribute agents, suggest features, or help us build the platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-colors"
          >
            Submit an Agent <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/natearcher-ai/agentboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-colors"
          >
            <Github className="w-4 h-4" /> View Source
          </a>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-surface-700">
        <p>Built with ❤️ for the <a href="https://dev.to/challenges/devchallenges" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">DEV Weekend Challenge</a></p>
        <p className="mt-1">By <a href="https://github.com/natearcher-ai" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">natearcher-ai</a> · Powered by React, Vite & Tailwind CSS</p>
      </div>
    </div>
  )
}
