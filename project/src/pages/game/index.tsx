import { useEffect, useRef, useState, RefObject } from 'react'

import Pong from './game'

const Index = () => {
    const [selectPlayer, setselectPlayer] = useState('')
    const infoGameFromClient = {
        selectPlayer: selectPlayer,
        info: "Some Info"
    };
    return (
        <>
            <div className=' bg-red-500 w-full '>

                <div className='absolute flex justify-center w-[100%] items-center h-[500px] space-x-5'>
                    {
                        selectPlayer == '' && (
                            <>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => setselectPlayer("online")}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>online</span>
                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    // value="player"
                                    onClick={() => setselectPlayer("ofline")}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>ofline</span>

                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => setselectPlayer("computer")}
                                >
                                    play with computer
                                </button>

                            </>
                        )
                    }
                </div>
                {
                    selectPlayer != '' ? (<div className='w-full absolute'> <Pong infoGameFromClient={infoGameFromClient}></Pong></div>) : null
                }
            </div >
        </>
    )
}

export default Index
