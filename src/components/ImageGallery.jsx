import { useState } from 'react'
import riding01 from '../image/riding01.jpg'
import riding02 from '../image/riding02.jpg'
import riding03 from '../image/riding03.jpg'
import riding04 from '../image/riding04.jpg'
import riding05 from '../image/riding05.jpg'

const IMAGES = [riding01, riding02, riding03, riding04, riding05]

export default function ImageGallery() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive((i) => (i - 1 + IMAGES.length) % IMAGES.length)
  const next = () => setActive((i) => (i + 1) % IMAGES.length)

  return (
    <>
      <div className="bg-toss-white rounded-2xl border border-toss-line overflow-hidden">
        {/* Main Image */}
        <div className="relative">
          <img
            src={IMAGES[active]}
            alt={`목장 사진 ${active + 1}`}
            className="w-full h-52 object-cover cursor-pointer"
            onClick={() => setLightbox(true)}
          />

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
          >
            ›
          </button>

          {/* Counter badge */}
          <span className="absolute bottom-2 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
            {active + 1} / {IMAGES.length}
          </span>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-1.5 p-2 overflow-x-auto scrollbar-hide">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? 'border-toss-blue scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <img
                src={src}
                alt={`썸네일 ${i + 1}`}
                className="h-14 w-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Caption */}
        <div className="px-3 pb-3">
          <p className="text-xs font-semibold text-toss-label">🌿 제주 더 홀스 목장</p>
          <p className="text-xs text-toss-tertiary mt-0.5">제주 애월의 자연 속에서 즐기는 승마 체험</p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
          <img
            src={IMAGES[active]}
            alt={`목장 사진 ${active + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} className="text-white bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl">‹</button>
            <span className="text-white text-sm self-center">{active + 1} / {IMAGES.length}</span>
            <button onClick={next} className="text-white bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl">›</button>
          </div>
        </div>
      )}
    </>
  )
}
