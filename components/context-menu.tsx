"use client"

import { RefreshCw, Monitor, Activity, Grid, Trash2, ImageIcon, Folder, Settings, Gamepad } from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onTakeScreenshot: () => void
  onOpenTaskManager: () => void
  onLaunchExternalApp: (appUrl: string) => void
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onTakeScreenshot,
  onOpenTaskManager,
  onLaunchExternalApp,
}: ContextMenuProps) {
  return (
    <div
      className="fixed bg-gray-800 bg-opacity-90 backdrop-blur-sm text-white rounded-lg shadow-xl z-50 py-1"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        // Ensure menu doesn't go off screen
        transform: `translate(${x + 200 > window.innerWidth ? "-100%" : "0"}, ${y + 300 > window.innerHeight ? "-100%" : "0"})`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          // Would refresh desktop in a real OS
        }}
      >
        <RefreshCw className="h-4 w-4 mr-3" />
        <span>Actualizar</span>
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("ms-settings:display")
        }}
      >
        <Monitor className="h-4 w-4 mr-3" />
        <span>Configuración de pantalla</span>
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onOpenTaskManager()
        }}
      >
        <Activity className="h-4 w-4 mr-3" />
        <span>Administrador de tareas</span>
      </button>

      <div className="border-t border-gray-700 my-1"></div>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("ms-settings:personalization")
        }}
      >
        <Grid className="h-4 w-4 mr-3" />
        <span>Personalizar</span>
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onTakeScreenshot()
        }}
      >
        <ImageIcon className="h-4 w-4 mr-3" />
        <span>Captura de pantalla</span>
      </button>

      <div className="border-t border-gray-700 my-1"></div>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("file:///")
        }}
      >
        <Folder className="h-4 w-4 mr-3" />
        <span>Explorador de archivos</span>
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("ms-settings:")
        }}
      >
        <Settings className="h-4 w-4 mr-3" />
        <span>Configuración</span>
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("ms-gaming-overlay:")
        }}
      >
        <Gamepad className="h-4 w-4 mr-3" />
        <span>Xbox Game Bar</span>
      </button>

      <div className="border-t border-gray-700 my-1"></div>

      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
        onClick={() => {
          onClose()
          onLaunchExternalApp("shell:RecycleBinFolder")
        }}
      >
        <Trash2 className="h-4 w-4 mr-3" />
        <span>Papelera de reciclaje</span>
      </button>
    </div>
  )
}
