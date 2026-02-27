import { Cpu, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-950" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AgentBoard</span>
            </Link>
            <p className="text-sm text-surface-200 leading-relaxed">
              A community-driven platform for discovering and sharing AI agents, skills, and tools.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Navigate</h3>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/discover', 'Discover'], ['/submit', 'Submit Agent'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-surface-200 hover:text-primary-300 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Community</h3>
            <a
              href="https://github.com/natearcher-ai/agentboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-surface-200 hover:text-primary-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-surface-700">
          Built with ❤️ for the agentic AI community · DEV Weekend Challenge 2026
        </div>
      </div>
    </footer>
  )
}
