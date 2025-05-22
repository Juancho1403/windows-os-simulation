"use client"

import { useState, useEffect } from "react"
import { Save, FolderOpen, FilePlus, Printer, Undo, Redo, Copy, Scissors, Clipboard } from "lucide-react"

interface NotepadProps {
  onLaunchExternal: () => void
}

export default function Notepad({ onLaunchExternal }: NotepadProps) {
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("Sin título.txt")
  const [isSaved, setIsSaved] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [fontFamily, setFontFamily] = useState("Consolas")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // Update word and character count when text changes
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length

    setWordCount(words)
    setCharCount(chars)
    setIsSaved(false)
  }, [text])

  const handleSave = () => {
    // In a real app, this would save to a file
    alert(`Archivo "${fileName}" guardado (simulación)`)
    setIsSaved(true)
  }

  const handleNew = () => {
    if (!isSaved) {
      if (confirm("¿Deseas guardar los cambios antes de crear un nuevo archivo?")) {
        handleSave()
      }
    }
    setText("")
    setFileName("Sin título.txt")
    setIsSaved(true)
  }

  const handleOpen = () => {
    // In a real app, this would open a file dialog
    alert("Función de abrir archivo (simulación)")
  }

  const handlePrint = () => {
    // In a real app, this would open the print dialog
    alert("Función de imprimir (simulación)")
  }

  const handleUndo = () => {
    // This would be implemented with a proper history stack in a real app
    alert("Función de deshacer (simulación)")
  }

  const handleRedo = () => {
    // This would be implemented with a proper history stack in a real app
    alert("Función de rehacer (simulación)")
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="border-b p-1 flex space-x-4">
        <div className="dropdown relative group">
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Archivo</button>
          <div className="dropdown-content hidden group-hover:block absolute bg-white shadow-lg border rounded p-1 z-10 w-48">
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handleNew}
            >
              <FilePlus className="h-4 w-4 mr-2" />
              <span>Nuevo</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+N</span>
            </button>
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handleOpen}
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              <span>Abrir</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+O</span>
            </button>
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              <span>Guardar</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+S</span>
            </button>
            <div className="border-t my-1"></div>
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              <span>Imprimir</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+P</span>
            </button>
            <div className="border-t my-1"></div>
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={onLaunchExternal}
            >
              <span>Abrir Bloc de notas real</span>
            </button>
          </div>
        </div>

        <div className="dropdown relative group">
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Editar</button>
          <div className="dropdown-content hidden group-hover:block absolute bg-white shadow-lg border rounded p-1 z-10 w-48">
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handleUndo}
            >
              <Undo className="h-4 w-4 mr-2" />
              <span>Deshacer</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+Z</span>
            </button>
            <button
              className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={handleRedo}
            >
              <Redo className="h-4 w-4 mr-2" />
              <span>Rehacer</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+Y</span>
            </button>
            <div className="border-t my-1"></div>
            <button className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              <Scissors className="h-4 w-4 mr-2" />
              <span>Cortar</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+X</span>
            </button>
            <button className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              <Copy className="h-4 w-4 mr-2" />
              <span>Copiar</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+C</span>
            </button>
            <button className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              <Clipboard className="h-4 w-4 mr-2" />
              <span>Pegar</span>
              <span className="ml-auto text-gray-500 text-xs">Ctrl+V</span>
            </button>
          </div>
        </div>

        <div className="dropdown relative group">
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Formato</button>
          <div className="dropdown-content hidden group-hover:block absolute bg-white shadow-lg border rounded p-1 z-10 w-48">
            <div className="px-2 py-1">
              <label className="block text-sm mb-1">Fuente:</label>
              <select
                className="w-full border rounded p-1"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="Consolas">Consolas</option>
                <option value="Courier New">Courier New</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>
            <div className="px-2 py-1">
              <label className="block text-sm mb-1">Tamaño:</label>
              <select
                className="w-full border rounded p-1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              >
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>

        <button className="hover:bg-gray-200 px-2 py-1 rounded">Ver</button>
        <button className="hover:bg-gray-200 px-2 py-1 rounded">Ayuda</button>
      </div>

      {/* Toolbar */}
      <div className="border-b p-1 flex items-center space-x-2 bg-gray-100">
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleNew} title="Nuevo">
          <FilePlus className="h-4 w-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleOpen} title="Abrir">
          <FolderOpen className="h-4 w-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleSave} title="Guardar">
          <Save className="h-4 w-4" />
        </button>
        <div className="h-4 border-l mx-1"></div>
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleUndo} title="Deshacer">
          <Undo className="h-4 w-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleRedo} title="Rehacer">
          <Redo className="h-4 w-4" />
        </button>

        <div className="ml-auto flex items-center">
          <span className="text-xs text-gray-500 mr-2">{isSaved ? "Guardado" : "No guardado"}</span>
        </div>
      </div>

      {/* Editor */}
      <textarea
        className="flex-1 p-2 resize-none outline-none font-mono"
        style={{ fontFamily, fontSize: `${fontSize}px` }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe aquí..."
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="bg-gray-100 border-t px-3 py-1 text-xs text-gray-600 flex justify-between">
        <div>{fileName}</div>
        <div>
          Palabras: {wordCount} | Caracteres: {charCount}
        </div>
      </div>
    </div>
  )
}
