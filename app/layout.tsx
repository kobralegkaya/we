import type React from "react"
import type { Metadata } from "next"
import { Cormorant } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Свадьба Ильи и Ксении | 30.08.2025",
  description: "Приглашение на свадьбу Ильи и Ксении, которая состоится 30 августа 2025 года",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={cormorant.className}>
      <body className="bg-paper bg-repeat">{children}</body>
    </html>
  )
}
