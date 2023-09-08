// import Image from 'next/Image'
import Image from 'next/image'
import log from '../../../public/tailwind_Logo.png'

function AA({ a_1: }) {
    return (
        <a href=''>{a_1}</a>
    )
}

export default function index1() {
    return (
        <>
            <nav className="containe mx-auto px-10">
                <div className="flex item-center justify-between">
                    <div>
                        <Image src={log} alt='Taiwind logo' height={"20"} width={"150"}></Image>
                    </div>
                    <div className="hidden md:flex pt-6 space-x-10 ">

                        <a href={"/"}>Protfolio</a>
                        <a href={"/"}>About</a>
                        <a href={"/"}>Contact</a>
                        <a href={"/"}>Social</a>
                        <AA a_1={"hello"}></AA>
                    </div>
                </div>

            </nav>
        </>
    )
}
