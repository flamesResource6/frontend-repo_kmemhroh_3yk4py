import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sky-900">
              Focused training modules for teachers
            </h1>
            <p className="mt-4 text-sky-800/80 max-w-xl">
              Clean, distraction-free videos that solve everyday classroom challenges with clear notes and downloadable resources.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#modules" className="inline-flex items-center rounded-full bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 shadow-sm transition">
                Browse Modules
              </a>
              <a href="/test" className="inline-flex items-center rounded-full bg-white text-sky-700 hover:text-sky-900 border border-sky-200 px-5 py-2.5 shadow-sm transition">
                System Check
              </a>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[420px] lg:h-[520px] rounded-3xl bg-white/60 border border-sky-100 shadow-sm">
            <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
