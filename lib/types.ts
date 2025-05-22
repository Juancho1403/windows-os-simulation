import type React from "react"
export interface Process {
  id: number
  name: string
  status: "running" | "waiting" | "blocked"
  cpuUsage: number
  memoryUsage: number
  quantum: number
  [key: string]: any
}

export interface Application {
  id: string
  title: string
  icon: React.ReactNode
}
