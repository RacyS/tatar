'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { menuall, categories, type MenuItem } from '@/data/menu'

export default function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // นับจำนวนเมนูในแต่ละหมวด
  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: menuall.length }
    menuall.forEach((m) => {
      counts[m.category] = (counts[m.category] ?? 0) + 1
    })
    return counts
  }, [])

  // filter ตาม category แล้วค่อย filter ตาม search
  const filtered: MenuItem[] = useMemo(() => {
    const byCat =
      activeCategory === 'all'
        ? menuall
        : menuall.filter((m) => m.category === activeCategory)

    const q = searchQuery.trim().toLowerCase()
    if (!q) return byCat
    return byCat.filter((m) => m.name.toLowerCase().includes(q))
  }, [activeCategory, searchQuery])

  return (
    <>
      {/* Category Nav + Search */}
      <nav className="fixed top-[72px] w-full z-20 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 pt-3 pb-2 space-y-2">

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเมนู..."
              className="w-full bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-full pl-9 pr-9 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="ล้างการค้นหา"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Buttons */}
          <div className="flex overflow-x-auto gap-2 pb-1 md:justify-center no-scrollbar items-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setActiveCategory(cat.value); setSearchQuery('') }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                  activeCategory === cat.value
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-gray-300 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-500'
                }`}
              >
                {cat.label}
                <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                  activeCategory === cat.value
                    ? 'bg-purple-500/60 text-purple-100'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {countByCategory[cat.value] ?? 0}
                </span>
              </button>
            ))}
          </div>

        </div>
      </nav>

      {/* Gallery Grid */}
      <div className="min-h-full w-full px-4 md:px-8 py-8 mt-[148px]">

        {/* จำนวนเมนูที่แสดงอยู่ */}
        <p className="text-center text-sm text-gray-400 mb-5">
          {searchQuery
            ? `ผลการค้นหา "${searchQuery}" — พบ ${filtered.length} เมนู`
            : `แสดง ${filtered.length} เมนู`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <span className="text-5xl mb-4">🍽️</span>
            <p className="text-lg font-medium">ไม่พบเมนูที่ค้นหา</p>
            <p className="text-sm mt-1">ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}
