# ร้านจุ๊บ อาหารตามสั่ง - Next.js

## วิธี migrate จาก Plain HTML → Next.js

### โครงสร้างโปรเจกต์
```
jub-food/
├── app/
│   ├── layout.tsx      ← Root layout + metadata (SEO)
│   ├── page.tsx        ← Server Component (SSG) - render HTML ตอน build
│   └── globals.css     ← Global styles + Tailwind
├── components/
│   └── MenuGallery.tsx ← Client Component สำหรับ filter
├── data/
│   └── menu.ts         ← ข้อมูลเมนูทั้งหมด (แทน Menu.js เดิม)
├── public/
│   └── images/         ← ย้าย folder images มาไว้ที่นี่
├── next.config.js      ← output: 'export' สำหรับ Netlify
└── netlify.toml        ← Build config
```

## วิธี Deploy

### 1. ติดตั้ง dependencies
```bash
npm install
```

### 2. ย้าย images
นำ folder `/images` จากโปรเจกต์เดิมมาวางใน `/public/`
```
public/
└── images/
    ├── kubข้าว/
    ├── noodle/
    ├── Rice/
    ├── set/
    ├── Tom/
    └── yom/
```

### 3. ทดสอบ local
```bash
npm run dev
# เปิด http://localhost:3000
```

### 4. Build
```bash
npm run build
# จะสร้าง folder /out ที่มี static HTML พร้อม deploy
```

### 5. Deploy ไป Netlify
- Push โค้ดขึ้น GitHub
- เชื่อม Netlify กับ repo
- Netlify จะ run `npm run build` และ deploy folder `out` อัตโนมัติ

## ทำไมถึงดีกว่าเดิม?

| | เดิม (Plain HTML + JS) | ใหม่ (Next.js SSG) |
|---|---|---|
| Search Engine เห็นเมนู | ❌ ไม่เห็น | ✅ เห็นทั้งหมด |
| Load เมนูตอนเปิดหน้า | ❌ รอ JS render | ✅ มีใน HTML เลย |
| SEO | ❌ แย่ | ✅ ดีมาก |
| Filter หมวดหมู่ | ✅ ทำงานได้ | ✅ ทำงานได้เหมือนเดิม |
| Deploy บน Netlify | ✅ ได้ | ✅ ได้เหมือนเดิม |
