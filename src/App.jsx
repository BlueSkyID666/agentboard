import { Routes, Route } from 'react-router-dom'
import { AgentProvider } from './context/AgentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Submit from './pages/Submit'
import About from './pages/About'

export default function App() {
  return (
    <AgentProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AgentProvider>
  )
}
