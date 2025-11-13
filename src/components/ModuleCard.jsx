import React from 'react'

export default function ModuleCard({ module }) {
  return (
    <a href={`/module/${module.id}`} className="group block rounded-2xl bg-white/90 hover:bg-white transition p-3 shadow-sm hover:shadow-md border border-blue-100">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-blue-50">
        <img src={module.thumbnail_url || `https://picsum.photos/seed/${module.id}/800/450`} alt={module.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
      </div>
      <div className="pt-3">
        <h3 className="text-gray-900 font-semibold leading-snug line-clamp-2">{module.title}</h3>
        {module.category && (
          <span className="inline-block mt-2 text-xs text-blue-700 bg-blue-50 rounded-full px-2 py-1">{module.category}</span>
        )}
      </div>
    </a>
  )
}
