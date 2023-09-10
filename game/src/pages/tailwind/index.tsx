// import Image from 'next/Image'
import Image from 'next/image'
import log from '../../../public/tailwind_Logo.png'
import Online_test from '../../../public/Online_test.png'
import Link from 'next/link'
import { useEffect, useState } from 'react';

function LinkComponet({ href, linkk }: { href: string, linkk: string }) {
    return (
        <Link className='text-slate-900 hover:text-orange-500 ' href={href}>{linkk}</Link>
    )
}

function Section() {
    return (
        <section>
            <div className="container px-10 flex flex-col-reverse md:flex-row space-x-20">
                <div className="md:w-1/2 flex flex-col justify-center space-y-10 py-8 text-center md:text-left text-slate-700">
                    <h1 className='font-bold text-3xl md:text-5xl'>Using responsive utility variants to build adaptive user interfaces.</h1>
                    <p>
                        Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.
                    </p>
                    <Link className='bg-orange-500 text-white hover:bg-black rounded-full px-6 py-2 self-center md:self-start' href={"#"}>Call Me</Link>
                </div>
                <div className="w-1/2">
                    <Image src={Online_test} alt="tailwind hero"></Image>
                </div>
            </div>
        </section>
    )
}
function Section2() {
    return (
        <section>
            <div className="container text-5xl text-center bg-stone-700">
                <h1 className='text-center'> Application Programming Interface</h1>
                <div className='container px-10 flex flex-col-reverse md:flex-row space-x-20 text-5xl'>
                    <Link className='text-slate-900 hover:text-orange-500 ' href="/">Application</Link>
                    <Link className='text-slate-900 hover:text-orange-500 ' href="/">Programming</Link>
                    <Link className='text-slate-900 hover:text-orange-500 ' href="/">Interface</Link>
                </div>
            </div>
        </section>
    )
}


export default function index1() {
    return (
        <>
            <nav className="containe mx-auto p-6">
                <div className="flex item-center justify-between">
                    <div>
                        {/* <div>FT_transcendence</div> */}
                        <Image src={log} alt='Taiwind logo' height={"200"} width={"150"}></Image>
                    </div>
                    <div className="hidden md:flex pt-5 space-x-10 ">
                        <LinkComponet href="/" linkk='Protfolio'></LinkComponet>
                        <LinkComponet href="/game" linkk='PongGame'></LinkComponet>
                        <LinkComponet href="/" linkk='About'></LinkComponet>
                        <LinkComponet href="/" linkk='Contact'></LinkComponet>
                        <div>
                            <Link className='bg-orange-500 text-white hover:bg-black rounded-full px-6 py-2' href={"#"}>Call Me</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Section></Section>
            <Section2></Section2>

        </>
    )
}
