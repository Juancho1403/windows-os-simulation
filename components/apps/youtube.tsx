"use client"

import type React from "react"

import { useState } from "react"
import { Search, Home, Compass, PlaySquare, Clock, ThumbsUp, User, Settings, Menu, Youtube } from "lucide-react"

interface YouTubeProps {
  onLaunchExternal: () => void
}

export default function YouTube({ onLaunchExternal }: YouTubeProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("home")

  const featuredVideos = [
    {
      id: "video1",
      title: "Cómo construir una aplicación con React y Next.js",
      channel: "Programación Fácil",
      views: "1.2M vistas",
      timestamp: "hace 2 semanas",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "15:24",
    },
    {
      id: "video2",
      title: "Tutorial completo de JavaScript para principiantes",
      channel: "Código Creativo",
      views: "850K vistas",
      timestamp: "hace 1 mes",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "42:18",
    },
    {
      id: "video3",
      title: "Los 10 mejores lugares para visitar en 2023",
      channel: "Viajes Increíbles",
      views: "3.5M vistas",
      timestamp: "hace 3 días",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "18:45",
    },
    {
      id: "video4",
      title: "Receta fácil: Pasta carbonara auténtica italiana",
      channel: "Cocina con María",
      views: "1.8M vistas",
      timestamp: "hace 1 semana",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "12:37",
    },
    {
      id: "video5",
      title: "Cómo mejorar tu productividad: 5 técnicas probadas",
      channel: "Desarrollo Personal",
      views: "2.1M vistas",
      timestamp: "hace 2 meses",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "22:15",
    },
    {
      id: "video6",
      title: "Novedades de Windows 11: Todo lo que debes saber",
      channel: "Tech al Día",
      views: "4.7M vistas",
      timestamp: "hace 5 días",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "25:42",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Buscando: ${searchQuery}`)
  }

  const openVideo = (videoId: string) => {
    alert(`Reproduciendo video: ${videoId}`)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b p-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center ml-4">
            <Youtube className="h-6 w-6 text-red-600 mr-1" />
            <span className="font-bold text-xl">YouTube</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full px-4 py-2 border rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-gray-100 hover:bg-gray-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <button
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={onLaunchExternal}
          >
            Abrir YouTube real
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r overflow-y-auto hidden md:block">
          <div className="p-2">
            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "home" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("home")}
            >
              <Home className="h-5 w-5 mr-4" />
              <span>Inicio</span>
            </button>
            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "explore" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("explore")}
            >
              <Compass className="h-5 w-5 mr-4" />
              <span>Explorar</span>
            </button>
            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "subscriptions" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("subscriptions")}
            >
              <PlaySquare className="h-5 w-5 mr-4" />
              <span>Suscripciones</span>
            </button>

            <div className="border-t my-2"></div>

            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "library" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("library")}
            >
              <PlaySquare className="h-5 w-5 mr-4" />
              <span>Biblioteca</span>
            </button>
            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "history" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <Clock className="h-5 w-5 mr-4" />
              <span>Historial</span>
            </button>
            <button
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === "liked" ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("liked")}
            >
              <ThumbsUp className="h-5 w-5 mr-4" />
              <span>Videos que me gustan</span>
            </button>

            <div className="border-t my-2"></div>

            <div className="p-2 text-sm font-medium text-gray-500">SUSCRIPCIONES</div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <div className="w-6 h-6 rounded-full bg-red-500 mr-4"></div>
              <span>Canal de Tecnología</span>
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <div className="w-6 h-6 rounded-full bg-blue-500 mr-4"></div>
              <span>Tutoriales Web</span>
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-500 mr-4"></div>
              <span>Viajes y Aventuras</span>
            </div>

            <div className="border-t my-2"></div>

            <button
              className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-4" />
              <span>Configuración</span>
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Videos recomendados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className="cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => openVideo(video.id)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full rounded-lg object-cover"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">{video.channel}</div>
                  <div className="text-xs text-gray-500">
                    {video.views} • {video.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
