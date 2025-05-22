"use client"

import { Power, RefreshCw, Moon } from "lucide-react"

interface PowerMenuProps {
  onClose: () => void
  onShutdown: () => void
  onRestart: () => void
  onHibernate: () => void
}

export default function PowerMenu({ onClose, onShutdown, onRestart, onHibernate }: PowerMenuProps) {
  return (
    <div
      className="absolute bottom-12 right-4 w-64 bg-black bg-opacity-85 backdrop-blur-xl rounded-xl shadow-2xl z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2">
        <button className="w-full flex items-center p-3 rounded-lg text-white hover:bg-gray-700" onClick={onShutdown}>
          <Power className="h-5 w-5 mr-3 text-red-500" />
          <span>Apagar</span>
        </button>

        <button className="w-full flex items-center p-3 rounded-lg text-white hover:bg-gray-700" onClick={onRestart}>
          <RefreshCw className="h-5 w-5 mr-3 text-blue-500" />
          <span>Reiniciar</span>
        </button>

        <button className="w-full flex items-center p-3 rounded-lg text-white hover:bg-gray-700" onClick={onHibernate}>
          <Moon className="h-5 w-5 mr-3 text-purple-500" />
          <span>Hibernar</span>
        </button>
      </div>
    </div>
  )
}
