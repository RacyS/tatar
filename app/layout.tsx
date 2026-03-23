import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ร้านจุ๊บ อาหารตามสั่ง',
  description: 'เมนูอาหารตามสั่งหลากหลาย กับข้าว เมนูเส้น อาหารจานเดียว เซตสุดคุ้ม ต้มยำ แกง ยำรสเด็ด',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="h-full overflow-auto bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {children}
      </body>
    </html>
  )
}
