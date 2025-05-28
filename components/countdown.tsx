"use client"

import { useState, useEffect } from "react"

interface CountdownProps {
  targetDate: string
  title?: string
}

export function Countdown({ targetDate, title = "До нашей свадьбы осталось" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="py-8 animate-on-scroll">
      <h3 className="text-2xl font-light mb-6">{title}</h3>
      <div className="flex justify-center gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light border border-neutral-200 rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center animate-number-change">
            {timeLeft.days}
          </div>
          <span className="text-sm mt-2">дней</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light border border-neutral-200 rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center animate-number-change">
            {timeLeft.hours}
          </div>
          <span className="text-sm mt-2">часов</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light border border-neutral-200 rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center animate-number-change">
            {timeLeft.minutes}
          </div>
          <span className="text-sm mt-2">минут</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light border border-neutral-200 rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center animate-number-change">
            {timeLeft.seconds}
          </div>
          <span className="text-sm mt-2">секунд</span>
        </div>
      </div>
    </div>
  )
}
