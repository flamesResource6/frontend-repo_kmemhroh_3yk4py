import React, { useEffect, useRef, useState } from 'react'

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function ModulePage({ moduleId }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [data, setData] = useState(null)
  const [related, setRelated] = useState([])
  const [note, setNote] = useState('')
  const [progress, setProgress] = useState({ last_position: 0, completed: false })
  const videoRef = useRef(null)
  const userId = 'demo-user' // simplified demo user id; replace with auth later

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/modules/${moduleId}`)
      const json = await res.json()
      setData(json)
      const lr = await fetch(`${baseUrl}/api/modules?limit=6`)
      const ljson = await lr.json()
      setRelated(ljson.filter((x) => x.id !== moduleId))
      const nr = await fetch(`${baseUrl}/api/notes?user_id=${userId}&module_id=${moduleId}`)
      setNote((await nr.json()).content || '')
      const pr = await fetch(`${baseUrl}/api/progress?user_id=${userId}&module_id=${moduleId}`)
      setProgress(await pr.json())
    }
    load()
  }, [moduleId])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // resume last position
    const handler = () => {
      v.currentTime = progress.last_position || 0
    }
    v.addEventListener('loadedmetadata', handler)
    return () => v.removeEventListener('loadedmetadata', handler)
  }, [progress.last_position])

  const saveNote = async () => {
    await fetch(`${baseUrl}/api/notes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, module_id: moduleId, content: note }) })
  }

  const saveProgress = async (payload) => {
    await fetch(`${baseUrl}/api/progress`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, module_id: moduleId, ...payload }) })
  }

  const onTimeUpdate = async () => {
    const v = videoRef.current
    if (!v) return
    const seconds = Math.floor(v.currentTime)
    setProgress((p) => ({ ...p, last_position: seconds }))
    if (seconds % 5 === 0) {
      saveProgress({ last_position: seconds, completed: false })
    }
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center text-sky-800">Loading module...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
            <video ref={videoRef} className="w-full aspect-video bg-black" controls src={data.video_url} onTimeUpdate={onTimeUpdate} onEnded={() => saveProgress({ completed: true })}></video>
            <div className="p-5">
              <h1 className="text-2xl font-bold text-sky-900">{data.title}</h1>
              {data.description && <p className="mt-2 text-sky-800/80">{data.description}</p>}

              {data.timestamps && data.timestamps.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-sky-900/80">Timestamps</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.timestamps.map((t, i) => (
                      <button key={i} onClick={() => { if (videoRef.current) { videoRef.current.currentTime = t.time; videoRef.current.play() } }} className="rounded-full border border-sky-200 text-sky-800 px-3 py-1 text-sm hover:bg-sky-50">
                        {t.label} • {formatTime(t.time)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {data.resources && data.resources.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-sky-900/80">Resources</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.resources.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noreferrer" className="rounded-full bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 text-sm">
                        Download {r.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-sky-900/80">Teacher Notes</h3>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} onBlur={saveNote} placeholder="Write your personal notes here..." className="mt-2 w-full min-h-[140px] rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-300"></textarea>
                <div className="text-right text-xs text-sky-700 mt-1">Autosaves on blur</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="sticky top-4">
            <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-4">
              <h3 className="font-semibold text-sky-900 mb-3">Related Modules</h3>
              <div className="space-y-3">
                {related.map((m) => (
                  <a key={m.id} href={`/module/${m.id}`} className="flex gap-3 items-center group">
                    <img src={m.thumbnail_url || `https://picsum.photos/seed/${m.id}/200/120`} className="w-24 h-16 rounded-lg object-cover border border-sky-100" />
                    <div>
                      <div className="text-sm font-medium text-sky-900 group-hover:underline">{m.title}</div>
                      <div className="text-xs text-sky-700/70 line-clamp-2">{m.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
