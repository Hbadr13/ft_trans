import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CustomLinkNavbarProps } from './model'
import Link from 'next/link'

const BoxSearch = () => {
    return (
        <div className='w-[80%] text-center'>
            <input
                type="text"
                className='bg-slate-800 w-[100%] rounded-full hover:bg-slate-900'
                placeholder='typing..' />
        </div>
    )
}

const CustomLinkNavbar = ({ href, content, moreStye }: CustomLinkNavbarProps) => {
    return (
        <div className={`bg-blue-900 rounded justify-between  ${moreStye}`}>
            <Link href={href}>
                {content}
            </Link>
        </div>
    )

}

const Navbar = () => {
    return (
        <div className=' carcontainer p-5 w-full flex justify-between bg-primary-colorrr font-mono'>
            <div className="w-[20%]   hidden  sm:flex flex-row item-center justify-between">
                <CustomLinkNavbar moreStye="" href="/" content="Home" />
                <CustomLinkNavbar moreStye="" href="/" content="Chat" />
                <CustomLinkNavbar moreStye="" href="/" content="PongGame" />
            </div>
            <div className=" flex justify-center sm:w-[60%] w-[100%]">
                <BoxSearch />
            </div>
            <div className="hidden w-[20%] pl-10 sm:flex justify-between">
                <CustomLinkNavbar href="/" content="logOut" />
                <CustomLinkNavbar href="/" content="more" />
            </div>
        </div>
    )
}

export default Navbar