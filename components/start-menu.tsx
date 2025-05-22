"use client"

import { useState } from "react"

import {
  Activity,
  Grid,
  ImageIcon,
  FileText,
  Calculator,
  Globe,
  ShoppingBag,
  Code,
  Power,
  Settings,
  Folder,
  User,
  Search,
  File,
  Mail,
  Calendar,
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
} from "lucide-react"
import type { Application } from "@/lib/types"

interface StartMenuProps {
  onOpenApp: (app: Application) => void
  onClose: () => void
  onLaunchExternalApp: (appUrl: string) => void
}

export default function StartMenu({ onOpenApp, onClose, onLaunchExternalApp }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("pinned")

  const pinnedApps: Application[] = [
    { id: "edge", title: "Microsoft Edge", icon: <Compass className="h-6 w-6 text-blue-400" /> },
    { id: "chrome", title: "Google Chrome", icon: <Chrome className="h-6 w-6 text-blue-500" /> },
    { id: "firefox", title: "Firefox", icon: <Firefox className="h-6 w-6 text-orange-500" /> },
    { id: "word", title: "Word", icon: <FileText className="h-6 w-6 text-blue-600" /> },
    { id: "excel", title: "Excel", icon: <Grid className="h-6 w-6 text-green-600" /> },
    { id: "powerpoint", title: "PowerPoint", icon: <ImageIcon className="h-6 w-6 text-orange-600" /> },
    { id: "fileExplorer", title: "Explorador de archivos", icon: <Folder className="h-6 w-6 text-yellow-500" /> },
    { id: "spotify", title: "Spotify", icon: <Music className="h-6 w-6 text-green-500" /> },
    { id: "youtube", title: "YouTube", icon: <Youtube className="h-6 w-6 text-red-600" /> },
    { id: "netflix", title: "Netflix", icon: <Film className="h-6 w-6 text-red-700" /> },
    { id: "magicTV", title: "Magic TV", icon: <Tv className="h-6 w-6 text-purple-600" /> },
    { id: "settings", title: "Configuración", icon: <Settings className="h-6 w-6 text-gray-600" /> },
  ]

  const allApps: Application[] = [
    ...pinnedApps,
    { id: "opera", title: "Opera", icon: <Globe className="h-6 w-6 text-red-500" /> },
    { id: "brave", title: "Brave", icon: <Shield className="h-6 w-6 text-orange-600" /> },
    { id: "notepad", title: "Bloc de notas", icon: <File className="h-6 w-6 text-gray-600" /> },
    { id: "calculator", title: "Calculadora", icon: <Calculator className="h-6 w-6 text-gray-600" /> },
    { id: "store", title: "Microsoft Store", icon: <ShoppingBag className="h-6 w-6 text-blue-500" /> },
    { id: "visualStudio", title: "Visual Studio Code", icon: <Code className="h-6 w-6 text-blue-500" /> },
    { id: "taskManager", title: "Administrador de tareas", icon: <Activity className="h-6 w-6 text-blue-500" /> },
    { id: "mail", title: "Correo", icon: <Mail className="h-6 w-6 text-blue-400" /> },
    { id: "calendar", title: "Calendario", icon: <Calendar className="h-6 w-6 text-blue-400" /> },
    { id: "paint", title: "Paint", icon: <ImageIcon className="h-6 w-6 text-blue-400" /> },
    { id: "games", title: "Juegos", icon: <Gamepad className="h-6 w-6 text-green-400" /> },
    { id: "recycleBin", title: "Papelera de reciclaje", icon: <Trash2 className="h-6 w-6 text-gray-600" /> },
  ]

  const handleAppClick = (app: Application) => {
    onOpenApp(app)
  }

  const handleExternalAppLaunch = (appId: string) => {
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
      store: "ms-windows-store:",
      visualStudio: "https://code.visualstudio.com/",
      settings: "ms-settings:",
      paint: "ms-paint:",
      games: "ms-gaming-overlay:",
      recycleBin: "shell:RecycleBinFolder",
      taskManager: "taskmgr:",
      mail: "mailto:",
      calendar: "outlookcal:",
    }

    if (appUrlMap[appId]) {
      onLaunchExternalApp(appUrlMap[appId])
      onClose()
    }
  }

  const filteredApps = searchQuery
    ? allApps.filter((app) => app.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeSection === "pinned"
      ? pinnedApps
      : allApps

  return (
    <div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[650px] bg-black bg-opacity-85 backdrop-blur-xl rounded-xl shadow-2xl z-50 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Escribe aquí para buscar"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pinned / All Apps Toggle */}
      {!searchQuery && (
        <div className="px-4 flex space-x-4 text-white">
          <button
            className={`pb-1 ${activeSection === "pinned" ? "border-b-2 border-blue-500 font-medium" : "text-gray-400"}`}
            onClick={() => setActiveSection("pinned")}
          >
            Anclados
          </button>
          <button
            className={`pb-1 ${activeSection === "all" ? "border-b-2 border-blue-500 font-medium" : "text-gray-400"}`}
            onClick={() => setActiveSection("all")}
          >
            Todas las aplicaciones
          </button>
        </div>
      )}

      {/* Apps Grid */}
      <div className="flex-1 max-h-[400px] overflow-y-auto p-4">
        <div className="grid grid-cols-6 gap-4">
          {filteredApps.map((app) => (
            <div key={app.id} className="flex flex-col items-center">
              <button
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-700 text-center w-full"
                onClick={() => handleAppClick(app)}
                onDoubleClick={() => handleExternalAppLaunch(app.id)}
              >
                <div className="mb-2">{app.icon}</div>
                <span className="text-white text-xs">{app.title}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User and Power Options */}
      <div className="p-4 border-t border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User className="h-6 w-6" />
          </div>
          <span className="ml-3 text-white font-medium">Usuario</span>
        </div>

        <button
          className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          onClick={() => alert("Función de apagado simulada")}
        >
          <Power className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-white text-sm">Apagar</span>
        </button>
      </div>
    </div>
  )
}
