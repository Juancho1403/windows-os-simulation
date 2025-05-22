"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT")
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ])
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 })
  const [speed, setSpeed] = useState(150)

  const gridSize = 20
  const cellSize = 20

  // Generate random food position
  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * gridSize)
    const y = Math.floor(Math.random() * gridSize)

    // Check if food is not on snake
    const isOnSnake = snake.some((segment) => segment.x === x && segment.y === y)
    if (isOnSnake) {
      return generateFood()
    }

    return { x, y }
  }, [snake])

  // Reset game
  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ])
    setDirection("RIGHT")
    setFood(generateFood())
    setGameOver(false)
    setScore(0)
    setLevel(1)
    setSpeed(150)
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === "Enter" || e.key === " ") {
          resetGame()
        }
        return
      }

      if (e.key === "p" || e.key === "P") {
        setIsPaused(!isPaused)
        return
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP")
          break
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN")
          break
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT")
          break
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [direction, gameOver, isPaused])

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const moveSnake = () => {
      const newSnake = [...snake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check if snake hits the wall
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        return
      }

      // Check if snake hits itself
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        return
      }

      // Add new head
      newSnake.unshift(head)

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setScore((prevScore) => {
          const newScore = prevScore + 10

          // Increase level and speed every 50 points
          if (newScore % 50 === 0) {
            setLevel((prevLevel) => prevLevel + 1)
            setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10))
          }

          return newScore
        })
        setFood(generateFood())
      } else {
        // Remove tail if no food eaten
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [snake, direction, food, gameOver, isPaused, speed, score, highScore, generateFood, gridSize])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = "#4CAF50"
    snake.forEach((segment, index) => {
      // Head is darker green
      if (index === 0) {
        ctx.fillStyle = "#2E7D32"
      } else {
        ctx.fillStyle = "#4CAF50"
      }

      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize)

      // Add eyes to head
      if (index === 0) {
        ctx.fillStyle = "white"

        // Position eyes based on direction
        if (direction === "RIGHT" || direction === "LEFT") {
          ctx.fillRect(segment.x * cellSize + (direction === "RIGHT" ? 15 : 2), segment.y * cellSize + 5, 3, 3)
          ctx.fillRect(segment.x * cellSize + (direction === "RIGHT" ? 15 : 2), segment.y * cellSize + 12, 3, 3)
        } else {
          ctx.fillRect(segment.x * cellSize + 5, segment.y * cellSize + (direction === "DOWN" ? 15 : 2), 3, 3)
          ctx.fillRect(segment.x * cellSize + 12, segment.y * cellSize + (direction === "DOWN" ? 15 : 2), 3, 3)
        }
      }
    })

    // Draw food
    ctx.fillStyle = "#FF5722"
    ctx.beginPath()
    ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2, 0, Math.PI * 2)
    ctx.fill()

    // Add shine to food
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.beginPath()
    ctx.arc(food.x * cellSize + cellSize / 3, food.y * cellSize + cellSize / 3, cellSize / 6, 0, Math.PI * 2)
    ctx.fill()

    // Draw grid (optional)
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, gridSize * cellSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(gridSize * cellSize, i * cellSize)
      ctx.stroke()
    }

    // Draw game over screen
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "white"
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.fillText("¡GAME OVER!", canvas.width / 2, canvas.height / 2 - 30)

      ctx.font = "20px Arial"
      ctx.fillText(`Puntuación: ${score}`, canvas.width / 2, canvas.height / 2 + 10)
      ctx.fillText("Presiona ENTER para reiniciar", canvas.width / 2, canvas.height / 2 + 50)
    }

    // Draw pause screen
    if (isPaused && !gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "white"
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.fillText("PAUSA", canvas.width / 2, canvas.height / 2)

      ctx.font = "20px Arial"
      ctx.fillText("Presiona P para continuar", canvas.width / 2, canvas.height / 2 + 40)
    }
  }, [snake, food, gameOver, isPaused, score, direction, cellSize, gridSize])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className="text-lg font-bold">Nivel: {level}</div>
        <div className="text-lg font-bold">Puntuación: {score}</div>
        <div className="text-lg font-bold">Récord: {highScore}</div>
      </div>

      <div className="border-4 border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} width={gridSize * cellSize} height={gridSize * cellSize} className="bg-gray-200" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">Usa las flechas del teclado para mover la serpiente</p>
        <p className="text-gray-600">Presiona P para pausar el juego</p>

        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsPaused(!isPaused)}
            disabled={gameOver}
          >
            {isPaused ? "Continuar" : "Pausar"}
          </button>

          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={resetGame}>
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}
