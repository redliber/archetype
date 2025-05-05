'use client'

import { useAnimate } from "framer-motion"
import { ArrowRightFromLine } from "lucide-react"

export default function Card({title, genres, index, link} : {title: string, genres?: string[], index: number, link: string}) {
    const [scope, animate] = useAnimate()
    const [genresRef, genresAnimate] = useAnimate()
    const [titleRef, titleAnimate] = useAnimate()
    const [enterRef, enterAnimate] = useAnimate()

    function handleHover() {
        animate(scope.current, {
            background: 'var(--color-liber-red)',
            color: 'var(--color-liber-beige)',
            scale: 1.25,
            rotate: Math.random() * 20 * (Math.random() > 0.5 ? -1 : 1)
        }, {
            duration: 0.5,
            type: 'spring'
        })

        genresAnimate(genresRef.current, {
            opacity: 1,
            scale: 1.8
        }, {
            duration: 0.4,
            type: 'spring'
        })

        titleAnimate(titleRef.current, {
            scale: 0.25,
            color: 'var(--color-black)'
        }, {
            duration: 0.25,
            type: 'spring'
        })

        enterAnimate(enterRef.current, {
            opacity: 1
        }, {
            duration: 0.25,
            type: 'spring'
        })
    }


    function handleLeave() {
        animate(scope.current, {
            background: 'var(--color-liber-beige)',
            color: 'var(--color-liber-red)',
            scale: 1,
            rotate: 0
        }, {
            duration: 0.3,
            type: 'spring'
        })

        genresAnimate(genresRef.current, {
            opacity: 0,
            scale: 1,
        }, {
            duration: 0.2,
            type: 'spring'
        })

        titleAnimate(titleRef.current, {
            scale: 1,
            color: 'var(--color-liber-red)',

        }, {
            duration: 0.25,
            type: 'spring'
        })

        enterAnimate(enterRef.current, {
            opacity: 0
        }, {
            duration: 0.25,
            type: 'spring'
        })
    }



    return (
        <div
            ref={scope}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className={`
            border-[1px] border-liber-red rounded-sm
            p-10
            w-2xl min-h-[60vh]
            shadow-2xl shadow-liber-red/50
            flex flex-col justify-between
            bg-liber-beige font-heading
            ` + `z-[${100+index}]`}>
                <div
                    ref={enterRef}
                    className="text-right place-self-end rounded-sm opacity-0 bg-liber-beige font-black text-liber-red  hover:scale-125 transition-all duration-200 p-2">
                    <a href={link}>→ &nbsp; ENTER</a>
                </div>
                <div className="my-4 flex flex-row justify-between w-full">
                    <p
                        ref={titleRef}
                        className="text-8xl font-black tracking-tighter origin-top-right w-full">{title}
                    </p>
                </div>
                <div
                    ref={genresRef}
                    className="my-4 font-black
                        text-4xl
                        opacity-0
                        origin-bottom-left
                        ">
                    {
                        genres?.map((genre) => {
                            return (
                                <p
                                    key={index} 
                                    className="">{genre.toLowerCase()}</p>
                            )
                        })
                    }
                </div>

        </div>
    )
}
