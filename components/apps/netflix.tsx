"use client"

import type React from "react"

import { useState } from "react"
import { Search, Bell, User, ChevronDown, Play, Plus, ThumbsUp, Info } from "lucide-react"

interface NetflixProps {
  onLaunchExternal: () => void
}

export default function Netflix({ onLaunchExternal }: NetflixProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const categories = [
    { id: "trending", name: "Tendencias" },
    { id: "popular", name: "Populares en Netflix" },
    { id: "mylist", name: "Mi lista" },
    { id: "originals", name: "Originales de Netflix" },
    { id: "action", name: "Acción" },
    { id: "comedy", name: "Comedia" },
  ]

  const featuredContent = {
    title: "Stranger Things",
    description:
      "Cuando un niño desaparece, un pequeño pueblo descubre un misterio que involucra experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
    image: "/placeholder.svg?height=500&width=1200",
  }

  const movies = [
    { id: 1, title: "El Padrino", image: "/placeholder.svg?height=200&width=350" },
    { id: 2, title: "Interestelar", image: "/placeholder.svg?height=200&width=350" },
    { id: 3, title: "El Caballero Oscuro", image: "/placeholder.svg?height=200&width=350" },
    { id: 4, title: "Pulp Fiction", image: "/placeholder.svg?height=200&width=350" },
    { id: 5, title: "El Señor de los Anillos", image: "/placeholder.svg?height=200&width=350" },
    { id: 6, title: "Matrix", image: "/placeholder.svg?height=200&width=350" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Buscando: ${searchQuery}`)
  }

  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-b from-black to-transparent p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <div className="text-red-600 font-bold text-3xl mr-8">NETFLIX</div>
          <div className="hidden md:flex space-x-4">
            <button className="hover:text-gray-300">Inicio</button>
            <button className="hover:text-gray-300">Series</button>
            <button className="hover:text-gray-300">Películas</button>
            <button className="hover:text-gray-300">Novedades populares</button>
            <button className="hover:text-gray-300">Mi lista</button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Títulos, personas, géneros"
                className="bg-black bg-opacity-75 text-white border border-gray-600 px-3 py-1 rounded w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowSearch(false)}
              >
                ✕
              </button>
            </form>
          ) : (
            <button onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </button>
          )}
          <button>
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center">
            <User className="h-5 w-5 mr-1" />
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={onLaunchExternal}>
            Abrir Netflix real
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Featured Content */}
        <div
          className="relative h-[500px] bg-cover bg-center flex items-end p-12"
          style={{ backgroundImage: `url(${featuredContent.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{featuredContent.title}</h1>
            <p className="text-lg mb-6">{featuredContent.description}</p>
            <div className="flex space-x-4">
              <button className="flex items-center bg-white text-black px-6 py-2 rounded hover:bg-opacity-90">
                <Play className="h-5 w-5 mr-2" fill="black" />
                <span>Reproducir</span>
              </button>
              <button className="flex items-center bg-gray-600 bg-opacity-70 px-6 py-2 rounded hover:bg-opacity-50">
                <Info className="h-5 w-5 mr-2" />
                <span>Más información</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.id} className="px-12 mt-8">
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {movies.map((movie) => (
                <div key={movie.id} className="flex-none relative group">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="rounded object-cover transition-transform duration-300 group-hover:scale-110 group-hover:z-10"
                    style={{ width: "250px", height: "140px" }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button className="p-1 bg-white rounded-full">
                        <Play className="h-4 w-4 text-black" fill="black" />
                      </button>
                      <button className="p-1 bg-gray-800 bg-opacity-70 rounded-full border border-gray-400">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="p-1 bg-gray-800 bg-opacity-70 rounded-full border border-gray-400">
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-sm font-medium">{movie.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
