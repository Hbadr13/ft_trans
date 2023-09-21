// import { Combobox, Transition } from '@headlessui/react'

// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// import { Fragment, useState, ChangeEvent, useEffect } from 'react'
// import { CustomLinkNavbarProps, BoxSearchrProps } from './model'
// import { arabicNames } from '../data/data'

// const BoxSearch = ({ hiddenSearch, setHiddenSearch, searchUser, setSearchUser }: BoxSearchrProps) => {
//     const [query, setQuery] = useState('')
//     const handlingQuery = (event: ChangeEvent<HTMLInputElement>) => {
//         setQuery(event.target.value)
//         setSearchUser(event.target.value)
//         setHiddenSearch(false)
//     }
//     return (
//         <>
//             <div className='w-[80%] flex items-center relative'>
//                 <button className='absolute '
//                 >
//                     <Image src='/search.svg' className=' ' alt='search' width={20} height={20}></Image>
//                 </button>
//                 <input
//                     type="text"
//                     className='focus:outline-none bg-slate-800 w-[100%] py-2 text-white px-8 rounded-xl hover:bg-slate-900'
//                     placeholder='typing..'
//                     // onChange={(event) => setQuery(event.target.value)}
//                     onChange={handlingQuery}
//                 />
//                 <button className='absolute right-2'
//                     onClick={() => setHiddenSearch(!hiddenSearch)}>
//                     <Image src='/arrow-up.svg' className=' ' alt='search' width={20} height={20}></Image>
//                 </button>
//             </div>
//         </>
//     )
// }

// const CustomLinkNavbar = ({ href, content, moreStye }: CustomLinkNavbarProps) => {
//     return (
//         <div className={`rounded justify-between flex items-center   ${moreStye}`}>
//             <Link className='hover:bg-orange-400 hover:text-cyan-100 p-1 px-2 rounded-xl' href={href}>
//                 {content}
//             </Link>
//         </div>
//     )
// }

// const Navbar = () => {
//     const [hiddenSearch, setHiddenSearch] = useState(false)
//     const [searchUser, setSearchUser] = useState("")
//     const empy: Array<string> = []
//     let filterUser = empy;


//     if (searchUser.replace(/\s+/g, '')) {
//         filterUser = arabicNames.filter((user) => (
//             user.toLowerCase().includes(searchUser.trimStart().trimEnd().replace(/\s+/g, ' ').toLowerCase())
//         ))
//     }
//     return (
//         <>
//             <div className='bg-slate-600 px-5 py-2 w-full flex justify-between item-center font-light shadow-md shadow-slate-700'>
//                 <div className="w-[20%] hidden  sm:flex flex-row item-center justify-between text-[#1ba098]">
//                     <CustomLinkNavbar moreStye="" href="/" content="Home" />
//                     <CustomLinkNavbar moreStye="" href="/" content="Chat" />
//                     <CustomLinkNavbar moreStye="" href="/" content="PongGame" />
//                 </div>
//                 <div className="flex item-center justify-center sm:w-[60%] w-[100%] py-4">
//                     <BoxSearch hiddenSearch={hiddenSearch} setHiddenSearch={setHiddenSearch} searchUser={searchUser} setSearchUser={setSearchUser} />
//                 </div>
//                 <div className="hidden w-[20%] pl-10 sm:flex justify-between item-center text-[#1ba098]">
//                     <CustomLinkNavbar moreStye='' href="/" content="logOut" />
//                     <CustomLinkNavbar moreStye='' href="/" content="more" />
//                 </div>
//             </div>

//             <div className={`text-center  flex justify-center overflow-hidden ${hiddenSearch ? "hidden" : ""}`}>

//                 <div className=' w-[50%] rounded-2xl m-2 shadow-slate-800 shadow-md font-light'>
//                     {
//                         filterUser.map((item, index) => (
//                             (
//                                 <div className=' flex justify-around  hover:bg-slate-400'>
//                                     <CustomLinkNavbar href='/' content={item} ></CustomLinkNavbar>
//                                     <CustomLinkNavbar href='/' content=' add friend' ></CustomLinkNavbar>
//                                 </div>
//                             )
//                         ))

//                     }
//                 </div>
//             </div>
//         </>
//     )

// }

// export default Navbar






import { Combobox, Transition } from '@headlessui/react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Fragment, useState, ChangeEvent, useEffect } from 'react'
import { CustomLinkNavbarProps, BoxSearchrProps } from './model'
import { arabicNames } from '../data/data'

