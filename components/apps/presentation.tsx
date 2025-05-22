"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Plus, Trash, ImageIcon, Type, Square } from "lucide-react"

interface PresentationProps {
  onLaunchExternal: () => void
}

export default function Presentation({ onLaunchExternal }: PresentationProps) {
  const [slides, setSlides] = useState([
    { id: 1, title: "Mi Presentación", content: "Haz clic para editar" },
    { id: 2, title: "Agenda", content: "• Punto 1\n• Punto 2\n• Punto 3" },
    { id: 3, title: "Gracias", content: "¿Preguntas?" },
  ])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(slides[currentSlide].title)
  const [editContent, setEditContent] = useState(slides[currentSlide].content)

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: "Nueva Diapositiva",
      content: "Haz clic para editar",
    }
    setSlides([...slides, newSlide])
    setCurrentSlide(slides.length)
  }

  const deleteSlide = () => {
    if (slides.length <= 1) return

    const newSlides = slides.filter((_, index) => index !== currentSlide)
    setSlides(newSlides)
    setCurrentSlide(Math.min(currentSlide, newSlides.length - 1))
  }

  const startEditing = () => {
    setIsEditing(true)
    setEditTitle(slides[currentSlide].title)
    setEditContent(slides[currentSlide].content)
  }

  const saveEdits = () => {
    const updatedSlides = [...slides]
    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      title: editTitle,
      content: editContent,
    }
    setSlides(updatedSlides)
    setIsEditing(false)
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
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
              Abrir PowerPoint real
            </button>
          </div>
        </div>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Editar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Ver</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Insertar</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Diseño</button>
        <button className="hover:bg-gray-100 px-2 py-1 rounded">Transiciones</button>
      </div>

      {/* Toolbar */}
      <div className="border-b p-2 flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-100" onClick={addSlide}>
          <Plus className="h-5 w-5" />
        </button>

        <button className="p-1 rounded hover:bg-gray-100" onClick={deleteSlide} disabled={slides.length <= 1}>
          <Trash className="h-5 w-5" />
        </button>

        <div className="h-6 border-l mx-2"></div>

        <button className="p-1 rounded hover:bg-gray-100">
          <Type className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <ImageIcon className="h-5 w-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Square className="h-5 w-5" />
        </button>

        <div className="flex-1"></div>

        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => alert("Iniciando presentación")}
        >
          <Play className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Slide Thumbnails */}
        <div className="w-48 border-r bg-gray-100 overflow-y-auto">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`p-2 m-2 bg-white border rounded cursor-pointer ${
                index === currentSlide ? "border-blue-500 ring-2 ring-blue-200" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className="text-xs font-bold truncate">{slide.title}</div>
              <div className="text-xs truncate">{slide.content.split("\n")[0]}</div>
            </div>
          ))}
        </div>

        {/* Current Slide */}
        <div className="flex-1 flex flex-col p-4 bg-gray-200">
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white shadow-lg w-full max-w-3xl aspect-[16/9] relative">
              {isEditing ? (
                <div className="absolute inset-0 p-8 flex flex-col">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-3xl font-bold mb-4 border-b outline-none"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1 resize-none outline-none"
                  />
                  <button
                    className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={saveEdits}
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 p-8 flex flex-col" onClick={startEditing}>
                  <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
                  <div className="whitespace-pre-line">{slides[currentSlide].content}</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm font-medium">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
            <button
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
