"use client"

import { useState, useEffect } from "react"
import { Activity } from "lucide-react"
import TaskManager from "@/components/task-manager"
import StartMenu from "@/components/start-menu"
import Desktop from "@/components/desktop"
import Window from "@/components/window"
import Taskbar from "@/components/taskbar"
import Notepad from "@/components/apps/notepad"
import CalcApp from "@/components/apps/calculator"
import WordProcessor from "@/components/apps/word-processor"
import Spreadsheet from "@/components/apps/spreadsheet"
import Presentation from "@/components/apps/presentation"
import Browser from "@/components/apps/browser"
import Store from "@/components/apps/store"
import VisualStudio from "@/components/apps/visual-studio"
import FileExplorer from "@/components/apps/file-explorer"
import Settings from "@/components/apps/settings"
import WidgetsPanel from "@/components/widgets-panel"
import SpotifyApp from "@/components/apps/spotify"
import Paint from "@/components/apps/paint"
import RecycleBin from "@/components/apps/recycle-bin"
import Games from "@/components/apps/games"
import YouTube from "@/components/apps/youtube"
import Netflix from "@/components/apps/netflix"
import MagicTV from "@/components/apps/magic-tv"
import FluxTV from "@/components/apps/flux-tv"
import SnakeGame from "@/components/apps/snake-game"
import PacmanGame from "@/components/apps/pacman-game"
import PowerMenu from "@/components/power-menu"
import type { Process, Application } from "@/lib/types"
import { generateRandomProcesses } from "@/lib/process-utils"
import React from "react"

