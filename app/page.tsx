import MenuGallery from '@/components/MenuGallery'
import LineIcon from '@/components/LineIcon'

const lineUrl = 'https://lin.ee/PB24kUx'

export default function Home() {
  return (
    <>
      <a href="#menu" className="btn fixed -top-24 left-4 z-50 focus:top-4">ข้ามไปเมนูอาหาร</a>
      <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur-lg">
        <nav aria-label="เมนูหลัก" className="navbar mx-auto h-20 max-w-7xl justify-between gap-3 px-5 sm:px-8">
          <a href="/" aria-label="ร้านจุ๊บ อาหารตามสั่ง หน้าแรก" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-neutral text-neutral-content">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M8 24h32a16 16 0 0 1-32 0ZM18 42h12M14 17c-4-5 4-5 0-10m10 10c-4-5 4-5 0-10m10 10c-4-5 4-5 0-10" strokeLinecap="round" /></svg>
            </span>
            <span><span className="block text-xl font-semibold tracking-tight">ร้านจุ๊บ</span><span className="block text-xs text-base-content/55">อาหารตามสั่ง</span></span>
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="#menu" className="hidden text-sm font-medium hover:underline sm:inline">เมนูอาหาร</a>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="btn gap-2 rounded-full px-4 text-sm sm:px-5"><LineIcon />ทักร้านทาง LINE<span className="sr-only"> (เปิดแท็บใหม่)</span></a>
          </div>
        </nav>
      </header>

      <main>
        <MenuGallery />
      </main>

      <footer className="border-t border-base-300 bg-base-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><p className="font-semibold">ร้านจุ๊บ อาหารตามสั่ง</p><p className="mt-1 text-xs leading-6 text-base-content/55">เลือกเมนูได้แล้ว สอบถามเพิ่มเติมกับร้านทาง LINE ได้เลย</p></div>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:underline"><LineIcon />ติดต่อร้าน<span aria-hidden="true">↗</span><span className="sr-only"> (เปิดแท็บใหม่)</span></a>
        </div>
      </footer>
      <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="btn line-contact fixed right-5 bottom-5 z-40 h-14 gap-2 rounded-full border-0 px-4 shadow-lg sm:right-7 sm:bottom-7" aria-label="ติดต่อร้านจุ๊บผ่าน LINE (เปิดแท็บใหม่)"><LineIcon className="size-7" /><span className="hidden text-sm sm:inline">ทักร้านจุ๊บ</span></a>
    </>
  )
}
