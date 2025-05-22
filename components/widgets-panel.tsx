"use client"

import { useEffect, useState } from "react"
import { X, Sun, Cloud, CloudRain, Thermometer, Calendar, Clock, Plus } from "lucide-react"

interface WidgetsPanelProps {
  onClose: () => void
}

export default function WidgetsPanel({ onClose }: WidgetsPanelProps) {
  const [temperature] = useState(22)
  const [weather] = useState<"sunny" | "cloudy" | "rainy">("sunny")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Actualiza la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="absolute top-0 left-0 w-96 h-full bg-black bg-opacity-85 backdrop-blur-xl z-50 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-white text-lg font-medium">Widgets</h2>
        <button
          aria-label="Cerrar panel"
          className="text-white hover:bg-gray-700 p-1 rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Weather Widget */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">El tiempo</h3>
            <div className="text-3xl">
              {weather === "sunny" && <Sun />}
              {weather === "cloudy" && <Cloud />}
              {weather === "rainy" && <CloudRain />}
            </div>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2" />
            <span className="text-2xl font-bold">{temperature}°C</span>
          </div>
          <div className="mt-2 text-sm">Madrid, España</div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-gray-800 rounded-xl p-4 text-white shadow">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Calendario</h3>
          </div>
          <div className="text-lg font-bold capitalize">
            {currentTime.toLocaleDateString("es-ES", {
              weekday: "long",
              month: "long",
              day: "numeric"
            })}
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-300">Próximos eventos:</div>
            <div className="mt-1 text-sm space-y-1">
              <div className="flex justify-between">
                <span>Reunión de trabajo</span>
                <span>10:00</span>
              </div>
              <div className="flex justify-between">
                <span>Almuerzo con Juan</span>
                <span>13:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clock Widget */}
        <div className="bg-gray-800 rounded-xl p-4 text-white shadow">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Reloj</h3>
          </div>
          <div className="text-3xl font-bold text-center">
            {currentTime.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        </div>

        {/* Add Widget Button */}
        <button
          className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-white flex items-center justify-center transition"
          onClick={() => alert("Función para añadir widget aún no implementada.")}
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Añadir widget</span>
        </button>
      </div>
    </div>
  )
}
