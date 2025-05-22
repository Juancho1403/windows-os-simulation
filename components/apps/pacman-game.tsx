"use client"

import { useState, useEffect, useRef } from "react"

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)

  // Game constants
  const cellSize = 30
  const gridWidth = 19
  const gridHeight = 15

  // Game state
  const [pacman, setPacman] = useState({ x: 9, y: 7, direction: "RIGHT", nextDirection: "RIGHT", mouthOpen: true })
  const [ghosts, setGhosts] = useState([
    { x: 1, y: 1, direction: "RIGHT", color: "red" },
    { x: 17, y: 1, direction: "LEFT", color: "pink" },
    { x: 1, y: 13, direction: "UP", color: "cyan" },
    { x: 17, y: 13, direction: "DOWN", color: "orange" },
  ])

  // Simple maze layout (0 = wall, 1 = path with dot, 2 = path without dot, 3 = power pellet)
  const [maze, setMaze] = useState<number[][]>([])

  // Initialize maze
  useEffect(() => {
    const initialMaze = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    setMaze(initialMaze)
  }, [])

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
          setPacman((prev) => ({ ...prev, nextDirection: "UP" }))
          break
        case "ArrowDown":
          setPacman((prev) => ({ ...prev, nextDirection: "DOWN" }))
          break
        case "ArrowLeft":
          setPacman((prev) => ({ ...prev, nextDirection: "LEFT" }))
          break
        case "ArrowRight":
          setPacman((prev) => ({ ...prev, nextDirection: "RIGHT" }))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameOver, isPaused])

  // Reset game
  const resetGame = () => {
    setPacman({ x: 9, y: 7, direction: "RIGHT", nextDirection: "RIGHT", mouthOpen: true })
    setGhosts([
      { x: 1, y: 1, direction: "RIGHT", color: "red" },
      { x: 17, y: 1, direction: "LEFT", color: "pink" },
      { x: 1, y: 13, direction: "UP", color: "cyan" },
      { x: 17, y: 13, direction: "DOWN", color: "orange" },
    ])

    // Reset maze with dots
    const initialMaze = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    setMaze(initialMaze)

    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)
  }

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const gameInterval = setInterval(() => {
      // Move Pacman
      movePacman()

      // Move Ghosts
      moveGhosts()

      // Check collisions
      checkCollisions()

      // Toggle mouth animation
      setPacman((prev) => ({ ...prev, mouthOpen: !prev.mouthOpen }))
    }, 200)

    return () => clearInterval(gameInterval)
  }, [pacman, ghosts, maze, gameOver, isPaused])

  // Move Pacman
  const movePacman = () => {
    const newPacman = { ...pacman }

    // Try to change direction if requested
    if (pacman.nextDirection !== pacman.direction) {
      const nextX = getNextPosition(pacman.x, pacman.y, pacman.nextDirection).x
      const nextY = getNextPosition(pacman.x, pacman.y, pacman.nextDirection).y

      // Check if the new direction is valid (not a wall)
      if (nextX >= 0 && nextX < gridWidth && nextY >= 0 && nextY < gridHeight && maze[nextY][nextX] !== 0) {
        newPacman.direction = pacman.nextDirection
      }
    }

    // Move in current direction
    const { x: nextX, y: nextY } = getNextPosition(pacman.x, pacman.y, newPacman.direction)

    // Check if next position is valid
    if (nextX >= 0 && nextX < gridWidth && nextY >= 0 && nextY < gridHeight && maze[nextY][nextX] !== 0) {
      newPacman.x = nextX
      newPacman.y = nextY

      // Eat dot
      if (maze[nextY][nextX] === 1) {
        const newMaze = [...maze]
        newMaze[nextY][nextX] = 2 // Remove dot
        setMaze(newMaze)
        setScore((prev) => prev + 10)
      }

      // Eat power pellet
      if (maze[nextY][nextX] === 3) {
        const newMaze = [...maze]
        newMaze[nextY][nextX] = 2 // Remove power pellet
        setMaze(newMaze)
        setScore((prev) => prev + 50)
        // TODO: Make ghosts vulnerable
      }
    }

    setPacman(newPacman)
  }

  // Move Ghosts
  const moveGhosts = () => {
    const newGhosts = ghosts.map((ghost) => {
      const possibleDirections = ["UP", "DOWN", "LEFT", "RIGHT"]

      // Filter out invalid directions (walls)
      const validDirections = possibleDirections.filter((dir) => {
        const { x: nextX, y: nextY } = getNextPosition(ghost.x, ghost.y, dir)
        return nextX >= 0 && nextX < gridWidth && nextY >= 0 && nextY < gridHeight && maze[nextY][nextX] !== 0
      })

      // Choose a random valid direction
      const newDirection = validDirections[Math.floor(Math.random() * validDirections.length)] || ghost.direction

      // Move ghost
      const { x: nextX, y: nextY } = getNextPosition(ghost.x, ghost.y, newDirection)

      return {
        ...ghost,
        x: nextX,
        y: nextY,
        direction: newDirection,
      }
    })

    setGhosts(newGhosts)
  }

  // Check collisions between Pacman and Ghosts
  const checkCollisions = () => {
    // Check if Pacman collides with any ghost
    const collision = ghosts.some((ghost) => ghost.x === pacman.x && ghost.y === pacman.y)

    if (collision) {
      setLives((prev) => prev - 1)

      if (lives <= 1) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
      } else {
        // Reset positions but keep score
        setPacman({ x: 9, y: 7, direction: "RIGHT", nextDirection: "RIGHT", mouthOpen: true })
        setGhosts([
          { x: 1, y: 1, direction: "RIGHT", color: "red" },
          { x: 17, y: 1, direction: "LEFT", color: "pink" },
          { x: 1, y: 13, direction: "UP", color: "cyan" },
          { x: 17, y: 13, direction: "DOWN", color: "orange" },
        ])
      }
    }
  }

  // Helper function to get next position based on direction
  const getNextPosition = (x: number, y: number, direction: string) => {
    switch (direction) {
      case "UP":
        return { x, y: y - 1 }
      case "DOWN":
        return { x, y: y + 1 }
      case "LEFT":
        return { x: x - 1, y }
      case "RIGHT":
        return { x: x + 1, y }
      default:
        return { x, y }
    }
  }

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw maze
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const cell = maze[y]?.[x]

        if (cell === 0) {
          // Wall
          ctx.fillStyle = "#1a237e"
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        } else if (cell === 1) {
          // Dot
          ctx.fillStyle = "#ffeb3b"
          ctx.beginPath()
          ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 3, 0, Math.PI * 2)
          ctx.fill()
        } else if (cell === 3) {
          // Power pellet
          ctx.fillStyle = "#ffeb3b"
          ctx.beginPath()
          ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Draw Pacman
    ctx.fillStyle = "#ffeb3b"
    ctx.beginPath()

    const pacX = pacman.x * cellSize + cellSize / 2
    const pacY = pacman.y * cellSize + cellSize / 2
    const radius = cellSize / 2 - 2

    if (pacman.mouthOpen) {
      // Mouth open
      let startAngle = 0
      let endAngle = 0

      switch (pacman.direction) {
        case "RIGHT":
          startAngle = 0.2 * Math.PI
          endAngle = 1.8 * Math.PI
          break
        case "LEFT":
          startAngle = 1.2 * Math.PI
          endAngle = 0.8 * Math.PI
          break
        case "UP":
          startAngle = 1.7 * Math.PI
          endAngle = 1.3 * Math.PI
          break
        case "DOWN":
          startAngle = 0.7 * Math.PI
          endAngle = 0.3 * Math.PI
          break
      }

      ctx.arc(pacX, pacY, radius, startAngle, endAngle)
    } else {
      // Mouth closed
      ctx.arc(pacX, pacY, radius, 0, Math.PI * 2)
    }

    ctx.lineTo(pacX, pacY)
    ctx.fill()

    // Draw Ghosts
    ghosts.forEach((ghost) => {
      // Ghost body
      ctx.fillStyle = ghost.color

      // Draw ghost body (semi-circle + rectangle)
      const ghostX = ghost.x * cellSize + cellSize / 2
      const ghostY = ghost.y * cellSize + cellSize / 2

      ctx.beginPath()
      ctx.arc(ghostX, ghostY - 2, radius - 2, Math.PI, 0, false)
      ctx.lineTo(ghostX + radius - 2, ghostY + radius - 2)

      // Wavy bottom
      const waveSize = 4
      for (let i = 0; i < 3; i++) {
        ctx.lineTo(ghostX + radius - 2 - i * waveSize, ghostY + radius - 2 + (i % 2 === 0 ? waveSize : 0))
      }

      ctx.lineTo(ghostX - radius + 2, ghostY + radius - 2)
      ctx.closePath()
      ctx.fill()

      // Eyes
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(ghostX - 5, ghostY - 5, 4, 0, Math.PI * 2)
      ctx.arc(ghostX + 5, ghostY - 5, 4, 0, Math.PI * 2)
      ctx.fill()

      // Pupils
      ctx.fillStyle = "blue"

      let pupilOffsetX = 0
      let pupilOffsetY = 0

      switch (ghost.direction) {
        case "LEFT":
          pupilOffsetX = -2
          break
        case "RIGHT":
          pupilOffsetX = 2
          break
        case "UP":
          pupilOffsetY = -2
          break
        case "DOWN":
          pupilOffsetY = 2
          break
      }

      ctx.beginPath()
      ctx.arc(ghostX - 5 + pupilOffsetX, ghostY - 5 + pupilOffsetY, 2, 0, Math.PI * 2)
      ctx.arc(ghostX + 5 + pupilOffsetX, ghostY - 5 + pupilOffsetY, 2, 0, Math.PI * 2)
      ctx.fill()
    })

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
  }, [maze, pacman, ghosts, gameOver, isPaused, score, lives, highScore, cellSize, gridWidth, gridHeight])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className="text-lg font-bold">Nivel: {level}</div>
        <div className="text-lg font-bold">Puntuación: {score}</div>
        <div className="text-lg font-bold">Vidas: {lives}</div>
      </div>

      <div className="border-4 border-blue-800 rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} width={gridWidth * cellSize} height={gridHeight * cellSize} className="bg-black" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">Usa las flechas del teclado para mover a Pacman</p>
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
// Add CSS styles for the game
const styles = `
  canvas {
    background-color: black;
    border: 2px solid #1a237e;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .ghost {
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .ghost-eye {
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .ghost-pupil {
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .game-over {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 30px;
    text-align: center;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .pause {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 30px;
    text-align: center;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .button {
    padding: 10px 20px;
    background-color: #1a237e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .button:hover {
            background-color: #0d47a1;
          }
        `;