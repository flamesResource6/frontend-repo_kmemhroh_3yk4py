import React from 'react'
import ModuleCard from './ModuleCard'

export default function ModuleGrid({ modules = [] }) {
  return (
    <section id="modules" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sky-900">Latest Modules</h2>
          <p className="text-sky-800/70 text-sm">Quick, practical lessons to use tomorrow.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </section>
  )
}
