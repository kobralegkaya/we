"use client"

import { useState, useEffect } from "react"

interface CalendarProps {
  month: string
  year: number
  highlightDay: number
}

export function Calendar({ month, year, highlightDay }: CalendarProps) {
  // Для примера используем фиксированную сетку для августа 2025
  // В реальном приложении можно использовать библиотеку для работы с датами
  const days = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ]

  const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
  const [visibleDays, setVisibleDays] = useState<number[]>([])

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      if (count < 31) {
        setVisibleDays((prev) => [...prev, count + 1])
        count++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-sm mx-auto">
      <h3 className="text-xl font-light mb-4 capitalize">{month}</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekdays.map((day, index) => (
          <div key={index} className="text-sm font-medium">
            {day}
          </div>
        ))}

        {days.flat().map((day, index) => (
          <div
            key={index}
            className={`
              h-8 w-8 mx-auto flex items-center justify-center rounded-full transition-all duration-300
              ${day === highlightDay ? "bg-neutral-900 text-white" : ""}
              ${day === null ? "invisible" : ""}
              ${day !== null && visibleDays.includes(day) ? "opacity-100 scale-100" : "opacity-0 scale-0"}
              ${day !== null && day !== highlightDay ? "hover:bg-neutral-100" : ""}
            `}
            style={{ transitionDelay: day ? `${day * 30}ms` : "0ms" }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
