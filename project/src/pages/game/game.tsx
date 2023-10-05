import React, { useEffect, useRef, useState, RefObject } from 'react'
import { startGame } from '../../utils/main'
import { Player, Canvas, Ball, GameInfo } from '../../utils/class'
import { InfoGameFromClientProps } from '@/components/model'
import { Socket } from 'socket.io'
import { io } from 'socket.io-client'
// import { DefaultEventsMap } from 'socket.io';

interface InfoGame {
    infoGameFromClient: InfoGameFromClientProps;
}
let computer = new Player(0, 0)
let player = new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y)
let ball = new Ball(200, 50, 'red', 10, GameInfo.VELOCIT, GameInfo.VELOCIT)
let mousePosition = { x: 0, y: 0 };
const Pong = (props: InfoGame) => {
    const myref = useRef<any>()
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [rome, setrome] = useState("")
    const [socket, setsocket] = useState<any>()
    const [numberPlayer, setnumberPlayer] = useState(0)
    const [HoAreYou, setHoAreYou] = useState(0)
    const [score, setscore] = useState(0)
    if (props.infoGameFromClient.selectPlayer === 'online') {
        GameInfo.SPEED = 2
        ball.velocityX = 1.2
        ball.velocityY = 1.2
        console.log('hello hello')
    }
    useEffect(() => {
        socket?.on('start', () => {
            setnumberPlayer(2)
            setInterval(() => {
                startGame(myCanvasRef, mousePosition, ball, player, computer, props.infoGameFromClient)


                if (props.infoGameFromClient.selectPlayer == 'online') {

                    if (HoAreYou == 0) {
                        socket?.emit('update1', player.y);
                    }
                    if (HoAreYou == 1) {
                        socket?.emit('update2', computer.y);
                    }
                    socket?.emit('moveBall', { x: ball.x, y: ball.y, playerScore: player.score, computerScore: computer.score })
                    socket?.on('y1', (yy: number) => {
                        if (HoAreYou == 1)
                            mousePosition.y = yy
                    })
                    socket?.on('y2', (yy: number) => {
                        if (HoAreYou == 0)
                            mousePosition.x = yy
                    })
                    socket?.on('movebb', (obj: any) => {
                        if (HoAreYou == 1) {
                            ball.x = obj.x
                            ball.y = obj.y
                            console.log(computer.score)
                            computer.score = obj.computerScore
                        }
                    })
                }
            }, 1000 / 60)
        })
    })
    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        if (HoAreYou == 0)
            mousePosition.y = (e.clientY - rect.top) - 25
        if (HoAreYou == 1)
            mousePosition.x = (e.clientY - rect.top) - 25
    };
    useEffect(() => {
        const handlerResize = () => {
            const canvas = myCanvasRef.current
            if (!canvas) return
            // canvas.width = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            // computer.x = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            // canvas.width = 400
            computer.x = canvas.width
            computer.x -= 10
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
    })
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            const keyPressed = event.key;
            if (keyPressed === 'a') {
                mousePosition.y += 5
            } if (keyPressed === 'w') {
                mousePosition.y -= 5
            } if (keyPressed === 'ArrowDown') {
                mousePosition.x += 5
            } if (keyPressed === 'ArrowUp') {
                mousePosition.x -= 5
            }
        });
    },)
    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setsocket(newSocket)
        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        socket?.on('indexPlayer', (yy: number) => {
            if (HoAreYou === 0) {
                setHoAreYou(yy)
            }
        })
    })
    if (props.infoGameFromClient.selectPlayer === 'computer' || props.infoGameFromClient.selectPlayer === 'ofline') {
        socket?.emit('startWithComputer', rome);
    }

    const sendMessage = () => {
        setnumberPlayer(1)
        socket?.emit('joinRome', rome);
    };
    return (
        <div className='w-full h-[600px] flex justify-center items-center mt-20'>
            {
                (numberPlayer == 0 && props.infoGameFromClient.selectPlayer === 'online') ?
                    (
                        <div>
                            <input type="text" value={rome} onChange={(e) => setrome(e.target.value)} />
                            <button onClick={sendMessage}>join rome</button>
                        </div>) : null
            }
            {
                (numberPlayer == 1 && props.infoGameFromClient.selectPlayer === 'online') ?
                    (<div>waiting for oponenet</div>) : null
            }
            {
                (numberPlayer == 2 || props.infoGameFromClient.selectPlayer === 'computer' || props.infoGameFromClient.selectPlayer === 'ofline') ?
                    (
                        <div className="w-full h-[100%] flex items-center flex-col space-y-10">
                            <div>{ }</div>
                            < canvas className='bg-black rounded-2xl h-[70%] w-[70%] ' onMouseMove={handleMouseMove} ref={myCanvasRef} height={400} width={1000} > </canvas>
                            <div className=' w-[300px] h-[90px] rounded-2xl flex justify-around items-center'>
                                <div className='bg-slate-400 w-[40%] h-[90%] rounded-2xl flex justify-center items-center text-3xl'>
                                    {
                                        computer.score
                                    }
                                </div>
                                <div className='bg-slate-400 w-[40%] h-[90%] rounded-2xl flex justify-center items-center text-3xl'>
                                    {
                                        score
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
            }
        </div >
    )
}

export default Pong
