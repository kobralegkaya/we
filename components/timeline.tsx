"use client"

import { useState, useEffect } from "react"

export function Timeline() {
  const events = [
    {
      time: "14:00",
      title: "Сбор гостей",
      description: "Фуршет",
    },
    {
      time: "15:00",
      title: "Свадебная церемония",
      description: "Самое главное событие нашего дня",
    },
    {
      time: "16:00",
      title: "Фотосессия",
      description: "Фото и т.п.",
    },
    {
      time: "17:00",
      title: "Банкет",
      description: "Время вкусной еды, танцев и веселья!",
    },
    {
      time: "23:30",
      title: "Окончание мероприятия",
      description: "Завершение нашего особенного дня",
    },
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

    const elements = document.querySelectorAll(".timeline-item")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="space-y-12 max-w-xl mx-auto">
      {events.map((event, index) => (
        <div
          key={index}
          className={`timeline-item flex items-start gap-6 text-left transition-opacity duration-500 ${
            visibleItems.includes(index) ? "opacity-100" : "opacity-0"
          }`}
          data-index={index}
        >
          <div className="text-right min-w-[60px]">
            <div className="text-xl font-light">{event.time}</div>
          </div>

          <div className="relative">
            <div className="absolute top-2 -left-3 w-6 h-6 rounded-full border-2 border-neutral-300 bg-white"></div>
            {index < events.length - 1 && (
              <div
                className={`absolute top-6 -left-0.5 w-0.5 bg-neutral-300 transition-height duration-1000 ${
                  visibleItems.includes(index) ? "h-16" : "h-0"
                }`}
              ></div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-serif italic">{event.title}</h3>
            <p className="text-neutral-600 mt-1">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
