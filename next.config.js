/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export สำหรับ Netlify
  images: {
    unoptimized: true, // จำเป็นสำหรับ static export
  },
}

module.exports = nextConfig
