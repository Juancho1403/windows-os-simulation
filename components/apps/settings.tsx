"use client"

import { useState, useEffect } from "react"
import {
  Search,
  User,
  Monitor,
  Wifi,
  Bell,
  Clock,
  Lock,
  Bluetooth,
  Zap,
  Accessibility,
  Grid,
  Gamepad2,
  RefreshCw,
  Volume2,
  Sun,
  Moon,
  Palette,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react"

interface SettingsProps {
  onLaunchExternal: () => void
}

export default function Settings({ onLaunchExternal }: SettingsProps) {
  const [activeSection, setActiveSection] = useState("system")
  const [searchQuery, setSearchQuery] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(80)
  const [notifications, setNotifications] = useState(true)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false)
  const [language, setLanguage] = useState("es-ES")
  const [timeZone, setTimeZone] = useState("(UTC+01:00) Madrid")
  const [autoUpdate, setAutoUpdate] = useState(true)

  // Simulate loading system settings
  useEffect(() => {
    // In a real app, this would load actual system settings
    const loadSettings = setTimeout(() => {
      // Simulate loading complete
    }, 500)

    return () => clearTimeout(loadSettings)
  }, [])

  const handleOpenRealSettings = (section: string) => {
    // Map sections to real Windows settings URLs
    const settingsMap: Record<string, string> = {
      system: "ms-settings:",
      bluetooth: "ms-settings:bluetooth",
      network: "ms-settings:network",
      personalization: "ms-settings:personalization",
      apps: "ms-settings:appsfeatures",
      accounts: "ms-settings:yourinfo",
      time: "ms-settings:dateandtime",
      gaming: "ms-settings:gaming",
      accessibility: "ms-settings:easeofaccess",
      privacy: "ms-settings:privacy",
      update: "ms-settings:windowsupdate",
    }

    if (settingsMap[section]) {
      onLaunchExternal(settingsMap[section])
    } else {
      onLaunchExternal("ms-settings:")
    }
  }

  const settingsSections = [
    { id: "system", name: "Sistema", icon: <Monitor className="h-5 w-5" /> },
    { id: "bluetooth", name: "Bluetooth y dispositivos", icon: <Bluetooth className="h-5 w-5" /> },
    { id: "network", name: "Red e Internet", icon: <Wifi className="h-5 w-5" /> },
    { id: "personalization", name: "Personalización", icon: <Palette className="h-5 w-5" /> },
    { id: "apps", name: "Aplicaciones", icon: <Grid className="h-5 w-5" /> },
    { id: "accounts", name: "Cuentas", icon: <User className="h-5 w-5" /> },
    { id: "time", name: "Hora e idioma", icon: <Clock className="h-5 w-5" /> },
    { id: "gaming", name: "Juegos", icon: <Gamepad2 className="h-5 w-5" /> },
    { id: "accessibility", name: "Accesibilidad", icon: <Accessibility className="h-5 w-5" /> },
    { id: "privacy", name: "Privacidad y seguridad", icon: <Lock className="h-5 w-5" /> },
    { id: "update", name: "Windows Update", icon: <RefreshCw className="h-5 w-5" /> },
  ]

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold">Configuración</h1>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar en Configuración"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white overflow-y-auto">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center p-3 text-left ${
                activeSection === section.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className={`mr-3 ${activeSection === section.id ? "text-blue-500" : "text-gray-500"}`}>
                {section.icon}
              </div>
              <span className={activeSection === section.id ? "font-medium" : ""}>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === "system" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Sistema</h2>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleOpenRealSettings("system")}
                >
                  Abrir configuración real
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display Settings */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Monitor className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Pantalla</h3>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Brillo</label>
                    <div className="flex items-center">
                      <Sun className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="ml-2 text-sm">{brightness}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        className="mr-2"
                      />
                      <span className="text-sm">Modo oscuro</span>
                      {darkMode ? <Moon className="h-4 w-4 ml-2" /> : <Sun className="h-4 w-4 ml-2" />}
                    </label>
                  </div>

                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleOpenRealSettings("personalization")}
                  >
                    Más configuraciones de pantalla
                  </button>
                </div>

                {/* Power & Battery */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Zap className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Energía y batería</h3>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Plan de energía</label>
                    <select className="w-full border rounded p-2">
                      <option>Equilibrado</option>
                      <option>Ahorro de energía</option>
                      <option>Alto rendimiento</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Suspender después de</label>
                    <select className="w-full border rounded p-2">
                      <option>Nunca</option>
                      <option>5 minutos</option>
                      <option>15 minutos</option>
                      <option>30 minutos</option>
                      <option>1 hora</option>
                    </select>
                  </div>

                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleOpenRealSettings("system")}
                  >
                    Más configuraciones de energía
                  </button>
                </div>

                {/* Sound */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Volume2 className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Sonido</h3>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Volumen</label>
                    <div className="flex items-center">
                      <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="ml-2 text-sm">{volume}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Dispositivo de salida</label>
                    <select className="w-full border rounded p-2">
                      <option>Altavoces (Realtek Audio)</option>
                      <option>Auriculares</option>
                      <option>HDMI Audio</option>
                    </select>
                  </div>

                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleOpenRealSettings("system")}
                  >
                    Más configuraciones de sonido
                  </button>
                </div>

                {/* Notifications */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Bell className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Notificaciones</h3>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        className="mr-2"
                      />
                      <span className="text-sm">Mostrar notificaciones</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">No molestar</label>
                    <select className="w-full border rounded p-2">
                      <option>Desactivado</option>
                      <option>Activado</option>
                      <option>Solo durante horas específicas</option>
                    </select>
                  </div>

                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleOpenRealSettings("system")}
                  >
                    Más configuraciones de notificaciones
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "network" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Red e Internet</h2>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleOpenRealSettings("network")}
                >
                  Abrir configuración real
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wi-Fi */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Wifi className="h-6 w-6 text-blue-500 mr-2" />
                      <h3 className="text-lg font-medium">Wi-Fi</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wifiEnabled}
                        onChange={() => setWifiEnabled(!wifiEnabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {wifiEnabled ? (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center justify-between p-2 bg-gray-100 rounded mb-2">
                          <div>
                            <div className="font-medium">Red-Hogar</div>
                            <div className="text-xs text-gray-500">Conectado</div>
                          </div>
                          <div className="text-green-500">
                            <Wifi className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded mb-2">
                          <div>
                            <div className="font-medium">Vecino-5G</div>
                            <div className="text-xs text-gray-500">Seguro</div>
                          </div>
                          <div className="text-gray-400">
                            <Wifi className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                          <div>
                            <div className="font-medium">MOVISTAR_2A4B</div>
                            <div className="text-xs text-gray-500">Seguro</div>
                          </div>
                          <div className="text-gray-400">
                            <Wifi className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <button className="text-blue-500 hover:text-blue-600">Mostrar redes disponibles</button>
                    </>
                  ) : (
                    <div className="text-gray-500 text-center py-4">Wi-Fi desactivado</div>
                  )}
                </div>

                {/* Ethernet */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Ethernet</h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                      <div>
                        <div className="font-medium">Ethernet</div>
                        <div className="text-xs text-gray-500">Conectado</div>
                      </div>
                      <div className="text-green-500">
                        <Globe className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Propiedades de red</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Dirección IP:</div>
                      <div>192.168.1.100</div>
                      <div className="text-gray-500">Puerta de enlace:</div>
                      <div>192.168.1.1</div>
                      <div className="text-gray-500">DNS:</div>
                      <div>8.8.8.8</div>
                    </div>
                  </div>

                  <button className="text-blue-500 hover:text-blue-600">Cambiar propiedades del adaptador</button>
                </div>

                {/* VPN */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">VPN</h3>
                  </div>

                  <div className="mb-4 text-center py-4">
                    <div className="text-gray-500 mb-2">No hay conexiones VPN configuradas</div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Añadir conexión VPN
                    </button>
                  </div>
                </div>

                {/* Mobile Hotspot */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Punto de acceso móvil</h3>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Compartir conexión</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                  </div>

                  <div className="text-sm text-gray-500">
                    Comparte tu conexión a Internet con otros dispositivos mediante Wi-Fi.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection !== "system" && activeSection !== "network" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{settingsSections.find((s) => s.id === activeSection)?.name}</h2>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleOpenRealSettings(activeSection)}
                >
                  Abrir configuración real
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg border shadow-sm text-center">
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-xl font-medium mb-2">Configuración disponible en tu PC</h3>
                <p className="text-gray-600 mb-4">
                  Haz clic en el botón de arriba para abrir la configuración real de Windows para esta sección.
                </p>
                <p className="text-sm text-gray-500">
                  Todas las configuraciones se aplicarán directamente en tu sistema operativo real.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
