import React, { useEffect, useRef, useState, RefObject } from "react";
import { Player, Canvas, Ball, GameInfo } from "./class";
import { InfoGameFromClientProps } from "@/components/model";

//lerp
function LinearInterpolation(pos1: number, pos2: number, t: number) {
  return pos1 + (pos2 - pos1) * t;
}

const updateGameLoop = (
  MyCanvas: Canvas,
  mousePosition: { x: number; y: number },
  ball: Ball,
  player: Player,
  computer: Player,
  infoGameFromClient: InfoGameFromClientProps
) => {
  //init the canvas size in Gameinfo
  GameInfo.CANVAS_WIDTH = MyCanvas.width;
  GameInfo.CANVAS_HIEGHT = MyCanvas.height;
  if (infoGameFromClient.selectPlayer === "computer")
    computer.y = LinearInterpolation(
      computer.y,
      ball.y - computer.height / 2,
      0.1
    );
  else {
    computer.y = mousePosition.x;
  }
  player.y = mousePosition.y;
  // computer.y = mousePosition.y;
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  // if (ball.x < 0) {
  //   computer.score++;
  // }
  if (ball.x < 0) {
    // console.log(score);
    // setscore(score + 1);
    computer.score += 1;
    ball.x = GameInfo.CANVAS_WIDTH / 2;
    ball.y = GameInfo.CANVAS_HIEGHT / 2;
    ball.velocityX = GameInfo.VELOCIT;
    ball.velocityY = GameInfo.VELOCIT;
  }
  // setscore(player.score)
  if (ball.x > GameInfo.CANVAS_WIDTH) {
    player.score += 1;
    ball.x = GameInfo.CANVAS_WIDTH / 2;
    ball.y = GameInfo.CANVAS_HIEGHT / 2;
    ball.velocityX = GameInfo.VELOCIT;
    ball.velocityY = GameInfo.VELOCIT;
  }
  ball.setBorder();
  player.setBorder();
  computer.setBorder();
  if (ball.bottom > MyCanvas.height || ball.top < 0) ball.velocityY *= -1;
  let selectPlayer = ball.x < MyCanvas.width / 2 ? player : computer;
  if (ball.checkCollision(selectPlayer)) MyCanvas.moveBall(ball, selectPlayer);
};

const renderGameOverScreen = (
  MyCanvas: Canvas,
  ball: Ball,
  player: Player,
  computer: Player
) => {
  MyCanvas.ClearCanvas();
  MyCanvas.drawRect(player);
  MyCanvas.drawRect(computer);
  MyCanvas.drawMedianLine({ w: 2, h: 10, step: 20, color: "#FFFFFF" });
  MyCanvas.drawCircle(ball);

  MyCanvas.drawText(String(computer.score), 200, 200, "white");
  MyCanvas.drawText(String(player.score), 800, 200, "white");
};

export function startGame(
  myCanvasRef: React.RefObject<HTMLCanvasElement>,
  mousePosition: { x: number; y: number },
  ball: Ball,
  player: Player,
  computer: Player,
  infoGameFromClient: InfoGameFromClientProps
) {
  if (!myCanvasRef.current) return;
  const MyCanvas = new Canvas(myCanvasRef.current);
  updateGameLoop(
    MyCanvas,
    mousePosition,
    ball,
    player,
    computer,
    infoGameFromClient
  );
  renderGameOverScreen(MyCanvas, ball, player, computer);
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
