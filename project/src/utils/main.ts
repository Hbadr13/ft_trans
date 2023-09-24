import React, { useEffect, useRef, useState, RefObject } from 'react'
import { Player, Canvas } from './class'

let player = new Player(0, 0)
const updateGameLoop = (mousePosition: { x: number, y: number }) => {
    player.y = mousePosition.y
}
const renderGameOverScreen = () => {

}
export function startGame(myCanvasRef: React.RefObject<HTMLCanvasElement>, mousePosition: { x: number, y: number }) {
    if (!myCanvasRef.current) return
    const canvas = new Canvas(myCanvasRef.current)
    if (!canvas.cnx) return
    updateGameLoop(mousePosition)
    renderGameOverScreen()
    canvas.ClearCanvas()
    canvas.drawRect({ x: 0, y: player.y })
}



// initializeGame
// drawCanvas
// movePaddle
// moveBall
// checkCollision
// resetGame
// startGame
// stopGame
// updateScore
// renderScore
// checkWinCondition
// endGame
// handleUserInput
// updateGameLoop
// renderGameOverScreen
// restartGame
// pauseGame
// resumeGame
// adjustDifficulty
// renderInstructions