const BoxSearch = ({ hiddenSearch, setHiddenSearch, searchUser, setSearchUser }: BoxSearchrProps) => {
    const [query, setQuery] = useState('')
    const handlingQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
        setSearchUser(event.target.value)
        setHiddenSearch(false)
    }
    return (
        <>
            <div className='w-[80%] flex items-center relative'>
                <button className='absolute '
                >
                    <Image src='/search.svg' className=' ' alt='search' width={20} height={20}></Image>
                </button>
                <input
                    type="text"
                    className='focus:outline-none bg-slate-800 w-[100%] py-2 text-white px-8 rounded-xl hover:bg-slate-900'
                    placeholder='typing..'
                    // onChange={(event) => setQuery(event.target.value)}
                    onChange={handlingQuery}
                />
                <button className='absolute right-2'
                    onClick={() => setHiddenSearch(!hiddenSearch)}>
                    <Image src='/arrow-up.svg' className=' ' alt='search' width={20} height={20}></Image>
                </button>
            </div>
        </>
    )
}

const CustomLinkNavbar = ({ href, content, moreStye }: CustomLinkNavbarProps) => {
    return (
        <div className={`rounded justify-between flex items-center   ${moreStye}`}>
            <Link className='hover:bg-orange-400 hover:text-cyan-100 p-1 px-2 rounded-xl' href={href}>
                {content}
            </Link>
        </div>
    )
}

const Navbar = () => {
    const [hiddenSearch, setHiddenSearch] = useState(false)
    const [searchUser, setSearchUser] = useState("")
    const empy: Array<string> = []
    let filterUser = empy;


    if (searchUser.replace(/\s+/g, '')) {
        filterUser = arabicNames.filter((user) => (
            user.toLowerCase().includes(searchUser.trimStart().trimEnd().replace(/\s+/g, ' ').toLowerCase())
        ))
    }
    return (
        <>
            
            <div className='bg-slate-600 px-5 py-2 w-full flex justify-between item-center font-light shadow-md shadow-slate-700'>
                <div className="w-[20%] hidden  sm:flex flex-row item-center justify-between text-[#1ba098]">
                    <CustomLinkNavbar moreStye="" href="/" content="Home" />
                    <CustomLinkNavbar moreStye="" href="/" content="Chat" />
                    <CustomLinkNavbar moreStye="" href="/" content="PongGame" />
                </div>
                <div className="flex item-center justify-center sm:w-[60%] w-[100%] py-4">
                    <BoxSearch hiddenSearch={hiddenSearch} setHiddenSearch={setHiddenSearch} searchUser={searchUser} setSearchUser={setSearchUser} />
                </div>
                <div className="hidden w-[20%] pl-10 sm:flex justify-between item-center text-[#1ba098]">
                    <CustomLinkNavbar moreStye='' href="/" content="logOut" />
                    <CustomLinkNavbar moreStye='' href="/" content="more" />
                </div>
            </div>

            <div className={`text-center  flex justify-center overflow-hidden ${hiddenSearch ? "hidden" : ""}`}>

                <div className=' w-[50%] rounded-2xl m-2 shadow-slate-800 shadow-md font-light'>
                    {
                        filterUser.map((item, index) => (
                            (
                                <div className=' flex justify-around  hover:bg-slate-400'>
                                    <CustomLinkNavbar href='/' content={item} ></CustomLinkNavbar>
                                    <CustomLinkNavbar href='/' content=' add friend' ></CustomLinkNavbar>
                                </div>
                            )
                        ))

                    }
                </div>
            </div>

        </>
    )

}
export default Navbar;






// import { Fragment, useState } from 'react'
// import { Combobox, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const people = [
//     { id: 1, name: 'Wade Cooper' },
//     { id: 2, name: 'Arlene Mccoy' },
//     { id: 3, name: 'Devon Webb' },
//     { id: 4, name: 'Tom Cook' },
//     { id: 5, name: 'Tanya Fox' },
//     { id: 6, name: 'Hellen Schmidt' },
// ]

// export default function Example() {
//     const [selected, setSelected] = useState(people[0])
//     const [query, setQuery] = useState('')

//     const filteredPeople =
//         query === ''
//             ? people
//             : people.filter((person) =>
//                 person.name
//                     .toLowerCase()
//                     .replace(/\s+/g, '')
//                     .includes(query.toLowerCase().replace(/\s+/g, ''))
//             )

//     return (

// <Combobox >
//     <div className="">

//         <Combobox.Button className="">
//             click
//         </Combobox.Button>
//         <Combobox.Options>
//             <Combobox>
//                 <Combobox.Button className="">
//                     click
//                 </Combobox.Button>
//                 <Combobox.Options>
//                     <h1>helllo</h1>
//                 </Combobox.Options>
//             </Combobox>

//         </Combobox.Options>

//     </div>
// </Combobox>
//     )
// }
