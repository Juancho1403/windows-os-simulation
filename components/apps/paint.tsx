"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Brush, Eraser, Square, Circle, Trash2, Undo, Redo, Palette } from "lucide-react"

interface PaintProps {
  onLaunchExternal: () => void
}

export default function Paint({ onLaunchExternal }: PaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"brush" | "eraser" | "square" | "circle">("brush")
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState(5)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial background to white
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    setCtx(context)

    // Save initial state
    const initialState = context.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([initialState])
    setHistoryIndex(0)
  }, [])

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(true)

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)

    if (tool === "brush" || tool === "eraser") {
      ctx.lineWidth = size
      ctx.lineCap = "round"
      ctx.strokeStyle = tool === "eraser" ? "white" : color
    }
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "brush" || tool === "eraser") {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing || !ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(false)
    ctx.closePath()

    // Save state to history
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Remove any states after current index (if we've undone and then drawn something new)
    const newHistory = history.slice(0, historyIndex + 1)
    setHistory([...newHistory, currentState])
    setHistoryIndex(newHistory.length)
  }

  const clearCanvas = () => {
    if (!ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Save cleared state to history
    const clearedState = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([...history, clearedState])
    setHistoryIndex(history.length)
  }

  const undo = () => {
    if (historyIndex <= 0 || !ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    const newIndex = historyIndex - 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }

  const redo = () => {
    if (historyIndex >= history.length - 1 || !ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    const newIndex = historyIndex + 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b p-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded ${tool === "brush" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setTool("brush")}
            title="Pincel"
          >
            <Brush className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded ${tool === "eraser" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setTool("eraser")}
            title="Borrador"
          >
            <Eraser className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded ${tool === "square" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setTool("square")}
            title="Rectángulo"
          >
            <Square className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded ${tool === "circle" ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setTool("circle")}
            title="Círculo"
          >
            <Circle className="h-5 w-5" />
          </button>

          <div className="h-6 border-l mx-1"></div>

          <button className="p-2 rounded hover:bg-gray-100" onClick={undo} title="Deshacer">
            <Undo className="h-5 w-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100" onClick={redo} title="Rehacer">
            <Redo className="h-5 w-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100" onClick={clearCanvas} title="Limpiar">
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="h-6 border-l mx-1"></div>

          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">Tamaño:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={size}
              onChange={(e) => setSize(Number.parseInt(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onLaunchExternal}>
          Abrir Paint real
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t px-2 py-1 text-xs text-gray-600 flex justify-between">
        <div>Herramienta: {tool}</div>
        <div>Color: {color}</div>
        <div>Tamaño: {size}px</div>
      </div>
    </div>
  )
}
