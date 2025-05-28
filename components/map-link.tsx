"use client"
import { Button } from "@/components/ui/button"

export function MapLink() {
  const handleOpenMap = () => {
    window.open("https://maps.google.com/?q=Берёзовая+ул.,+10А,+д.+Капитаново,+Витебский+р-н", "_blank")
  }

  return (
    <Button
      onClick={handleOpenMap}
      variant="link"
      className="mt-6 text-neutral-800 text-lg font-normal hover:text-neutral-600 p-0"
    >
      Посмотреть на карте
    </Button>
  )
}
