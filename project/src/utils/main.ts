import React, { useEffect, useRef, useState, RefObject } from 'react'
import { Player, Canvas, Ball } from './class'



const updateGameLoop = (mousePosition: { x: number, y: number }, ball: Ball, player: Player, computer: Player) => {
    player.y = mousePosition.y
    ball.x += 1
}

const renderGameOverScreen = (myCanvasRef: React.RefObject<HTMLCanvasElement>, ball: Ball, player: Player, computer: Player) => {
    if (!myCanvasRef.current) return
    const canvas = new Canvas(myCanvasRef.current)
    if (!canvas.ctx) return
    canvas.ClearCanvas()
    canvas.drawRect({ x: player.x, y: player.y })
    canvas.drawRect({ x: computer.x, y: computer.y })
    canvas.drawCircle(ball)
}

export function startGame(myCanvasRef: React.RefObject<HTMLCanvasElement>, mousePosition: { x: number, y: number }, ball: Ball, player: Player, computer: Player) {
    updateGameLoop(mousePosition, ball, player, computer)
    renderGameOverScreen(myCanvasRef, ball, player, computer)
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

