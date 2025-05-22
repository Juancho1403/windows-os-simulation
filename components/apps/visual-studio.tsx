"use client"

import { useState } from "react"
import { FolderOpen, Code, Terminal, Settings, Play, Save, FileCode } from "lucide-react"

interface VisualStudioProps {
  onLaunchExternal: () => void
}

export default function VisualStudio({ onLaunchExternal }: VisualStudioProps) {
  const [activeFile, setActiveFile] = useState("index.html")
  const [files, setFiles] = useState({
    "index.html":
      '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Página</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Hola Mundo</h1>\n  <p>Esta es mi página web.</p>\n  <script src="script.js"></script>\n</body>\n</html>',
    "styles.css":
      "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\nh1 {\n  color: #333;\n}",
    "script.js": 'document.addEventListener("DOMContentLoaded", function() {\n  console.log("Página cargada!");\n});',
  })

  const [consoleOutput, setConsoleOutput] = useState("")

  const handleFileChange = (fileName: string, content: string) => {
    setFiles({
      ...files,
      [fileName]: content,
    })
  }

  const runCode = () => {
    setConsoleOutput("> Ejecutando código...\n> Página cargada!\n> Ejecución completada.")
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Menu Bar */}
      <div className="bg-gray-800 p-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="hover:bg-gray-700 px-2 py-1 rounded text-sm">Archivo</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded text-sm">Editar</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded text-sm">Ver</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded text-sm">Terminal</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded text-sm">Ayuda</button>
        </div>

        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={onLaunchExternal}
        >
          Abrir VS Code real
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800 border-t border-gray-700 p-2 flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-700">
          <FolderOpen className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-700">
          <Save className="h-5 w-5" />
        </button>
        <div className="h-5 border-l border-gray-600 mx-1"></div>
        <button className="p-1 rounded hover:bg-gray-700 text-green-400" onClick={runCode}>
          <Play className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Explorer */}
          <div className="p-2 font-medium text-sm flex items-center">
            <FolderOpen className="h-4 w-4 mr-2" />
            EXPLORADOR
          </div>
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-1">MI PROYECTO</div>
            {Object.keys(files).map((fileName) => (
              <div
                key={fileName}
                className={`flex items-center p-1 rounded text-sm cursor-pointer ${
                  activeFile === fileName ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveFile(fileName)}
              >
                <FileCode className="h-4 w-4 mr-2 text-blue-400" />
                {fileName}
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 flex">
            {Object.keys(files).map((fileName) => (
              <div
                key={fileName}
                className={`px-3 py-2 flex items-center text-sm cursor-pointer ${
                  activeFile === fileName ? "bg-gray-900 border-t-2 border-blue-500" : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveFile(fileName)}
              >
                <FileCode className="h-4 w-4 mr-2 text-blue-400" />
                {fileName}
              </div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto">
            <textarea
              className="w-full h-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none outline-none"
              value={files[activeFile]}
              onChange={(e) => handleFileChange(activeFile, e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Console */}
          <div className="h-32 bg-gray-800 border-t border-gray-700 flex flex-col">
            <div className="px-2 py-1 bg-gray-700 text-xs font-medium flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              CONSOLA
            </div>
            <div className="flex-1 p-2 font-mono text-xs text-gray-300 overflow-auto whitespace-pre-line">
              {consoleOutput}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-2 py-1 flex justify-between text-xs">
        <div className="flex items-center">
          <Code className="h-3 w-3 mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center">
          <Settings className="h-3 w-3 mr-1" />
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  )
}
