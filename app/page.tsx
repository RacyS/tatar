import { menuall, categories } from '@/data/menu'
import MenuGallery from '@/components/MenuGallery'

// Server Component - render HTML ฝั่ง server ตอน build
// Search engine จะเห็นเมนูทั้งหมดทันที
export default function Home() {
  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-black fixed w-full z-30 top-0 start-0 border-b border-gray-800 h-[72px]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            <span className="text-purple-500">ร้านจุ๊บ</span>อาหารตามสั่ง
          </span>
        </div>
      </nav>

      {/* 
        MenuGallery = Client Component จัดการ filter ด้วย useState
        แต่ข้อมูลเมนูมาจาก data/menu.ts ที่ถูก import ตอน build แล้ว
        ทำให้ HTML ที่ generate ออกมามีชื่อเมนูทั้งหมดฝังอยู่
      */}
      <MenuGallery />

      {/* 
        Hidden SEO content - Search engine เห็นชื่อเมนูทั้งหมด
        แม้ user จะกด filter แล้วบางเมนูซ่อนอยู่
      */}
      <div className="sr-only" aria-hidden="true">
        <h1>ร้านจุ๊บ อาหารตามสั่ง - เมนูทั้งหมด</h1>
        {categories.map((cat) => (
          <section key={cat.value}>
            <h2>{cat.label}</h2>
            <ul>
              {menuall
                .filter((m) => cat.value === 'all' || m.category === cat.value)
                .map((m) => (
                  <li key={m.id}>{m.name}</li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
