'use client'

import { useState } from 'react'
import Image from 'next/image'
import { menuall, categories, type MenuItem } from '@/data/menu'

export default function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered: MenuItem[] =
    activeCategory === 'all'
      ? menuall
      : menuall.filter((m) => m.category === activeCategory)

  return (
    <>
      {/* Category Nav */}
      <nav className="fixed top-[72px] w-full z-20 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex overflow-x-auto gap-3 pb-1 md:justify-center no-scrollbar items-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
                  activeCategory === cat.value
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-gray-300 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Gallery Grid */}
      <div className="min-h-full w-full px-4 md:px-8 py-8 mt-[120px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filtered.map((menu, index) => (
            <div
              key={menu.id}
              className="gallery-card card-shine bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl glow-effect stagger-animation"
              style={{ animationDelay: `${(index % 12) * 0.05}s` }}
            >
              <div className="relative overflow-hidden w-full h-56">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  fill
                  className="object-cover gallery-card-img"
                  loading={index < 8 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3e8ff' width='400' height='300'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-size='48'%3E%F0%9F%8D%BD%EF%B8%8F%3C/text%3E%3C/svg%3E"
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-gray-800 leading-snug">{menu.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
