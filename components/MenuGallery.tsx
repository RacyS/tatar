'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { menuall, categories } from '@/data/menu'

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23eee7f4' width='400' height='300'/%3E%3Ctext x='200' y='165' text-anchor='middle' font-size='48'%3E%F0%9F%8D%BD%EF%B8%8F%3C/text%3E%3C/svg%3E"

export default function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const query = searchQuery.trim()

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: menuall.length, new: 0 }
    menuall.forEach((menu) => { counts[menu.category] = (counts[menu.category] ?? 0) + 1 })
    return counts
  }, [])

  const filtered = useMemo(() => {
    const byCategory = activeCategory === 'all' ? menuall : menuall.filter((menu) => menu.category === activeCategory)
    const ordered = activeCategory === 'new' ? [...byCategory].reverse() : byCategory
    return ordered.filter((menu) => menu.name.toLowerCase().includes(query.toLowerCase()))
  }, [activeCategory, query])

  const categoryLabel = categories.find((category) => category.value === activeCategory)?.label ?? 'ทั้งหมด'
  const resetFilters = () => { setActiveCategory('all'); setSearchQuery('') }

  return (
    <section id="menu" className="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12" aria-labelledby="menu-title">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-base-content/45">THE MENU</p><h1 id="menu-title" className="text-2xl font-semibold sm:text-3xl">เลือกจานที่ใช่สำหรับมื้อนี้</h1></div>
        <p className="text-xs leading-6 text-base-content/55">เมนูหลากหลาย เลือกดูตามหมวดที่ชอบ</p>
      </div>

      <div className="sticky top-20 z-20 -mx-5 border-y border-base-300 bg-base-200/95 px-5 py-4 backdrop-blur-lg sm:-mx-1 sm:rounded-2xl sm:border sm:px-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="hidden text-sm font-medium sm:block">หมวดหมู่อาหาร</span>
          <label className="input h-11 w-full gap-2 rounded-full border-base-300 bg-base-100 sm:max-w-80">
            <svg className="size-4 shrink-0 text-base-content/45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" strokeLinecap="round" /></svg>
            <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} aria-label="ค้นหาชื่อเมนูในหมวดที่เลือก" aria-controls="menu-results" placeholder="ลองค้นหา กะเพรา กุ้ง หมูกรอบ…" className="min-w-0 grow text-xs sm:text-sm" />
            {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="btn size-7 min-h-0 shrink-0 rounded-full border-0 p-0" aria-label="ล้างการค้นหา"><span aria-hidden="true">×</span></button>}
          </label>
        </div>
        <nav aria-label="หมวดหมู่อาหาร" className="category-scroll flex gap-2 overflow-x-auto pb-1 sm:gap-2.5">
          {categories.map((category) => (
            <button key={category.value} type="button" aria-pressed={activeCategory === category.value} aria-controls="menu-results" onClick={() => { setActiveCategory(category.value); setSearchQuery('') }} className={`btn h-10 min-h-10 shrink-0 gap-2 rounded-full px-4 text-xs font-medium sm:text-sm ${activeCategory === category.value ? 'border-neutral bg-neutral text-neutral-content' : 'border-base-300 bg-base-100 text-base-content/75'}`}>
              {category.value === 'new' && <span aria-hidden="true">✦</span>}
              {category.label}
              <span className={`badge h-5 min-w-5 border-0 px-1.5 text-[10px] ${activeCategory === category.value ? 'bg-neutral-content/15 text-neutral-content' : 'bg-base-200 text-base-content/50'}`}>{countByCategory[category.value] ?? 0}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-7 mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-medium">{categoryLabel === 'ทั้งหมด' ? 'เมนูทั้งหมด' : categoryLabel}</h3>
        <p role="status" aria-live="polite" aria-atomic="true" className="text-right text-xs text-base-content/55">{query ? `ค้นหา “${query}” · ` : ''}{filtered.length} เมนู</p>
      </div>

      <div id="menu-results">
        {filtered.length === 0 ? (
          <div className="card card-border items-center bg-base-100 px-6 py-16 text-center">
            <span aria-hidden="true" className="mb-5 flex size-16 items-center justify-center rounded-full bg-secondary text-3xl">🍽️</span>
            <h4 className="text-lg font-medium">{activeCategory === 'new' && !query ? 'ยังไม่มีเมนูใหม่' : 'ไม่พบเมนูที่ค้นหา'}</h4>
            <p className="mt-2 text-sm leading-7 text-base-content/60">{activeCategory === 'new' && !query ? 'ระหว่างนี้ เลือกดูจานอร่อยในหมวดอื่นได้เลย' : 'ลองเปลี่ยนคำค้น หรือกลับไปดูเมนูทั้งหมดของร้าน'}</p>
            <button type="button" onClick={resetFilters} className="btn mt-6 rounded-full">ดูเมนูทั้งหมด <span aria-hidden="true">→</span></button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((menu, index) => (
              <article key={menu.id} className="card food-card overflow-hidden border border-base-300 bg-base-100">
                <figure className="relative aspect-4/3 overflow-hidden bg-secondary">
                  <Image src={menu.image} alt={menu.name} fill sizes="(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 420px) 46vw, 90vw" className="object-cover" loading={index < 4 ? 'eager' : 'lazy'} onError={(event) => { if (event.currentTarget.src !== placeholderImage) { event.currentTarget.src = placeholderImage } }} />
                  {menu.category === 'new' && <span className="badge absolute top-3 left-3 border-base-300 bg-base-100 px-3 py-3 text-xs">✦ เมนูใหม่</span>}
                </figure>
                <div className="card-body gap-2 p-4 sm:p-5">
                  <p className="text-[10px] font-medium text-base-content/45 sm:text-xs">{categories.find((category) => category.value === menu.category)?.label}</p>
                  <h4 className="card-title text-sm leading-7 font-medium sm:text-base">{menu.name}</h4>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
