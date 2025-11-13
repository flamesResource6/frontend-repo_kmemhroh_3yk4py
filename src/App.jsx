import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ModuleGrid from './components/ModuleGrid'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [modules, setModules] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        // seed if empty
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
        const res = await fetch(`${baseUrl}/api/modules`)
        const json = await res.json()
        setModules(json)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white/60 border-b border-sky-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="/" className="text-sky-900 font-semibold">Teacher Modules</a>
          <nav className="text-sm text-sky-800/80">
            <a href="/test" className="hover:text-sky-900">Status</a>
          </nav>
        </div>
      </header>
      <Hero />
      <ModuleGrid modules={modules} />
      <footer className="py-10 text-center text-sky-800/70 text-sm">Built for teachers • Minimal, focused learning</footer>
    </div>
  )
}

export default App
