"use client"

import type React from "react"

import { useState } from "react"
import { Search, Menu, Tv, Film, Play, Heart, Calendar, Clock, Settings, Info, User } from "lucide-react"

interface MagicTVProps {
  onLaunchExternal: () => void
}

export default function MagicTV({ onLaunchExternal }: MagicTVProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredShows = [
    {
      id: 1,
      title: "El Misterio del Bosque",
      category: "Drama",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=350",
      description:
        "Una serie de desapariciones en un pequeño pueblo desencadena una investigación que revela oscuros secretos.",
    },
    {
      id: 2,
      title: "Galaxia Perdida",
      category: "Ciencia Ficción",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=350",
      description: "Una nave espacial descubre una galaxia desconocida con formas de vida sorprendentes.",
    },
    {
      id: 3,
      title: "Cocina Extrema",
      category: "Reality",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=350",
      description: "Chefs compiten en los entornos más extremos del planeta para crear platos extraordinarios.",
    },
  ]

  const liveChannels = [
    { id: 1, name: "Magic Cine", logo: "/placeholder.svg?height=60&width=60", current: "Película: Aventuras en París" },
    {
      id: 2,
      name: "Magic Series",
      logo: "/placeholder.svg?height=60&width=60",
      current: "Serie: Detectives del Tiempo",
    },
    {
      id: 3,
      name: "Magic Deportes",
      logo: "/placeholder.svg?height=60&width=60",
      current: "Fútbol: Barcelona vs Real Madrid",
    },
    { id: 4, name: "Magic Noticias", logo: "/placeholder.svg?height=60&width=60", current: "Noticias de la tarde" },
    { id: 5, name: "Magic Documentales", logo: "/placeholder.svg?height=60&width=60", current: "La vida salvaje" },
    { id: 6, name: "Magic Kids", logo: "/placeholder.svg?height=60&width=60", current: "Dibujos animados" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Buscando: ${searchQuery}`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <Tv className="h-8 w-8 text-purple-500 mr-2" />
            <span className="font-bold text-2xl">Magic TV</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button
              className={`${activeTab === "home" ? "text-purple-400" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("home")}
            >
              Inicio
            </button>
            <button
              className={`${activeTab === "live" ? "text-purple-400" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("live")}
            >
              En directo
            </button>
            <button
              className={`${activeTab === "series" ? "text-purple-400" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("series")}
            >
              Series
            </button>
            <button
              className={`${activeTab === "movies" ? "text-purple-400" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("movies")}
            >
              Películas
            </button>
            <button
              className={`${activeTab === "favorites" ? "text-purple-400" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("favorites")}
            >
              Mis favoritos
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar contenido..."
              className="bg-gray-700 text-white px-4 py-2 rounded-full w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </form>
          <button className="md:hidden">
            <Search className="h-6 w-6" />
          </button>
          <button className="p-1 rounded-full bg-gray-700 hover:bg-gray-600">
            <User className="h-6 w-6" />
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={onLaunchExternal}>
            Abrir Magic TV real
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden bg-gray-800 px-4 pb-2">
        <button className="w-full py-2 bg-gray-700 rounded-lg flex items-center justify-center">
          <Menu className="h-5 w-5 mr-2" />
          <span>Menú</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "home" && (
          <div>
            {/* Featured Content */}
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=1200"
                alt="Featured Show"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-8">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold mb-2">La Gran Aventura</h1>
                  <div className="flex items-center mb-4">
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded mr-2">NUEVO</span>
                    <span className="text-sm text-gray-300">Aventura • 2023 • 8.9 ⭐</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Un grupo de exploradores se embarca en una misión para descubrir un tesoro legendario en las
                    profundidades de la selva amazónica.
                  </p>
                  <div className="flex space-x-4">
                    <button className="flex items-center bg-purple-600 px-6 py-2 rounded hover:bg-purple-700">
                      <Play className="h-5 w-5 mr-2" />
                      <span>Ver ahora</span>
                    </button>
                    <button className="flex items-center bg-gray-700 px-6 py-2 rounded hover:bg-gray-600">
                      <Info className="h-5 w-5 mr-2" />
                      <span>Más info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Shows */}
            <div className="px-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Destacados para ti</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredShows.map((show) => (
                  <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img src={show.image || "/placeholder.svg"} alt={show.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{show.title}</h3>
                        <span className="bg-gray-700 text-xs px-2 py-1 rounded">{show.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{show.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span>{show.rating}</span>
                        </div>
                        <button className="flex items-center text-sm bg-purple-600 px-3 py-1 rounded hover:bg-purple-700">
                          <Play className="h-4 w-4 mr-1" />
                          <span>Ver</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Channels */}
            <div className="px-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Canales en directo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {liveChannels.map((channel) => (
                  <div key={channel.id} className="bg-gray-800 rounded-lg p-4 flex items-center">
                    <img
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{channel.name}</h3>
                      <p className="text-sm text-gray-400">{channel.current}</p>
                    </div>
                    <button className="p-2 bg-red-600 rounded-full">
                      <Play className="h-4 w-4" fill="white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="px-8 mt-8 pb-8">
              <h2 className="text-xl font-bold mb-4">Explora por categorías</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-center cursor-pointer hover:opacity-90">
                  <Film className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Películas</span>
                </div>
                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-center cursor-pointer hover:opacity-90">
                  <Tv className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Series</span>
                </div>
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-center cursor-pointer hover:opacity-90">
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Favoritos</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-center cursor-pointer hover:opacity-90">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Próximamente</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <Tv className="h-16 w-16 mx-auto mb-4 text-purple-500" />
              <h2 className="text-2xl font-bold mb-2">Sección en desarrollo</h2>
              <p className="text-gray-400 mb-4">Esta sección de Magic TV está actualmente en desarrollo.</p>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                onClick={() => setActiveTab("home")}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-between items-center">
        <div className="text-sm text-gray-400">© 2023 Magic TV. Todos los derechos reservados.</div>
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Clock className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
