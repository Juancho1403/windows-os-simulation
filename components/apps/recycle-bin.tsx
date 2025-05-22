"use client"

import { useState } from "react"
import { Trash2, ArrowUp, List, GridIcon } from "lucide-react"

interface RecycleBinProps {
  onLaunchExternal: () => void
}

export default function RecycleBin({ onLaunchExternal }: RecycleBinProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const deletedItems = [
    { name: "Documento antiguo.docx", type: "Documento de Word", size: "45 KB", deletedDate: "15/04/2023" },
    {
      name: "Presentación proyecto.pptx",
      type: "Presentación de PowerPoint",
      size: "2.3 MB",
      deletedDate: "20/04/2023",
    },
    { name: "foto_vacaciones.jpg", type: "Imagen JPEG", size: "1.8 MB", deletedDate: "05/05/2023" },
    { name: "notas.txt", type: "Documento de texto", size: "2 KB", deletedDate: "10/05/2023" },
    { name: "presupuesto.xlsx", type: "Hoja de cálculo de Excel", size: "78 KB", deletedDate: "12/05/2023" },
  ]

  const toggleItemSelection = (name: string) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name))
    } else {
      setSelectedItems([...selectedItems, name])
    }
  }

  const selectAllItems = () => {
    if (selectedItems.length === deletedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(deletedItems.map((item) => item.name))
    }
  }

  const emptyRecycleBin = () => {
    alert("Papelera vaciada (simulación)")
  }

  const restoreSelectedItems = () => {
    alert(`Elementos restaurados: ${selectedItems.join(", ")}`)
    setSelectedItems([])
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b p-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
            onClick={restoreSelectedItems}
            disabled={selectedItems.length === 0}
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>Restaurar</span>
          </button>

          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
            onClick={emptyRecycleBin}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span>Vaciar papelera</span>
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            className={`p-1 rounded ${viewMode === "list" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            className={`p-1 rounded ${viewMode === "grid" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setViewMode("grid")}
          >
            <GridIcon className="h-5 w-5" />
          </button>

          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onLaunchExternal}>
            Abrir papelera real
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {viewMode === "list" ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === deletedItems.length}
                    onChange={selectAllItems}
                  />
                </th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Tipo</th>
                <th className="p-2 border">Tamaño</th>
                <th className="p-2 border">Fecha de eliminación</th>
              </tr>
            </thead>
            <tbody>
              {deletedItems.map((item) => (
                <tr
                  key={item.name}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedItems.includes(item.name) ? "bg-blue-50" : ""}`}
                  onClick={() => toggleItemSelection(item.name)}
                >
                  <td className="p-2 border">
                    <input type="checkbox" checked={selectedItems.includes(item.name)} onChange={() => {}} />
                  </td>
                  <td className="p-2 border flex items-center">
                    <Trash2 className="h-4 w-4 mr-2 text-gray-500" />
                    {item.name}
                  </td>
                  <td className="p-2 border">{item.type}</td>
                  <td className="p-2 border">{item.size}</td>
                  <td className="p-2 border">{item.deletedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {deletedItems.map((item) => (
              <div
                key={item.name}
                className={`p-3 border rounded flex flex-col items-center cursor-pointer ${
                  selectedItems.includes(item.name) ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleItemSelection(item.name)}
              >
                <Trash2 className="h-12 w-12 text-gray-500 mb-2" />
                <div className="text-center">
                  <div className="font-medium text-sm truncate w-full">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.size}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t px-4 py-1 text-xs text-gray-600 flex justify-between">
        <div>{deletedItems.length} elementos</div>
        <div>{selectedItems.length} seleccionados</div>
      </div>
    </div>
  )
}
