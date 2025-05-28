"use client"

import { useState, useEffect } from "react"

export function DressCode() {
  const colors = [
    { name: "Бежевый", hex: "#E8DDCB" },
    { name: "Золотой", hex: "#CBA135" },
    { name: "Серый", hex: "#9FA0A4" },
  ]

  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".color-item")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-item flex flex-col items-center transition-all duration-500 ${
            visibleItems.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-0"
          } hover:scale-110`}
          data-index={index}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div
            className="w-16 h-16 rounded-full border border-neutral-200"
            style={{ backgroundColor: color.hex }}
          ></div>
          <span className="text-sm mt-2">{color.name}</span>
        </div>
      ))}
    </div>
  )
}
