import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className} bg-white min-h-screen`}>{children}</body>
    </html>
  )
}