import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, CheckCircle } from 'lucide-react'
import { useAgents } from '../context/AgentContext'
import { CATEGORIES } from '../data/agents'

const INITIAL = { name: '', tagline: '', description: '', category: 'dev-tools', creator: '', techStack: '', github: '', website: '', logo: '🤖' }

const EMOJI_OPTIONS = ['🤖', '⚡', '🧠', '🔮', '🚀', '🛠️', '🎯', '🌐', '🔬', '💡', '🦾', '🧩', '✨', '🎨', '📊']

export default function Submit() {
  const { addAgent } = useAgents()
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.tagline.trim()) e.tagline = 'Tagline is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.creator.trim()) e.creator = 'Creator is required'
    if (form.github && !form.github.startsWith('http')) e.github = 'Must be a valid URL'
    if (form.website && !form.website.startsWith('http')) e.website = 'Must be a valid URL'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    addAgent(form)
    setSubmitted(true)
    setTimeout(() => navigate('/discover'), 2000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Agent Submitted!</h1>
        <p className="text-surface-200">Thanks for contributing to the community. Redirecting to Discover...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Submit an Agent</h1>
        <p className="text-surface-200">Share your AI agent, skill, or tool with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Logo picker */}
        <fieldset>
          <legend className="text-sm font-medium text-surface-200 mb-2">Choose an icon</legend>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => update('logo', emoji)}
                className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                  form.logo === emoji ? 'bg-primary-600 ring-2 ring-primary-400' : 'bg-white/5 hover:bg-white/10'
                }`}
                aria-label={`Select ${emoji} icon`}
                aria-pressed={form.logo === emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </fieldset>

        <Field label="Agent Name" error={errors.name} required>
          <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. MyAgent" className="form-input" aria-required="true" />
        </Field>

        <Field label="Tagline" error={errors.tagline} required hint="One-liner describing what it does">
          <input type="text" value={form.tagline} onChange={e => update('tagline', e.target.value)} placeholder="e.g. An AI agent that automates code reviews" className="form-input" maxLength={120} aria-required="true" />
        </Field>

        <Field label="Description" error={errors.description} required>
          <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Tell us more about your agent..." className="form-input min-h-[120px] resize-y" aria-required="true" />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Category" error={errors.category}>
            <select value={form.category} onChange={e => update('category', e.target.value)} className="form-input cursor-pointer">
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Creator / Team" error={errors.creator} required>
            <input type="text" value={form.creator} onChange={e => update('creator', e.target.value)} placeholder="Your name or team" className="form-input" aria-required="true" />
          </Field>
        </div>

        <Field label="Tech Stack" hint="Comma-separated (e.g. Python, LangChain, OpenAI)">
          <input type="text" value={form.techStack} onChange={e => update('techStack', e.target.value)} placeholder="Python, React, OpenAI" className="form-input" />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="GitHub URL" error={errors.github}>
            <input type="url" value={form.github} onChange={e => update('github', e.target.value)} placeholder="https://github.com/..." className="form-input" />
          </Field>
          <Field label="Website URL" error={errors.website}>
            <input type="url" value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://..." className="form-input" />
          </Field>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-colors"
        >
          <Send className="w-4 h-4" /> Submit Agent
        </button>
      </form>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          background: rgb(15 23 42);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.5);
          border-color: rgba(99,102,241,0.5);
        }
        .form-input::placeholder { color: rgb(100 116 139); }
        select.form-input option { background: rgb(15 23 42); }
      `}</style>
    </div>
  )
}

function Field({ label, children, error, hint, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-surface-200 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-surface-700 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-400 mt-1" role="alert">{error}</p>}
    </div>
  )
}
