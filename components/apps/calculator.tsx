"use client"

import { useState } from "react"

interface CalculatorProps {
  onLaunchExternal: () => void
}

export default function Calculator({ onLaunchExternal }: CalculatorProps) {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return
    }

    const inputValue = Number.parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)
    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 p-4">
      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-600">Estándar</div>
        <button className="text-sm text-blue-500 hover:text-blue-700" onClick={onLaunchExternal}>
          Abrir calculadora real
        </button>
      </div>

      <div className="bg-white border rounded p-2 mb-4 text-right text-2xl font-mono h-12 overflow-hidden">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        <button className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-lg font-medium" onClick={clearDisplay}>
          C
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-lg font-medium"
          onClick={() => setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display)}
        >
          +/-
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-lg font-medium"
          onClick={() => performOperation("%")}
        >
          %
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white rounded p-2 text-lg font-medium"
          onClick={() => performOperation("/")}
        >
          ÷
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("7")}
        >
          7
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("8")}
        >
          8
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("9")}
        >
          9
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white rounded p-2 text-lg font-medium"
          onClick={() => performOperation("*")}
        >
          ×
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("4")}
        >
          4
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("5")}
        >
          5
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("6")}
        >
          6
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white rounded p-2 text-lg font-medium"
          onClick={() => performOperation("-")}
        >
          -
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("1")}
        >
          1
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("2")}
        >
          2
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium"
          onClick={() => inputDigit("3")}
        >
          3
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white rounded p-2 text-lg font-medium"
          onClick={() => performOperation("+")}
        >
          +
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium col-span-2"
          onClick={() => inputDigit("0")}
        >
          0
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-lg font-medium" onClick={inputDecimal}>
          .
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white rounded p-2 text-lg font-medium"
          onClick={handleEquals}
        >
          =
        </button>
      </div>
    </div>
  )
}
