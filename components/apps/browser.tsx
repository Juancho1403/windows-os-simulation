"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Search, Star, Menu } from "lucide-react"

interface BrowserProps {
  name: string
  onLaunchExternal: () => void
}

export default function Browser({ name, onLaunchExternal }: BrowserProps) {
  const [url, setUrl] = useState("https://www.google.com")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>(["https://www.google.com"])
  const [historyIndex, setHistoryIndex] = useState(0)

  const navigate = (newUrl: string) => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setUrl(newUrl)

      // Update history
      if (historyIndex < history.length - 1) {
        // If we navigated back and then to a new URL, truncate the forward history
        setHistory([...history.slice(0, historyIndex + 1), newUrl])
        setHistoryIndex(historyIndex + 1)
      } else {
        setHistory([...history, newUrl])
        setHistoryIndex(history.length)
      }

      setIsLoading(false)
    }, 500)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setIsLoading(true)
      setTimeout(() => {
        setHistoryIndex(historyIndex - 1)
        setUrl(history[historyIndex - 1])
        setIsLoading(false)
      }, 300)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setIsLoading(true)
      setTimeout(() => {
        setHistoryIndex(historyIndex + 1)
        setUrl(history[historyIndex + 1])
        setIsLoading(false)
      }, 300)
    }
  }

  const refresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let newUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      newUrl = `https://${url}`
    }

    navigate(newUrl)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Browser Toolbar */}
      <div className="bg-gray-100 p-2 flex items-center space-x-2">
        <button
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
          onClick={goBack}
          disabled={historyIndex === 0}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <button className="p-1 rounded hover:bg-gray-200" onClick={refresh}>
          <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
        </button>

        <button className="p-1 rounded hover:bg-gray-200">
          <Home className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-8 pr-4 py-1 border rounded bg-white"
            />
          </div>
        </form>

        <button className="p-1 rounded hover:bg-gray-200">
          <Star className="h-5 w-5" />
        </button>

        <button className="p-1 rounded hover:bg-gray-200">
          <Menu className="h-5 w-5" />
        </button>

        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onLaunchExternal}>
          Abrir {name} real
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white">
        {isLoading ? <div className="h-1 bg-blue-500 animate-pulse"></div> : null}

        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">{name}</div>
            <div className="text-gray-500">Navegando a: {url}</div>
            <div className="mt-8 text-sm text-gray-400">(Simulación de navegador web)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
