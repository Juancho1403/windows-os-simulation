"use client"

import { useState } from "react"
import { Play, SkipBack, SkipForward, Pause, Volume2, Repeat, Shuffle, Music } from "lucide-react"

interface SpotifyProps {
  onLaunchExternal: () => void
}

export default function SpotifyApp({ onLaunchExternal }: SpotifyProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState({
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    currentTime: "1:45",
    coverArt: "/placeholder.svg?height=300&width=300",
  })

  const [volume, setVolume] = useState(80)

  const playlists = [
    { name: "Mis favoritas", songCount: 45 },
    { name: "Descubrimiento semanal", songCount: 30 },
    { name: "Top 50 Global", songCount: 50 },
    { name: "Rock Clásico", songCount: 75 },
    { name: "Para estudiar", songCount: 32 },
  ]

  const recentlyPlayed = [
    { title: "Bohemian Rhapsody", artist: "Queen", coverArt: "/placeholder.svg?height=60&width=60" },
    { title: "Starboy", artist: "The Weeknd, Daft Punk", coverArt: "/placeholder.svg?height=60&width=60" },
    { title: "Levitating", artist: "Dua Lipa", coverArt: "/placeholder.svg?height=60&width=60" },
    { title: "Circles", artist: "Post Malone", coverArt: "/placeholder.svg?height=60&width=60" },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Music className="h-8 w-8 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">Spotify</h1>
        </div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          onClick={onLaunchExternal}
        >
          Abrir Spotify real
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black p-4">
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-400 mb-2">Biblioteca</h2>
            <div className="space-y-2">
              <button className="w-full text-left py-1 hover:text-green-500">Tu música</button>
              <button className="w-full text-left py-1 hover:text-green-500">Podcasts</button>
              <button className="w-full text-left py-1 hover:text-green-500">Artistas</button>
              <button className="w-full text-left py-1 hover:text-green-500">Álbumes</button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase text-gray-400 mb-2">Playlists</h2>
            <div className="space-y-2">
              {playlists.map((playlist, index) => (
                <button key={index} className="w-full text-left py-1 hover:text-green-500">
                  {playlist.name} <span className="text-gray-500 text-xs">({playlist.songCount})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Buenas tardes</h2>

          {/* Recently Played */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {recentlyPlayed.map((song, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 bg-opacity-40 rounded-md overflow-hidden hover:bg-gray-700 cursor-pointer"
              >
                <img src={song.coverArt || "/placeholder.svg"} alt={song.title} className="h-16 w-16 object-cover" />
                <div className="p-4">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured */}
          <h2 className="text-xl font-bold mb-4">Escuchado recientemente</h2>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md hover:bg-gray-700 cursor-pointer">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Album cover"
                  className="w-full aspect-square object-cover mb-2 rounded"
                />
                <div className="font-medium truncate">Playlist #{index + 1}</div>
                <div className="text-sm text-gray-400 truncate">Varios artistas</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
        {/* Song Info */}
        <div className="flex items-center w-1/4">
          <img
            src={currentSong.coverArt || "/placeholder.svg"}
            alt={currentSong.title}
            className="h-14 w-14 object-cover mr-3 rounded"
          />
          <div>
            <div className="font-medium">{currentSong.title}</div>
            <div className="text-xs text-gray-400">{currentSong.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <button className="text-gray-400 hover:text-white">
              <Shuffle className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </button>
            <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Repeat className="h-5 w-5" />
            </button>
          </div>

          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400">{currentSong.currentTime}</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <span className="text-xs text-gray-400">{currentSong.duration}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="w-1/4 flex justify-end items-center space-x-2">
          <Volume2 className="h-5 w-5 text-gray-400" />
          <div className="w-24 h-1 bg-gray-600 rounded-full">
            <div className="h-full bg-gray-400 rounded-full" style={{ width: `${volume}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
