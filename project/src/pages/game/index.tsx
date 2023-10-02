import React, { useEffect, useRef, useState, RefObject } from 'react'
import { startGame } from '../../utils/main'
import { Player, Canvas, Ball, GameInfo } from '../../utils/class'

import Pong from './game'

const index = () => {

    return (
        <>
            <div className='flex justify-center'>

                <div className="w-[60%] h-[400px] bg-black"></div>
            </div>
            {/* <Pong /> */}
        </>
    )
}

export default index

