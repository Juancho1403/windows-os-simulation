"use client"

import type React from "react"

import { useState } from "react"
import {
  FileText,
  Calculator,
  Globe,
  ShoppingBag,
  Code,
  Folder,
  SettingsIcon,
  ImageIcon,
  Grid,
  File,
  Music,
  Gamepad,
  Trash2,
  Chrome,
  ChromeIcon as Firefox,
  Compass,
  Shield,
  Youtube,
  Tv,
  Film,
  Joystick,
} from "lucide-react"
import DesktopIcon from "./desktop-icon"
import ContextMenu from "./context-menu"
import type { Application } from "@/lib/types"

interface DesktopProps {
  onOpenApp: (app: Application) => void
  onOpenTaskManager: () => void
  onTakeScreenshot: () => void
  onLaunchExternalApp: (appUrl: string) => void
}

export default function Desktop({ onOpenApp, onOpenTaskManager, onTakeScreenshot, onLaunchExternalApp }: DesktopProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  const desktopApps: Application[] = [
    { id: "fileExplorer", title: "Explorador de archivos", icon: <Folder className="h-10 w-10 text-yellow-500" /> },
    { id: "edge", title: "Microsoft Edge", icon: <Compass className="h-10 w-10 text-blue-400" /> },
    { id: "chrome", title: "Google Chrome", icon: <Chrome className="h-10 w-10 text-blue-500" /> },
    { id: "firefox", title: "Firefox", icon: <Firefox className="h-10 w-10 text-orange-500" /> },
    { id: "opera", title: "Opera", icon: <Globe className="h-10 w-10 text-red-500" /> },
    { id: "brave", title: "Brave", icon: <Shield className="h-10 w-10 text-orange-600" /> },
    { id: "word", title: "Word", icon: <FileText className="h-10 w-10 text-blue-600" /> },
    { id: "excel", title: "Excel", icon: <Grid className="h-10 w-10 text-green-600" /> },
    { id: "powerpoint", title: "PowerPoint", icon: <ImageIcon className="h-10 w-10 text-orange-600" /> },
    { id: "notepad", title: "Bloc de notas", icon: <File className="h-10 w-10 text-gray-600" /> },
    { id: "calculator", title: "Calculadora", icon: <Calculator className="h-10 w-10 text-gray-600" /> },
    { id: "spotify", title: "Spotify", icon: <Music className="h-10 w-10 text-green-500" /> },
    { id: "youtube", title: "YouTube", icon: <Youtube className="h-10 w-10 text-red-600" /> },
    { id: "netflix", title: "Netflix", icon: <Film className="h-10 w-10 text-red-700" /> },
    { id: "magicTV", title: "Magic TV", icon: <Tv className="h-10 w-10 text-purple-600" /> },
    { id: "fluxTV", title: "Flux TV", icon: <Tv className="h-10 w-10 text-blue-600" /> },
    { id: "store", title: "Microsoft Store", icon: <ShoppingBag className="h-10 w-10 text-blue-500" /> },
    { id: "visualStudio", title: "Visual Studio Code", icon: <Code className="h-10 w-10 text-blue-500" /> },
    { id: "settings", title: "Configuración", icon: <SettingsIcon className="h-10 w-10 text-gray-600" /> },
    { id: "paint", title: "Paint", icon: <ImageIcon className="h-10 w-10 text-blue-400" /> },
    { id: "games", title: "Juegos", icon: <Gamepad className="h-10 w-10 text-green-400" /> },
    { id: "snake", title: "Snake", icon: <Joystick className="h-10 w-10 text-green-500" /> },
    { id: "pacman", title: "Pacman", icon: <Joystick className="h-10 w-10 text-yellow-500" /> },
    { id: "recycleBin", title: "Papelera de reciclaje", icon: <Trash2 className="h-10 w-10 text-gray-600" /> },
  ]

  // Organizar los iconos en grupos lógicos
  const organizedApps = [
    // Navegadores
    desktopApps.find((app) => app.id === "edge"),
    desktopApps.find((app) => app.id === "chrome"),
    desktopApps.find((app) => app.id === "firefox"),
    desktopApps.find((app) => app.id === "opera"),
    desktopApps.find((app) => app.id === "brave"),

    // Explorador y papelera
    desktopApps.find((app) => app.id === "fileExplorer"),
    desktopApps.find((app) => app.id === "recycleBin"),

    // Office
    desktopApps.find((app) => app.id === "word"),
    desktopApps.find((app) => app.id === "excel"),
    desktopApps.find((app) => app.id === "powerpoint"),

    // Utilidades
    desktopApps.find((app) => app.id === "notepad"),
    desktopApps.find((app) => app.id === "calculator"),
    desktopApps.find((app) => app.id === "paint"),

    // Entretenimiento
    desktopApps.find((app) => app.id === "spotify"),
    desktopApps.find((app) => app.id === "youtube"),
    desktopApps.find((app) => app.id === "netflix"),
    desktopApps.find((app) => app.id === "magicTV"),
    desktopApps.find((app) => app.id === "fluxTV"),

    // Juegos
    desktopApps.find((app) => app.id === "games"),
    desktopApps.find((app) => app.id === "snake"),
    desktopApps.find((app) => app.id === "pacman"),

    // Sistema
    desktopApps.find((app) => app.id === "store"),
    desktopApps.find((app) => app.id === "visualStudio"),
    desktopApps.find((app) => app.id === "settings"),
  ].filter(Boolean) as Application[]

  const handleIconClick = (app: Application) => {
    setSelectedIcon(app.id)
    if (app.id === "taskManager") {
      onOpenTaskManager()
    } else {
      onOpenApp(app)
    }
  }

  const handleIconDoubleClick = (app: Application) => {
    // Map app IDs to system URLs
    const appUrlMap: Record<string, string> = {
      fileExplorer: "file:///",
      edge: "microsoft-edge:",
      chrome: "https://www.google.com",
      firefox: "https://www.mozilla.org/firefox",
      opera: "https://www.opera.com",
      brave: "https://brave.com",
      word: "ms-word:",
      excel: "ms-excel:",
      powerpoint: "ms-powerpoint:",
      notepad: "notepad:",
      calculator: "calculator:",
      spotify: "spotify:",
      youtube: "https://www.youtube.com",
      netflix: "https://www.netflix.com",
      magicTV: "https://www.magictv.com",
      fluxTV: "ms-tv:",
      store: "ms-windows-store:",
      visualStudio: "https://code.visualstudio.com/",
      settings: "ms-settings:",
      paint: "ms-paint:",
      games: "ms-gaming-overlay:",
      recycleBin: "shell:RecycleBinFolder",
      taskManager: "taskmgr:",
    }

    if (appUrlMap[app.id]) {
      onLaunchExternalApp(appUrlMap[app.id])
    } else {
      onOpenApp(app)
    }
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  return (
    <div
      className="h-full w-full p-4 grid grid-cols-6 gap-1 content-start"
      onContextMenu={handleRightClick}
      onClick={handleCloseContextMenu}
    >
      {organizedApps.map((app) => (
        <DesktopIcon
          key={app.id}
          app={app}
          isSelected={selectedIcon === app.id}
          onClick={() => handleIconClick(app)}
          onDoubleClick={() => handleIconDoubleClick(app)}
        />
      ))}

      <button
        className="fixed bottom-20 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={onTakeScreenshot}
        title="Tomar captura de pantalla"
      >
        <ImageIcon className="h-6 w-6" />
      </button>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onTakeScreenshot={onTakeScreenshot}
          onOpenTaskManager={onOpenTaskManager}
          onLaunchExternalApp={onLaunchExternalApp}
        />
      )}
    </div>
  )
}
