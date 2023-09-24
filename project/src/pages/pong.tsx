import React, { useEffect, useRef, useState, RefObject } from 'react'
import { startGame } from '../utils/main'
const pong = () => {
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [input, setinput] = useState("")
    let mousePosition = { x: 0, y: 0 };

    useEffect(() => {
        setInterval(() => startGame(myCanvasRef, mousePosition), 1000 / 60)
    })
    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        mousePosition = { x: e.clientX - rect.left, y: (e.clientY - rect.top) - 25 }
    };
    useEffect(() => {
        const handlerResize = () => {
            const canvas = myCanvasRef.current
            if (!canvas) return
            console.log(window.innerWidth)
            canvas.width = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            console.log(canvas.width)
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
    })

    return (
        <div className='w-full h-[1000px] bg-slate-400 flex justify-center items-center'>
            <canvas onMouseMove={handleMouseMove} ref={myCanvasRef} height="400" className='bg-black rounded-2xl '> </canvas>
        </div >
    )
}


// style={{ transform: 'rotate(90deg)' }}
export default pong

