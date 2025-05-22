"use client"

import { useState } from "react"
import { Search, Grid, Home, Download, Package } from "lucide-react"

interface StoreProps {
  onLaunchExternal: () => void
}

export default function Store({ onLaunchExternal }: StoreProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const apps = [
    { id: 1, name: "Spotify", category: "Música", rating: 4.8, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Netflix", category: "Entretenimiento", rating: 4.7, image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Photoshop", category: "Productividad", rating: 4.5, image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "WhatsApp", category: "Comunicación", rating: 4.6, image: "/placeholder.svg?height=80&width=80" },
    { id: 5, name: "Minecraft", category: "Juegos", rating: 4.9, image: "/placeholder.svg?height=80&width=80" },
    { id: 6, name: "Office", category: "Productividad", rating: 4.4, image: "/placeholder.svg?height=80&width=80" },
  ]

  const featuredApps = [
    {
      id: 7,
      name: "Adobe Creative Cloud",
      description: "Suite completa de diseño",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 8,
      name: "Xbox Game Pass",
      description: "Acceso a cientos de juegos",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    { id: "games", name: "Juegos", icon: <Grid className="h-6 w-6" /> },
    { id: "productivity", name: "Productividad", icon: <Package className="h-6 w-6" /> },
    { id: "entertainment", name: "Entretenimiento", icon: <Grid className="h-6 w-6" /> },
    { id: "communication", name: "Comunicación", icon: <Grid className="h-6 w-6" /> },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Store Header */}
      <div className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Microsoft Store</h1>
          <button className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100" onClick={onLaunchExternal}>
            Abrir Store real
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar aplicaciones, juegos, películas y más"
            className="w-full pl-10 pr-4 py-2 rounded text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-blue-700 text-white flex">
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "home" ? "bg-blue-800" : "hover:bg-blue-800"}`}
          onClick={() => setActiveTab("home")}
        >
          <Home className="h-5 w-5 mr-2" />
          Inicio
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "apps" ? "bg-blue-800" : "hover:bg-blue-800"}`}
          onClick={() => setActiveTab("apps")}
        >
          <Grid className="h-5 w-5 mr-2" />
          Aplicaciones
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "games" ? "bg-blue-800" : "hover:bg-blue-800"}`}
          onClick={() => setActiveTab("games")}
        >
          <Grid className="h-5 w-5 mr-2" />
          Juegos
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === "movies" ? "bg-blue-800" : "hover:bg-blue-800"}`}
          onClick={() => setActiveTab("movies")}
        >
          <Grid className="h-5 w-5 mr-2" />
          Películas
        </button>
      </div>

      {/* Store Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "home" && (
          <div>
            {/* Featured */}
            <h2 className="text-xl font-semibold mb-4">Destacados</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {featuredApps.map((app) => (
                <div key={app.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <img src={app.image || "/placeholder.svg"} alt={app.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.description}</p>
                    <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      <Download className="h-4 w-4 inline mr-1" />
                      Obtener
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <h2 className="text-xl font-semibold mb-4">Categorías</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-100 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-200"
                >
                  <div className="mb-2 flex justify-center">{category.icon}</div>
                  <div>{category.name}</div>
                </div>
              ))}
            </div>

            {/* Top Apps */}
            <h2 className="text-xl font-semibold mb-4">Aplicaciones populares</h2>
            <div className="grid grid-cols-3 gap-4">
              {apps.map((app) => (
                <div key={app.id} className="bg-white border rounded-lg p-4 flex">
                  <img src={app.image || "/placeholder.svg"} alt={app.name} className="w-16 h-16 mr-4" />
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.category}</p>
                    <div className="flex items-center mt-1">
                      <div className="text-yellow-500">★★★★★</div>
                      <span className="text-sm ml-1">{app.rating}</span>
                    </div>
                    <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      Obtener
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "home" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🚧</div>
              <div className="text-xl">Sección en construcción</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
