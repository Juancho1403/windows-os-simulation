"use client"

import type { Application } from "@/lib/types"

interface DesktopIconProps {
  app: Application
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

export default function DesktopIcon({ app, isSelected, onClick, onDoubleClick }: DesktopIconProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
        isSelected ? "bg-blue-200 bg-opacity-50" : "hover:bg-blue-100 hover:bg-opacity-30"
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onDoubleClick={onDoubleClick}
    >
      <div className="mb-1 p-2 bg-white bg-opacity-10 rounded-lg shadow-sm">{app.icon}</div>
      <span className="text-sm text-center font-medium text-white px-2 py-0.5 rounded bg-black bg-opacity-40 shadow-sm">
        {app.title}
      </span>
    </div>
  )
}
