import React, { useEffect, useRef, useState, RefObject } from 'react'
import { startGame } from '../../utils/main'
import { Player, Canvas, Ball, GameInfo } from '../../utils/class'

const Pong = () => {
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [input, setinput] = useState("")
    let mousePosition = { x: 0, y: 0 };
    let computer = new Player(0, 0)
    let player = new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y)
    let ball = new Ball(200, 50, 'red', 10, GameInfo.VELOCIT, GameInfo.VELOCIT)
    useEffect(() => {
        setInterval(() => {
            startGame(myCanvasRef, mousePosition, ball, player, computer)
        }, 1000 / 60)
    })
    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        mousePosition = { x: e.clientX - rect.left, y: (e.clientY - rect.top) - 25 }
    };
    useEffect(() => {
        const handlerResize = () => {
            const canvas = myCanvasRef.current
            if (!canvas) return
            canvas.width = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            computer.x = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            computer.x -= 10
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
    })
    return (
        <div className='w-full h-[600px] bg-slate-400 flex justify-center items-center'>
            <canvas onMouseMove={handleMouseMove} ref={myCanvasRef} height="400" className='bg-black rounded-2xl '> </canvas>
        </div >
    )
}

export default Pong

