"use client"

import { useState } from "react"
import { Cpu, HardDrive, MemoryStickIcon as Memory } from "lucide-react"
import type { Process } from "@/lib/types"

interface TaskManagerProps {
  processes: Process[]
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  onLaunchExternal: () => void
}

export default function TaskManager({
  processes,
  cpuUsage,
  memoryUsage,
  diskUsage,
  onLaunchExternal,
}: TaskManagerProps) {
  const [activeTab, setActiveTab] = useState("processes")
  const [sortBy, setSortBy] = useState("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const sortedProcesses = [...processes].sort((a, b) => {
    const aValue = a[sortBy as keyof Process]
    const bValue = b[sortBy as keyof Process]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${activeTab === "processes" ? "bg-blue-100 border-b-2 border-blue-500" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("processes")}
        >
          Procesos
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "performance" ? "bg-blue-100 border-b-2 border-blue-500" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("performance")}
        >
          Rendimiento
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "deadlocks" ? "bg-blue-100 border-b-2 border-blue-500" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("deadlocks")}
        >
          Interbloqueos
        </button>

        <div className="flex-1"></div>

        <button className="px-4 py-2 text-blue-500 hover:bg-gray-100" onClick={onLaunchExternal}>
          Abrir real
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "processes" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Procesos activos ({processes.length})</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("id")}
                  >
                    ID {sortBy === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("name")}
                  >
                    Nombre {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("status")}
                  >
                    Estado {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("cpuUsage")}
                  >
                    CPU % {sortBy === "cpuUsage" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("memoryUsage")}
                  >
                    Memoria % {sortBy === "memoryUsage" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-2 text-left border cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort("quantum")}
                  >
                    Quantum {sortBy === "quantum" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProcesses.map((process) => (
                  <tr key={process.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{process.id}</td>
                    <td className="p-2 border">{process.name}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          process.status === "running"
                            ? "bg-green-100 text-green-800"
                            : process.status === "waiting"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {process.status}
                      </span>
                    </td>
                    <td className="p-2 border">{process.cpuUsage}%</td>
                    <td className="p-2 border">{process.memoryUsage}%</td>
                    <td className="p-2 border">{process.quantum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "performance" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Rendimiento del sistema</h2>

            <div className="grid grid-cols-3 gap-4">
              {/* CPU Usage */}
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <Cpu className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">CPU</h3>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${cpuUsage}%` }}></div>
                </div>
                <div className="mt-2 text-right font-medium">{cpuUsage}%</div>
              </div>

              {/* Memory Usage */}
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <Memory className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-medium">Memoria</h3>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${memoryUsage}%` }}></div>
                </div>
                <div className="mt-2 text-right font-medium">{memoryUsage}%</div>
              </div>

              {/* Disk Usage */}
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <HardDrive className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="font-medium">Disco</h3>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${diskUsage}%` }}></div>
                </div>
                <div className="mt-2 text-right font-medium">{diskUsage}%</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Historial de uso (últimos 60 segundos)</h3>
              <div className="h-40 border rounded p-2">
                {/* This would be a chart in a real implementation */}
                <div className="h-full flex items-end">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-blue-500 mx-0.5"
                      style={{
                        height: `${Math.floor(Math.random() * 50) + 10}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "deadlocks" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Detección de interbloqueos</h2>

            <div className="mb-4 p-4 border rounded bg-yellow-50">
              <h3 className="font-medium text-yellow-800 mb-2">Interbloqueo detectado</h3>
              <p className="text-sm text-yellow-700 mb-2">
                Se ha detectado un posible interbloqueo entre los siguientes procesos:
              </p>
              <ul className="list-disc pl-5 text-sm text-yellow-700">
                <li>Proceso ID: 3 (Sistema) - Esperando recurso R5</li>
                <li>Proceso ID: 7 (Aplicación) - Esperando recurso R2</li>
                <li>Proceso ID: 9 (Servicio) - Esperando recurso R3</li>
              </ul>
            </div>

            <h3 className="font-medium mb-2">Registro de interbloqueos</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border">Tiempo</th>
                  <th className="p-2 text-left border">Procesos</th>
                  <th className="p-2 text-left border">Recursos</th>
                  <th className="p-2 text-left border">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 border">10:23:45</td>
                  <td className="p-2 border">3, 7, 9</td>
                  <td className="p-2 border">R2, R3, R5</td>
                  <td className="p-2 border">
                    <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">Activo</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 border">10:15:32</td>
                  <td className="p-2 border">2, 5</td>
                  <td className="p-2 border">R1, R4</td>
                  <td className="p-2 border">
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Resuelto</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 border">09:58:17</td>
                  <td className="p-2 border">1, 4, 8</td>
                  <td className="p-2 border">R2, R6, R7</td>
                  <td className="p-2 border">
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Resuelto</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
