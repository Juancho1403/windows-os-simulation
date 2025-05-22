import type { Process } from "./types"

export function generateRandomProcesses(count: number): Process[] {
  const processes: Process[] = []

  const processNames = [
    "Sistema",
    "Explorador",
    "Navegador",
    "Antivirus",
    "Actualizador",
    "Servicio",
    "Aplicación",
    "Gestor",
    "Controlador",
    "Sincronizador",
  ]

  for (let i = 0; i < count; i++) {
    const randomStatus = Math.random()
    let status: "running" | "waiting" | "blocked"

    if (randomStatus < 0.7) {
      status = "running"
    } else if (randomStatus < 0.9) {
      status = "waiting"
    } else {
      status = "blocked"
    }

    processes.push({
      id: i + 1,
      name: `${processNames[i % processNames.length]} ${i + 1}`,
      status,
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      quantum: Math.floor(Math.random() * 20) + 1,
    })
  }

  return processes
}
