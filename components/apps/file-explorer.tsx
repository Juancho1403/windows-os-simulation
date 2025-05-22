"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Folder,
  File,
  ImageIcon,
  Music,
  Video,
  HardDrive,
  Monitor,
  Download,
  Grid,
} from "lucide-react"

interface FileExplorerProps {
  onLaunchExternal: () => void
}

export default function FileExplorer({ onLaunchExternal }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState("C:\\Users\\Usuario")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid" | "details">("details")

  const folders = [
    { name: "Documentos", icon: <Folder className="h-5 w-5 text-yellow-500" /> },
    { name: "Imágenes", icon: <Folder className="h-5 w-5 text-yellow-500" /> },
    { name: "Música", icon: <Folder className="h-5 w-5 text-yellow-500" /> },
    { name: "Vídeos", icon: <Folder className="h-5 w-5 text-yellow-500" /> },
    { name: "Descargas", icon: <Folder className="h-5 w-5 text-yellow-500" /> },
  ]

  const files = [
    { name: "Documento.docx", type: "word", icon: <File className="h-5 w-5 text-blue-500" /> },
    { name: "Hoja de cálculo.xlsx", type: "excel", icon: <File className="h-5 w-5 text-green-500" /> },
    { name: "Presentación.pptx", type: "powerpoint", icon: <File className="h-5 w-5 text-orange-500" /> },
    { name: "Imagen.jpg", type: "image", icon: <ImageIcon className="h-5 w-5 text-purple-500" /> },
    { name: "Canción.mp3", type: "audio", icon: <Music className="h-5 w-5 text-red-500" /> },
    { name: "Video.mp4", type: "video", icon: <Video className="h-5 w-5 text-blue-400" /> },
  ]

  const quickAccess = [
    { name: "Escritorio", icon: <Monitor className="h-5 w-5" /> },
    { name: "Descargas", icon: <Download className="h-5 w-5" /> },
    { name: "Documentos", icon: <File className="h-5 w-5" /> },
    { name: "Imágenes", icon: <ImageIcon className="h-5 w-5" /> },
    { name: "Este equipo", icon: <HardDrive className="h-5 w-5" /> },
  ]

  const drives = [
    { name: "Disco local (C:)", icon: <HardDrive className="h-5 w-5" />, freeSpace: "128 GB libres de 256 GB" },
    { name: "Disco local (D:)", icon: <HardDrive className="h-5 w-5" />, freeSpace: "450 GB libres de 1 TB" },
  ]

  const handleItemClick = (name: string) => {
    setSelectedItem(name)
  }

  const handleItemDoubleClick = (name: string, type: string) => {
    if (type === "folder") {
      setCurrentPath(`${currentPath}\\${name}`)
    } else {
      // Simulate opening the file
      alert(`Abriendo ${name}`)
    }
  }

  const goBack = () => {
    if (currentPath.includes("\\")) {
      const newPath = currentPath.split("\\").slice(0, -1).join("\\")
      setCurrentPath(newPath || "C:")
    }
  }

  const renderFileList = () => {
    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-6 gap-2 p-2">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className={`flex flex-col items-center p-2 rounded cursor-pointer ${
                  selectedItem === folder.name ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(folder.name)}
                onDoubleClick={() => handleItemDoubleClick(folder.name, "folder")}
              >
                {folder.icon}
                <span className="text-xs mt-1 text-center">{folder.name}</span>
              </div>
            ))}
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex flex-col items-center p-2 rounded cursor-pointer ${
                  selectedItem === file.name ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(file.name)}
                onDoubleClick={() => handleItemDoubleClick(file.name, file.type)}
              >
                {file.icon}
                <span className="text-xs mt-1 text-center">{file.name}</span>
              </div>
            ))}
          </div>
        )
      case "list":
        return (
          <div className="p-2">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  selectedItem === folder.name ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(folder.name)}
                onDoubleClick={() => handleItemDoubleClick(folder.name, "folder")}
              >
                {folder.icon}
                <span className="ml-2">{folder.name}</span>
              </div>
            ))}
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  selectedItem === file.name ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(file.name)}
                onDoubleClick={() => handleItemDoubleClick(file.name, file.type)}
              >
                {file.icon}
                <span className="ml-2">{file.name}</span>
              </div>
            ))}
          </div>
        )
      case "details":
      default:
        return (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Fecha de modificación</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Tamaño</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((folder) => (
                <tr
                  key={folder.name}
                  className={`cursor-pointer ${selectedItem === folder.name ? "bg-blue-100" : "hover:bg-gray-50"}`}
                  onClick={() => handleItemClick(folder.name)}
                  onDoubleClick={() => handleItemDoubleClick(folder.name, "folder")}
                >
                  <td className="px-4 py-2 flex items-center">
                    {folder.icon}
                    <span className="ml-2">{folder.name}</span>
                  </td>
                  <td className="px-4 py-2 text-sm">12/05/2023 10:30</td>
                  <td className="px-4 py-2 text-sm">Carpeta de archivos</td>
                  <td className="px-4 py-2 text-sm">-</td>
                </tr>
              ))}
              {files.map((file) => (
                <tr
                  key={file.name}
                  className={`cursor-pointer ${selectedItem === file.name ? "bg-blue-100" : "hover:bg-gray-50"}`}
                  onClick={() => handleItemClick(file.name)}
                  onDoubleClick={() => handleItemDoubleClick(file.name, file.type)}
                >
                  <td className="px-4 py-2 flex items-center">
                    {file.icon}
                    <span className="ml-2">{file.name}</span>
                  </td>
                  <td className="px-4 py-2 text-sm">15/05/2023 14:45</td>
                  <td className="px-4 py-2 text-sm">
                    {file.type === "word" && "Documento de Microsoft Word"}
                    {file.type === "excel" && "Hoja de cálculo de Microsoft Excel"}
                    {file.type === "powerpoint" && "Presentación de Microsoft PowerPoint"}
                    {file.type === "image" && "Imagen JPEG"}
                    {file.type === "audio" && "Archivo de audio MP3"}
                    {file.type === "video" && "Archivo de vídeo MP4"}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {file.type === "word" && "25 KB"}
                    {file.type === "excel" && "42 KB"}
                    {file.type === "powerpoint" && "1.2 MB"}
                    {file.type === "image" && "3.5 MB"}
                    {file.type === "audio" && "8.7 MB"}
                    {file.type === "video" && "45.2 MB"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b p-2 flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-200" onClick={goBack} disabled={currentPath === "C:"}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <ChevronRight className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <RefreshCw className="h-5 w-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={currentPath}
            onChange={(e) => setCurrentPath(e.target.value)}
            className="w-full pl-2 pr-8 py-1 border rounded"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex space-x-1">
          <button
            className={`p-1 rounded ${viewMode === "list" ? "bg-blue-100" : "hover:bg-gray-200"}`}
            onClick={() => setViewMode("list")}
            title="Lista"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            className={`p-1 rounded ${viewMode === "grid" ? "bg-blue-100" : "hover:bg-gray-200"}`}
            onClick={() => setViewMode("grid")}
            title="Iconos"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            className={`p-1 rounded ${viewMode === "details" ? "bg-blue-100" : "hover:bg-gray-200"}`}
            onClick={() => setViewMode("details")}
            title="Detalles"
          >
            <Grid className="h-5 w-5" />
          </button>
        </div>

        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onLaunchExternal}>
          Abrir explorador real
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 border-r overflow-y-auto">
          <div className="p-2">
            <div className="font-medium text-sm mb-1">Acceso rápido</div>
            {quickAccess.map((item) => (
              <div key={item.name} className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100">
                {item.icon}
                <span className="ml-2 text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="p-2 border-t">
            <div className="font-medium text-sm mb-1">Este equipo</div>
            {drives.map((drive) => (
              <div key={drive.name} className="flex flex-col p-2 rounded cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  {drive.icon}
                  <span className="ml-2 text-sm">{drive.name}</span>
                </div>
                <div className="ml-7 text-xs text-gray-500">{drive.freeSpace}</div>
              </div>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto">{renderFileList()}</div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t px-4 py-1 text-xs text-gray-600 flex justify-between">
        <div>{folders.length} elementos</div>
        <div>{selectedItem ? `1 elemento seleccionado` : ""}</div>
      </div>
    </div>
  )
}