export default function OperatingSystem() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [openApps, setOpenApps] = useState<Application[]>([])
  const [activeAppId, setActiveAppId] = useState<string | null>(null)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isWidgetsPanelOpen, setIsWidgetsPanelOpen] = useState(false)
  const [isTaskManagerOpen, setIsTaskManagerOpen] = useState(false)
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false)
  const [systemTime, setSystemTime] = useState(new Date())
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [diskUsage, setDiskUsage] = useState(0)
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [isHibernating, setIsHibernating] = useState(false)
  const [shutdownMessage, setShutdownMessage] = useState("")

  // Initialize system with background processes
  useEffect(() => {
    const initialProcesses = generateRandomProcesses(10)
    setProcesses(initialProcesses)

    // Update system time every second
    const timeInterval = setInterval(() => {
      setSystemTime(new Date())
    }, 1000)

    // Simulate resource usage fluctuations
    const resourceInterval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 60) + 10)
      setMemoryUsage(Math.floor(Math.random() * 40) + 30)
      setDiskUsage(Math.floor(Math.random() * 30) + 20)

      // Update process quantum and status
      setProcesses((prevProcesses) => {
        return prevProcesses.map((process) => {
          const newQuantum = Math.max(0, process.quantum - Math.floor(Math.random() * 5))
          const isBlocked = Math.random() > 0.9

          return {
            ...process,
            quantum: newQuantum,
            status: isBlocked ? "blocked" : newQuantum > 0 ? "running" : "waiting",
            cpuUsage: Math.floor(Math.random() * 20),
            memoryUsage: Math.floor(Math.random() * 100),
          }
        })
      })
    }, 2000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(resourceInterval)
    }
  }, [])

  const openApp = (app: Application) => {
    // Check if app is already open
    if (!openApps.some((openApp) => openApp.id === app.id)) {
      setOpenApps((prev) => [...prev, app])
    }
    setActiveAppId(app.id)
    setIsStartMenuOpen(false)
    setIsWidgetsPanelOpen(false)
    setIsPowerMenuOpen(false)
  }

  const launchExternalApp = (appUrl: string) => {
    try {
      window.open(appUrl, "_blank")
    } catch (error) {
      console.error("No se pudo abrir la aplicación externa:", error)
      alert("No se pudo abrir la aplicación externa. Es posible que tu navegador bloquee esta acción.")
    }
  }

  const closeApp = (appId: string) => {
    setOpenApps((prev) => prev.filter((app) => app.id !== appId))
    if (activeAppId === appId) {
      setActiveAppId(openApps.length > 1 ? openApps[0].id : null)
    }
  }

  const minimizeApp = (appId: string) => {
    setActiveAppId(null)
  }

  const activateApp = (appId: string) => {
    setActiveAppId(appId)
  }

  const toggleStartMenu = () => {
    setIsStartMenuOpen((prev) => !prev)
    if (isWidgetsPanelOpen) setIsWidgetsPanelOpen(false)
    if (isPowerMenuOpen) setIsPowerMenuOpen(false)
  }

  const toggleWidgetsPanel = () => {
    setIsWidgetsPanelOpen((prev) => !prev)
    if (isStartMenuOpen) setIsStartMenuOpen(false)
    if (isPowerMenuOpen) setIsPowerMenuOpen(false)
  }

  const togglePowerMenu = () => {
    setIsPowerMenuOpen((prev) => !prev)
    if (isStartMenuOpen) setIsStartMenuOpen(false)
    if (isWidgetsPanelOpen) setIsWidgetsPanelOpen(false)
  }

  const toggleTaskManager = () => {
    setIsTaskManagerOpen((prev) => !prev)
    if (!isTaskManagerOpen) {
      setActiveAppId("taskManager")
    }
  }

  const takeScreenshot = () => {
    alert("Captura de pantalla tomada")
    // In a real implementation, this would use the Web API to take a screenshot
    // Try to launch the Windows Snipping Tool
    launchExternalApp("ms-screenclip:")
  }

  const handleShutdown = () => {
    setIsShuttingDown(true)
    setShutdownMessage("Apagando...")
    setTimeout(() => {
      setShutdownMessage("Tu PC se apagará en breve")
      setTimeout(() => {
        // En una implementación real, esto apagaría el PC
        // Aquí simplemente recargamos la página después de un tiempo
        window.location.reload()
      }, 3000)
    }, 2000)
  }

  const handleRestart = () => {
    setIsRestarting(true)
    setShutdownMessage("Reiniciando...")
    setTimeout(() => {
      setShutdownMessage("Tu PC se reiniciará en breve")
      setTimeout(() => {
        // En una implementación real, esto reiniciaría el PC
        // Aquí simplemente recargamos la página después de un tiempo
        window.location.reload()
      }, 3000)
    }, 2000)
  }

  const handleHibernate = () => {
    setIsHibernating(true)
    setShutdownMessage("Entrando en hibernación...")
    setTimeout(() => {
      setShutdownMessage("Tu PC está hibernando")
      setTimeout(() => {
        // En una implementación real, esto hibernaría el PC
        // Aquí simplemente mostramos un mensaje y volvemos al escritorio
        setIsHibernating(false)
        setShutdownMessage("")
      }, 3000)
    }, 2000)
  }

  // Renderizar pantalla de apagado/reinicio/hibernación
  if (isShuttingDown || isRestarting || isHibernating) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
        <div className="text-2xl">{shutdownMessage}</div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XnVikZx9LZhYQVLVz52Tvtx2HZK8ak.png')] bg-cover bg-center flex flex-col">
      {/* Desktop */}
      <div className="flex-1 relative">
        <Desktop
          onOpenApp={openApp}
          onOpenTaskManager={toggleTaskManager}
          onTakeScreenshot={takeScreenshot}
          onLaunchExternalApp={launchExternalApp}
        />

        {/* Open Windows */}
        {openApps.map((app) => (
          <Window
            key={app.id}
            app={app}
            isActive={activeAppId === app.id}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onFocus={() => activateApp(app.id)}
          >
            {app.id === "notepad" && <Notepad onLaunchExternal={() => launchExternalApp("notepad:")} />}
            {app.id === "calculator" && <CalcApp onLaunchExternal={() => launchExternalApp("calculator:")} />}
            {app.id === "word" && <WordProcessor onLaunchExternal={() => launchExternalApp("ms-word:")} />}
            {app.id === "excel" && <Spreadsheet onLaunchExternal={() => launchExternalApp("ms-excel:")} />}
            {app.id === "powerpoint" && <Presentation onLaunchExternal={() => launchExternalApp("ms-powerpoint:")} />}
            {app.id === "chrome" && (
              <Browser name="Google Chrome" onLaunchExternal={() => launchExternalApp("https://www.google.com")} />
            )}
            {app.id === "edge" && (
              <Browser name="Microsoft Edge" onLaunchExternal={() => launchExternalApp("microsoft-edge:")} />
            )}
            {app.id === "firefox" && (
              <Browser name="Firefox" onLaunchExternal={() => launchExternalApp("https://www.mozilla.org/firefox")} />
            )}
            {app.id === "opera" && (
              <Browser name="Opera" onLaunchExternal={() => launchExternalApp("https://www.opera.com")} />
            )}
            {app.id === "brave" && (
              <Browser name="Brave" onLaunchExternal={() => launchExternalApp("https://brave.com")} />
            )}
            {app.id === "store" && <Store onLaunchExternal={() => launchExternalApp("ms-windows-store:")} />}
            {app.id === "visualStudio" && (
              <VisualStudio onLaunchExternal={() => launchExternalApp("https://code.visualstudio.com/")} />
            )}
            {app.id === "fileExplorer" && <FileExplorer onLaunchExternal={() => launchExternalApp("file:///")} />}
            {app.id === "settings" && <Settings onLaunchExternal={() => launchExternalApp("ms-settings:")} />}
            {app.id === "spotify" && <SpotifyApp onLaunchExternal={() => launchExternalApp("spotify:")} />}
            {app.id === "paint" && <Paint onLaunchExternal={() => launchExternalApp("ms-paint:")} />}
            {app.id === "recycleBin" && (
              <RecycleBin onLaunchExternal={() => launchExternalApp("shell:RecycleBinFolder")} />
            )}
            {app.id === "games" && <Games onLaunchExternal={() => launchExternalApp("ms-gaming-overlay:")} />}
            {app.id === "youtube" && <YouTube onLaunchExternal={() => launchExternalApp("https://www.youtube.com")} />}
            {app.id === "netflix" && <Netflix onLaunchExternal={() => launchExternalApp("https://www.netflix.com")} />}
            {app.id === "magicTV" && <MagicTV onLaunchExternal={() => launchExternalApp("https://www.magictv.com")} />}
            {app.id === "fluxTV" && <FluxTV onLaunchExternal={() => launchExternalApp("ms-tv:")} />}
            {app.id === "snake" && <SnakeGame />}
            {app.id === "pacman" && <PacmanGame />}
          </Window>
        ))}

        {/* Task Manager Window */}
        {isTaskManagerOpen && (
          <Window
            app={{
              id: "taskManager",
              title: "Administrador de tareas",
              icon: <Activity className="h-5 w-5" />,
            }}
            isActive={activeAppId === "taskManager"}
            onClose={() => setIsTaskManagerOpen(false)}
            onMinimize={() => setActiveAppId(null)}
            onFocus={() => setActiveAppId("taskManager")}
          >
            <TaskManager
              processes={processes}
              cpuUsage={cpuUsage}
              memoryUsage={memoryUsage}
              diskUsage={diskUsage}
              onLaunchExternal={() => launchExternalApp("taskmgr:")}
            />
          </Window>
        )}

        {/* Start Menu */}
        {isStartMenuOpen && (
          <StartMenu
            onOpenApp={openApp}
            onClose={() => setIsStartMenuOpen(false)}
            onLaunchExternalApp={launchExternalApp}
          />
        )}

        {/* Widgets Panel */}
        {isWidgetsPanelOpen && <WidgetsPanel onClose={() => setIsWidgetsPanelOpen(false)} />}

        {/* Power Menu */}
        {isPowerMenuOpen && (
          <PowerMenu
            onClose={() => setIsPowerMenuOpen(false)}
            onShutdown={handleShutdown}
            onRestart={handleRestart}
            onHibernate={handleHibernate}
          />
        )}
      </div>

      {/* Taskbar */}
      <Taskbar
        openApps={openApps}
        activeAppId={activeAppId}
        onAppClick={activateApp}
        onStartClick={toggleStartMenu}
        onWidgetsClick={toggleWidgetsPanel}
        onPowerClick={togglePowerMenu}
        isStartMenuOpen={isStartMenuOpen}
        isWidgetsPanelOpen={isWidgetsPanelOpen}
        isPowerMenuOpen={isPowerMenuOpen}
        systemTime={systemTime}
        cpuUsage={cpuUsage}
        memoryUsage={memoryUsage}
      />
    </div>
  )
}
