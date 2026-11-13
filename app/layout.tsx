import type { Metadata } from 'next'
import Script from 'next/script'
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
    <html lang="th" data-theme="jub-food">
      <body className="bg-base-200 font-sans text-base-content antialiased">
        {children}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on('init', function (user) {
                if (!user) {
                  window.netlifyIdentity.on('login', function () {
                    window.location.href = '/admin/'
                  })
                }
              })
            }
          `}
        </Script>
      </body>
    </html>
  )
}
