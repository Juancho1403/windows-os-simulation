"use client"

import { useState } from "react"
import { Activity, ChevronUp, Wifi, Volume2, BatteryMedium, MessageSquare, Power } from "lucide-react"
import type { Application } from "@/lib/types"

interface TaskbarProps {
  openApps: Application[]
  activeAppId: string | null
  onAppClick: (appId: string) => void
  onStartClick: () => void
  onWidgetsClick: () => void
  onPowerClick: () => void
  isStartMenuOpen: boolean
  isWidgetsPanelOpen: boolean
  isPowerMenuOpen: boolean
  systemTime: Date
  cpuUsage: number
  memoryUsage: number
}

export default function Taskbar({
  openApps,
  activeAppId,
  onAppClick,
  onStartClick,
  onWidgetsClick,
  onPowerClick,
  isStartMenuOpen,
  isWidgetsPanelOpen,
  isPowerMenuOpen,
  systemTime,
  cpuUsage,
  memoryUsage,
}: TaskbarProps) {
  const [showSystemTray, setShowSystemTray] = useState(false)

  return (
    <div className="h-12 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center px-2 z-50">
      <div className="flex items-center space-x-1 max-w-4xl">
        {/* Weather Widget Button */}
        <button
          className={`h-10 w-10 flex items-center justify-center rounded-lg ${
            isWidgetsPanelOpen ? "bg-blue-700" : "hover:bg-gray-700"
          }`}
          onClick={onWidgetsClick}
        >
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-2 w-2 bg-white rounded-sm"></div>
            <div className="h-2 w-2 bg-white rounded-sm"></div>
            <div className="h-2 w-2 bg-white rounded-sm"></div>
            <div className="h-2 w-2 bg-white rounded-sm"></div>
          </div>
        </button>

        {/* Start Button */}
        <button
          className={`h-10 w-10 flex items-center justify-center rounded-lg ${
            isStartMenuOpen ? "bg-blue-700" : "hover:bg-gray-700"
          }`}
          onClick={onStartClick}
        >
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-2 w-2 bg-blue-500 rounded-tl-sm"></div>
            <div className="h-2 w-2 bg-green-500 rounded-tr-sm"></div>
            <div className="h-2 w-2 bg-yellow-500 rounded-bl-sm"></div>
            <div className="h-2 w-2 bg-red-500 rounded-br-sm"></div>
          </div>
        </button>

        {/* Open Apps */}
        <div className="flex items-center space-x-1">
          {openApps.map((app) => (
            <button
              key={app.id}
              className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                activeAppId === app.id ? "bg-gray-600 border-b-2 border-blue-500" : "hover:bg-gray-700"
              }`}
              onClick={() => onAppClick(app.id)}
              title={app.title}
            >
              <div>{app.icon}</div>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="absolute right-2 flex items-center space-x-2 text-white">
        <button
          className="text-white hover:bg-gray-600 p-1 rounded-lg"
          onClick={() => setShowSystemTray(!showSystemTray)}
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-3 px-2 py-1 rounded-lg hover:bg-gray-700">
          <Wifi className="h-4 w-4" />
          <Volume2 className="h-4 w-4" />
          <BatteryMedium className="h-4 w-4" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-white text-xs flex items-center">
            <Activity className="h-4 w-4 mr-1 text-green-400" />
            <span>{cpuUsage}%</span>
          </div>

          <div className="text-white text-xs">RAM: {memoryUsage}%</div>
        </div>

        <div className="text-white text-xs flex flex-col items-end">
          <div>{systemTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div>{systemTime.toLocaleDateString()}</div>
        </div>

        <button className="text-white hover:bg-gray-600 p-1 rounded-lg">
          <MessageSquare className="h-4 w-4" />
        </button>

        <button
          className={`text-white hover:bg-gray-600 p-1 rounded-lg ${isPowerMenuOpen ? "bg-gray-700" : ""}`}
          onClick={onPowerClick}
        >
          <Power className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
