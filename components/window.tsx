"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minus, Square, Maximize2 } from "lucide-react"
import type { Application } from "@/lib/types"

interface WindowProps {
  app: Application
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

export default function Window({ app, isActive, onClose, onMinimize, onFocus, children }: WindowProps) {
  const [position, setPosition] = useState({ x: 50 + Math.random() * 100, y: 50 + Math.random() * 50 })
  const [size, setSize] = useState({ width: 800, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const [prevSize, setPrevSize] = useState({ width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Handle dragging
  const startDrag = (e: React.MouseEvent) => {
    if (isMaximized) {
      // When dragging a maximized window, restore it and position it under the cursor
      setIsMaximized(false)
      const windowWidth = prevSize.width
      const newX = e.clientX - windowWidth / 2
      setPosition({ x: newX, y: 0 })
      setSize(prevSize)

      setIsDragging(true)
      setDragOffset({
        x: windowWidth / 2,
        y: e.clientY,
      })
    } else {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
    e.preventDefault()
  }

  const onDrag = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const stopDrag = () => {
    setIsDragging(false)
  }

  // Handle window resizing
  const startResize = (e: React.MouseEvent) => {
    if (isMaximized) return
    setIsResizing(true)
    e.preventDefault()
  }

  const onResize = (e: MouseEvent) => {
    if (isResizing && windowRef.current) {
      const newWidth = Math.max(400, e.clientX - position.x)
      const newHeight = Math.max(300, e.clientY - position.y)
      setSize({ width: newWidth, height: newHeight })
    }
  }

  const stopResize = () => {
    setIsResizing(false)
  }

  // Toggle maximize
  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevPosition(position)
      setPrevSize(size)
      setIsMaximized(true)
    } else {
      setPosition(prevPosition)
      setSize(prevSize)
      setIsMaximized(false)
    }
  }

  // Double click on title bar to maximize/restore
  const handleTitleDoubleClick = () => {
    toggleMaximize()
  }

  // Add event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", isDragging ? onDrag : onResize)
      window.addEventListener("mouseup", isDragging ? stopDrag : stopResize)
    }

    return () => {
      window.removeEventListener("mousemove", isDragging ? onDrag : onResize)
      window.removeEventListener("mouseup", isDragging ? stopDrag : stopResize)
    }
  }, [isDragging, isResizing])

  // Snap to edges
  useEffect(() => {
    if (!isDragging || isMaximized) return

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Snap to top to maximize
    if (position.y < 10) {
      toggleMaximize()
      return
    }

    // Snap to left half
    if (position.x < 20) {
      setPosition({ x: 0, y: 0 })
      setSize({ width: windowWidth / 2, height: windowHeight - 48 })
      return
    }

    // Snap to right half
    if (position.x + size.width > windowWidth - 20) {
      setPosition({ x: windowWidth / 2, y: 0 })
      setSize({ width: windowWidth / 2, height: windowHeight - 48 })
      return
    }
  }, [position, isDragging])

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg shadow-xl overflow-hidden flex flex-col ${
        isActive ? "z-20" : "z-10"
      } ${isMaximized ? "inset-0" : ""}`}
      style={
        isMaximized
          ? { width: "100%", height: "calc(100% - 48px)" }
          : {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
            }
      }
      onClick={onFocus}
    >
      {/* Window Title Bar */}
      <div
        className={`h-8 flex items-center justify-between px-3 ${isActive ? "bg-gray-800" : "bg-gray-600"}`}
        onMouseDown={startDrag}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="flex items-center">
          <div className="mr-2">{app.icon}</div>
          <span className="text-white font-medium truncate">{app.title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="text-white hover:bg-gray-700 p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          >
            <Minus className="h-4 w-4" />
          </button>

          <button
            className="text-white hover:bg-gray-700 p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
          >
            {isMaximized ? <Square className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            className="text-white hover:bg-red-500 p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 bg-white overflow-auto">{children}</div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={startResize}
          style={{ backgroundImage: "radial-gradient(circle, #888 1px, transparent 1px)", backgroundSize: "3px 3px" }}
        />
      )}
    </div>
  )
}
