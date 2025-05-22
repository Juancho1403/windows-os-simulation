"use client"

import { useState } from "react"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from "lucide-react"

interface WordProcessorProps {
  onLaunchExternal: () => void
}

export default function WordProcessor({ onLaunchExternal }: WordProcessorProps) {
  const [content, setContent] = useState("")
  const [fileName, setFileName] = useState("Documento sin título")

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Menu Bar */}
      <div className="border-b bg-white p-2 flex space-x-4">
        <div className="dropdown relative group">
          <button className="hover:bg-gray-100 px-2 py-1 rounded">Archivo</button>
          <div className="dropdown-content hidden group-hover:block absolute bg-white shadow-lg border rounded p-1 z-10">
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Nuevo</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Abrir</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Guardar</button>
            <div className="border-t my-1"></div>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded" onClick={onLaunchExternal}>
              Abrir Word real
            </button>
          </div>
        </div>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Editar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Ver</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Insertar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Formato</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Herramientas</button>
      </div>

      {/* Toolbar */}
      <div className="border-b bg-white p-2 flex items-center space-x-2">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border rounded px-2 py-1 text-sm w-64"
        />

        <div className="h-6 border-l mx-2"></div>

        <select className="border rounded px-2 py-1 text-sm">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Calibri</option>
          <option>Courier New</option>
        </select>

        <select className="border rounded px-2 py-1 text-sm w-16">
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>24</option>
        </select>

        <div className="h-6 border-l mx-2"></div>

        <button className="p-1 rounded hover:bg-gray-100">
          <Bold className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Italic className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Underline className="h-5 w-5" />
        </button>

        <div className="h-6 border-l mx-2"></div>

        <button className="p-1 rounded hover:bg-gray-100">
          <AlignLeft className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <AlignCenter className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <AlignRight className="h-5 w-5" />
        </button>

        <div className="h-6 border-l mx-2"></div>

        <button className="p-1 rounded hover:bg-gray-100">
          <List className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <ListOrdered className="h-5 w-5" />
        </button>
      </div>

      {/* Document Area */}
      <div className="flex-1 p-8 overflow-auto bg-gray-300">
        <div className="bg-white shadow-md mx-auto h-[1056px] w-[816px] p-16">
          <textarea
            className="w-full h-full resize-none border-none outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Empieza a escribir..."
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t bg-white p-2 flex justify-between text-xs text-gray-500">
        <div>Página 1 de 1</div>
        <div>{content.length} caracteres</div>
      </div>
    </div>
  )
}
