"use client"

import { useState } from "react"

interface SpreadsheetProps {
  onLaunchExternal: () => void
}

export default function Spreadsheet({ onLaunchExternal }: SpreadsheetProps) {
  const rows = 20
  const cols = 10

  const [cells, setCells] = useState<Record<string, Cell>>({})
  const [activeCell, setActiveCell] = useState<string | null>(null)
  const [formulaInput, setFormulaInput] = useState("")

  interface Cell {
    value: string
    formula?: string
  }

  const getCellId = (row: number, col: number) => `${String.fromCharCode(65 + col)}${row + 1}`

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId)
    setFormulaInput(cells[cellId]?.formula || cells[cellId]?.value || "")
  }

  const handleCellChange = (cellId: string, value: string) => {
    setCells((prev) => ({
      ...prev,
      [cellId]: { value, formula: value.startsWith("=") ? value : undefined },
    }))
  }

  const handleFormulaChange = (value: string) => {
    setFormulaInput(value)
    if (activeCell) {
      handleCellChange(activeCell, value)
    }
  }

  const renderCell = (row: number, col: number) => {
    const cellId = getCellId(row, col)
    const cell = cells[cellId] || { value: "" }

    return (
      <td
        key={cellId}
        className={`border w-24 h-6 px-1 ${activeCell === cellId ? "bg-blue-100 outline outline-2 outline-blue-500" : "hover:bg-gray-50"}`}
        onClick={() => handleCellClick(cellId)}
      >
        <input
          type="text"
          value={cell.value}
          onChange={(e) => handleCellChange(cellId, e.target.value)}
          className="w-full h-full border-none outline-none bg-transparent"
        />
      </td>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="border-b p-2 flex space-x-4">
        <div className="dropdown relative group">
          <button className="hover:bg-gray-100 px-2 py-1 rounded">Archivo</button>
          <div className="dropdown-content hidden group-hover:block absolute bg-white shadow-lg border rounded p-1 z-10">
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Nuevo</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Abrir</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Guardar</button>
            <div className="border-t my-1"></div>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded" onClick={onLaunchExternal}>
              Abrir Excel real
            </button>
          </div>
        </div>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Editar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Ver</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Insertar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Formato</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Datos</button>
      </div>

      {/* Formula Bar */}
      <div className="border-b p-2 flex items-center">
        <div className="w-16 text-center font-medium text-gray-500">{activeCell || ""}</div>
        <div className="w-4 text-center">=</div>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => handleFormulaChange(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Fórmula"
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-10 h-6 bg-gray-100 border"></th>
              {Array.from({ length: cols }).map((_, col) => (
                <th key={col} className="w-24 h-6 bg-gray-100 border">
                  {String.fromCharCode(65 + col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, row) => (
              <tr key={row}>
                <th className="w-10 h-6 bg-gray-100 border text-center">{row + 1}</th>
                {Array.from({ length: cols }).map((_, col) => renderCell(row, col))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="border-t p-2 flex justify-between text-xs text-gray-500">
        <div>Hoja 1</div>
        <div>100%</div>
      </div>
    </div>
  )
}
