"use client"

import { useState } from "react"
import { Gamepad, Play, Star, Clock, Search } from "lucide-react"

interface GamesProps {
  onLaunchExternal: () => void
}

export default function Games({ onLaunchExternal }: GamesProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredGames = [
    {
      id: 1,
      name: "Minecraft",
      publisher: "Mojang Studios",
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=300",
      description: "Explora, construye y sobrevive en un mundo de bloques",
    },
    {
      id: 2,
      name: "Forza Horizon 5",
      publisher: "Xbox Game Studios",
      rating: 4.7,
      image: "/placeholder.svg?height=150&width=300",
      description: "Conduce cientos de autos en un mundo abierto",
    },
    {
      id: 3,
      name: "Halo Infinite",
      publisher: "Xbox Game Studios",
      rating: 4.6,
      image: "/placeholder.svg?height=150&width=300",
      description: "La nueva entrega de la saga Halo",
    },
  ]

  const recentGames = [
    {
      id: 4,
      name: "Age of Empires IV",
      lastPlayed: "Hace 2 días",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Microsoft Flight Simulator",
      lastPlayed: "Hace 1 semana",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Sea of Thieves",
      lastPlayed: "Hace 2 semanas",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const categories = [
    { id: "action", name: "Acción", count: 245 },
    { id: "adventure", name: "Aventura", count: 189 },
    { id: "rpg", name: "RPG", count: 124 },
    { id: "strategy", name: "Estrategia", count: 87 },
    { id: "sports", name: "Deportes", count: 56 },
    { id: "simulation", name: "Simulación", count: 43 },
  ]

  const playGame = (gameId: number) => {
    alert(`Iniciando juego #${gameId} (simulación)`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Gamepad className="h-8 w-8 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">Xbox Game Pass</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar juegos"
              className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-full w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={onLaunchExternal}
          >
            Abrir Xbox real
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-t border-gray-700 px-4">
        <div className="flex space-x-6">
          <button
            className={`py-3 ${
              activeTab === "home" ? "border-b-2 border-green-500 font-medium" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("home")}
          >
            Inicio
          </button>
          <button
            className={`py-3 ${
              activeTab === "library" ? "border-b-2 border-green-500 font-medium" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("library")}
          >
            Mi biblioteca
          </button>
          <button
            className={`py-3 ${
              activeTab === "store" ? "border-b-2 border-green-500 font-medium" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("store")}
          >
            Tienda
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "home" && (
          <div>
            {/* Featured Games */}
            <h2 className="text-2xl font-bold mb-4">Destacados</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {featuredGames.map((game) => (
                <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{game.publisher}</p>
                    <p className="text-sm mb-4">{game.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{game.rating}</span>
                      </div>
                      <button
                        className="flex items-center bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => playGame(game.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Jugar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recently Played */}
            <h2 className="text-xl font-bold mb-4">Jugados recientemente</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {recentGames.map((game) => (
                <div key={game.id} className="bg-gray-800 p-4 rounded-lg flex items-center">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{game.name}</h3>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {game.lastPlayed}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <h2 className="text-xl font-bold mb-4">Categorías</h2>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 cursor-pointer"
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{category.count} juegos</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Gamepad className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Sección en desarrollo</h2>
              <p className="text-gray-400">Esta sección no está disponible en la simulación</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
